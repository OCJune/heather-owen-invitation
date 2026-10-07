import { queryOptions } from "@tanstack/react-query";
import { getGuestbookEntries } from "./guestbookApi";

/**
 * 방명록 메시지 목록 쿼리 설정.
 * 서버의 미리 가져오기(prefetch)와 브라우저의 `useSuspenseQuery`가 같은 설정을 쓴다.
 */
export const guestbookEntriesQueryOptions = () =>
  queryOptions({
    queryKey: ["guestbook", "entries"],
    queryFn: getGuestbookEntries,
  });
