"use client";

import { useState } from "react";
import { usePhotos } from "@/features/gallery/model/usePhotos";
import type { Dictionary } from "@/shared/i18n/ko";
import { cn } from "@/shared/lib/utils";
import { PhotoSlot } from "@/shared/ui/PhotoSlot/PhotoSlot";
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
  dict: Dictionary["gallery"];
  closeLabel: string;
}

/** 사진첩 본문의 미리보기와, 거기서 열리는 전체 보기 · 크게 보기 */
export function GalleryBoard({ dict, closeLabel }: GalleryBoardProps) {
  const { photos, total, hasMore, loadMore } = usePhotos();
  const [isAllOpen, setIsAllOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const previews = photos.slice(0, PREVIEW_SLOTS.length);

  /*
   * 크게 보기에서 사진을 넘긴다.
   * 불러온 마지막 사진에서 다음으로 넘기면 다음 묶음을 불러온 뒤 넘어간다.
   * 처음과 끝은 서로 이어지되, 아직 다 불러오지 않았으면 처음에서 이전으로는 가지 않는다.
   */
  const handleMove = async (step: -1 | 1) => {
    if (viewerIndex === null) return;
    const next = viewerIndex + step;

    if (next >= photos.length) {
      if (hasMore) {
        // 불러오지 못했으면 지금 사진에 머문다.
        if (await loadMore()) setViewerIndex(next);
      } else {
        setViewerIndex(0);
      }
      return;
    }
    if (next < 0) {
      if (!hasMore) setViewerIndex(photos.length - 1);
      return;
    }
    setViewerIndex(next);
  };

  return (
    <>
      <ul className="grid grid-cols-2 gap-2">
        {/* 아직 공개된 사진이 없으면 자리 표시를 보여준다. */}
        {previews.length === 0 &&
          PREVIEW_SLOTS.map((slot, index) => (
            <li key={index} className={cn("flex", slot.className)}>
              <PhotoSlot sizeHint={slot.sizeHint} className="flex-1" />
            </li>
          ))}
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
                  sizes={slot.sizes}
                  className="size-full"
                />
              </button>
            </li>
          );
        })}
      </ul>

      {total > previews.length && (
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
        total={total}
        hasMore={hasMore}
        onLoadMore={loadMore}
        open={isAllOpen}
        onClose={() => setIsAllOpen(false)}
        onSelect={setViewerIndex}
        dict={dict}
        closeLabel={closeLabel}
      />
      <PhotoViewer
        photos={photos}
        total={total}
        index={viewerIndex}
        onMove={handleMove}
        onClose={() => setViewerIndex(null)}
        dict={dict}
        closeLabel={closeLabel}
      />
    </>
  );
}
