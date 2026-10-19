import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 사진은 Cloudinary가 크기 · 형식을 맞춰 준다. (Next.js 이미지 최적화를 거치지 않는다)
  images: {
    loader: "custom",
    loaderFile: "./src/shared/lib/imageLoader.ts",
  },
  // 처음 배포할 때 노션 사진을 Cloudinary로 복사하느라 페이지 생성이 오래 걸릴 수 있다. (기본 60초)
  staticPageGenerationTimeout: 300,
  // 한국어 청첩장은 주소에 언어를 붙이지 않고 `/`로 연다. (영어는 `/en`)
  rewrites() {
    return [{ source: "/", destination: "/ko" }];
  },
};

export default nextConfig;
