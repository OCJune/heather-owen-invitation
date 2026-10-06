const STORAGE_KEY = "rsvp-notice-skip-date";

/** 방문자 기기 기준 오늘 날짜 (예: "2027-02-20") */
function getToday() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

/** "오늘 하루 보지 않기"를 오늘 체크했는지 확인한다. */
export function shouldSkipNotice() {
  try {
    return localStorage.getItem(STORAGE_KEY) === getToday();
  } catch {
    return false;
  }
}

/** 오늘 하루 안내 창을 건너뛰도록 기록하거나, 기록을 지운다. */
export function setSkipNotice(skip: boolean) {
  try {
    if (skip) localStorage.setItem(STORAGE_KEY, getToday());
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 저장소를 쓸 수 없는 환경(사생활 보호 모드 등)에서는 매번 안내 창을 보여준다.
  }
}
