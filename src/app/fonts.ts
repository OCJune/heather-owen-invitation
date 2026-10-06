import { Cormorant_Garamond } from "next/font/google";

/*
 * 한글 글꼴은 패키지에 든 파일을 쓴다 (글자 범위별로 나뉜 파일이라 필요한 조각만 내려받는다).
 * next/font/google로 불러오면 조각 수백 개를 빌드할 때마다 Google에서 받아와야 해서,
 * 네트워크가 느리면 개발 서버와 빌드가 실패한다.
 */
import "@fontsource/noto-sans-kr/300.css";
import "@fontsource/noto-sans-kr/400.css";
import "@fontsource/noto-sans-kr/500.css";
import "@fontsource/noto-serif-kr/300.css";
import "@fontsource/noto-serif-kr/400.css";
import "@fontsource/noto-serif-kr/500.css";

/** 영문 제목 · 숫자 · 강조용 세리프 (Display, Eyebrow, Accent, Numeral) */
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant-garamond",
});

/** `<html>`에 붙여 글꼴 CSS 변수를 전역에 노출한다. */
export const fontVariables = cormorantGaramond.variable;
