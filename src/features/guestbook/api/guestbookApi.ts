"use server";

import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import {
  APIErrorCode,
  isFullPage,
  isNotionClientError,
} from "@notionhq/client";
import { revalidateTag, unstable_cache } from "next/cache";
import {
  CACHE_TAGS,
  getDataSourceId,
  getNotion,
  isSameNotionId,
  queryAllPages,
  readText,
  requireDataSourceId,
} from "@/shared/api/notion";

export interface GuestbookEntry {
  id: string;
  name: string;
  /** 작성일 표기 (예: "02.10") */
  date: string;
  message: string;
}

export interface CreateGuestbookRequest {
  name: string;
  /** 삭제할 때 확인하는 숫자 4자리 */
  password: string;
  message: string;
}

export interface DeleteGuestbookRequest {
  id: string;
  /** 작성할 때 넣은 비밀번호 */
  password: string;
}

/** 노션 방명록 DB의 속성 이름 */
const PROPERTY = {
  name: "이름",
  message: "메시지",
  password: "비밀번호",
};

const NAME_MAX_LENGTH = 20;
const MESSAGE_MAX_LENGTH = 200;
const PASSWORD_PATTERN = /^\d{4}$/;
const PAGE_ID_PATTERN = /^[0-9a-f]{8}-?([0-9a-f]{4}-?){3}[0-9a-f]{12}$/i;

/** 작성일을 한국 시간 기준 "MM.DD"로 적는다. */
function formatDate(isoDate: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(isoDate));
  const pick = (type: string) =>
    parts.find((part) => part.type === type)?.value;

  return `${pick("month")}.${pick("day")}`;
}

/** 비밀번호는 그대로 저장하지 않고 "소금:해시" 꼴로 바꿔 저장한다. */
function hashPassword(password: string) {
  const salt = randomBytes(8).toString("hex");
  return `${salt}:${scryptSync(password, salt, 32).toString("hex")}`;
}

function isPasswordMatch(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;

  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(password, salt, expected.length || 32);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

/** 방명록 전체 (최신순). 작성 · 삭제하거나 노션 웹훅이 오면 다시 가져온다. */
const getCachedEntries = unstable_cache(
  async (): Promise<GuestbookEntry[]> => {
    const dataSourceId = getDataSourceId("guestbook");
    if (!dataSourceId) return [];

    const pages = await queryAllPages(dataSourceId, {
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    });

    return pages.map((page) => ({
      id: page.id,
      name: readText(page, PROPERTY.name),
      date: formatDate(page.created_time),
      message: readText(page, PROPERTY.message),
    }));
  },
  ["notion-guestbook"],
  { tags: [CACHE_TAGS.guestbook], revalidate: 300 },
);

/** 방명록 메시지를 최신순으로 가져온다. */
export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  // 노션이 설정되지 않았을 때의 빈 결과는 캐시에 남기지 않는다.
  if (!getDataSourceId("guestbook")) return [];

  return getCachedEntries();
}

/** 방명록 메시지를 남기고, 저장된 메시지를 돌려준다. */
export async function createGuestbookEntry(
  request: CreateGuestbookRequest,
): Promise<GuestbookEntry> {
  // 브라우저에서 직접 부를 수 있는 함수이므로 값을 다시 확인한다.
  const name = String(request.name).trim().slice(0, NAME_MAX_LENGTH);
  const message = String(request.message).trim().slice(0, MESSAGE_MAX_LENGTH);
  const password = String(request.password);
  if (!name || !message || !PASSWORD_PATTERN.test(password)) {
    throw new Error("방명록 입력값이 올바르지 않습니다.");
  }

  const page = await getNotion().pages.create({
    parent: {
      type: "data_source_id",
      data_source_id: requireDataSourceId("guestbook"),
    },
    properties: {
      [PROPERTY.name]: { title: [{ text: { content: name } }] },
      [PROPERTY.message]: { rich_text: [{ text: { content: message } }] },
      [PROPERTY.password]: {
        rich_text: [{ text: { content: hashPassword(password) } }],
      },
    },
  });
  revalidateTag(CACHE_TAGS.guestbook, { expire: 0 });

  return {
    id: page.id,
    name,
    date: formatDate(
      isFullPage(page) ? page.created_time : new Date().toISOString(),
    ),
    message,
  };
}

/** 방명록 메시지를 지운다. 비밀번호가 맞지 않으면 지우지 않고 false를 돌려준다. */
export async function deleteGuestbookEntry({
  id,
  password,
}: DeleteGuestbookRequest): Promise<boolean> {
  const dataSourceId = requireDataSourceId("guestbook");
  if (!PAGE_ID_PATTERN.test(String(id))) return false;

  const notion = getNotion();

  try {
    const page = await notion.pages.retrieve({ page_id: id });

    // 방명록 DB의 메시지가 아니면 건드리지 않는다.
    const isGuestbookEntry =
      isFullPage(page) &&
      page.parent.type === "data_source_id" &&
      isSameNotionId(page.parent.data_source_id, dataSourceId);
    if (!isGuestbookEntry) return false;

    if (!page.in_trash) {
      const stored = readText(page, PROPERTY.password);
      if (!isPasswordMatch(String(password), stored)) return false;

      await notion.pages.update({ page_id: id, in_trash: true });
    }
  } catch (error) {
    const isNotFound =
      isNotionClientError(error) && error.code === APIErrorCode.ObjectNotFound;
    if (!isNotFound) throw error;
    // 이미 노션에서 지워진 메시지다. 목록만 새로 고친다.
  }

  revalidateTag(CACHE_TAGS.guestbook, { expire: 0 });
  return true;
}
