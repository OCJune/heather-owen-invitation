"use client";

import { useCallback, useEffect, useState } from "react";

const COPIED_RESET_MS = 1500;

export interface UseCopyReturn {
  /** 방금 복사에 성공했는지. 잠시 뒤 자동으로 false가 된다. */
  isCopied: boolean;
  /** 글자를 클립보드에 복사한다. */
  copy: (text: string) => Promise<void>;
}

/** 클립보드 복사와 "복사됨" 표시 상태를 제공하는 훅 */
export function useCopy(): UseCopyReturn {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timer = setTimeout(() => setIsCopied(false), COPIED_RESET_MS);
    return () => clearTimeout(timer);
  }, [isCopied]);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch {
      // 클립보드 권한이 없는 환경(일부 인앱 브라우저)에서는 조용히 넘어간다.
    }
  }, []);

  return { isCopied, copy };
}
