import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#22c55e] text-white hover:bg-[#22c55e]/90",
        secondary:
          "border-transparent bg-black/10 dark:bg-white/10 text-foreground hover:bg-black/20 dark:hover:bg-white/20",
        destructive:
          "border-transparent bg-[#ef4444] text-white hover:bg-[#ef4444]/90",
        outline:
          "border-[#22c55e] text-[#22c55e] bg-transparent hover:bg-[#22c55e]/10",
        success:
          "border-[#22c55e] bg-[#22c55e]/10 text-[#22c55e] hover:bg-[#22c55e]/20",
        warning:
          "border-[#ef4444] bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444]/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
