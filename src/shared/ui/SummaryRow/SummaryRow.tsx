import { cn } from "@/shared/lib/utils";

export interface SummaryRowProps {
  /** 왼쪽 영문 항목 이름 (예: "DATE") */
  label: string;
  /** 오른쪽 값 */
  children: React.ReactNode;
  className?: string;
}

/**
 * 항목 이름과 값 한 줄 (아래 가는 선).
 * 표의 맨 위 굵은 선은 감싸는 쪽에서 `border-t border-strong`으로 준다.
 */
export function SummaryRow({ label, children, className }: SummaryRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-b border-default py-3",
        className,
      )}
    >
      <span className="w-15.5 shrink-0 typo-eyebrow-en text-tertiary">
        {label}
      </span>
      <span className="min-w-0 flex-1 typo-label-regular text-primary">
        {children}
      </span>
    </div>
  );
}
