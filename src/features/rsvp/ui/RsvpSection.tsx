import type { Dictionary } from "@/shared/i18n/ko";
import { RsvpFlow } from "./RsvpFlow";

export interface RsvpSectionProps {
  dict: Dictionary["rsvp"];
  closeLabel: string;
}

/** 참석 의사 전달 안내 카드. 버튼을 누르면 안내 창과 입력 폼이 차례로 열린다. */
export function RsvpSection({ dict, closeLabel }: RsvpSectionProps) {
  return (
    <section className="px-gutter">
      <div className="flex flex-col items-center border border-strong px-7 pt-11 pb-8 text-center">
        <p className="typo-eyebrow-en-large text-tertiary">{dict.eyebrow}</p>
        <h2 className="mt-2 typo-heading-ko-card text-primary">
          {dict.cardTitle}
        </h2>
        <p className="mt-4 typo-body-serif leading-[1.9] whitespace-pre-line text-secondary">
          {dict.cardBody}
        </p>
        <RsvpFlow dict={dict} closeLabel={closeLabel} />
      </div>
    </section>
  );
}
