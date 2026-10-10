import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 한국어 청첩장은 주소에 언어를 붙이지 않고 `/`로 연다. (영어는 `/en`)
  rewrites() {
    return [{ source: "/", destination: "/ko" }];
  },
};

export default nextConfig;
