"use client";

import { useState } from "react";
import type { GuestbookEntry } from "@/features/guestbook/api/guestbookApi";
import type { Dictionary } from "@/shared/i18n/ko";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/Button/Button";
import { Modal } from "@/shared/ui/Modal/Modal";
import { GuestbookDeleteDialog } from "./GuestbookDeleteDialog";
import { GuestbookMessage } from "./GuestbookMessage";
import { GuestbookWriteSheet } from "./GuestbookWriteSheet";

/** 한 쪽에 보여주는 메시지 수 */
const PAGE_SIZE = 3;

export interface GuestbookBoardProps {
  /** 처음 보여줄 메시지 (최신순) */
  initialEntries: GuestbookEntry[];
  dict: Dictionary["guestbook"];
  closeLabel: string;
}

/** 방명록 목록과 쪽 넘김, 거기서 열리는 작성 창 · 삭제 확인 창 */
export function GuestbookBoard({
  initialEntries,
  dict,
  closeLabel,
}: GuestbookBoardProps) {
  const [entries, setEntries] = useState(initialEntries);
  const [page, setPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const pageCount = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleEntries = isExpanded
    ? entries
    : entries.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleCreated = (entry: GuestbookEntry) => {
    setEntries((prev) => [entry, ...prev]);
    setPage(1);
    setIsWriting(false);
  };

  const handleDeleted = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    setDeletingId(null);
  };

  return (
    <>
      <div className="border-t border-strong">
        {visibleEntries.map((entry) => (
          <GuestbookMessage
            key={entry.id}
            name={entry.name}
            date={entry.date}
            deleteLabel={dict.deleteMessage}
            onDelete={() => setDeletingId(entry.id)}
          >
            {entry.message}
          </GuestbookMessage>
        ))}
        {entries.length === 0 && (
          <p className="border-b border-default py-8 text-center typo-body-serif text-tertiary">
            {dict.empty}
          </p>
        )}
      </div>

      {!isExpanded && pageCount > 1 && (
        <nav className="mt-4 flex items-start justify-center gap-4 typo-numeral-small tracking-normal">
          <button
            type="button"
            aria-label={dict.prevPage}
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
            className="cursor-pointer text-muted disabled:cursor-default disabled:opacity-40"
          >
            ←
          </button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map(
            (number) => (
              <button
                key={number}
                type="button"
                aria-current={number === currentPage ? "page" : undefined}
                onClick={() => setPage(number)}
                className={cn(
                  "cursor-pointer",
                  number === currentPage ? "text-primary" : "text-muted",
                )}
              >
                {number}
              </button>
            ),
          )}
          <button
            type="button"
            aria-label={dict.nextPage}
            disabled={currentPage === pageCount}
            onClick={() => setPage(currentPage + 1)}
            className="cursor-pointer text-muted disabled:cursor-default disabled:opacity-40"
          >
            →
          </button>
        </nav>
      )}

      <div className="mt-7 flex gap-2">
        <Button
          variant="secondary"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex-1"
        >
          {isExpanded ? dict.collapse : dict.viewAll}
        </Button>
        <Button onClick={() => setIsWriting(true)} className="flex-1">
          {dict.write}
        </Button>
      </div>

      <Modal
        open={isWriting}
        onClose={() => setIsWriting(false)}
        variant="sheet"
        ariaLabel={dict.sheet.subtitle}
      >
        <GuestbookWriteSheet
          dict={dict.sheet}
          closeLabel={closeLabel}
          onCreated={handleCreated}
          onClose={() => setIsWriting(false)}
        />
      </Modal>
      <Modal
        open={deletingId !== null}
        onClose={() => setDeletingId(null)}
        ariaLabel={dict.remove.title}
        className="max-w-83.5"
      >
        {deletingId !== null && (
          <GuestbookDeleteDialog
            entryId={deletingId}
            dict={dict.remove}
            onDeleted={handleDeleted}
            onClose={() => setDeletingId(null)}
          />
        )}
      </Modal>
    </>
  );
}
