import { notFound } from "next/navigation";
import { ClosingSection } from "@/features/closing/ui/ClosingSection";
import { CoverSection } from "@/features/cover/ui/CoverSection";
import { GallerySection } from "@/features/gallery/ui/GallerySection";
import { GiftSection } from "@/features/gift/ui/GiftSection";
import { GuestbookSection } from "@/features/guestbook/ui/GuestbookSection";
import { InvitationSection } from "@/features/invitation/ui/InvitationSection";
import { LocationSection } from "@/features/location/ui/LocationSection";
import { RsvpSection } from "@/features/rsvp/ui/RsvpSection";
import { TheDaySection } from "@/features/the-day/ui/TheDaySection";
import { getDictionary } from "@/shared/i18n/getDictionary";
import { isLocale } from "@/shared/types/locale";

/** 청첩장 본문. 섹션을 Figma 순서대로 조립한다. */
export default async function InvitationPage({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const closeLabel = dict.common.close;

  return (
    <main className="mx-auto w-full max-w-invitation bg-page">
      <CoverSection locale={locale} dict={dict.cover} />
      <InvitationSection dict={dict.invitation} />
      <TheDaySection dict={dict.theDay} />
      <GallerySection dict={dict.gallery} closeLabel={closeLabel} />
      <LocationSection dict={dict.location} common={dict.common} />
      <RsvpSection dict={dict.rsvp} closeLabel={closeLabel} />
      <GiftSection locale={locale} dict={dict.gift} common={dict.common} />
      <GuestbookSection dict={dict.guestbook} closeLabel={closeLabel} />
      <ClosingSection
        dict={dict.closing}
        common={dict.common}
        shareTitle={dict.meta.title}
      />
    </main>
  );
}
