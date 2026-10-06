"use client";

import { useState } from "react";
import type { Photo } from "@/features/gallery/api/photos";
import type { Dictionary } from "@/shared/i18n/ko";
import { cn } from "@/shared/lib/utils";
import { AllPhotosModal } from "./AllPhotosModal";
import { GalleryPhoto } from "./GalleryPhoto";
import { PhotoViewer } from "./PhotoViewer";

/** 본문에 미리 보여주는 사진 칸. 순서대로 사진이 채워진다. */
const PREVIEW_SLOTS = [
  { className: "col-span-2 h-105", sizeHint: "334 × 420", sizes: "334px" },
  { className: "row-span-2 h-60", sizeHint: "163 × 240", sizes: "163px" },
  { className: "h-29", sizeHint: "163 × 116", sizes: "163px" },
  { className: "h-29", sizeHint: "163 × 116", sizes: "163px" },
  { className: "col-span-2 h-50", sizeHint: "334 × 200", sizes: "334px" },
  { className: "aspect-square", sizeHint: "163 × 163", sizes: "163px" },
  { className: "aspect-square", sizeHint: "163 × 163", sizes: "163px" },
];

export interface GalleryBoardProps {
  photos: Photo[];
  dict: Dictionary["gallery"];
  closeLabel: string;
}

/** 사진첩 본문의 미리보기와, 거기서 열리는 전체 보기 · 크게 보기 */
export function GalleryBoard({ photos, dict, closeLabel }: GalleryBoardProps) {
  const [isAllOpen, setIsAllOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const previews = photos.slice(0, PREVIEW_SLOTS.length);

  return (
    <>
      <ul className="grid grid-cols-2 gap-2">
        {previews.map((photo, index) => {
          const slot = PREVIEW_SLOTS[index];

          return (
            <li key={photo.id} className={cn("flex", slot.className)}>
              <button
                type="button"
                aria-label={dict.openPhoto.replace(
                  "{index}",
                  String(index + 1),
                )}
                onClick={() => setViewerIndex(index)}
                className="flex-1 cursor-pointer"
              >
                <GalleryPhoto
                  photo={photo}
                  sizeHint={slot.sizeHint}
                  sizes={slot.sizes}
                  className="size-full"
                />
              </button>
            </li>
          );
        })}
      </ul>

      {photos.length > previews.length && (
        <button
          type="button"
          onClick={() => setIsAllOpen(true)}
          className="mt-5 flex cursor-pointer items-center gap-2 self-end text-primary"
        >
          <span className="typo-label-small">{dict.more}</span>
          <span aria-hidden="true" className="typo-accent-arrow">
            →
          </span>
        </button>
      )}

      <AllPhotosModal
        photos={photos}
        open={isAllOpen}
        onClose={() => setIsAllOpen(false)}
        onSelect={setViewerIndex}
        dict={dict}
        closeLabel={closeLabel}
      />
      <PhotoViewer
        photos={photos}
        index={viewerIndex}
        onIndexChange={setViewerIndex}
        onClose={() => setViewerIndex(null)}
        dict={dict}
        closeLabel={closeLabel}
      />
    </>
  );
}
