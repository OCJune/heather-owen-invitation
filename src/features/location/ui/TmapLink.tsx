"use client";

import { getMapHref, getTmapStoreHref } from "@/features/location/lib/mapLinks";

/** 이 시간 안에 티맵이 열리지 않으면(페이지가 계속 보이면) 설치되지 않은 것으로 본다. */
const APP_OPEN_TIMEOUT_MS = 1500;

export interface TmapLinkProps {
  /** 티맵에서 검색할 장소 이름 */
  query: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * 티맵 앱을 여는 링크.
 * 티맵이 열리지 않으면 앱스토어(iOS) · 플레이스토어(Android)의 티맵 설치 페이지로 보낸다.
 */
export function TmapLink({ query, children, className }: TmapLinkProps) {
  const appHref = getMapHref("tmap", query);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    // 앱이 열리면 페이지가 가려지므로, 그때는 설치 페이지로 보내지 않는다.
    const timer = window.setTimeout(() => {
      if (document.visibilityState === "visible") {
        window.location.href = getTmapStoreHref(navigator.userAgent);
      }
    }, APP_OPEN_TIMEOUT_MS);
    const cancel = () => {
      if (document.visibilityState === "hidden") window.clearTimeout(timer);
    };
    document.addEventListener("visibilitychange", cancel, { once: true });

    window.location.href = appHref;
  };

  return (
    <a href={appHref} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
