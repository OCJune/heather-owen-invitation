import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";
import { Icon } from "@/shared/ui/Icon/Icon";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 border border-strong px-6 py-4 typo-label-button whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-border-strong) disabled:cursor-not-allowed disabled:opacity-40",
  {
    variants: {
      variant: {
        /** 먹색 채움 */
        primary: "bg-inverse text-on-inverse",
        /** 외곽선 */
        secondary: "text-primary",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** 라벨 오른쪽에 아이콘을 보여준다. */
  showIcon?: boolean;
  /** 보여줄 아이콘. 기본은 오른쪽 화살표 */
  icon?: React.ReactNode;
}

/**
 * 공용 버튼. 폭은 내용에 맞춰지며, 꽉 채우려면 `className="w-full"`을 준다.
 */
export function Button({
  className,
  variant,
  showIcon = false,
  icon = <Icon name="arrow-right" size={18} />,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      {children}
      {showIcon && icon}
    </button>
  );
}
