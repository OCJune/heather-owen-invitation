import { cn } from "@/shared/lib/utils";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

/** 교통 노선 · 주차장 번호 표기용 흑백 뱃지 (예: 7, 간선, P2) */
export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center bg-inverse px-1.5 py-px font-sans text-[0.625rem] leading-normal font-medium whitespace-nowrap text-on-inverse",
        className,
      )}
      {...props}
    />
  );
}
