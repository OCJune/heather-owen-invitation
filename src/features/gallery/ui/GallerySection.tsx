import { getPhotos } from "@/features/gallery/api/photos";
import type { Dictionary } from "@/shared/i18n/ko";
import { SectionHeader } from "@/shared/ui/SectionHeader/SectionHeader";
import { GalleryBoard } from "./GalleryBoard";

export interface GallerySectionProps {
  dict: Dictionary["gallery"];
  closeLabel: string;
}

/** 사진첩: 사진 미리보기와 전체 보기 · 크게 보기 */
export async function GallerySection({
  dict,
  closeLabel,
}: GallerySectionProps) {
  const photos = await getPhotos();

  return (
    <section className="flex flex-col px-gutter py-section-y">
      <SectionHeader
        number={dict.number}
        title={dict.title}
        subtitle={dict.subtitle}
      />
      <div className="mt-9 flex flex-col">
        <GalleryBoard photos={photos} dict={dict} closeLabel={closeLabel} />
      </div>
    </section>
  );
}
