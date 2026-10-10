"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/shared/lib/utils";

const VARIANT_CLASS = {
  /** 화면 가운데 뜨는 창 */
  center: "m-auto w-[calc(100%-3rem)] max-w-85.5",
  /** 아래에서 올라오는 창 */
  sheet: "mx-auto mt-auto mb-0 w-full max-w-invitation",
  /** 화면을 가득 채우는 창 */
  full: "mx-auto my-0 h-dvh w-full max-w-invitation",
} as const;

export interface ModalProps {
  /** 열림 여부 */
  open: boolean;
  /** 닫아야 할 때 호출된다 (바깥 누름, Esc, 닫기 버튼). */
  onClose: () => void;
  /** center: 가운데 창, sheet: 아래에서 올라오는 창, full: 전체 화면 */
  variant?: keyof typeof VARIANT_CLASS;
  /** 스크린 리더에 읽어줄 창 이름 */
  ariaLabel: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * 공용 모달. `<dialog>`를 써서 포커스 가두기 · Esc 닫기 · 뒤 화면 가리기를 브라우저에 맡긴다.
 * 닫혀 있을 때는 children을 그리지 않으므로, 다시 열면 안쪽 상태가 처음으로 돌아간다.
 */
export function Modal({
  open,
  onClose,
  variant = "center",
  ariaLabel,
  className,
  children,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === ref.current) onClose();
  };

  return (
    <dialog
      ref={ref}
      aria-label={ariaLabel}
      onClose={onClose}
      onClick={handleBackdropClick}
      className={cn(
        "max-h-dvh overflow-hidden bg-page p-0 text-left text-primary backdrop:bg-scrim/60",
        VARIANT_CLASS[variant],
        className,
      )}
    >
      {open && children}
    </dialog>
  );
}
