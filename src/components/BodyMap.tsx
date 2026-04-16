import { useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface BodyPoint {
  id: string;
  label: string;
  cx: number; // % of viewBox
  cy: number;
}

export const BODY_POINTS: BodyPoint[] = [
  { id: "head", label: "Cabeça", cx: 50, cy: 8 },
  { id: "cervical", label: "Cervical", cx: 50, cy: 17 },
  { id: "shoulder-l", label: "Ombro Esquerdo", cx: 36, cy: 22 },
  { id: "shoulder-r", label: "Ombro Direito", cx: 64, cy: 22 },
  { id: "thoracic-up", label: "Torácica Superior", cx: 50, cy: 27 },
  { id: "thoracic-mid", label: "Torácica Média", cx: 50, cy: 36 },
  { id: "thoracic-low", label: "Torácica Inferior", cx: 50, cy: 45 },
  { id: "lumbar", label: "Lombar", cx: 50, cy: 54 },
  { id: "sacrum", label: "Sacro / Cóccix", cx: 50, cy: 62 },
  { id: "hip-l", label: "Quadril Esquerdo", cx: 41, cy: 65 },
  { id: "hip-r", label: "Quadril Direito", cx: 59, cy: 65 },
];

interface BodyMapProps {
  selected: string[];
  onToggle: (id: string) => void;
}

export const BodyMap = ({ selected, onToggle }: BodyMapProps) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg
        viewBox="0 0 200 380"
        className="w-full h-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        aria-label="Mapa do corpo - vista posterior"
      >
        <defs>
          {/* Body gradient — cool blue-grey 3D shading */}
          <linearGradient id="bodyGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#2A3A48" />
            <stop offset="20%" stopColor="#4A6378" />
            <stop offset="50%" stopColor="#6B8AA3" />
            <stop offset="80%" stopColor="#4A6378" />
            <stop offset="100%" stopColor="#2A3A48" />
          </linearGradient>
          <linearGradient id="bodyShadow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id="spineGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8FA8BD" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8FA8BD" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soft spine glow behind */}
        <ellipse cx="100" cy="160" rx="55" ry="180" fill="url(#spineGlow)" />

        {/* Posterior body silhouette */}
        <g>
          {/* Head */}
          <ellipse cx="100" cy="32" rx="22" ry="26" fill="url(#bodyGrad)" />
          <ellipse cx="100" cy="32" rx="22" ry="26" fill="url(#bodyShadow)" />
          {/* Neck */}
          <path d="M 88 56 Q 100 62 112 56 L 110 70 Q 100 73 90 70 Z" fill="url(#bodyGrad)" />
          {/* Torso (back) - trapezoid like shape */}
          <path
            d="M 60 80
               Q 70 75 90 73
               L 110 73
               Q 130 75 140 80
               L 145 130
               Q 142 165 138 195
               L 130 235
               L 120 250
               L 80 250
               L 70 235
               L 62 195
               Q 58 165 55 130 Z"
            fill="url(#bodyGrad)"
          />
          <path
            d="M 60 80
               Q 70 75 90 73
               L 110 73
               Q 130 75 140 80
               L 145 130
               Q 142 165 138 195
               L 130 235
               L 120 250
               L 80 250
               L 70 235
               L 62 195
               Q 58 165 55 130 Z"
            fill="url(#bodyShadow)"
          />
          {/* Spine line subtle */}
          <line x1="100" y1="75" x2="100" y2="248" stroke="#1A2530" strokeWidth="1.2" opacity="0.5" />
          {/* Shoulder blade hints */}
          <ellipse cx="78" cy="100" rx="14" ry="20" fill="#1A2530" opacity="0.18" />
          <ellipse cx="122" cy="100" rx="14" ry="20" fill="#1A2530" opacity="0.18" />
          {/* Glutes */}
          <ellipse cx="85" cy="262" rx="22" ry="22" fill="url(#bodyGrad)" />
          <ellipse cx="115" cy="262" rx="22" ry="22" fill="url(#bodyGrad)" />
          <ellipse cx="85" cy="262" rx="22" ry="22" fill="url(#bodyShadow)" />
          <ellipse cx="115" cy="262" rx="22" ry="22" fill="url(#bodyShadow)" />
          {/* Legs (upper portion) */}
          <path d="M 70 280 L 78 360 L 95 362 L 98 282 Z" fill="url(#bodyGrad)" />
          <path d="M 130 280 L 122 360 L 105 362 L 102 282 Z" fill="url(#bodyGrad)" />
          {/* Arms (upper portion) */}
          <path d="M 56 90 Q 48 110 45 145 L 52 148 Q 58 115 65 95 Z" fill="url(#bodyGrad)" />
          <path d="M 144 90 Q 152 110 155 145 L 148 148 Q 142 115 135 95 Z" fill="url(#bodyGrad)" />
        </g>

        {/* Interactive points */}
        {BODY_POINTS.map((p) => {
          const isSelected = selected.includes(p.id);
          const isHovered = hovered === p.id;
          const x = (p.cx / 100) * 200;
          const y = (p.cy / 100) * 380;
          const order = selected.indexOf(p.id) + 1;
          return (
            <g
              key={p.id}
              onClick={() => onToggle(p.id)}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              {/* Outer ring */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 11 : 9}
                fill="none"
                stroke={isSelected ? "hsl(var(--scanner-dot-active))" : "rgba(255,255,255,0.4)"}
                strokeWidth="1.2"
                className={cn("transition-all duration-300", isSelected && "animate-pulse-dot")}
              />
              {/* Glow */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 14 : 7}
                fill={isSelected ? "hsl(var(--scanner-dot-active))" : "white"}
                opacity={isSelected ? 0.25 : isHovered ? 0.3 : 0.15}
                filter="url(#glow)"
                className="transition-all duration-300"
              />
              {/* Core dot */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 5.5 : 4}
                fill={isSelected ? "hsl(var(--scanner-dot-active))" : "white"}
                className="transition-all duration-300"
              />
              {/* Number badge */}
              {isSelected && (
                <g className="animate-fade-in">
                  <circle cx={x + 14} cy={y - 12} r="8" fill="hsl(var(--scanner-dot-active))" />
                  <text
                    x={x + 14}
                    y={y - 9}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="white"
                  >
                    {order}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Selected tags */}
      {selected.length > 0 && (
        <div className="mt-6 flex flex-wrap justify-center gap-2 animate-fade-in">
          {selected.map((id) => {
            const point = BODY_POINTS.find((p) => p.id === id);
            if (!point) return null;
            return (
              <button
                key={id}
                onClick={() => onToggle(id)}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-scanner-dot-active/20 border border-scanner-dot-active/40 text-scanner-fg text-sm font-medium backdrop-blur-sm transition-all hover:bg-scanner-dot-active/30"
              >
                <span>{point.label}</span>
                <X className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
