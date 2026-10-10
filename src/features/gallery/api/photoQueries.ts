import { infiniteQueryOptions } from "@tanstack/react-query";
import { getPhotos } from "./photos";

/**
 * 사진첩 사진을 한 묶음씩 이어서 가져오는 쿼리 설정.
 * 서버의 미리 가져오기(prefetch)와 브라우저의 `useSuspenseInfiniteQuery`가 같은 설정을 쓴다.
 */
export const photosInfiniteQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: ["gallery", "photos"],
    queryFn: ({ pageParam }) => getPhotos({ cursor: pageParam }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
