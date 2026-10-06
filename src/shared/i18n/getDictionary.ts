import type { Locale } from "@/shared/types/locale";
import { en } from "./en";
import { ko, type Dictionary } from "./ko";

const DICTIONARIES: Record<Locale, Dictionary> = { ko, en };

/** 언어에 맞는 문구 사전을 돌려준다. */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
