"use client";

import { useCopy } from "@/shared/hooks/useCopy";
import { Button } from "@/shared/ui/Button/Button";

export interface ShareButtonsProps {
  /** 공유할 때 함께 보내는 제목 */
  title: string;
  shareLabel: string;
  copyLabel: string;
  copiedLabel: string;
}

/** 청첩장 공유 버튼 두 개: 공유하기, 링크 복사 */
export function ShareButtons({
  title,
  shareLabel,
  copyLabel,
  copiedLabel,
}: ShareButtonsProps) {
  const { isCopied, copy } = useCopy();

  /*
   * 카카오톡 공유 SDK 연동 전까지는 기기의 공유 창을 연다.
   * 공유 창이 없는 브라우저에서는 링크를 복사한다.
   */
  const handleShare = async () => {
    const url = window.location.href;

    if (!navigator.share) {
      await copy(url);
      return;
    }
    try {
      await navigator.share({ title, url });
    } catch {
      // 방문자가 공유 창을 닫은 경우다.
    }
  };

  return (
    <div className="flex gap-2">
      <Button variant="secondary" onClick={handleShare} className="flex-1">
        {shareLabel}
      </Button>
      <Button
        variant="secondary"
        onClick={() => copy(window.location.href)}
        className="flex-1"
      >
        <span aria-live="polite">{isCopied ? copiedLabel : copyLabel}</span>
      </Button>
    </div>
  );
}
