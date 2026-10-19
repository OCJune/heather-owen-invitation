import { getAccounts, type AccountSide } from "@/features/gift/api/accounts";
import type { Dictionary } from "@/shared/i18n/ko";
import type { Locale } from "@/shared/types/locale";
import { SectionHeader } from "@/shared/ui/SectionHeader/SectionHeader";
import { AccountGroup } from "./AccountGroup";
import { AccountRow } from "./AccountRow";

const SIDES: AccountSide[] = ["groom", "bride"];

export interface GiftSectionProps {
  locale: Locale;
  dict: Dictionary["gift"];
  common: Dictionary["common"];
}

/** 마음 전하실 곳: 신랑측 · 신부측 계좌 안내. 계좌는 노션 계좌 DB에서 가져온다. */
export async function GiftSection({ locale, dict, common }: GiftSectionProps) {
  const accounts = await getAccounts(locale);
  const groups = SIDES.map((side) => ({
    side,
    accounts: accounts.filter((account) => account.side === side),
  })).filter((group) => group.accounts.length > 0);

  return (
    <section className="flex flex-col px-gutter py-section-y">
      <SectionHeader
        number={dict.number}
        title={dict.title}
        subtitle={dict.subtitle}
      />

      <p className="mt-9 typo-body-serif whitespace-pre-line text-body">
        {dict.intro}
      </p>

      <div className="mt-7 border-t border-strong">
        {groups.map((group, index) => (
          <AccountGroup
            key={group.side}
            title={dict.groups[group.side]}
            defaultOpen={index === 0}
          >
            {group.accounts.map(({ id, holder, account }) => (
              <AccountRow
                key={id}
                holder={holder}
                account={account}
                copyLabel={common.copy}
                copiedLabel={common.copied}
              />
            ))}
          </AccountGroup>
        ))}
      </div>
    </section>
  );
}
