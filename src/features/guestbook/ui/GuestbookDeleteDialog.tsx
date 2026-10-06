"use client";

import { useState } from "react";
import { deleteGuestbookEntry } from "@/features/guestbook/api/guestbookApi";
import type { Dictionary } from "@/shared/i18n/ko";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";

export interface GuestbookDeleteDialogProps {
  /** 지우려는 메시지의 id */
  entryId: string;
  dict: Dictionary["guestbook"]["remove"];
  /** 삭제에 성공했을 때 호출된다. */
  onDeleted: (id: string) => void;
  onClose: () => void;
}

/** 방명록 삭제 확인 창의 내용. 작성할 때 넣은 비밀번호를 확인한다. */
export function GuestbookDeleteDialog({
  entryId,
  dict,
  onDeleted,
  onClose,
}: GuestbookDeleteDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const password = String(new FormData(event.currentTarget).get("password"));

    setIsSubmitting(true);
    try {
      const isDeleted = await deleteGuestbookEntry(entryId, password);
      if (isDeleted) onDeleted(entryId);
      else setIsWrong(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 px-7 pt-8 pb-7"
    >
      <h2 className="typo-heading-ko-medium text-primary">{dict.title}</h2>
      <p className="typo-body-sans-small text-tertiary">{dict.body}</p>

      <div className="flex flex-col gap-2">
        <Input
          aria-label={dict.placeholder}
          placeholder={dict.placeholder}
          name="password"
          type="password"
          inputMode="numeric"
          maxLength={4}
          autoComplete="off"
          required
          onChange={() => setIsWrong(false)}
        />
        <p role="alert" className="typo-caption-sans text-primary empty:hidden">
          {isWrong && dict.wrong}
        </p>
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" onClick={onClose} className="flex-1">
          {dict.cancel}
        </Button>
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {dict.confirm}
        </Button>
      </div>
    </form>
  );
}
