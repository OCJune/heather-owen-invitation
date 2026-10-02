import { cn } from "@/shared/lib/utils";

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 선택된 상태 (먹색 채움) */
  selected?: boolean;
}

/**
 * 폼 선택지. 한 줄에 2~3개를 나란히 놓고 `className="flex-1"`로 폭을 나눈다.
 */
export function Chip({
  selected = false,
  className,
  type = "button",
  children,
  ...props
}: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        "inline-flex h-10 cursor-pointer items-center justify-center border p-3 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-border-strong)",
        selected
          ? "border-strong bg-inverse typo-label-strong text-on-inverse"
          : "border-control typo-label-regular text-secondary",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
