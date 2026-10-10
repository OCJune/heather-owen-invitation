import Image from "next/image";
import { getPhotoByPlacement } from "@/shared/api/photos";
import { WEDDING } from "@/shared/config/wedding";
import type { Dictionary } from "@/shared/i18n/ko";
import { LOCALE_HREFS, type Locale } from "@/shared/types/locale";
import { LanguageToggle } from "@/shared/ui/LanguageToggle/LanguageToggle";
import { PhotoSlot } from "@/shared/ui/PhotoSlot/PhotoSlot";

export interface CoverSectionProps {
  locale: Locale;
  dict: Dictionary["cover"];
}

/** 커버: 두 사람의 이름, 메인 사진, 예식 일시와 장소, 언어 전환 */
export async function CoverSection({ locale, dict }: CoverSectionProps) {
  const photo = await getPhotoByPlacement("cover");

  return (
    <section className="flex flex-col px-gutter pt-5 pb-12">
      <div className="flex items-center justify-between">
        <p className="typo-eyebrow-en tracking-[0.3em] text-primary">
          {dict.eyebrow}
        </p>
        <LanguageToggle active={locale} hrefs={LOCALE_HREFS} />
      </div>

      <h1 className="mt-10 flex flex-col items-center whitespace-nowrap text-primary">
        <span className="-mb-3.5 typo-display-names">
          {WEDDING.names.groom}
        </span>
        <span className="flex items-center gap-3.5">
          <span className="typo-display-ampersand">&amp;</span>
          <span className="typo-display-names">{WEDDING.names.bride}</span>
        </span>
      </h1>

      <PhotoSlot
        shape="arch"
        sizeHint="334 × 430"
        className="mt-7 h-107.5 w-full"
      >
        {photo && (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            sizes="334px"
            className="object-cover"
          />
        )}
      </PhotoSlot>

      <div className="mt-6 flex items-center justify-between typo-numeral-date-line text-primary">
        <p className="whitespace-pre">{dict.date}</p>
        <p>{dict.time}</p>
      </div>
      <hr className="my-2.5 border-strong" />
      <div className="flex items-start justify-between whitespace-nowrap">
        <p className="typo-body-serif-regular text-primary">{dict.venue}</p>
        <p className="typo-caption-sans text-tertiary">{dict.venueDetail}</p>
      </div>
    </section>
  );
}
