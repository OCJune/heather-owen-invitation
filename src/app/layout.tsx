import { fontVariables } from "./fonts";
import "./globals.css";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={fontVariables}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
