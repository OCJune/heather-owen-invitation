import { cn } from "@/shared/lib/utils";
import { Icon } from "@/shared/ui/Icon/Icon";
import { FieldLabel } from "./FieldLabel";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** 필드 위 라벨. 생략하면 라벨 줄을 그리지 않는다. */
  label?: React.ReactNode;
  /** 라벨 앞 번호 (예: "01") */
  index?: string;
}

/** 밑줄형 선택 필드. `<option>`을 children으로 넘긴다. */
export function Select({
  label,
  index,
  className,
  children,
  ...props
}: SelectProps) {
  return (
    <label className={cn("flex flex-col gap-3", className)}>
      {label && <FieldLabel index={index}>{label}</FieldLabel>}
      <span className="relative flex items-center border-b border-strong">
        <select
          className="w-full appearance-none bg-transparent py-2.5 pr-6 typo-body-sans text-[0.875rem] text-primary outline-none"
          {...props}
        >
          {children}
        </select>
        <Icon
          name="chevron-down"
          size={16}
          className="pointer-events-none absolute right-0 text-icon-primary"
        />
      </span>
    </label>
  );
}
