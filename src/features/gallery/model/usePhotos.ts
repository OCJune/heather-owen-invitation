"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { photosInfiniteQueryOptions } from "@/features/gallery/api/photoQueries";
import type { Photo } from "@/shared/types/photo";

export interface UsePhotosReturn {
  /** 지금까지 불러온 사진들 */
  photos: Photo[];
  /** 사진첩 전체 사진 수 */
  total: number;
  /** 아직 불러오지 않은 사진이 남았는지 */
  hasMore: boolean;
  /** 다음 묶음을 불러오는 중인지 */
  isLoadingMore: boolean;
  /** 다음 묶음을 불러온다. 불러오는 중이거나 더 없으면 아무 일도 하지 않는다. */
  loadMore: () => Promise<void>;
}

/**
 * 사진을 한 묶음씩 이어서 불러오는 훅.
 * 첫 묶음은 서버에서 미리 가져와 `HydrationBoundary`로 넘겨받는다.
 */
export function usePhotos(): UsePhotosReturn {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(photosInfiniteQueryOptions());

  const photos = useMemo(
    () => data.pages.flatMap((page) => page.photos),
    [data.pages],
  );

  const loadMore = useCallback(async () => {
    if (!hasNextPage || isFetchingNextPage) return;
    await fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    photos,
    total: data.pages[0].total,
    hasMore: hasNextPage,
    isLoadingMore: isFetchingNextPage,
    loadMore,
  };
}
