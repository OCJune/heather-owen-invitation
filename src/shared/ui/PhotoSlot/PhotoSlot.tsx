import { cn } from "@/shared/lib/utils";

export interface PhotoSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  /** rect: 사각형, arch: 위가 반원인 아치형 */
  shape?: "rect" | "arch";
  /** 사진이 없을 때 보여줄 글자 */
  label?: string;
  /** 사진이 없을 때 라벨 아래에 보여줄 권장 크기 (예: "334 × 430") */
  sizeHint?: string;
}

/**
 * 사진 자리. 크기는 `className`으로 준다. (예: `h-[430px] w-full`)
 * children(예: `next/image`)을 넘기면 그 사진을 모양에 맞춰 잘라 보여주고,
 * 없으면 회색 자리 표시를 그린다.
 */
export function PhotoSlot({
  shape = "rect",
  label = "PHOTO",
  sizeHint,
  className,
  children,
  ...props
}: PhotoSlotProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-0.5 overflow-hidden bg-placeholder text-muted",
        shape === "arch" && "rounded-t-full",
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <span className="font-display text-[0.6875rem] tracking-[0.3em]">
            {label}
          </span>
          {sizeHint && (
            <span className="font-sans text-[0.5625rem] font-light">
              {sizeHint}
            </span>
          )}
        </>
      )}
    </div>
  );
}
