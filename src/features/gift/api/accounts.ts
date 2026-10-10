import "server-only";
import { unstable_cache } from "next/cache";
import {
  CACHE_TAGS,
  getDataSourceId,
  queryAllPages,
  readText,
  sortByOrder,
} from "@/shared/api/notion";
import type { Locale } from "@/shared/types/locale";

export type AccountSide = "groom" | "bride";

export interface Account {
  id: string;
  /** 어느 쪽 계좌인지 */
  side: AccountSide;
  /** 예금주 표기 (예: "신랑 이종찬") */
  holder: string;
  /** 은행과 계좌번호 표기 (예: "국민 000000-00-000000") */
  account: string;
}

/** 노션 계좌 DB의 속성 이름 */
const PROPERTY = {
  holder: "예금주",
  holderEn: "예금주 (영문)",
  side: "구분",
  bank: "은행",
  bankEn: "은행 (영문)",
  number: "계좌번호",
  isPublic: "공개",
};

/** 노션 "구분" 선택지 → 코드에서 쓰는 이름 */
const SIDE_BY_LABEL: Record<string, AccountSide> = {
  신랑측: "groom",
  신부측: "bride",
};

interface AccountRecord {
  id: string;
  side: AccountSide;
  holder: Record<Locale, string>;
  bank: Record<Locale, string>;
  number: string;
}

async function loadAccounts(): Promise<AccountRecord[]> {
  const dataSourceId = getDataSourceId("accounts");
  if (!dataSourceId) return [];

  const pages = sortByOrder(
    await queryAllPages(dataSourceId, {
      filter: { property: PROPERTY.isPublic, checkbox: { equals: true } },
    }),
  );

  return pages.flatMap((page) => {
    const side = SIDE_BY_LABEL[readText(page, PROPERTY.side)];
    const number = readText(page, PROPERTY.number).trim();
    if (!side || !number) return [];

    // 영문 칸이 비어 있으면 한국어 표기를 그대로 쓴다.
    const holder = readText(page, PROPERTY.holder).trim();
    const bank = readText(page, PROPERTY.bank).trim();

    return {
      id: page.id,
      side,
      holder: {
        ko: holder,
        en: readText(page, PROPERTY.holderEn).trim() || holder,
      },
      bank: { ko: bank, en: readText(page, PROPERTY.bankEn).trim() || bank },
      number,
    };
  });
}

/** 공개된 계좌 전체. 노션 웹훅이 오거나 1시간이 지나면 다시 가져온다. */
const getCachedAccounts = unstable_cache(loadAccounts, ["notion-accounts"], {
  tags: [CACHE_TAGS.accounts],
  revalidate: 3600,
});

/** 공개된 계좌를 순서대로, 해당 언어의 표기로 가져온다. */
export async function getAccounts(locale: Locale): Promise<Account[]> {
  // 노션이 설정되지 않았을 때의 빈 결과는 캐시에 남기지 않는다.
  if (!getDataSourceId("accounts")) return [];

  const records = await getCachedAccounts();

  return records.map(({ id, side, holder, bank, number }) => ({
    id,
    side,
    holder: holder[locale],
    account: `${bank[locale]} ${number}`.trim(),
  }));
}
