import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import type { Photo } from "@/shared/types/photo";
import { PhotoSlot } from "@/shared/ui/PhotoSlot/PhotoSlot";

export interface GalleryPhotoProps {
  photo: Photo;
  /** `next/image`의 sizes. 화면에서 차지하는 폭에 맞춰 준다. */
  sizes: string;
  /** 검정 배경 위에 놓일 때 */
  inverse?: boolean;
  /** cover: 칸을 가득 채움(잘릴 수 있음), contain: 사진 전체가 보이게 */
  fit?: "cover" | "contain";
  className?: string;
}

/** 사진 한 장. 칸 크기에 맞춰 보여준다. */
export function GalleryPhoto({
  photo,
  sizes,
  inverse = false,
  fit = "cover",
  className,
}: GalleryPhotoProps) {
  return (
    <PhotoSlot className={cn(inverse && "bg-inverse-placeholder", className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        className={fit === "cover" ? "object-cover" : "object-contain"}
      />
    </PhotoSlot>
  );
}
