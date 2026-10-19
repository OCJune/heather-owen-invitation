import { cn } from "@/shared/lib/utils";

export interface ToastProps {
  /** 보이는지 여부. false가 되면 서서히 사라진다. */
  isOpen: boolean;
  /** 안내 문구. 사라지는 동안에도 보이도록 닫을 때 비우지 않는다. */
  children: React.ReactNode;
  className?: string;
}

/**
 * 화면 아래에 잠깐 떠오르는 안내.
 * 나타날 때는 아래에서 올라오며 서서히 보이고, 사라질 때는 반대로 움직인다.
 * 언제 닫을지는 쓰는 쪽에서 `isOpen`으로 정한다.
 */
export function Toast({ isOpen, children, className }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-50 mx-auto flex w-full max-w-invitation justify-center px-gutter"
    >
      <p
        className={cn(
          "bg-inverse px-5 py-3.5 text-center typo-body-sans-small text-on-inverse transition-[opacity,translate,visibility] duration-300 ease-out motion-reduce:transition-none",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-3 opacity-0",
          className,
        )}
      >
        {children}
      </p>
    </div>
  );
}
