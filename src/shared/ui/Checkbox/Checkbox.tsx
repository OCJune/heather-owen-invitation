import { cn } from "@/shared/lib/utils";
import { Icon } from "@/shared/ui/Icon/Icon";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  /** 체크박스 옆 라벨 */
  children: React.ReactNode;
  /** 라벨 글자에 줄 클래스 (크기 · 색을 바꿀 때) */
  labelClassName?: string;
}

/**
 * 18px 사각 체크박스와 라벨. 실제 `<input type="checkbox">`를 감싸므로
 * `checked` / `defaultChecked` / `onChange` 등을 그대로 쓴다.
 */
export function Checkbox({
  children,
  className,
  labelClassName,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-2.5",
        className,
      )}
    >
      <input type="checkbox" className="peer sr-only" {...props} />
      <span className="flex size-4.5 shrink-0 items-center justify-center border border-strong text-on-inverse peer-checked:bg-inverse peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--color-border-strong) *:opacity-0 peer-checked:*:opacity-100">
        <Icon name="check" size={18} />
      </span>
      <span className={cn("typo-label-regular text-primary", labelClassName)}>
        {children}
      </span>
    </label>
  );
}
