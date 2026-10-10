import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 사진은 Cloudinary가 크기 · 형식을 맞춰 준다. (Next.js 이미지 최적화를 거치지 않는다)
  images: {
    loader: "custom",
    loaderFile: "./src/shared/lib/imageLoader.ts",
  },
  // 한국어 청첩장은 주소에 언어를 붙이지 않고 `/`로 연다. (영어는 `/en`)
  rewrites() {
    return [{ source: "/", destination: "/ko" }];
  },
};

export default nextConfig;
