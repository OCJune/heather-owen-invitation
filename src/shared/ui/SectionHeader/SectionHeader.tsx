import { cn } from "@/shared/lib/utils";

export interface SectionHeaderProps {
  /** 섹션 번호 표기 (예: "No. 01") */
  number: string;
  /** 영문 제목 */
  title: string;
  /** 국문 부제. 영문판에서는 생략한다. */
  subtitle?: string;
  /** 검정 배경 섹션에서는 "dark" */
  theme?: "light" | "dark";
  className?: string;
}

/** 섹션 머리: "No. XX" + 가는 선 + 영문 제목 + 국문 부제 */
export function SectionHeader({
  number,
  title,
  subtitle,
  theme = "light",
  className,
}: SectionHeaderProps) {
  const isDark = theme === "dark";
  const subColor = isDark ? "text-on-inverse-tertiary" : "text-tertiary";

  return (
    <header className={cn("flex w-full flex-col gap-1.5", className)}>
      <div className="flex items-center gap-3">
        <span className={cn("typo-accent-number whitespace-nowrap", subColor)}>
          {number}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "h-px flex-1 border-t",
            isDark ? "border-inverse-strong" : "border-default",
          )}
        />
      </div>
      <h2
        className={cn(
          "typo-heading-section-en",
          isDark ? "text-on-inverse" : "text-primary",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "typo-body-sans-small leading-normal tracking-[0.06em]",
            subColor,
          )}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
