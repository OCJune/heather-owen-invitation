import "server-only";
import { createHash } from "node:crypto";
import type { PageObjectResponse } from "@notionhq/client";
import { unstable_cache } from "next/cache";
import type { Photo, PhotoPlacement } from "@/shared/types/photo";
import { uploadRemoteImage } from "./cloudinary";
import {
  CACHE_TAGS,
  getDataSourceId,
  getNotion,
  queryAllPages,
  readFile,
  readText,
  sortByOrder,
} from "./notion";

/** 노션 사진 DB의 속성 이름 */
const PROPERTY = {
  alt: "설명",
  file: "사진",
  placement: "위치",
  isPublic: "공개",
  hostedUrl: "호스팅 주소",
};

/** 노션 "위치" 선택지 → 코드에서 쓰는 이름 */
const PLACEMENT_BY_LABEL: Record<string, PhotoPlacement> = {
  커버: "cover",
  사진첩: "gallery",
  지도: "map",
  마무리: "closing",
};

/** 한 번에 Cloudinary로 복사하는 사진 수 */
const SYNC_CONCURRENCY = 4;

type PhotosByPlacement = Record<PhotoPlacement, Photo[]>;

/**
 * 사진 한 장의 주소를 정한다.
 *
 * 노션에 올린 파일의 주소는 1시간 뒤 만료되므로 Cloudinary로 복사해 쓰고,
 * 복사한 주소를 노션의 "호스팅 주소"에 적어 둔다. 이미 복사한 사진은 그 주소를 그대로 쓴다.
 * 노션에서 파일을 바꾸면 파일 경로가 달라지므로 다시 복사한다.
 */
async function resolveSrc(page: PageObjectResponse): Promise<string | null> {
  const file = readFile(page, PROPERTY.file);
  if (!file) return null;
  if (file.source === "external") return file.url;

  const fileHash = createHash("sha1")
    .update(new URL(file.url).pathname)
    .digest("hex")
    .slice(0, 12);
  const name = `${page.id.replaceAll("-", "")}-${fileHash}`;

  const hostedUrl = readText(page, PROPERTY.hostedUrl);
  if (hostedUrl.includes(name)) return hostedUrl;

  try {
    const url = await uploadRemoteImage(file.url, name);
    await getNotion().pages.update({
      page_id: page.id,
      properties: { [PROPERTY.hostedUrl]: { url } },
    });
    return url;
  } catch (error) {
    // 한 장이 실패해도 나머지는 보여준다. 실패한 사진은 다음 갱신 때 다시 시도한다.
    console.error(`[photos] 사진 복사 실패 (${page.id})`, error);
    return null;
  }
}

async function loadPhotos(): Promise<PhotosByPlacement> {
  const photos: PhotosByPlacement = {
    cover: [],
    gallery: [],
    map: [],
    closing: [],
  };

  const dataSourceId = getDataSourceId("photos");
  if (!dataSourceId) return photos;

  const pages = sortByOrder(
    await queryAllPages(dataSourceId, {
      filter: { property: PROPERTY.isPublic, checkbox: { equals: true } },
    }),
  );

  for (let start = 0; start < pages.length; start += SYNC_CONCURRENCY) {
    const chunk = pages.slice(start, start + SYNC_CONCURRENCY);
    const sources = await Promise.all(chunk.map(resolveSrc));

    chunk.forEach((page, index) => {
      const src = sources[index];
      const placement = PLACEMENT_BY_LABEL[readText(page, PROPERTY.placement)];
      if (!src || !placement) return;

      photos[placement].push({
        id: page.id,
        src,
        alt: readText(page, PROPERTY.alt),
      });
    });
  }

  return photos;
}

/** 공개된 사진 전체. 노션 웹훅이 오거나 1시간이 지나면 다시 가져온다. */
const getCachedPhotos = unstable_cache(loadPhotos, ["notion-photos"], {
  tags: [CACHE_TAGS.photos],
  revalidate: 3600,
});

/** 한 자리에 놓일 사진들을 순서대로 가져온다. */
export async function getPhotosByPlacement(
  placement: PhotoPlacement,
): Promise<Photo[]> {
  return (await getCachedPhotos())[placement];
}

/** 사진이 한 장만 들어가는 자리(커버 · 지도 · 마무리)의 사진. 없으면 null. */
export async function getPhotoByPlacement(
  placement: Exclude<PhotoPlacement, "gallery">,
): Promise<Photo | null> {
  return (await getPhotosByPlacement(placement))[0] ?? null;
}
