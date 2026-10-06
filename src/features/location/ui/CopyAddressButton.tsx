"use client";

import { useCopy } from "@/shared/hooks/useCopy";

export interface CopyAddressButtonProps {
  /** 복사할 주소 */
  address: string;
  label: string;
  copiedLabel: string;
}

/** 밑줄 글자 형태의 주소 복사 버튼 */
export function CopyAddressButton({
  address,
  label,
  copiedLabel,
}: CopyAddressButtonProps) {
  const { isCopied, copy } = useCopy();

  return (
    <button
      type="button"
      onClick={() => copy(address)}
      className="cursor-pointer border-b border-strong typo-label-xsmall text-primary"
    >
      <span aria-live="polite">{isCopied ? copiedLabel : label}</span>
    </button>
  );
}
