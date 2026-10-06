"use client";

import { useState } from "react";
import { submitRsvp, type RsvpRequest } from "@/features/rsvp/api/rsvpApi";
import type { Dictionary } from "@/shared/i18n/ko";
import { Button } from "@/shared/ui/Button/Button";
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox";
import { Chip } from "@/shared/ui/Chip/Chip";
import { ChipGroup } from "@/shared/ui/Chip/ChipGroup";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Input } from "@/shared/ui/Input/Input";

export interface RsvpFormProps {
  dict: Dictionary["rsvp"];
  closeLabel: string;
  /** 전달에 성공했을 때 호출된다. */
  onDone: () => void;
  onClose: () => void;
}

/** 참석 의사 2단계: 입력 폼. 제목 줄과 전달 버튼은 고정이고 가운데만 스크롤된다. */
export function RsvpForm({ dict, closeLabel, onDone, onClose }: RsvpFormProps) {
  const { form } = dict;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setIsSubmitting(true);
    try {
      await submitRsvp({
        side: data.get("side") as RsvpRequest["side"],
        attendance: data.get("attendance") as RsvpRequest["attendance"],
        name: String(data.get("name")).trim(),
        phone: String(data.get("phone")).trim(),
      });
      onDone();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-h-[calc(100dvh-3rem)] flex-col"
    >
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-default pr-5 pl-7">
        <div className="flex items-center gap-2.5 whitespace-nowrap">
          <p className="typo-eyebrow-en-large text-tertiary">{dict.eyebrow}</p>
          <h2 className="typo-label-button text-primary">{form.title}</h2>
        </div>
        <button
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
          className="flex cursor-pointer text-icon-primary"
        >
          <Icon name="close" size={20} />
        </button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-7.5 overflow-y-auto scrollbar-none px-7 pt-7 pb-12">
        <ChipGroup index="01" label={form.side.label}>
          <Chip name="side" value="groom" defaultChecked>
            {form.side.groom}
          </Chip>
          <Chip name="side" value="bride">
            {form.side.bride}
          </Chip>
        </ChipGroup>
        <ChipGroup index="02" label={form.attendance.label}>
          <Chip name="attendance" value="yes" defaultChecked>
            {form.attendance.yes}
          </Chip>
          <Chip name="attendance" value="no">
            {form.attendance.no}
          </Chip>
        </ChipGroup>
        <Input
          index="03"
          label={form.name.label}
          placeholder={form.name.placeholder}
          name="name"
          autoComplete="name"
          required
        />
        <Input
          index="04"
          label={form.phone.label}
          placeholder={form.phone.placeholder}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
        />

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <Checkbox name="consent" required>
              {form.consent}
            </Checkbox>
            <span className="min-w-0 flex-1 typo-label-small font-light text-muted">
              {form.required}
            </span>
            <button
              type="button"
              aria-expanded={isDetailOpen}
              onClick={() => setIsDetailOpen((prev) => !prev)}
              className="cursor-pointer border-b border-muted typo-body-sans-small whitespace-nowrap text-tertiary"
            >
              {form.consentMore}
            </button>
          </div>
          {isDetailOpen && (
            <p className="bg-muted px-4 py-3 typo-body-sans-small whitespace-pre-line text-tertiary">
              {form.consentDetail}
            </p>
          )}
        </div>
      </div>

      <div className="shrink-0 px-7 pt-3 pb-6">
        <Button
          type="submit"
          showIcon
          disabled={isSubmitting}
          className="w-full"
        >
          {form.submit}
        </Button>
      </div>
    </form>
  );
}
