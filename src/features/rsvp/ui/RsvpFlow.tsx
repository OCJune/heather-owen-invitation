"use client";

import { useState } from "react";
import { shouldSkipNotice } from "@/features/rsvp/lib/skipNotice";
import type { Dictionary } from "@/shared/i18n/ko";
import { Button } from "@/shared/ui/Button/Button";
import { Modal } from "@/shared/ui/Modal/Modal";
import { RsvpForm } from "./RsvpForm";
import { RsvpNotice } from "./RsvpNotice";

type Step = "notice" | "form" | "done";

export interface RsvpFlowProps {
  dict: Dictionary["rsvp"];
  closeLabel: string;
}

/**
 * 참석 의사 전달 흐름: 본문 버튼 → 안내 창 → 입력 폼 → 완료.
 * "오늘 하루 보지 않기"를 체크한 날에는 안내 창을 건너뛰고 폼을 바로 연다.
 */
export function RsvpFlow({ dict, closeLabel }: RsvpFlowProps) {
  const [step, setStep] = useState<Step | null>(null);
  const close = () => setStep(null);

  return (
    <>
      <Button
        showIcon
        onClick={() => setStep(shouldSkipNotice() ? "form" : "notice")}
        className="mt-7 w-full"
      >
        {dict.open}
      </Button>

      <Modal open={step !== null} onClose={close} ariaLabel={dict.cardTitle}>
        {step === "notice" && (
          <RsvpNotice
            dict={dict}
            closeLabel={closeLabel}
            onNext={() => setStep("form")}
            onClose={close}
          />
        )}
        {step === "form" && (
          <RsvpForm
            dict={dict}
            closeLabel={closeLabel}
            onDone={() => setStep("done")}
            onClose={close}
          />
        )}
        {step === "done" && (
          <div className="flex flex-col px-7 pt-8 pb-7">
            <p className="typo-eyebrow-en-large text-tertiary">
              {dict.eyebrow}
            </p>
            <h2 className="mt-3.5 typo-heading-ko-large text-primary">
              {dict.done.title}
            </h2>
            <p className="mt-3.5 typo-body-sans leading-[1.8] whitespace-pre-line text-secondary">
              {dict.done.body}
            </p>
            <Button onClick={close} className="mt-7 w-full">
              {dict.done.close}
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}
