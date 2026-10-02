"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { FieldLabel } from "./FieldLabel";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** 필드 위 라벨. 생략하면 라벨 줄을 그리지 않는다. */
  label?: React.ReactNode;
  /** 라벨 앞 번호 (예: "01") */
  index?: string;
}

/**
 * 밑줄형 여러 줄 입력 필드.
 * `maxLength`를 주면 오른쪽 아래에 "현재 글자 수 / 최대 글자 수"를 보여준다.
 */
export function Textarea({
  label,
  index,
  className,
  maxLength,
  value,
  defaultValue,
  onChange,
  ...props
}: TextareaProps) {
  const [innerLength, setInnerLength] = useState(
    String(defaultValue ?? "").length,
  );
  const length = value !== undefined ? String(value).length : innerLength;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInnerLength(event.target.value.length);
    onChange?.(event);
  };

  return (
    <label className={cn("flex flex-col gap-3", className)}>
      {label && <FieldLabel index={index}>{label}</FieldLabel>}
      <span className="flex h-30 flex-col justify-between border-b border-strong py-2.5">
        <textarea
          className="w-full flex-1 resize-none bg-transparent typo-body-sans text-[0.875rem] text-primary outline-none placeholder:text-muted"
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          {...props}
        />
        {maxLength !== undefined && (
          <span className="text-right typo-numeral-small text-[0.75rem] text-muted">
            {length} / {maxLength}
          </span>
        )}
      </span>
    </label>
  );
}
