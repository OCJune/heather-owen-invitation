"use client";

import { useCreateGuestbookEntry } from "@/features/guestbook/model/useGuestbook";
import type { Dictionary } from "@/shared/i18n/ko";
import { Button } from "@/shared/ui/Button/Button";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Input } from "@/shared/ui/Input/Input";
import { Textarea } from "@/shared/ui/Input/Textarea";

const MESSAGE_MAX_LENGTH = 200;

export interface GuestbookWriteSheetProps {
  dict: Dictionary["guestbook"]["sheet"];
  closeLabel: string;
  /** 메시지가 저장됐을 때 호출된다. */
  onCreated: () => void;
  onClose: () => void;
}

/** 방명록 작성 창 (아래에서 올라오는 창의 내용) */
export function GuestbookWriteSheet({
  dict,
  closeLabel,
  onCreated,
  onClose,
}: GuestbookWriteSheetProps) {
  const { mutate: createEntry, isPending, isError } = useCreateGuestbookEntry();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    createEntry(
      {
        name: String(data.get("name")).trim(),
        password: String(data.get("password")),
        message: String(data.get("message")).trim(),
      },
      { onSuccess: onCreated },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-h-dvh flex-col gap-6.5 overflow-y-auto scrollbar-none px-7 pt-8 pb-9"
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="typo-heading-modal-en text-primary">{dict.title}</h2>
          <p className="typo-body-sans-small tracking-[0.06em] text-tertiary">
            {dict.subtitle}
          </p>
        </div>
        <button
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
          className="flex cursor-pointer text-icon-primary"
        >
          <Icon name="close" size={20} />
        </button>
      </div>

      <div className="flex gap-4">
        <Input
          index="01"
          label={dict.name.label}
          placeholder={dict.name.placeholder}
          name="name"
          maxLength={20}
          required
          className="min-w-0 flex-1"
        />
        <Input
          index="02"
          label={dict.password.label}
          placeholder={dict.password.placeholder}
          name="password"
          type="password"
          inputMode="numeric"
          pattern="[0-9]{4}"
          maxLength={4}
          autoComplete="off"
          required
          className="min-w-0 flex-1"
        />
      </div>
      <Textarea
        index="03"
        label={dict.message.label}
        placeholder={dict.message.placeholder}
        name="message"
        maxLength={MESSAGE_MAX_LENGTH}
        required
      />
      <p className="typo-caption-sans text-muted">{dict.note}</p>

      <div className="flex flex-col gap-3">
        <p role="alert" className="typo-caption-sans text-primary empty:hidden">
          {isError && dict.error}
        </p>
        <Button type="submit" disabled={isPending} className="w-full">
          {dict.submit}
        </Button>
      </div>
    </form>
  );
}
