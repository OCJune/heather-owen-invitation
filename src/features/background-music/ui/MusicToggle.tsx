"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/shared/ui/Icon/Icon";

/** 배경음악 주소. 저장소가 공개되어 있어 음원 파일은 저장소 밖에 두고 주소만 환경 변수로 받는다. */
const BGM_URL = process.env.NEXT_PUBLIC_BGM_URL;

/** 브라우저가 소리 있는 재생을 허락하는, 방문자의 직접적인 조작 */
const USER_GESTURE_EVENTS = ["click", "touchend", "keydown"] as const;

export interface MusicToggleProps {
  /** 버튼의 접근성 이름 (예: "배경음악") */
  label: string;
}

/** 배경음악 재생 · 일시정지 버튼. 배경음악 주소가 없으면 그리지 않는다. */
export function MusicToggle({ label }: MusicToggleProps) {
  if (!BGM_URL) return null;
  return <MusicPlayer src={BGM_URL} label={label} />;
}

interface MusicPlayerProps extends MusicToggleProps {
  src: string;
}

/**
 * 화면 오른쪽 아래에 떠 있는 배경음악 버튼.
 *
 * 브라우저는 방문자가 화면을 조작하기 전의 소리 있는 자동 재생을 막는다.
 * 그래서 처음에 재생을 시도해 보고, 막히면 방문자가 화면을 처음 누를 때 재생한다.
 * 방문자가 버튼으로 끈 뒤에는 다시 켜지 않는다.
 */
function MusicPlayer({ src, label }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  /** 방문자가 버튼으로 끈 적이 있는지 */
  const isStoppedByUserRef = useRef(false);

  // 자동 재생을 시도하고, 막히면 방문자의 첫 조작을 기다린다.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const removeListeners = () => {
      for (const type of USER_GESTURE_EVENTS) {
        document.removeEventListener(type, handleGesture, true);
      }
    };
    const tryPlay = async () => {
      try {
        await audio.play();
        removeListeners();
      } catch {
        // 아직 재생이 허락되지 않았다. 다음 조작 때 다시 시도한다.
      }
    };
    function handleGesture(event: Event) {
      // 음악 버튼을 누른 경우는 버튼이 직접 처리한다.
      if (buttonRef.current?.contains(event.target as Node)) return;
      if (isStoppedByUserRef.current) return removeListeners();
      if (audio?.paused) void tryPlay();
    }

    for (const type of USER_GESTURE_EVENTS) {
      document.addEventListener(type, handleGesture, true);
    }
    void tryPlay();
    return () => {
      removeListeners();
      audio.pause();
    };
  }, []);

  // 다른 앱 · 탭으로 가면 멈추고, 돌아오면 이어서 재생한다.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let shouldResume = false;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        shouldResume = !audio.paused;
        audio.pause();
      } else if (shouldResume) {
        shouldResume = false;
        audio.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      isStoppedByUserRef.current = false;
      audio.play().catch(() => {});
    } else {
      isStoppedByUserRef.current = true;
      audio.pause();
    }
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-40 mx-auto flex w-full max-w-invitation justify-end px-gutter">
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        aria-pressed={isPlaying}
        onClick={handleToggle}
        className="pointer-events-auto flex cursor-pointer items-center gap-1.5 border border-strong bg-page px-3 py-2 text-primary"
      >
        <Icon name={isPlaying ? "pause" : "play"} size={16} />
        <span aria-hidden="true" className="typo-eyebrow-en">
          MUSIC
        </span>
      </button>
    </div>
  );
}
