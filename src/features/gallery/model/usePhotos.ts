"use client";

import { useCallback, useRef, useState } from "react";
import {
  getPhotos,
  type Photo,
  type PhotoPage,
} from "@/features/gallery/api/photos";

export interface UsePhotosReturn {
  /** 지금까지 불러온 사진들 */
  photos: Photo[];
  /** 사진첩 전체 사진 수 */
  total: number;
  /** 아직 불러오지 않은 사진이 남았는지 */
  hasMore: boolean;
  isLoading: boolean;
  /** 다음 묶음을 불러온다. 불러오는 중이거나 더 없으면 아무 일도 하지 않는다. */
  loadMore: () => Promise<void>;
}

/** 사진을 한 묶음씩 이어서 불러오는 상태를 관리하는 훅 */
export function usePhotos(initialPage: PhotoPage): UsePhotosReturn {
  const [photos, setPhotos] = useState(initialPage.photos);
  const [nextCursor, setNextCursor] = useState(initialPage.nextCursor);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || nextCursor === null) return;

    isLoadingRef.current = true;
    setIsLoading(true);
    try {
      const page = await getPhotos({ cursor: nextCursor });
      setPhotos((prev) => [...prev, ...page.photos]);
      setNextCursor(page.nextCursor);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [nextCursor]);

  return {
    photos,
    total: initialPage.total,
    hasMore: nextCursor !== null,
    isLoading,
    loadMore,
  };
}
