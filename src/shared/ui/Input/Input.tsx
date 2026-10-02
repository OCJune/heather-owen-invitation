import { cn } from "@/shared/lib/utils";
import { FieldLabel } from "./FieldLabel";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 필드 위 라벨. 생략하면 라벨 줄을 그리지 않는다. */
  label?: React.ReactNode;
  /** 라벨 앞 번호 (예: "01") */
  index?: string;
}

/** 밑줄형 한 줄 입력 필드 */
export function Input({ label, index, className, ...props }: InputProps) {
  return (
    <label className={cn("flex flex-col gap-3", className)}>
      {label && <FieldLabel index={index}>{label}</FieldLabel>}
      <input
        className="w-full border-b border-strong bg-transparent py-2.5 typo-body-sans text-[0.875rem] text-primary outline-none placeholder:text-muted"
        {...props}
      />
    </label>
  );
}
