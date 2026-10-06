import Image from "next/image";
import type { Photo } from "@/features/gallery/api/photos";
import { cn } from "@/shared/lib/utils";
import { PhotoSlot } from "@/shared/ui/PhotoSlot/PhotoSlot";

export interface GalleryPhotoProps {
  photo: Photo;
  /** 사진이 없을 때 자리 표시에 보여줄 글자 */
  label?: string;
  /** 사진이 없을 때 라벨 아래에 보여줄 권장 크기 */
  sizeHint?: string;
  /** `next/image`의 sizes. 화면에서 차지하는 폭에 맞춰 준다. */
  sizes: string;
  /** 검정 배경 위에 놓일 때 */
  inverse?: boolean;
  /** cover: 칸을 가득 채움(잘릴 수 있음), contain: 사진 전체가 보이게 */
  fit?: "cover" | "contain";
  className?: string;
}

/** 사진 한 장. 사진이 있으면 칸을 채워 보여주고, 없으면 자리 표시를 그린다. */
export function GalleryPhoto({
  photo,
  label,
  sizeHint,
  sizes,
  inverse = false,
  fit = "cover",
  className,
}: GalleryPhotoProps) {
  return (
    <PhotoSlot
      label={label}
      sizeHint={sizeHint}
      className={cn(inverse && "bg-inverse-placeholder", className)}
    >
      {photo.src && (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          className={fit === "cover" ? "object-cover" : "object-contain"}
        />
      )}
    </PhotoSlot>
  );
}
