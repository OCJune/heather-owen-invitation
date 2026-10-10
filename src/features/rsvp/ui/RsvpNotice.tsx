"use client";

import { setSkipNotice } from "@/features/rsvp/lib/skipNotice";
import type { Dictionary } from "@/shared/i18n/ko";
import { Button } from "@/shared/ui/Button/Button";
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox";
import { Icon } from "@/shared/ui/Icon/Icon";
import { SummaryRow } from "@/shared/ui/SummaryRow/SummaryRow";

export interface RsvpNoticeProps {
  dict: Dictionary["rsvp"];
  closeLabel: string;
  onNext: () => void;
  onClose: () => void;
}

/** 참석 의사 1단계: 안내 문구와 예식 요약 */
export function RsvpNotice({
  dict,
  closeLabel,
  onNext,
  onClose,
}: RsvpNoticeProps) {
  const { notice } = dict;

  return (
    <div className="flex flex-col px-7 pt-7 pb-6">
      <div className="flex items-start justify-between">
        <p className="typo-eyebrow-en-large text-tertiary">{dict.eyebrow}</p>
        <button
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
          className="flex cursor-pointer text-icon-primary"
        >
          <Icon name="close" size={20} />
        </button>
      </div>

      <h2 className="mt-3.5 typo-heading-ko-large whitespace-pre-line text-primary">
        {notice.title}
      </h2>
      <p className="mt-3.5 typo-body-sans leading-[1.8] whitespace-pre-line text-secondary">
        {notice.body}
      </p>

      <div className="mt-6 border-t border-strong">
        {notice.summary.map(({ label, value }) => (
          <SummaryRow key={label} label={label}>
            <span className="whitespace-pre-line">{value}</span>
          </SummaryRow>
        ))}
      </div>

      <Button showIcon onClick={onNext} className="mt-7 w-full">
        {notice.next}
      </Button>
      <Checkbox
        onChange={(event) => setSkipNotice(event.target.checked)}
        className="mt-3.5 self-start"
        labelClassName="typo-body-sans-small text-muted"
      >
        {notice.skipToday}
      </Checkbox>
    </div>
  );
}
