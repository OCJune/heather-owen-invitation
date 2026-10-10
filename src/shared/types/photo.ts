/** 사진이 놓이는 자리. 노션 사진 DB의 "위치" 속성과 짝을 이룬다. */
export type PhotoPlacement = "cover" | "gallery" | "map" | "closing";

export interface Photo {
  id: string;
  /** 사진 주소 (Cloudinary) */
  src: string;
  /** 사진 설명 (스크린 리더용) */
  alt: string;
}
