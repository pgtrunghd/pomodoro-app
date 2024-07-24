import React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const CircleProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        `relative size-40 overflow-hidden rounded-full bg-primary/20 flex justify-center items-center`,
        className
      )}
      {...props}
      style={{
        background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(blue ${
          value || 0
        }%, black 0)`,
      }}
    >
      <div>{`${value || 0}%`}</div>
    </ProgressPrimitive.Root>
  );
});

export default CircleProgress;
