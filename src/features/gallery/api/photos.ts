export interface Photo {
  id: string;
  /** 사진 주소. 아직 사진이 없으면 null이고, 화면에는 회색 자리 표시가 나온다. */
  src: string | null;
  /** 사진 설명 (스크린 리더용) */
  alt: string;
}

const MOCK_PHOTO_COUNT = 21;

/**
 * 사진첩에 보여줄 사진 목록을 순서대로 가져온다.
 *
 * 지금은 예시 데이터다. 노션 연동 이슈에서 이 함수 안을 노션 DB 조회로 바꾼다.
 */
export async function getPhotos(): Promise<Photo[]> {
  return Array.from({ length: MOCK_PHOTO_COUNT }, (_, index) => ({
    id: `mock-${index + 1}`,
    src: null,
    alt: "",
  }));
}
