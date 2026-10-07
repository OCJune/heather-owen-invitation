import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/shared/i18n/getDictionary";
import { isLocale, LOCALES } from "@/shared/types/locale";
import { fontVariables } from "../fonts";
import "../globals.css";
import { Providers } from "../providers";

/** 지원하는 언어 경로만 만들고, 그 밖의 주소는 404로 보낸다. */
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { meta } = getDictionary(locale);
  return { title: meta.title, description: meta.description };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={fontVariables}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
