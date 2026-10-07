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

const MOCK_DELAY_MS = 300;

/** 예시 구현의 저장소. 이번 방문 동안 쓴 메시지를 최신순으로 기억하고, 새로고침하면 비워진다. */
let mockStore: (GuestbookEntry & { password: string })[] = [];

const wait = () => new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

/*
 * 아래 함수들은 모두 예시 구현이다.
 * 노션 연동 이슈에서 함수 안을 서버 호출로 바꾸고, 함수의 모양(인자 · 반환값)은 그대로 둔다.
 */

/** 방명록 메시지를 최신순으로 가져온다. */
export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  return mockStore.map(({ id, name, date, message }) => ({
    id,
    name,
    date,
    message,
  }));
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
  mockStore = [{ ...entry, password: request.password }, ...mockStore];

  return entry;
}

/** 방명록 메시지를 지운다. 비밀번호가 맞지 않으면 지우지 않고 false를 돌려준다. */
export async function deleteGuestbookEntry({
  id,
  password,
}: DeleteGuestbookRequest): Promise<boolean> {
  await wait();

  const target = mockStore.find((entry) => entry.id === id);
  if (!target || target.password !== password) return false;

  mockStore = mockStore.filter((entry) => entry.id !== id);
  return true;
}
