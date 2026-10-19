"use client";

import { useId } from "react";
import { cn } from "@/shared/lib/utils";

export interface AccountGroupProps {
  /** 묶음 제목 (예: "신랑측 계좌") */
  title: string;
  /** 펼쳐져 있는지 */
  isOpen: boolean;
  /** 제목 줄을 눌렀을 때 호출된다. */
  onToggle: () => void;
  /** 펼쳤을 때 보여줄 계좌 줄 (`AccountRow`) */
  children: React.ReactNode;
  className?: string;
}

/**
 * 계좌 묶음 펼치기. 제목 줄을 누르면 계좌 목록이 서서히 열리고 닫힌다 (+ / −).
 * 여러 묶음을 이어 놓을 때 맨 위 굵은 선은 감싸는 쪽에서 `border-t border-strong`으로 준다.
 * 어느 묶음을 펼칠지는 `AccountAccordion`이 정한다.
 */
export function AccountGroup({
  title,
  isOpen,
  onToggle,
  children,
  className,
}: AccountGroupProps) {
  const contentId = useId();

  return (
    <div className={cn("border-b border-default", className)}>
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between py-4.5 text-primary"
        >
          <span className="typo-heading-ko-small">{title}</span>
          <span aria-hidden="true" className="typo-accent-toggle">
            {isOpen ? "−" : "+"}
          </span>
        </button>
      </h3>
      {/* 행 높이를 0fr ↔ 1fr로 바꿔 내용 높이만큼 서서히 펼친다. */}
      <div
        id={contentId}
        role="region"
        aria-label={title}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div inert={!isOpen} className="overflow-hidden">
          <div className="flex flex-col divide-y divide-default">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
