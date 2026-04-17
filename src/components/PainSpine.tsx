import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface PainSpineProps {
  level: number; // 0-10
  className?: string;
}

const colorForLevel = (lvl: number) => {
  if (lvl <= 3) return { main: "hsl(145 55% 45%)", light: "hsl(145 60% 65%)", dark: "hsl(145 60% 32%)" };
  if (lvl <= 6) return { main: "hsl(38 92% 55%)", light: "hsl(42 95% 70%)", dark: "hsl(28 90% 42%)" };
  return { main: "hsl(0 75% 58%)", light: "hsl(8 80% 70%)", dark: "hsl(0 75% 42%)" };
};

export const PainSpine = ({ level, className }: PainSpineProps) => {
  const palette = colorForLevel(level);
  const pulseDuration = useMemo(() => {
    if (level === 0) return "0s";
    return `${Math.max(0.6, 2.2 - level * 0.16)}s`;
  }, [level]);

  // Anatomical regions: cervical (7), thoracic (12), lumbar (5)
  // Simplified: 7 cervical, 8 thoracic, 5 lumbar = 20 vertebrae
  const cervical = 7;
  const thoracic = 8;
  const lumbar = 5;
  const total = cervical + thoracic + lumbar;

  // S-curve path for the spine center line (lordosis/kyphosis)
  // Cervical curves forward (right), thoracic backward (left), lumbar forward (right)
  const getVertebra = (i: number) => {
    const yStart = 50;
    const yEnd = 380;
    const t = i / (total - 1);
    const y = yStart + t * (yEnd - yStart);

    // S-curve horizontal offset
    let x = 100;
    if (i < cervical) {
      // Cervical: gentle curve to the right
      const ct = i / cervical;
      x = 100 + Math.sin(ct * Math.PI) * 8;
    } else if (i < cervical + thoracic) {
      // Thoracic: curve to the left
      const tt = (i - cervical) / thoracic;
      x = 100 - Math.sin(tt * Math.PI) * 6;
    } else {
      // Lumbar: curve to the right (lordosis)
      const lt = (i - cervical - thoracic) / lumbar;
      x = 100 + Math.sin(lt * Math.PI) * 10;
    }

    // Vertebra width grows from cervical → lumbar
    let width: number;
    let height: number;
    if (i < cervical) {
      width = 20 + i * 0.8;
      height = 11;
    } else if (i < cervical + thoracic) {
      width = 28 + (i - cervical) * 0.9;
      height = 13;
    } else {
      width = 38 + (i - cervical - thoracic) * 1.2;
      height = 15;
    }

    return { x, y, width, height };
  };

  const vertebrae = Array.from({ length: total }, (_, i) => getVertebra(i));
  const skullPos = { x: vertebrae[0].x, y: 22 };

  // Build a smooth path through vertebra centers for the spinal cord
  const cordPath = vertebrae
    .map((v, i) => `${i === 0 ? "M" : "L"} ${v.x} ${v.y}`)
    .join(" ");

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 200 420"
        className="w-36 md:w-44 h-auto"
        style={{
          animation: level > 0 ? `pulse-pain ${pulseDuration} ease-in-out infinite` : undefined,
          filter:
            level > 0
              ? `drop-shadow(0 0 28px ${palette.main}) drop-shadow(0 4px 8px rgba(0,0,0,0.15))`
              : "drop-shadow(0 6px 14px rgba(0,0,0,0.12))",
          transition: "filter 500ms ease",
        }}
      >
        <defs>
          <linearGradient id="vertGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={palette.dark} />
            <stop offset="45%" stopColor={palette.main} />
            <stop offset="55%" stopColor={palette.light} />
            <stop offset="100%" stopColor={palette.dark} />
          </linearGradient>
          <linearGradient id="skullGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={palette.light} />
            <stop offset="100%" stopColor={palette.dark} />
          </linearGradient>
          <radialGradient id="discGrad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Skull (back of head) */}
        <g style={{ transition: "all 400ms" }}>
          <ellipse
            cx={skullPos.x}
            cy={skullPos.y}
            rx="26"
            ry="24"
            fill="url(#skullGrad)"
          />
          {/* occipital shadow */}
          <ellipse
            cx={skullPos.x}
            cy={skullPos.y + 6}
            rx="20"
            ry="10"
            fill={palette.dark}
            opacity="0.25"
          />
          {/* highlight */}
          <ellipse
            cx={skullPos.x - 6}
            cy={skullPos.y - 6}
            rx="10"
            ry="7"
            fill="white"
            opacity="0.35"
          />
        </g>

        {/* Spinal cord line behind vertebrae */}
        <path
          d={cordPath}
          stroke={palette.dark}
          strokeWidth="3"
          fill="none"
          opacity="0.35"
          strokeLinecap="round"
        />

        {/* Vertebrae */}
        {vertebrae.map((v, i) => {
          const isCervical = i < cervical;
          const isThoracic = i >= cervical && i < cervical + thoracic;
          const isLumbar = i >= cervical + thoracic;

          return (
            <g key={i} style={{ transition: "all 400ms" }}>
              {/* Intervertebral disc (between vertebrae) */}
              {i > 0 && (
                <ellipse
                  cx={v.x}
                  cy={v.y - 8}
                  rx={v.width / 2 - 1}
                  ry="2.5"
                  fill={palette.light}
                  opacity="0.7"
                />
              )}

              {/* Transverse processes (lateral wings) — for thoracic show rib hints */}
              {isThoracic && (
                <>
                  <path
                    d={`M ${v.x - v.width / 2} ${v.y} Q ${v.x - v.width / 2 - 14} ${v.y + 2} ${v.x - v.width / 2 - 22} ${v.y + 8}`}
                    stroke={palette.main}
                    strokeWidth="2.5"
                    fill="none"
                    opacity="0.55"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M ${v.x + v.width / 2} ${v.y} Q ${v.x + v.width / 2 + 14} ${v.y + 2} ${v.x + v.width / 2 + 22} ${v.y + 8}`}
                    stroke={palette.main}
                    strokeWidth="2.5"
                    fill="none"
                    opacity="0.55"
                    strokeLinecap="round"
                  />
                </>
              )}

              {/* Transverse processes for lumbar (smaller, no ribs) */}
              {isLumbar && (
                <>
                  <ellipse
                    cx={v.x - v.width / 2 - 4}
                    cy={v.y + v.height / 2}
                    rx="6"
                    ry="3"
                    fill={palette.dark}
                    opacity="0.55"
                  />
                  <ellipse
                    cx={v.x + v.width / 2 + 4}
                    cy={v.y + v.height / 2}
                    rx="6"
                    ry="3"
                    fill={palette.dark}
                    opacity="0.55"
                  />
                </>
              )}

              {/* Vertebra body */}
              <rect
                x={v.x - v.width / 2}
                y={v.y}
                width={v.width}
                height={v.height}
                rx={5}
                fill="url(#vertGrad)"
              />

              {/* Top highlight */}
              <rect
                x={v.x - v.width / 2 + 2}
                y={v.y + 1.5}
                width={v.width - 4}
                height={2.5}
                rx={1.5}
                fill="white"
                opacity="0.45"
              />

              {/* Bottom shadow */}
              <rect
                x={v.x - v.width / 2 + 2}
                y={v.y + v.height - 3}
                width={v.width - 4}
                height={1.5}
                rx={1}
                fill={palette.dark}
                opacity="0.4"
              />

              {/* Spinous process (small bump in center) */}
              <circle
                cx={v.x}
                cy={v.y + v.height / 2}
                r={isCervical ? 1.8 : 2.4}
                fill={palette.dark}
                opacity="0.55"
              />
            </g>
          );
        })}

        {/* Sacrum (triangular bone at base) */}
        {(() => {
          const last = vertebrae[vertebrae.length - 1];
          const sx = last.x;
          const sy = last.y + last.height + 4;
          return (
            <g style={{ transition: "all 400ms" }}>
              <path
                d={`M ${sx - 22} ${sy} L ${sx + 22} ${sy} L ${sx + 14} ${sy + 32} L ${sx - 14} ${sy + 32} Z`}
                fill="url(#vertGrad)"
              />
              {/* sacral foramina (little holes) */}
              {[0, 1, 2].map((j) => (
                <g key={j}>
                  <circle cx={sx - 7} cy={sy + 6 + j * 8} r="1.5" fill={palette.dark} opacity="0.5" />
                  <circle cx={sx + 7} cy={sy + 6 + j * 8} r="1.5" fill={palette.dark} opacity="0.5" />
                </g>
              ))}
              {/* coccyx tip */}
              <path
                d={`M ${sx - 5} ${sy + 32} L ${sx + 5} ${sy + 32} L ${sx} ${sy + 40} Z`}
                fill={palette.dark}
                opacity="0.85"
              />
            </g>
          );
        })()}
      </svg>
    </div>
  );
};
