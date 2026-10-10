/** 청첩장이 제공하는 언어 목록. 첫 번째가 기본 언어다. */
export const LOCALES = ["ko", "en"] as const;

/** 청첩장이 제공하는 언어 */
export type Locale = (typeof LOCALES)[number];

/** 주소의 언어 조각이 지원하는 언어인지 확인한다. */
export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** 언어별 청첩장 주소. 한국어는 `/`, 영어는 `/en`으로 연다. */
export const LOCALE_HREFS: Record<Locale, string> = {
  ko: "/",
  en: "/en",
};
