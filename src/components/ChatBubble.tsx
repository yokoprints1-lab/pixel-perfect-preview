import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Mascot, MascotMood } from "./Mascot";

interface ChatBubbleProps {
  children: ReactNode;
  mood?: MascotMood;
  showMascot?: boolean;
  variant?: "question" | "empathy";
  className?: string;
}

export const ChatBubble = ({
  children,
  mood = "thinking",
  showMascot = true,
  variant = "question",
  className,
}: ChatBubbleProps) => {
  return (
    <div className={cn("flex items-end gap-3 animate-slide-in-up", className)}>
      {showMascot && (
        <div className="shrink-0 mb-1">
          <Mascot mood={mood} size="md" float />
        </div>
      )}
      <div
        className={cn(
          "chat-bubble max-w-[85%]",
          variant === "empathy" && "bg-primary-soft text-primary-deep",
        )}
      >
        <p className="text-base md:text-lg leading-relaxed text-balance">{children}</p>
      </div>
    </div>
  );
};
