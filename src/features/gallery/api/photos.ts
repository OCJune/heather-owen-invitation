"use server";

import { getPhotosByPlacement } from "@/shared/api/photos";
import type { Photo } from "@/shared/types/photo";

export interface PhotoPage {
  /** 이번에 가져온 사진들 (순서대로) */
  photos: Photo[];
  /** 다음 묶음을 가져올 때 넘길 값. 더 없으면 null이다. */
  nextCursor: string | null;
  /** 사진첩 전체 사진 수 */
  total: number;
}

export interface GetPhotosOptions {
  /** 이전 응답의 `nextCursor`. 생략하면 처음부터 가져온다. */
  cursor?: string | null;
  /** 한 번에 가져올 사진 수 */
  limit?: number;
}

/** 한 번에 가져오는 사진 수 (3열 × 4줄) */
const PHOTO_PAGE_SIZE = 12;
const PHOTO_PAGE_SIZE_MAX = 48;

/**
 * 사진첩 사진을 순서대로 한 묶음씩 가져온다.
 * 노션 사진 DB에서 "위치"가 사진첩이고 공개된 사진이 대상이다.
 */
export async function getPhotos({
  cursor = null,
  limit = PHOTO_PAGE_SIZE,
}: GetPhotosOptions = {}): Promise<PhotoPage> {
  const all = await getPhotosByPlacement("gallery");

  // 브라우저에서 직접 부를 수 있는 함수이므로 값의 범위를 다시 확인한다.
  const start = Math.max(0, Math.trunc(Number(cursor ?? 0)) || 0);
  const size = Math.min(
    Math.max(1, Math.trunc(Number(limit)) || PHOTO_PAGE_SIZE),
    PHOTO_PAGE_SIZE_MAX,
  );
  const end = Math.min(start + size, all.length);

  return {
    photos: all.slice(start, end),
    nextCursor: end < all.length ? String(end) : null,
    total: all.length,
  };
}
