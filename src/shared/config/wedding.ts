/**
 * 언어와 무관한 예식 정보.
 * 화면에 보이는 문구는 `shared/i18n`의 언어별 사전에 둔다.
 */
export const WEDDING = {
  /** 예식 일시 (한국 시간) */
  date: { year: 2027, month: 2, day: 20, hour: 13, minute: 0 },
  /** 커버 · 맨 아래에 쓰는 영문 이름 */
  names: {
    groom: "Jongchan",
    bride: "Hyunji",
    footer: "JONGCHAN & HYUNJI (HEATHER)",
  },
  venue: {
    /** 지도 앱에서 검색할 이름 */
    mapQuery: "테라리움서울",
    tel: "02-6316-7700",
  },
} as const;
