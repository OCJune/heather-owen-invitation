"use client";

import type { ImageLoaderProps } from "next/image";

const CLOUDINARY_UPLOAD_PATH = "/image/upload/";

/**
 * `next/image`가 쓰는 이미지 주소 생성기. (`next.config.ts`의 `images.loaderFile`)
 * Cloudinary 사진은 화면 폭에 맞는 크기 · 브라우저에 맞는 형식으로 받아 오고,
 * 그 밖의 주소는 그대로 쓴다.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (
    !src.includes("res.cloudinary.com") ||
    !src.includes(CLOUDINARY_UPLOAD_PATH)
  ) {
    return src;
  }

  const transform = `f_auto,q_${quality ?? "auto"},c_limit,w_${width}`;
  return src.replace(
    CLOUDINARY_UPLOAD_PATH,
    `${CLOUDINARY_UPLOAD_PATH}${transform}/`,
  );
}
