import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { guestbookEntriesQueryOptions } from "@/features/guestbook/api/guestbookQueries";
import type { Dictionary } from "@/shared/i18n/ko";
import { getQueryClient } from "@/shared/lib/queryClient";
import { SectionHeader } from "@/shared/ui/SectionHeader/SectionHeader";
import { GuestbookBoard } from "./GuestbookBoard";

export interface GuestbookSectionProps {
  dict: Dictionary["guestbook"];
  closeLabel: string;
}

/** 방명록: 축하 메시지 목록과 작성 · 삭제 */
export async function GuestbookSection({
  dict,
  closeLabel,
}: GuestbookSectionProps) {
  // 메시지 목록을 서버에서 미리 가져와 브라우저로 넘긴다.
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(guestbookEntriesQueryOptions());

  return (
    <section className="flex flex-col px-gutter py-section-y">
      <SectionHeader
        number={dict.number}
        title={dict.title}
        subtitle={dict.subtitle}
      />

      <p className="mt-9 mb-7 typo-body-serif leading-normal text-body">
        {dict.intro}
      </p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <GuestbookBoard dict={dict} closeLabel={closeLabel} />
      </HydrationBoundary>
    </section>
  );
}
