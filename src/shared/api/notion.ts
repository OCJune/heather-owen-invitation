import "server-only";
import {
  Client,
  isFullPage,
  type PageObjectResponse,
  type QueryDataSourceParameters,
} from "@notionhq/client";

/** 노션 DB(데이터 소스)별 환경 변수 */
const DATA_SOURCE_IDS = {
  photos: process.env.NOTION_PHOTOS_DATA_SOURCE_ID,
  accounts: process.env.NOTION_ACCOUNTS_DATA_SOURCE_ID,
  guestbook: process.env.NOTION_GUESTBOOK_DATA_SOURCE_ID,
  rsvp: process.env.NOTION_RSVP_DATA_SOURCE_ID,
};

export type NotionDataSource = keyof typeof DATA_SOURCE_IDS;

/** 노션 데이터를 캐시할 때 붙이는 태그. 웹훅 · 작성 · 삭제 때 이 태그로 캐시를 비운다. */
export const CACHE_TAGS = {
  photos: "notion-photos",
  accounts: "notion-accounts",
  guestbook: "notion-guestbook",
} as const;

let client: Client | undefined;

/** 노션 클라이언트. 토큰은 서버에서만 읽는다. */
export function getNotion() {
  client ??= new Client({
    auth: process.env.NOTION_TOKEN,
    notionVersion: "2026-03-11",
  });
  return client;
}

/**
 * 데이터 소스 ID를 돌려준다.
 * 토큰이나 ID가 아직 설정되지 않았으면 null이다. (읽기는 빈 목록, 쓰기는 오류로 처리한다)
 */
export function getDataSourceId(name: NotionDataSource): string | null {
  const id = DATA_SOURCE_IDS[name];
  if (!process.env.NOTION_TOKEN || !id) return null;
  return id;
}

/** 쓰기용. 설정되지 않았으면 오류를 던진다. */
export function requireDataSourceId(name: NotionDataSource): string {
  const id = getDataSourceId(name);
  if (!id) throw new Error(`노션 환경 변수가 설정되지 않았습니다: ${name}`);
  return id;
}

/** 하이픈 유무와 상관없이 두 노션 ID가 같은지 비교한다. */
export function isSameNotionId(a: string, b: string) {
  const normalize = (id: string) => id.replaceAll("-", "").toLowerCase();
  return normalize(a) === normalize(b);
}

/** 데이터 소스의 행을 끝까지 모두 가져온다. (노션은 한 번에 100개까지만 준다) */
export async function queryAllPages(
  dataSourceId: string,
  params: Omit<QueryDataSourceParameters, "data_source_id"> = {},
): Promise<PageObjectResponse[]> {
  const notion = getNotion();
  const pages: PageObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.dataSources.query({
      ...params,
      data_source_id: dataSourceId,
      start_cursor: cursor,
      page_size: 100,
    });
    pages.push(...response.results.filter(isFullPage));
    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  return pages;
}

const toPlainText = (richText: { plain_text: string }[]) =>
  richText.map(({ plain_text }) => plain_text).join("");

/** 글자로 읽을 수 있는 속성(제목 · 텍스트 · 선택 · URL · 전화번호)의 값. 비어 있으면 빈 문자열. */
export function readText(page: PageObjectResponse, name: string): string {
  const property = page.properties[name];

  switch (property?.type) {
    case "title":
      return toPlainText(property.title);
    case "rich_text":
      return toPlainText(property.rich_text);
    case "select":
      return property.select?.name ?? "";
    case "url":
      return property.url ?? "";
    case "phone_number":
      return property.phone_number ?? "";
    default:
      return "";
  }
}

/** 숫자 속성의 값. 비어 있으면 null. */
export function readNumber(
  page: PageObjectResponse,
  name: string,
): number | null {
  const property = page.properties[name];
  return property?.type === "number" ? property.number : null;
}

export interface NotionFile {
  /** notion: 노션에 올린 파일(주소가 1시간 뒤 만료됨), external: 바깥 주소 */
  source: "notion" | "external";
  url: string;
}

/** 파일 속성의 첫 번째 파일. 없으면 null. */
export function readFile(
  page: PageObjectResponse,
  name: string,
): NotionFile | null {
  const property = page.properties[name];
  if (property?.type !== "files") return null;

  const [file] = property.files;
  if (file?.type === "file") return { source: "notion", url: file.file.url };
  if (file?.type === "external") {
    return { source: "external", url: file.external.url };
  }
  return null;
}

/** "순서"가 작은 것부터, 같으면 먼저 만든 것부터 정렬한다. 순서가 비어 있으면 맨 뒤로 간다. */
export function sortByOrder(pages: PageObjectResponse[], name = "순서") {
  const order = (page: PageObjectResponse) =>
    readNumber(page, name) ?? Number.POSITIVE_INFINITY;

  return [...pages].sort(
    (a, b) =>
      order(a) - order(b) || a.created_time.localeCompare(b.created_time),
  );
}
