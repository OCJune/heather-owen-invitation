import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 사진은 Cloudinary가 크기 · 형식을 맞춰 준다. (Next.js 이미지 최적화를 거치지 않는다)
  images: {
    loader: "custom",
    loaderFile: "./src/shared/lib/imageLoader.ts",
    // 화면 폭이 390px 이하라 3배율 화면도 1200px이면 충분하다.
    // 받아 갈 크기 종류를 줄여 Cloudinary 무료 사용량(변환 횟수 · 전송량)을 아낀다.
    deviceSizes: [640, 828, 1080, 1200],
    imageSizes: [128, 256, 384],
  },
  // 처음 배포할 때 노션 사진을 Cloudinary로 복사하느라 페이지 생성이 오래 걸릴 수 있다. (기본 60초)
  staticPageGenerationTimeout: 300,
  // 한국어 청첩장은 주소에 언어를 붙이지 않고 `/`로 연다. (영어는 `/en`)
  rewrites() {
    return [{ source: "/", destination: "/ko" }];
  },
};

export default nextConfig;
