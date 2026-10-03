import { cn } from "@/shared/lib/utils";

export interface AccountGroupProps {
  /** 묶음 제목 (예: "신랑측 계좌") */
  title: string;
  /** 처음부터 펼쳐 둘지 여부 */
  defaultOpen?: boolean;
  /** 펼쳤을 때 보여줄 계좌 줄 (`AccountRow`) */
  children: React.ReactNode;
  className?: string;
}

/**
 * 계좌 묶음 펼치기. 제목 줄을 누르면 계좌 목록이 열리고 닫힌다 (+ / −).
 * 여러 묶음을 이어 놓을 때 맨 위 굵은 선은 감싸는 쪽에서 `border-t border-strong`으로 준다.
 */
export function AccountGroup({
  title,
  defaultOpen = false,
  children,
  className,
}: AccountGroupProps) {
  return (
    <details
      open={defaultOpen}
      className={cn("group border-b border-default", className)}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between py-4.5 text-primary [&::-webkit-details-marker]:hidden">
        <span className="typo-heading-ko-small">{title}</span>
        <span aria-hidden="true" className="typo-accent-toggle">
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">−</span>
        </span>
      </summary>
      <div className="flex flex-col divide-y divide-default">{children}</div>
    </details>
  );
}
