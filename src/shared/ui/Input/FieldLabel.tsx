export interface FieldLabelProps {
  /** 라벨 앞 번호 (예: "01") */
  index?: string;
  children: React.ReactNode;
}

/** 입력 필드 위에 놓이는 "번호 + 라벨" 줄 */
export function FieldLabel({ index, children }: FieldLabelProps) {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      {index && <span className="typo-eyebrow-en text-muted">{index}</span>}
      <span className="typo-label-button text-primary">{children}</span>
    </span>
  );
}
