"use client";

import { useSyncExternalStore } from "react";
import {
  formatDday,
  getDaysUntil,
  type CalendarDate,
} from "@/features/the-day/lib/date";

/** 구독할 바깥 값이 없으므로 아무것도 하지 않는다. */
const subscribe = () => () => {};

export interface DdayProps {
  /** 예식 날짜 */
  date: CalendarDate;
  className?: string;
}

/**
 * 예식까지 남은 날 표시 (예: "D–149").
 * 방문한 날 기준으로 계산해야 하므로 서버에서는 비워 두고 브라우저에서 채운다.
 */
export function Dday({ date, className }: DdayProps) {
  const label = useSyncExternalStore(
    subscribe,
    () => formatDday(getDaysUntil(date)),
    () => "",
  );

  return <span className={className}>{label}</span>;
}
