import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { ReactNode } from "react";

interface OptionCardProps {
  selected?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export const OptionCard = ({ selected, onClick, icon, title, description, className }: OptionCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative w-full text-left rounded-3xl px-5 py-5 md:px-6 md:py-6",
        "bg-card border-2 transition-all duration-300 ease-out-soft",
        "hover:-translate-y-0.5 hover:shadow-card active:scale-[0.99]",
        selected
          ? "border-primary bg-primary-soft shadow-soft"
          : "border-border hover:border-primary/40",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        {icon && (
          <div
            className={cn(
              "shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
              selected ? "bg-primary text-primary-foreground" : "bg-surface-soft text-primary",
            )}
          >
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className={cn("font-semibold text-base md:text-lg", selected && "text-primary-deep")}>
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
        <div
          className={cn(
            "shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all",
            selected
              ? "bg-primary border-primary scale-100 animate-check-pop"
              : "border-border scale-90 group-hover:border-primary/50",
          )}
        >
          {selected && <Check className="w-4 h-4 text-primary-foreground" strokeWidth={3} />}
        </div>
      </div>
    </button>
  );
};
