import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface PainSpineProps {
  level: number; // 0-10
  className?: string;
}

const colorForLevel = (lvl: number) => {
  if (lvl <= 3) return "hsl(145 55% 45%)"; // green
  if (lvl <= 6) return "hsl(38 92% 55%)"; // yellow
  return "hsl(0 75% 58%)"; // red
};

export const PainSpine = ({ level, className }: PainSpineProps) => {
  const color = colorForLevel(level);
  const pulseDuration = useMemo(() => {
    if (level === 0) return "0s";
    return `${Math.max(0.5, 2 - level * 0.15)}s`;
  }, [level]);

  // 7 vertebrae stacked
  const vertebrae = Array.from({ length: 7 });

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 120 280"
        className="w-32 md:w-40 h-auto"
        style={{
          animation: level > 0 ? `pulse-pain ${pulseDuration} ease-in-out infinite` : undefined,
          filter: level > 0 ? `drop-shadow(0 0 24px ${color})` : "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
          transition: "filter 400ms ease",
        }}
      >
        <defs>
          <linearGradient id="vertGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity="0.65" />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.65" />
          </linearGradient>
        </defs>

        {/* Skull */}
        <ellipse cx="60" cy="22" rx="22" ry="20" fill="url(#vertGrad)" />
        <ellipse cx="60" cy="22" rx="22" ry="20" fill="white" opacity="0.1" />

        {/* Vertebrae */}
        {vertebrae.map((_, i) => {
          const y = 55 + i * 28;
          const w = 28 + Math.sin(i * 0.6) * 4;
          return (
            <g key={i} style={{ transition: "all 400ms" }}>
              {/* disc */}
              <rect
                x={60 - w / 2}
                y={y}
                width={w}
                height={18}
                rx={6}
                fill="url(#vertGrad)"
              />
              {/* highlight */}
              <rect
                x={60 - w / 2 + 2}
                y={y + 2}
                width={w - 4}
                height={4}
                rx={2}
                fill="white"
                opacity="0.35"
              />
              {/* spinous process */}
              <circle cx="60" cy={y + 24} r="3" fill={color} opacity="0.5" />
            </g>
          );
        })}

        {/* Sacrum */}
        <path
          d="M 45 252 L 75 252 L 70 278 L 50 278 Z"
          fill="url(#vertGrad)"
        />
      </svg>
    </div>
  );
};
