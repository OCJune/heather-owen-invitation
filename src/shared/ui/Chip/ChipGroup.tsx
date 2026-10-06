import { useId } from "react";
import { cn } from "@/shared/lib/utils";
import { FieldLabel } from "@/shared/ui/Input/FieldLabel";

export interface ChipGroupProps {
  /** 묶음 위 라벨 (질문). 생략하면 `ariaLabel`을 준다. */
  label?: React.ReactNode;
  /** 라벨 앞 번호 (예: "01") */
  index?: string;
  /** 라벨을 그리지 않을 때 스크린 리더에 읽어줄 이름 */
  ariaLabel?: string;
  /** 선택지 (`Chip`). 폭을 똑같이 나눠 한 줄에 놓는다. */
  children: React.ReactNode;
  className?: string;
}

/** 하나만 고르는 선택지 묶음. 안의 `Chip`에는 모두 같은 `name`을 준다. */
export function ChipGroup({
  label,
  index,
  ariaLabel,
  children,
  className,
}: ChipGroupProps) {
  const labelId = useId();

  return (
    <div
      role="radiogroup"
      aria-labelledby={label ? labelId : undefined}
      aria-label={label ? undefined : ariaLabel}
      className={cn("flex flex-col gap-3", className)}
    >
      {label && (
        <span id={labelId}>
          <FieldLabel index={index}>{label}</FieldLabel>
        </span>
      )}
      <div className="flex gap-1.5 *:flex-1">{children}</div>
    </div>
  );
}
