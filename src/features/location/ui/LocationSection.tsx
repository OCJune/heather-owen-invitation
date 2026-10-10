import { getMapHref } from "@/features/location/lib/mapLinks";
import { WEDDING } from "@/shared/config/wedding";
import type { DirectionLine, Dictionary } from "@/shared/i18n/ko";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/Badge/Badge";
import { PhotoSlot } from "@/shared/ui/PhotoSlot/PhotoSlot";
import { SectionHeader } from "@/shared/ui/SectionHeader/SectionHeader";
import { CopyAddressButton } from "./CopyAddressButton";

const LINE_CLASS: Record<DirectionLine["type"], string> = {
  strong: "typo-label-strong leading-[1.65] text-primary",
  item: "typo-label-regular leading-[1.65] text-body",
  note: "typo-body-sans-small whitespace-pre-line text-tertiary",
};

export interface LocationSectionProps {
  dict: Dictionary["location"];
  common: Dictionary["common"];
}

/** 오시는 길: 주소, 지도, 지도 앱 링크, 교통편 안내 표 */
export function LocationSection({ dict, common }: LocationSectionProps) {
  return (
    <section className="flex flex-col px-gutter py-section-y">
      <SectionHeader
        number={dict.number}
        title={dict.title}
        subtitle={dict.subtitle}
      />

      <h3 className="mt-9 typo-heading-ko-large text-primary">{dict.venue}</h3>
      <address className="mt-2 typo-body-sans leading-[1.7] whitespace-pre-line text-secondary not-italic">
        {dict.address}
      </address>
      <div className="mt-1.5 flex items-center gap-4">
        <a
          href={`tel:${WEDDING.venue.tel}`}
          className="typo-numeral-small text-tertiary"
        >
          {dict.tel}
        </a>
        <CopyAddressButton
          address={dict.addressCopy}
          label={dict.copyAddress}
          copiedLabel={common.copied}
        />
      </div>

      {/* 지도 API 연동 전까지는 자리 표시를 둔다. */}
      <PhotoSlot
        label={dict.mapLabel}
        sizeHint="334 × 240"
        className="mt-6 h-60 w-full"
      />
      <ul className="flex divide-x divide-default">
        {dict.mapLinks.map(({ id, label }) => (
          <li key={id} className="flex-1">
            <a
              href={getMapHref(id, WEDDING.venue.mapQuery)}
              target="_blank"
              rel="noreferrer"
              className="flex justify-center gap-1 py-3.25 whitespace-nowrap"
            >
              <span className="typo-label-small text-primary">{label}</span>
              <span
                aria-hidden="true"
                className="typo-caption-sans text-tertiary"
              >
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>

      <dl className="mt-10 border-t border-strong">
        {dict.directions.map(({ key, label, lines }) => (
          <div
            key={key}
            className="flex items-start gap-3 border-b border-default py-5"
          >
            <dt className="flex w-19 shrink-0 flex-col gap-0.5 whitespace-nowrap">
              <span className="typo-eyebrow-en text-primary">{key}</span>
              <span className="typo-caption-sans text-tertiary">{label}</span>
            </dt>
            <dd className="flex min-w-0 flex-1 flex-col gap-1.5">
              {lines.map(({ type, text, badge }) => (
                <p key={text} className="flex items-center gap-1.5">
                  {badge && <Badge className="shrink-0">{badge}</Badge>}
                  <span className={cn("min-w-0 flex-1", LINE_CLASS[type])}>
                    {text}
                  </span>
                </p>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
