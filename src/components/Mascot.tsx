import { cn } from "@/lib/utils";
import mascotHappy from "@/assets/mascot-happy.png";
import mascotThinking from "@/assets/mascot-thinking.png";
import mascotWorried from "@/assets/mascot-worried.png";
import mascotCelebrate from "@/assets/mascot-celebrate.png";

export type MascotMood = "happy" | "thinking" | "worried" | "celebrate";

const sources: Record<MascotMood, string> = {
  happy: mascotHappy,
  thinking: mascotThinking,
  worried: mascotWorried,
  celebrate: mascotCelebrate,
};

interface MascotProps {
  mood?: MascotMood;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  float?: boolean;
}

const sizes = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-24 h-24",
  xl: "w-40 h-40",
};

export const Mascot = ({ mood = "happy", size = "md", className, float = true }: MascotProps) => {
  return (
    <img
      src={sources[mood]}
      alt="Mascote Sou Coluna"
      width={512}
      height={512}
      loading="lazy"
      className={cn(
        sizes[size],
        "object-contain select-none pointer-events-none",
        float && "animate-float",
        className,
      )}
    />
  );
};
