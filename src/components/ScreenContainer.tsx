import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ScreenContainerProps {
  children: ReactNode;
  variant?: "warm" | "scanner";
  className?: string;
  contentClassName?: string;
}

export const ScreenContainer = ({
  children,
  variant = "warm",
  className,
  contentClassName,
}: ScreenContainerProps) => {
  return (
    <div
      className={cn(
        "min-h-dvh w-full relative overflow-hidden",
        variant === "warm" && "bg-gradient-warm",
        variant === "scanner" && "bg-gradient-scanner",
        className,
      )}
    >
      <div
        className={cn(
          "relative mx-auto w-full max-w-2xl px-5 md:px-8 py-8 md:py-12 min-h-dvh flex flex-col",
          "animate-slide-in-right",
          contentClassName,
        )}
        key={Math.random()}
      >
        {children}
      </div>
    </div>
  );
};
