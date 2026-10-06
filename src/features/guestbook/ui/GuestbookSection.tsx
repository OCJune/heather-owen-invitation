import { getGuestbookEntries } from "@/features/guestbook/api/guestbookApi";
import type { Dictionary } from "@/shared/i18n/ko";
import type { Locale } from "@/shared/types/locale";
import { SectionHeader } from "@/shared/ui/SectionHeader/SectionHeader";
import { GuestbookBoard } from "./GuestbookBoard";

export interface GuestbookSectionProps {
  locale: Locale;
  dict: Dictionary["guestbook"];
  closeLabel: string;
}

/** 방명록: 축하 메시지 목록과 작성 · 삭제 */
export async function GuestbookSection({
  locale,
  dict,
  closeLabel,
}: GuestbookSectionProps) {
  const entries = await getGuestbookEntries(locale);

  return (
    <section className="flex flex-col px-gutter py-section-y">
      <SectionHeader
        number={dict.number}
        title={dict.title}
        subtitle={dict.subtitle}
      />

      <p className="mt-9 mb-7 typo-body-serif leading-normal text-body">
        {dict.intro}
      </p>
      <GuestbookBoard
        initialEntries={entries}
        dict={dict}
        closeLabel={closeLabel}
      />
    </section>
  );
}
