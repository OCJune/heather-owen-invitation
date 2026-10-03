import { cn } from "@/shared/lib/utils";

export interface ChipProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  /** 같은 묶음의 선택지끼리 같은 값을 준다. 이 값이 같은 것 중 하나만 선택된다. */
  name: string;
  /** 선택됐을 때 폼에 실리는 값 */
  value: string;
  /** 선택지에 보여줄 글자 */
  children: React.ReactNode;
}

/**
 * 여럿 중 하나를 고르는 선택지 (라디오 버튼). `ChipGroup` 안에 나란히 놓는다.
 * 실제 `<input type="radio">`를 감싸므로 `defaultChecked` / `checked` / `onChange`를 그대로 쓴다.
 */
export function Chip({ children, className, ...props }: ChipProps) {
  return (
    <label className={cn("flex cursor-pointer", className)}>
      <input type="radio" className="peer sr-only" {...props} />
      <span className="flex h-10 flex-1 items-center justify-center border border-control p-3 typo-label-regular whitespace-nowrap text-secondary peer-checked:border-strong peer-checked:bg-inverse peer-checked:font-medium peer-checked:text-on-inverse peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--color-border-strong)">
        {children}
      </span>
    </label>
  );
}
