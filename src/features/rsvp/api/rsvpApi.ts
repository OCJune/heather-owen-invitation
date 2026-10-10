"use server";

import { getNotion, requireDataSourceId } from "@/shared/api/notion";

export interface RsvpRequest {
  /** 어느 쪽 하객인지 */
  side: "groom" | "bride";
  /** 참석 여부 */
  attendance: "yes" | "no";
  name: string;
  phone: string;
}

/** 노션 참석 의사 DB의 속성 이름 */
const PROPERTY = {
  name: "이름",
  phone: "연락처",
  side: "구분",
  attendance: "참석",
};

/** 코드에서 쓰는 값 → 노션 선택지 */
const SIDE_LABEL: Record<RsvpRequest["side"], string> = {
  groom: "신랑측",
  bride: "신부측",
};
const ATTENDANCE_LABEL: Record<RsvpRequest["attendance"], string> = {
  yes: "참석",
  no: "불참",
};

const NAME_MAX_LENGTH = 50;
const PHONE_MAX_LENGTH = 30;

/** 참석 의사를 노션 참석 의사 DB에 남긴다. */
export async function submitRsvp(request: RsvpRequest): Promise<void> {
  // 브라우저에서 직접 부를 수 있는 함수이므로 값을 다시 확인한다.
  const name = String(request.name).trim().slice(0, NAME_MAX_LENGTH);
  const phone = String(request.phone).trim().slice(0, PHONE_MAX_LENGTH);
  const side = SIDE_LABEL[request.side];
  const attendance = ATTENDANCE_LABEL[request.attendance];
  if (!name || !phone || !side || !attendance) {
    throw new Error("참석 의사 입력값이 올바르지 않습니다.");
  }

  await getNotion().pages.create({
    parent: {
      type: "data_source_id",
      data_source_id: requireDataSourceId("rsvp"),
    },
    properties: {
      [PROPERTY.name]: { title: [{ text: { content: name } }] },
      [PROPERTY.phone]: { phone_number: phone },
      [PROPERTY.side]: { select: { name: side } },
      [PROPERTY.attendance]: { select: { name: attendance } },
    },
  });
}
