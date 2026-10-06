"use client";

import { useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";

const COPIED_RESET_MS = 1500;

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
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timer = setTimeout(() => setIsCopied(false), COPIED_RESET_MS);
    return () => clearTimeout(timer);
  }, [isCopied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setIsCopied(true);
    } catch {
      // 클립보드 권한이 없는 환경(일부 인앱 브라우저)에서는 조용히 넘어간다.
    }
  };

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
        onClick={handleCopy}
        className="shrink-0 cursor-pointer border border-strong px-3 py-1.5 typo-label-xsmall leading-normal whitespace-nowrap text-primary"
      >
        <span aria-live="polite">{isCopied ? copiedLabel : copyLabel}</span>
      </button>
    </div>
  );
}
