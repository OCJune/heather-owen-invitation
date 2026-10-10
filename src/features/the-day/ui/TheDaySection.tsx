import { getMonthName, getWeekOf } from "@/features/the-day/lib/date";
import { WEDDING } from "@/shared/config/wedding";
import type { Dictionary } from "@/shared/i18n/ko";
import { cn } from "@/shared/lib/utils";
import { SectionHeader } from "@/shared/ui/SectionHeader/SectionHeader";
import { Dday } from "./Dday";

export interface TheDaySectionProps {
  dict: Dictionary["theDay"];
}

/** 예식 일시: 큰 날짜, 예식이 있는 한 주, D-day (검정 배경) */
export function TheDaySection({ dict }: TheDaySectionProps) {
  const { date } = WEDDING;
  const week = getWeekOf(date);

  return (
    <section className="flex flex-col bg-inverse px-gutter py-section-y">
      <SectionHeader
        theme="dark"
        number={dict.number}
        title={dict.title}
        subtitle={dict.subtitle}
      />

      <div className="mt-9 flex items-center gap-4.5 whitespace-nowrap">
        <p className="typo-display-date text-on-inverse">{date.day}</p>
        <div className="flex flex-col gap-0.5">
          <p className="typo-numeral-large-strong tracking-[0.3em] text-on-inverse">
            {getMonthName(date.month)}
          </p>
          <p className="typo-numeral-large tracking-[0.2em] text-on-inverse-tertiary">
            {date.year}
          </p>
          <p className="typo-accent-italic-medium text-on-inverse-secondary">
            {dict.timeLine}
          </p>
        </div>
      </div>

      <ol className="mt-7 flex justify-between">
        {week.map(({ weekday, day, isTarget }) => (
          <li
            key={day}
            aria-current={isTarget ? "date" : undefined}
            className={cn(
              "flex w-11 flex-col items-center gap-2 py-3",
              isTarget && "bg-surface",
            )}
          >
            <span
              className={cn(
                "typo-eyebrow-en-small",
                isTarget ? "text-primary" : "text-on-inverse-muted",
              )}
            >
              {weekday}
            </span>
            <span
              className={
                isTarget
                  ? "typo-numeral-large-strong text-primary"
                  : "typo-numeral-large text-on-inverse-subtle"
              }
            >
              {day}
            </span>
          </li>
        ))}
      </ol>

      <hr className="mt-7 border-inverse" />
      <div className="mt-5 flex items-center justify-between whitespace-nowrap">
        <p className="typo-body-sans-small text-on-inverse-secondary">
          {dict.fullDate}
        </p>
        <Dday date={date} className="typo-numeral-d-day text-on-inverse" />
      </div>
    </section>
  );
}
