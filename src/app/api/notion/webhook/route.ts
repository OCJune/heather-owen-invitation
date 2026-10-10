import { verifyWebhookSignature } from "@notionhq/client";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/shared/api/notion";

/**
 * 노션 웹훅을 받는 곳. 노션에서 사진 · 계좌 · 방명록이 바뀌면 캐시를 비워
 * 다음 방문 때 새 내용을 가져오게 한다. (사진은 그때 Cloudinary로 복사된다)
 */
export async function POST(request: Request) {
  const body = await request.text();

  let payload: { verification_token?: unknown };
  try {
    payload = JSON.parse(body);
  } catch {
    return Response.json({ message: "Invalid JSON" }, { status: 400 });
  }

  /*
   * 웹훅을 처음 등록하면 노션이 확인용 토큰을 한 번 보낸다.
   * 서버 로그에서 이 값을 확인해 노션의 Verify 창에 붙여 넣고,
   * 같은 값을 환경 변수 NOTION_WEBHOOK_SECRET에 넣는다.
   */
  if (typeof payload.verification_token === "string") {
    console.log(
      `[notion webhook] verification_token: ${payload.verification_token}`,
    );
    return Response.json({ received: true });
  }

  const secret = process.env.NOTION_WEBHOOK_SECRET;
  if (!secret) {
    return Response.json(
      { message: "NOTION_WEBHOOK_SECRET is not set" },
      { status: 503 },
    );
  }

  const isValid = await verifyWebhookSignature({
    body,
    signature: request.headers.get("x-notion-signature"),
    verificationToken: secret,
  });
  if (!isValid) {
    return Response.json({ message: "Invalid signature" }, { status: 401 });
  }

  for (const tag of Object.values(CACHE_TAGS)) {
    revalidateTag(tag, "max");
  }
  return Response.json({ revalidated: true });
}
