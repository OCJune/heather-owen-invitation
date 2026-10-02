import { cn } from "@/shared/lib/utils";

export interface GuestbookMessageProps {
  /** 작성자 이름 */
  name: string;
  /** 작성일 표기 (예: "02.10") */
  date: string;
  /** 축하 메시지 본문 */
  children: React.ReactNode;
  /** 넘기면 오른쪽에 삭제(✕) 버튼을 보여준다. */
  onDelete?: () => void;
  /** 삭제 버튼의 스크린 리더용 이름 */
  deleteLabel?: string;
  className?: string;
}

/**
 * 방명록 메시지 한 건 (아래 가는 선).
 * 목록의 맨 위 굵은 선은 감싸는 쪽에서 `border-t border-strong`으로 준다.
 */
export function GuestbookMessage({
  name,
  date,
  children,
  onDelete,
  deleteLabel = "메시지 삭제",
  className,
}: GuestbookMessageProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-2 border-b border-default py-4.5",
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="typo-label-strong whitespace-nowrap text-primary">
          {name}
        </span>
        <span className="min-w-0 flex-1 typo-accent-number text-muted">
          {date}
        </span>
        {onDelete && (
          <button
            type="button"
            aria-label={deleteLabel}
            onClick={onDelete}
            className="cursor-pointer typo-caption-sans text-muted"
          >
            ✕
          </button>
        )}
      </div>
      <p className="typo-body-serif text-body">{children}</p>
    </article>
  );
}
