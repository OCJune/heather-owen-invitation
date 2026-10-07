"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  createGuestbookEntry,
  deleteGuestbookEntry,
} from "@/features/guestbook/api/guestbookApi";
import { guestbookEntriesQueryOptions } from "@/features/guestbook/api/guestbookQueries";

/**
 * 방명록 메시지 목록 (최신순).
 * 처음 목록은 서버에서 미리 가져와 `HydrationBoundary`로 넘겨받는다.
 */
export function useGuestbookEntries() {
  return useSuspenseQuery(guestbookEntriesQueryOptions());
}

/** 방명록 메시지 작성. 성공하면 목록을 다시 가져온다. */
export function useCreateGuestbookEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGuestbookEntry,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: guestbookEntriesQueryOptions().queryKey,
      }),
  });
}

/**
 * 방명록 메시지 삭제. 결과는 비밀번호가 맞아 지워졌는지 여부다.
 * 지워졌으면 목록을 다시 가져온다.
 */
export function useDeleteGuestbookEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGuestbookEntry,
    onSuccess: (isDeleted) => {
      if (!isDeleted) return;
      return queryClient.invalidateQueries({
        queryKey: guestbookEntriesQueryOptions().queryKey,
      });
    },
  });
}
