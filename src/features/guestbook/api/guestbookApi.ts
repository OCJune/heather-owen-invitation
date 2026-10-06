import type { Locale } from "@/shared/types/locale";

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

const MOCK_DELAY_MS = 300;
/** 예시 메시지를 지울 때 쓰는 비밀번호 */
const MOCK_SEED_PASSWORD = "0000";

const MOCK_ENTRIES: Record<Locale, GuestbookEntry[]> = {
  ko: [
    {
      id: "mock-1",
      name: "김하늘",
      date: "02.10",
      message:
        "결혼 진심으로 축하해! 지금처럼 서로에게 가장 든든한 편이 되어주길.",
    },
    {
      id: "mock-2",
      name: "박지훈",
      date: "02.09",
      message:
        "대학 동기들을 대표해 축하합니다. 두 사람의 앞날에 좋은 날만 가득하길!",
    },
    {
      id: "mock-3",
      name: "이수민",
      date: "02.08",
      message:
        "드디어 이 날이 왔네. 누구보다 잘 어울리는 두 사람, 오래오래 행복하자.",
    },
    {
      id: "mock-4",
      name: "최서윤",
      date: "02.07",
      message: "두 분의 새로운 시작을 진심으로 축하드립니다.",
    },
    {
      id: "mock-5",
      name: "정우진",
      date: "02.06",
      message: "형, 결혼 축하해요! 행복하게 잘 사세요.",
    },
  ],
  en: [
    {
      id: "mock-1",
      name: "Haneul Kim",
      date: "02.10",
      message:
        "Congratulations! May you always be each other's strongest support.",
    },
    {
      id: "mock-2",
      name: "Jihoon Park",
      date: "02.09",
      message:
        "Cheers from all your college friends — wishing you only good days ahead!",
    },
    {
      id: "mock-3",
      name: "Sumin Lee",
      date: "02.08",
      message:
        "The day is finally here. You two are perfect together — be happy, always.",
    },
    {
      id: "mock-4",
      name: "Seoyun Choi",
      date: "02.07",
      message: "Warmest congratulations on your new beginning.",
    },
    {
      id: "mock-5",
      name: "Woojin Jung",
      date: "02.06",
      message: "Congrats, you two! Wishing you a lifetime of happiness.",
    },
  ],
};

/** 예시 구현에서 이번 방문 동안 새로 쓴 메시지의 비밀번호를 기억해 둔다. */
const mockPasswords = new Map<string, string>();

const wait = () => new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

/*
 * 아래 함수들은 모두 예시 구현이다.
 * 노션 연동 이슈에서 함수 안을 서버 호출로 바꾸고, 함수의 모양(인자 · 반환값)은 그대로 둔다.
 */

/** 방명록 메시지를 최신순으로 가져온다. */
export async function getGuestbookEntries(
  locale: Locale,
): Promise<GuestbookEntry[]> {
  return MOCK_ENTRIES[locale];
}

/** 방명록 메시지를 남기고, 저장된 메시지를 돌려준다. */
export async function createGuestbookEntry(
  request: CreateGuestbookRequest,
): Promise<GuestbookEntry> {
  await wait();

  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  const entry: GuestbookEntry = {
    id: `mock-${now.getTime()}`,
    name: request.name,
    date: `${pad(now.getMonth() + 1)}.${pad(now.getDate())}`,
    message: request.message,
  };
  mockPasswords.set(entry.id, request.password);

  return entry;
}

/** 방명록 메시지를 지운다. 비밀번호가 맞지 않으면 false를 돌려준다. */
export async function deleteGuestbookEntry(
  id: string,
  password: string,
): Promise<boolean> {
  await wait();
  return password === (mockPasswords.get(id) ?? MOCK_SEED_PASSWORD);
}
