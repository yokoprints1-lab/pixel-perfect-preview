import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface NextButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export const NextButton = ({ onClick, disabled, className, label }: NextButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label ?? "Avançar"}
      className={cn(
        "fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50",
        "h-14 w-14 md:h-16 md:w-16 rounded-full",
        "bg-gradient-primary text-primary-foreground",
        "shadow-elevated transition-all duration-300 ease-out-soft",
        "hover:scale-105 hover:shadow-glow active:scale-95",
        "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-elevated",
        "flex items-center justify-center",
        className,
      )}
    >
      <ArrowRight className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
    </button>
  );
};
