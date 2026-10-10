import Image from "next/image";
import { getPhotoByPlacement } from "@/shared/api/photos";
import { WEDDING } from "@/shared/config/wedding";
import type { Dictionary } from "@/shared/i18n/ko";
import { PhotoSlot } from "@/shared/ui/PhotoSlot/PhotoSlot";
import { ShareButtons } from "./ShareButtons";

export interface ClosingSectionProps {
  dict: Dictionary["closing"];
  common: Dictionary["common"];
  /** 공유할 때 함께 보내는 제목 */
  shareTitle: string;
}

/** 마무리: 사진, 감사 인사, 공유 버튼, 맨 아래 줄 */
export async function ClosingSection({
  dict,
  common,
  shareTitle,
}: ClosingSectionProps) {
  const photo = await getPhotoByPlacement("closing");

  return (
    <section className="flex flex-col px-gutter pb-10">
      <PhotoSlot sizeHint="334 × 240" className="h-60 w-full">
        {photo && (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="334px"
            className="object-cover"
          />
        )}
      </PhotoSlot>

      <h2 className="mt-10 typo-accent-script text-primary">{dict.heading}</h2>
      <p className="mt-4 typo-body-serif whitespace-pre-line text-body">
        {dict.body}
      </p>
      <p className="mt-4.5 typo-body-serif-regular text-primary">{dict.sign}</p>

      <div className="mt-10">
        <ShareButtons
          title={shareTitle}
          shareLabel={dict.shareKakao}
          copyLabel={dict.copyLink}
          copiedLabel={common.copied}
        />
      </div>

      <footer className="mt-12 flex items-start justify-between border-t border-default pt-4 typo-eyebrow-en-small whitespace-nowrap text-muted">
        <p className="tracking-[0.3em]">{WEDDING.names.footer}</p>
        <p>{dict.footerDate}</p>
      </footer>
    </section>
  );
}
