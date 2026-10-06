export type MapApp = "naver" | "kakao" | "tmap" | "google";

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
