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
/** 예시 구현에서 이번 방문 동안 새로 쓴 메시지의 비밀번호를 기억해 둔다. */
const mockPasswords = new Map<string, string>();

const wait = () => new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

/*
 * 아래 함수들은 모두 예시 구현이다.
 * 노션 연동 이슈에서 함수 안을 서버 호출로 바꾸고, 함수의 모양(인자 · 반환값)은 그대로 둔다.
 */

/** 방명록 메시지를 최신순으로 가져온다. 연동 전이라 비어 있다. */
export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  return [];
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
  return mockPasswords.get(id) === password;
}
