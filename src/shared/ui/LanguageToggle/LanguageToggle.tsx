import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import type { Locale } from "@/shared/types/locale";

const LOCALES: Locale[] = ["ko", "en"];

export interface LanguageToggleProps {
  /** 지금 보고 있는 언어 */
  active: Locale;
  /** 언어별 이동 경로 */
  hrefs: Record<Locale, string>;
  className?: string;
}

/** 커버 오른쪽 위 KO / EN 전환. 누르면 해당 언어 경로로 이동한다. */
export function LanguageToggle({
  active,
  hrefs,
  className,
}: LanguageToggleProps) {
  return (
    <nav
      aria-label="Language"
      className={cn("inline-flex border border-strong", className)}
    >
      {LOCALES.map((locale) => {
        const isActive = locale === active;

        return (
          <Link
            key={locale}
            href={hrefs[locale]}
            hrefLang={locale}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "px-2.25 py-0.75 typo-eyebrow-en leading-[1.2] tracking-[0.1em] uppercase",
              isActive ? "bg-inverse text-on-inverse" : "text-primary",
            )}
          >
            {locale}
          </Link>
        );
      })}
    </nav>
  );
}
