import "server-only";
import { createHash } from "node:crypto";

/** Cloudinary 안에서 청첩장 사진을 모아 두는 폴더 */
const FOLDER = "invitation";

/** Cloudinary 서명: 값을 이름순으로 이어 붙이고 비밀 키를 더해 SHA-1로 만든다. */
export function signCloudinaryParams(
  params: Record<string, string>,
  apiSecret: string,
) {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return createHash("sha1")
    .update(payload + apiSecret)
    .digest("hex");
}

/**
 * 주소로 받은 이미지를 Cloudinary에 올리고, 만료되지 않는 주소를 돌려준다.
 * 파일은 Cloudinary가 직접 내려받으므로 우리 서버를 거치지 않는다.
 */
export async function uploadRemoteImage(
  fileUrl: string,
  name: string,
): Promise<string> {
  const {
    CLOUDINARY_CLOUD_NAME: cloudName,
    CLOUDINARY_API_KEY: apiKey,
    CLOUDINARY_API_SECRET: apiSecret,
  } = process.env;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary 환경 변수가 설정되지 않았습니다.");
  }

  const params = {
    overwrite: "true",
    public_id: `${FOLDER}/${name}`,
    timestamp: String(Math.floor(Date.now() / 1000)),
  };

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: new URLSearchParams({
        ...params,
        file: fileUrl,
        api_key: apiKey,
        signature: signCloudinaryParams(params, apiSecret),
      }),
      cache: "no-store",
    },
  );
  const result: { secure_url?: string; error?: { message: string } } =
    await response.json();

  if (!response.ok || !result.secure_url) {
    throw new Error(
      `Cloudinary 업로드 실패: ${result.error?.message ?? response.status}`,
    );
  }
  return result.secure_url;
}
