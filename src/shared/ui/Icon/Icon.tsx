import arrowRight from "@/shared/assets/icons/arrow-right.svg";
import check from "@/shared/assets/icons/check.svg";
import close from "@/shared/assets/icons/close.svg";
import { cn } from "@/shared/lib/utils";

const ICONS = {
  "arrow-right": arrowRight,
  check,
  close,
} as const;

export type IconName = keyof typeof ICONS;

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: IconName;
  /** 한 변의 길이(px). Figma 기준 16 / 18 / 20 / 24 */
  size?: number;
}

/**
 * 선 아이콘. SVG 파일을 마스크로 써서 글자색(currentColor)을 따른다.
 * 색을 바꾸려면 `text-icon-primary`, `text-on-inverse` 같은 글자색 클래스를 준다.
 */
export function Icon({
  name,
  size = 24,
  className,
  style,
  ...props
}: IconProps) {
  const mask = `url(${ICONS[name].src}) center / 100% 100% no-repeat`;

  return (
    <span
      aria-hidden="true"
      className={cn("inline-block shrink-0 bg-current", className)}
      style={{
        width: size,
        height: size,
        mask,
        WebkitMask: mask,
        ...style,
      }}
      {...props}
    />
  );
}
