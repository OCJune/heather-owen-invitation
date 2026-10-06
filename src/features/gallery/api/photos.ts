export interface Photo {
  id: string;
  /** 사진 주소. 아직 사진이 없으면 null이고, 화면에는 회색 자리 표시가 나온다. */
  src: string | null;
  /** 사진 설명 (스크린 리더용) */
  alt: string;
}

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
export const PHOTO_PAGE_SIZE = 12;

const MOCK_PHOTO_COUNT = 21;
const MOCK_DELAY_MS = 400;

/**
 * 사진첩 사진을 순서대로 한 묶음씩 가져온다.
 *
 * 지금은 예시 데이터다. 노션 연동 이슈에서 이 함수 안을 서버 호출로 바꾸고,
 * 함수의 모양(인자 · 반환값)은 그대로 둔다.
 */
export async function getPhotos({
  cursor = null,
  limit = PHOTO_PAGE_SIZE,
}: GetPhotosOptions = {}): Promise<PhotoPage> {
  // 이어서 불러올 때만 서버 응답을 기다리는 시간을 흉내 낸다.
  if (cursor !== null) {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  }

  const start = cursor === null ? 0 : Number(cursor);
  const end = Math.min(start + limit, MOCK_PHOTO_COUNT);

  return {
    photos: Array.from({ length: end - start }, (_, offset) => ({
      id: `mock-${start + offset + 1}`,
      src: null,
      alt: "",
    })),
    nextCursor: end < MOCK_PHOTO_COUNT ? String(end) : null,
    total: MOCK_PHOTO_COUNT,
  };
}
