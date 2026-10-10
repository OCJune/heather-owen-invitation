/** 길 안내 표의 한 줄. strong: 굵은 줄, item: 보통 줄, note: 흐린 설명 */
export interface DirectionLine {
  type: "strong" | "item" | "note";
  text: string;
  /** 줄 앞에 붙는 흑백 뱃지 (노선 번호, 주차장 번호 등) */
  badge?: string;
}

export const ko = {
  meta: {
    title: "이종찬 · 임현지 결혼합니다",
    description: "2027년 2월 20일 토요일 오후 1시, 테라리움서울",
  },
  common: {
    close: "닫기",
    copy: "복사",
    copied: "복사됨",
    photo: "사진",
  },
  cover: {
    eyebrow: "THE WEDDING OF",
    date: "2027. 02. 20  SAT",
    time: "1:00 PM",
    venue: "테라리움서울",
    venueDetail: "서울 노원구 · 서울온천 7–8F",
  },
  invitation: {
    number: "No. 01",
    title: "Invitation",
    subtitle: "초대의 글" as string | undefined,
    message:
      "겨울의 끝자락, 봄이 움트기 시작하는 계절에\n서로의 가장 가까운 사람이 되기로 약속합니다.\n\n늘 곁에서 저희를 아껴주신 분들을 모시고\n그 첫걸음을 내딛고자 합니다.\n귀한 걸음으로 함께해 주신다면\n더없는 기쁨으로 간직하겠습니다.",
    family: [
      {
        role: "GROOM",
        name: "이종찬",
        nameNote: undefined as string | undefined,
        parents: "이규장 · 전경자의 장남",
      },
      {
        role: "BRIDE",
        name: "임현지",
        nameNote: undefined as string | undefined,
        parents: "임건혁 · 정정훈의 차녀",
      },
    ],
  },
  theDay: {
    number: "No. 02",
    title: "The Day",
    subtitle: "예식 일시" as string | undefined,
    timeLine: "Saturday, 1:00 PM",
    fullDate: "2027년 2월 20일 토요일 오후 1시",
  },
  gallery: {
    number: "No. 03",
    title: "Gallery",
    subtitle: "사진첩" as string | undefined,
    more: "사진 더 보기",
    allTitle: "Gallery",
    /** {count} 자리에 사진 장수가 들어간다. */
    allCount: "사진첩 · {count}장",
    prev: "PREV",
    next: "NEXT",
    swipeHint: "좌우로 넘겨보세요",
    openPhoto: "{index}번 사진 크게 보기",
    loading: "사진을 불러오는 중",
  },
  location: {
    number: "No. 04",
    title: "Location",
    subtitle: "오시는 길" as string | undefined,
    venue: "테라리움서울",
    address: "서울 노원구 노원로 247, 서울온천 7–8층\n(지번) 하계동 251-7",
    /** 주소 복사 버튼으로 복사되는 값 */
    addressCopy: "서울 노원구 노원로 247 서울온천 7–8층 테라리움서울",
    tel: "Tel. 02-6316-7700",
    copyAddress: "주소 복사",
    mapLabel: "MAP",
    mapLinks: [
      { id: "naver", label: "네이버 지도" },
      { id: "kakao", label: "카카오맵" },
      { id: "tmap", label: "티맵" },
    ] as { id: "naver" | "kakao" | "tmap" | "google"; label: string }[],
    directions: [
      {
        key: "SHUTTLE",
        label: "셔틀버스",
        lines: [
          { type: "strong", badge: "7", text: "하계역 2번 출구" },
          {
            type: "note",
            text: "출구에서 150m, 무궁화약국 앞에서 승차\n예식 당일 수시 운행",
          },
        ],
      },
      {
        key: "SUBWAY",
        label: "지하철",
        lines: [
          { type: "strong", badge: "7", text: "하계역 2번 출구" },
          { type: "note", text: "노원소방서 · 대진고 방면 300m, 도보 약 10분" },
        ],
      },
      {
        key: "BUS",
        label: "버스",
        lines: [
          {
            type: "note",
            text: "서울온천 · 하계1동주민센터 · 골마을근린공원 · 대진고등학교 정류장 하차",
          },
          { type: "item", badge: "간선", text: "100" },
          { type: "item", badge: "지선", text: "1132 · 1141 · 1221 · 1224" },
        ],
      },
      {
        key: "CAR",
        label: "자가용",
        lines: [
          {
            type: "strong",
            text: "내비게이션 “테라리움서울” 또는 “서울온천”",
          },
          { type: "note", text: "서울 노원구 노원로 247" },
        ],
      },
      {
        key: "PARKING",
        label: "주차",
        lines: [
          { type: "strong", text: "2시간 무료 · 700대 동시 주차" },
          { type: "item", badge: "P2", text: "대진고등학교 주차장" },
          { type: "item", badge: "P3", text: "용동초등학교 주차장" },
          { type: "item", badge: "P4", text: "하계 테크노타운 주차장" },
          {
            type: "note",
            text: "P2 · P4 주차장을 먼저 이용하시면 편리합니다.\n1층 정문에서 주차 안내를 받으실 수 있습니다.",
          },
        ],
      },
    ] as { key: string; label: string; lines: DirectionLine[] }[],
  },
  rsvp: {
    eyebrow: "R.S.V.P.",
    cardTitle: "참석 의사를 알려주세요",
    cardBody: "한 분 한 분을 정성껏 맞이하고자\n미리 참석 여부를 여쭙니다.",
    open: "참석 의사 전달하기",
    notice: {
      title: "참석 여부를\n여쭙습니다",
      body: "부담 없이 편하게 알려주세요.\n보내주신 답변은 하객분들을 맞이하는\n준비에 소중히 쓰겠습니다.",
      summary: [
        { label: "COUPLE", value: "신랑 이종찬 · 신부 임현지" },
        { label: "DATE", value: "2027. 2. 20 (토) 오후 1:00" },
        { label: "VENUE", value: "테라리움서울 · 서울온천 7–8층" },
      ],
      next: "참석 의사 전달하기",
      skipToday: "오늘 하루 보지 않기",
    },
    form: {
      title: "참석 의사 전달",
      side: {
        label: "어느 쪽 하객이신가요?",
        groom: "신랑측",
        bride: "신부측",
      },
      attendance: { label: "참석 여부", yes: "참석할게요", no: "어려워요" },
      name: { label: "성함", placeholder: "성함을 입력해 주세요" },
      phone: { label: "연락처", placeholder: "010-0000-0000" },
      consent: "개인정보 수집 · 이용 동의",
      required: "(필수)",
      consentMore: "자세히",
      consentDetail:
        "수집 항목: 성함, 연락처, 참석 여부\n이용 목적: 예식 참석 인원 확인 및 안내\n보관 기간: 예식 종료 후 1개월 이내 파기",
      submit: "참석 의사 전달하기",
    },
    done: {
      title: "전달되었습니다",
      body: "소중한 답변 감사합니다.\n예식 날 반갑게 맞이하겠습니다.",
      close: "닫기",
    },
  },
  gift: {
    number: "No. 05",
    title: "With Heart",
    subtitle: "마음 전하실 곳" as string | undefined,
    intro:
      "직접 축하를 전하기 어려운 분들을 위해\n계좌번호를 함께 안내드립니다.\n보내주시는 마음, 오래도록 감사히 간직하겠습니다.",
    groups: { groom: "신랑측 계좌", bride: "신부측 계좌" },
  },
  guestbook: {
    number: "No. 06",
    title: "Guestbook",
    subtitle: "방명록" as string | undefined,
    intro: "두 사람에게 건네는 축하의 한마디를 남겨주세요.",
    empty: "첫 번째 축하 메시지를 남겨주세요.",
    viewAll: "전체 보기",
    collapse: "접기",
    write: "메시지 남기기",
    prevPage: "이전 쪽",
    nextPage: "다음 쪽",
    deleteMessage: "메시지 삭제",
    sheet: {
      title: "Guestbook",
      subtitle: "방명록 남기기",
      name: { label: "이름", placeholder: "이름" },
      password: { label: "비밀번호", placeholder: "숫자 4자리" },
      message: {
        label: "메시지",
        placeholder: "두 사람에게 전할 축하의 말을 적어주세요.",
      },
      note: "비밀번호는 메시지를 삭제할 때 필요합니다.",
      submit: "남기기",
    },
      error: "전송하지 못했습니다. 잠시 후 다시 시도해주세요.",
    remove: {
      title: "메시지를 삭제할까요?",
      body: "작성할 때 입력한 비밀번호를 입력해주세요.",
      placeholder: "비밀번호",
      wrong: "비밀번호가 일치하지 않습니다.",
      cancel: "취소",
      error: "삭제하지 못했습니다. 잠시 후 다시 시도해주세요.",
      confirm: "삭제",
    },
  },
  closing: {
    heading: "With gratitude,",
    body: "저희의 시작을 함께 기뻐해 주시는\n모든 분들께 깊이 감사드립니다.\n받은 사랑만큼 서로를 아끼며 살겠습니다.",
    sign: "종찬 & 현지 드림",
    shareKakao: "카카오톡 공유",
    copyLink: "링크 복사",
    footerDate: "2027. 02. 20",
  },
};

/** 언어별 사전이 따라야 하는 모양. 한국어 사전을 기준으로 한다. */
export type Dictionary = typeof ko;
