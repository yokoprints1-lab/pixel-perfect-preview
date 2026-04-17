import { useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import bodyImage from "@/assets/body-posterior-3d.png";

export interface BodyPoint {
  id: string;
  label: string;
  cx: number; // % horizontal (0-100)
  cy: number; // % vertical (0-100)
}

// Calibrated to the 3D render: spine runs ~50% horizontally,
// from head (~9%) down to sacrum (~58%), hips slightly wider.
export const BODY_POINTS: BodyPoint[] = [
  { id: "head", label: "Cabeça", cx: 50, cy: 9 },
  { id: "cervical", label: "Cervical", cx: 50, cy: 19 },
  { id: "shoulder-l", label: "Ombro Esquerdo", cx: 38, cy: 24 },
  { id: "shoulder-r", label: "Ombro Direito", cx: 62, cy: 24 },
  { id: "thoracic-up", label: "Torácica Superior", cx: 50, cy: 28 },
  { id: "thoracic-mid", label: "Torácica Média", cx: 50, cy: 36 },
  { id: "thoracic-low", label: "Torácica Inferior", cx: 50, cy: 44 },
  { id: "lumbar", label: "Lombar", cx: 50, cy: 52 },
  { id: "sacrum", label: "Sacro / Cóccix", cx: 50, cy: 58 },
  { id: "hip-l", label: "Quadril Esquerdo", cx: 42, cy: 60 },
  { id: "hip-r", label: "Quadril Direito", cx: 58, cy: 60 },
];

interface BodyMapProps {
  selected: string[];
  onToggle: (id: string) => void;
}

export const BodyMap = ({ selected, onToggle }: BodyMapProps) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* 3D body container — image as background, dots as overlay */}
      <div className="relative w-full" style={{ aspectRatio: "9 / 16" }}>
        <img
          src={bodyImage}
          alt="Corpo humano - vista posterior"
          className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
          draggable={false}
        />

        {/* Interactive dot overlay */}
        <svg
          viewBox="0 0 100 178"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full"
          aria-label="Pontos selecionáveis"
        >
          <defs>
            <filter id="dot-glow">
              <feGaussianBlur stdDeviation="1.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {BODY_POINTS.map((p) => {
            const isSelected = selected.includes(p.id);
            const isHovered = hovered === p.id;
            const x = p.cx;
            const y = (p.cy / 100) * 178;
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
                  r={isSelected ? 4.2 : 3.4}
                  fill="none"
                  stroke={isSelected ? "hsl(var(--scanner-dot-active))" : "rgba(255,255,255,0.55)"}
                  strokeWidth="0.5"
                  className={cn("transition-all duration-300", isSelected && "animate-pulse-dot")}
                />
                {/* Glow */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 5.5 : 2.8}
                  fill={isSelected ? "hsl(var(--scanner-dot-active))" : "white"}
                  opacity={isSelected ? 0.3 : isHovered ? 0.4 : 0.2}
                  filter="url(#dot-glow)"
                  className="transition-all duration-300"
                />
                {/* Core dot */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 2.2 : 1.6}
                  fill={isSelected ? "hsl(var(--scanner-dot-active))" : "white"}
                  className="transition-all duration-300"
                />
                {/* Number badge */}
                {isSelected && (
                  <g className="animate-fade-in">
                    <circle cx={x + 5.5} cy={y - 4.5} r="3" fill="hsl(var(--scanner-dot-active))" />
                    <text
                      x={x + 5.5}
                      y={y - 3.3}
                      textAnchor="middle"
                      fontSize="3.8"
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
      </div>

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
