"use client";

import { useEffect, useRef } from "react";
import type { Photo } from "@/features/gallery/api/photos";
import type { Dictionary } from "@/shared/i18n/ko";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Modal } from "@/shared/ui/Modal/Modal";
import { GalleryPhoto } from "./GalleryPhoto";

/** 이 거리(px)보다 길게 밀어야 사진이 넘어간다. */
const SWIPE_THRESHOLD = 40;

const pad = (value: number) => String(value).padStart(2, "0");

export interface PhotoViewerProps {
  photos: Photo[];
  /** 보고 있는 사진의 순번(0부터). null이면 닫힌 상태다. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  dict: Dictionary["gallery"];
  closeLabel: string;
}

/** 사진 크게 보기. 좌우로 밀거나 PREV / NEXT, 방향키로 넘긴다. */
export function PhotoViewer({
  photos,
  index,
  onIndexChange,
  onClose,
  dict,
  closeLabel,
}: PhotoViewerProps) {
  const touchStartX = useRef<number | null>(null);
  const isOpen = index !== null;
  const current = index ?? 0;

  const move = (step: number) => {
    onIndexChange((current + step + photos.length) % photos.length);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < SWIPE_THRESHOLD) return;
    move(distance < 0 ? 1 : -1);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      variant="full"
      ariaLabel={dict.title}
      className="bg-inverse"
    >
      <div className="flex h-full flex-col">
        <div className="flex h-18 shrink-0 items-center justify-between pt-4 pr-5 pl-gutter">
          <p className="typo-numeral-small tracking-[0.1em] text-on-inverse">
            {pad(current + 1)} / {pad(photos.length)}
          </p>
          <button
            type="button"
            aria-label={closeLabel}
            onClick={onClose}
            className="flex cursor-pointer text-on-inverse"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-center gap-7 pb-8.5">
          <div
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0].clientX;
            }}
            onTouchEnd={handleTouchEnd}
          >
            <GalleryPhoto
              photo={photos[current]}
              label={`PHOTO ${pad(current + 1)}`}
              sizeHint="390 × 520"
              sizes="(max-width: 390px) 100vw, 390px"
              fit="contain"
              inverse
              className="aspect-3/4 max-h-[calc(100dvh-13rem)] w-full"
            />
          </div>

          <div className="flex items-center justify-between px-gutter">
            <button
              type="button"
              onClick={() => move(-1)}
              className="flex cursor-pointer items-center gap-2 typo-eyebrow-en text-on-inverse-tertiary"
            >
              <Icon
                name="arrow-right"
                size={20}
                className="rotate-180 text-on-inverse"
              />
              {dict.prev}
            </button>
            <p className="typo-caption-sans text-on-inverse-muted">
              {dict.swipeHint}
            </p>
            <button
              type="button"
              onClick={() => move(1)}
              className="flex cursor-pointer items-center gap-2 typo-eyebrow-en text-on-inverse-tertiary"
            >
              {dict.next}
              <Icon name="arrow-right" size={20} className="text-on-inverse" />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
