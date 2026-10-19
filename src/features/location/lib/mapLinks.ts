export type MapApp = "naver" | "kakao" | "tmap" | "google";

/** 티맵 설치 페이지 */
const TMAP_STORE_HREFS = {
  ios: "https://apps.apple.com/kr/app/id431589174",
  android: "https://play.google.com/store/apps/details?id=com.skt.tmap.ku",
};

/** 지도 앱(또는 웹)에서 장소 이름으로 검색하는 주소를 만든다. */
export function getMapHref(app: MapApp, query: string) {
  const encoded = encodeURIComponent(query);

  switch (app) {
    case "naver":
      return `https://map.naver.com/p/search/${encoded}`;
    case "kakao":
      return `https://map.kakao.com/link/search/${encoded}`;
    case "tmap":
      return `tmap://search?name=${encoded}`;
    case "google":
      return `https://www.google.com/maps/search/?api=1&query=${encoded}`;
  }
}

/** 기기에 맞는 티맵 설치 페이지 주소. Android가 아니면 앱스토어로 보낸다. */
export function getTmapStoreHref(userAgent: string) {
  return /android/i.test(userAgent)
    ? TMAP_STORE_HREFS.android
    : TMAP_STORE_HREFS.ios;
}
