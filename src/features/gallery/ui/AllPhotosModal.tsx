"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/shared/i18n/ko";
import type { Photo } from "@/shared/types/photo";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Modal } from "@/shared/ui/Modal/Modal";
import { GalleryPhoto } from "./GalleryPhoto";

export interface AllPhotosModalProps {
  /** 지금까지 불러온 사진들 */
  photos: Photo[];
  /** 사진첩 전체 사진 수 */
  total: number;
  /** 아직 불러오지 않은 사진이 남았는지 */
  hasMore: boolean;
  /** 목록 끝에 닿았을 때 호출된다. */
  onLoadMore: () => void;
  open: boolean;
  onClose: () => void;
  /** 사진을 눌렀을 때 호출된다. 순번은 0부터다. */
  onSelect: (index: number) => void;
  dict: Dictionary["gallery"];
  closeLabel: string;
}

/** 사진 전체 보기. 3열 목록을 세로로 스크롤하며, 끝에 닿으면 다음 사진을 이어서 불러온다. */
export function AllPhotosModal({
  photos,
  total,
  hasMore,
  onLoadMore,
  open,
  onClose,
  onSelect,
  dict,
  closeLabel,
}: AllPhotosModalProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const sentinelRef = useRef<HTMLLIElement>(null);

  /*
   * 목록 맨 끝의 표시가 화면에 들어오면 다음 묶음을 불러온다.
   * 불러온 뒤에도 표시가 화면 안에 남아 있으면(목록이 아직 짧으면) 다시 불러온다.
   */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!open || !hasMore || !sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore();
      },
      { root: listRef.current, rootMargin: "200px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [open, hasMore, onLoadMore]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="full"
      ariaLabel={dict.allTitle}
    >
      <div className="flex h-full flex-col">
        <header className="flex h-22 shrink-0 items-center justify-between border-b border-default pt-5 pr-5 pl-gutter">
          <div className="flex flex-col gap-0.5">
            <h2 className="typo-heading-modal-en text-primary">
              {dict.allTitle}
            </h2>
            <p className="typo-caption-sans text-tertiary">
              {dict.allCount.replace("{count}", String(total))}
            </p>
          </div>
          <button
            type="button"
            aria-label={closeLabel}
            onClick={onClose}
            className="flex cursor-pointer text-icon-primary"
          >
            <Icon name="close" size={20} />
          </button>
        </header>

        <ul
          ref={listRef}
          className="grid min-h-0 flex-1 grid-cols-3 content-start gap-2 overflow-y-auto scrollbar-none px-gutter pt-5 pb-12"
        >
          {photos.map((photo, index) => (
            <li key={photo.id}>
              <button
                type="button"
                aria-label={dict.openPhoto.replace(
                  "{index}",
                  String(index + 1),
                )}
                onClick={() => onSelect(index)}
                className="block w-full cursor-pointer"
              >
                <GalleryPhoto
                  photo={photo}
                  sizes="120px"
                  className="aspect-square w-full"
                />
              </button>
            </li>
          ))}
          {hasMore && (
            <li
              ref={sentinelRef}
              role="status"
              className="col-span-3 py-6 text-center typo-caption-sans text-muted"
            >
              {dict.loading}
            </li>
          )}
        </ul>
      </div>
    </Modal>
  );
}
