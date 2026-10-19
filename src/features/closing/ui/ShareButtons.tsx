"use client";

import { useEffect, useState } from "react";
import { useCopy } from "@/shared/hooks/useCopy";
import { Button } from "@/shared/ui/Button/Button";
import { Toast } from "@/shared/ui/Toast/Toast";

/** 안내 토스트를 보여주는 시간 */
const TOAST_DURATION_MS = 3000;

export interface ShareButtonsProps {
  /** 공유할 때 함께 보내는 제목 */
  title: string;
  shareLabel: string;
  copyLabel: string;
  copiedLabel: string;
  /** 공유 창을 열 수 없어 링크를 대신 복사했을 때의 안내 */
  shareFallbackCopied: string;
  /** 공유 창도 링크 복사도 쓸 수 없을 때의 안내 */
  shareFallbackFailed: string;
}

/** 청첩장 공유 버튼 두 개: 공유하기, 링크 복사하기 */
export function ShareButtons({
  title,
  shareLabel,
  copyLabel,
  copiedLabel,
  shareFallbackCopied,
  shareFallbackFailed,
}: ShareButtonsProps) {
  const { isCopied, copy } = useCopy();
  // 공유하기에서 대신 복사할 때는 "링크 복사하기" 버튼의 글자가 바뀌지 않도록 따로 쓴다.
  const { copy: copyForShare } = useCopy();
  const [toast, setToast] = useState<{ id: number; message: string }>();
  const [isToastOpen, setIsToastOpen] = useState(false);

  // 토스트를 띄울 때마다 보여주는 시간을 처음부터 다시 잰다.
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setIsToastOpen(false), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message: string) => {
    setToast({ id: Date.now(), message });
    setIsToastOpen(true);
  };

  /** 기기의 공유 창을 연다. 열 수 없으면 링크를 복사하고 토스트로 알린다. */
  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        // 방문자가 공유 창을 닫은 경우다.
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    const isCopiedForShare = await copyForShare(url);
    showToast(isCopiedForShare ? shareFallbackCopied : shareFallbackFailed);
  };

  return (
    <>
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
      <Toast isOpen={isToastOpen}>{toast?.message}</Toast>
    </>
  );
}
