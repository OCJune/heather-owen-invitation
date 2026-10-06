"use client";

import { useCopy } from "@/shared/hooks/useCopy";
import { cn } from "@/shared/lib/utils";

export interface AccountRowProps {
  /** 예금주 표기 (예: "신랑 이종찬") */
  holder: string;
  /** 은행과 계좌번호 표기 (예: "국민 000000-00-000000") */
  account: string;
  /** 클립보드에 복사할 값. 생략하면 `account`를 복사한다. */
  copyText?: string;
  /** 복사 버튼 글자 */
  copyLabel?: string;
  /** 복사 직후 잠깐 보여줄 글자 */
  copiedLabel?: string;
  className?: string;
}

/** 계좌 한 줄과 복사 버튼. 펼쳐진 계좌 목록 안에서 쓴다. */
export function AccountRow({
  holder,
  account,
  copyText = account,
  copyLabel = "복사",
  copiedLabel = "복사됨",
  className,
}: AccountRowProps) {
  const { isCopied, copy } = useCopy();

  return (
    <div
      className={cn(
        "flex items-center justify-between bg-muted px-4 py-3.5",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-0.75">
        <span className="typo-label-strong text-primary">{holder}</span>
        <span className="typo-body-sans-small text-tertiary">{account}</span>
      </div>
      <button
        type="button"
        onClick={() => copy(copyText)}
        className="shrink-0 cursor-pointer border border-strong px-3 py-1.5 typo-label-xsmall leading-normal whitespace-nowrap text-primary"
      >
        <span aria-live="polite">{isCopied ? copiedLabel : copyLabel}</span>
      </button>
    </div>
  );
}
