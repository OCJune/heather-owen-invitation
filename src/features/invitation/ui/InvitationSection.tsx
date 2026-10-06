import type { Dictionary } from "@/shared/i18n/ko";
import { SectionHeader } from "@/shared/ui/SectionHeader/SectionHeader";

export interface InvitationSectionProps {
  dict: Dictionary["invitation"];
}

/** 초대의 글과 혼주 표 */
export function InvitationSection({ dict }: InvitationSectionProps) {
  return (
    <section className="flex flex-col px-gutter py-section-y">
      <SectionHeader
        number={dict.number}
        title={dict.title}
        subtitle={dict.subtitle}
      />

      <p className="mt-9 typo-body-serif-large whitespace-pre-line text-body">
        {dict.message}
      </p>

      <dl className="mt-10 border-t border-strong">
        {dict.family.map((member) => (
          <div
            key={member.role}
            className="flex items-center border-b border-default py-4 leading-normal"
          >
            <dt className="w-18 shrink-0 typo-eyebrow-en leading-normal text-tertiary">
              {member.role}
            </dt>
            <dd className="flex w-21 shrink-0 flex-col typo-heading-ko-name leading-normal text-primary">
              {member.name}
              {member.nameNote && (
                <span className="typo-numeral-small font-normal tracking-normal text-tertiary italic">
                  {member.nameNote}
                </span>
              )}
            </dd>
            <dd className="min-w-0 flex-1 text-right typo-body-sans-small leading-normal whitespace-pre-line text-tertiary">
              {member.parents}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
