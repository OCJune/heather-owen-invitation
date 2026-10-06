const DAY_MS = 24 * 60 * 60 * 1000;
const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;
const MONTHS = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
] as const;

export interface CalendarDate {
  year: number;
  month: number;
  day: number;
}

export interface WeekDay {
  /** 요일 영문 약자 (예: "SAT") */
  weekday: string;
  /** 날짜 (일) */
  day: number;
  /** 예식 당일인지 */
  isTarget: boolean;
}

/** 시간대의 영향을 받지 않도록 날짜를 UTC 자정 기준 밀리초로 바꾼다. */
function toUtc({ year, month, day }: CalendarDate) {
  return Date.UTC(year, month - 1, day);
}

/** 달의 영문 이름 (예: 2 → "FEBRUARY") */
export function getMonthName(month: number) {
  return MONTHS[month - 1];
}

/** 해당 날짜가 속한 한 주(월요일 시작)의 7일을 돌려준다. */
export function getWeekOf(date: CalendarDate): WeekDay[] {
  const target = toUtc(date);
  const weekdayIndex = new Date(target).getUTCDay();
  const monday = target - ((weekdayIndex + 6) % 7) * DAY_MS;

  return Array.from({ length: 7 }, (_, offset) => {
    const current = new Date(monday + offset * DAY_MS);
    return {
      weekday: WEEKDAYS[current.getUTCDay()],
      day: current.getUTCDate(),
      isTarget: current.getTime() === target,
    };
  });
}

/** 오늘부터 해당 날짜까지 남은 일수. 지났으면 음수다. */
export function getDaysUntil(date: CalendarDate, now: Date = new Date()) {
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((toUtc(date) - today) / DAY_MS);
}

/** 남은 일수를 "D–149" · "D-DAY" · "D+3" 형태로 표기한다. */
export function formatDday(daysLeft: number) {
  if (daysLeft === 0) return "D-DAY";
  return daysLeft > 0 ? `D–${daysLeft}` : `D+${-daysLeft}`;
}
