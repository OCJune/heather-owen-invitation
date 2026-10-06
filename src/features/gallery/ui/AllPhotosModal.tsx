"use client";

import type { Photo } from "@/features/gallery/api/photos";
import type { Dictionary } from "@/shared/i18n/ko";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Modal } from "@/shared/ui/Modal/Modal";
import { GalleryPhoto } from "./GalleryPhoto";

export interface AllPhotosModalProps {
  photos: Photo[];
  open: boolean;
  onClose: () => void;
  /** 사진을 눌렀을 때 호출된다. 순번은 0부터다. */
  onSelect: (index: number) => void;
  dict: Dictionary["gallery"];
  closeLabel: string;
}

/** 사진 전체 보기. 3열 목록을 세로로 스크롤한다. */
export function AllPhotosModal({
  photos,
  open,
  onClose,
  onSelect,
  dict,
  closeLabel,
}: AllPhotosModalProps) {
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
              {dict.allCount.replace("{count}", String(photos.length))}
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

        <ul className="grid min-h-0 flex-1 grid-cols-3 content-start gap-2 overflow-y-auto scrollbar-none px-gutter pt-5 pb-12">
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
                  label={String(index + 1).padStart(2, "0")}
                  sizes="120px"
                  className="aspect-square w-full"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}
