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
  // 첫 묶음만 서버에서 가져오고, 나머지는 전체 보기에서 스크롤할 때 이어서 불러온다.
  const initialPage = await getPhotos();

  return (
    <section className="flex flex-col px-gutter py-section-y">
      <SectionHeader
        number={dict.number}
        title={dict.title}
        subtitle={dict.subtitle}
      />
      <div className="mt-9 flex flex-col">
        <GalleryBoard
          initialPage={initialPage}
          dict={dict}
          closeLabel={closeLabel}
        />
      </div>
    </section>
  );
}
