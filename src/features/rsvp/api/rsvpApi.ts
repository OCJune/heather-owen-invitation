export interface RsvpRequest {
  /** 어느 쪽 하객인지 */
  side: "groom" | "bride";
  /** 참석 여부 */
  attendance: "yes" | "no";
  name: string;
  phone: string;
}

const MOCK_DELAY_MS = 400;

/**
 * 참석 의사를 전달한다.
 *
 * 지금은 예시 구현이라 아무 데도 저장하지 않는다.
 * 노션 연동 이슈에서 이 함수 안을 서버 호출로 바꾼다.
 */
export async function submitRsvp(request: RsvpRequest): Promise<void> {
  void request;
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
}
