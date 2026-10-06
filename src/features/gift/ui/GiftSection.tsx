import type { Dictionary } from "@/shared/i18n/ko";
import { SectionHeader } from "@/shared/ui/SectionHeader/SectionHeader";
import { AccountGroup } from "./AccountGroup";
import { AccountRow } from "./AccountRow";

export interface GiftSectionProps {
  dict: Dictionary["gift"];
  common: Dictionary["common"];
}

/** 마음 전하실 곳: 신랑측 · 신부측 계좌 안내 */
export function GiftSection({ dict, common }: GiftSectionProps) {
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
        {dict.groups.map((group, index) => (
          <AccountGroup
            key={group.title}
            title={group.title}
            defaultOpen={index === 0}
          >
            {group.accounts.map(({ holder, account }) => (
              <AccountRow
                key={holder}
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
