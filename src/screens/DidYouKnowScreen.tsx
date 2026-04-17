import { ChatBubble } from "@/components/ChatBubble";
import { NextButton } from "@/components/NextButton";
import { ScreenContainer } from "@/components/ScreenContainer";
import { cn } from "@/lib/utils";
import { BarChart3, FlaskConical, Leaf, ShieldCheck, Check, X } from "lucide-react";
import { ReactNode, useMemo } from "react";

export type DidYouKnowAnswer = "yes" | "no" | null;

interface Statement {
  id: string;
  icon: ReactNode;
  text: string;
  tint: string; // gradient classes for icon halo
}

const STATEMENTS: Statement[] = [
  {
    id: "results",
    icon: <BarChart3 className="w-5 h-5" strokeWidth={2.4} />,
    text: "95% dos pacientes tratados pelo método Sou Coluna relatam melhoras?",
    tint: "from-primary/50 to-primary-glow/50",
  },
  {
    id: "evidence",
    icon: <FlaskConical className="w-5 h-5" strokeWidth={2.4} />,
    text: "O tratamento é baseado em evidências científicas?",
    tint: "from-primary-glow/60 to-primary/40",
  },
  {
    id: "safe",
    icon: <Leaf className="w-5 h-5" strokeWidth={2.4} />,
    text: "O método é seguro, suave, sem cirurgias e sem medicamentos?",
    tint: "from-primary-soft to-primary-glow/50",
  },
  {
    id: "preventive",
    icon: <ShieldCheck className="w-5 h-5" strokeWidth={2.4} />,
    text: "Realizamos acompanhamento preventivo da coluna ao longo da vida?",
    tint: "from-primary-deep/40 to-primary/50",
  },
];

interface DidYouKnowScreenProps {
  answers: Record<string, DidYouKnowAnswer>;
  onAnswer: (id: string, value: DidYouKnowAnswer) => void;
  onNext: () => void;
}

export const DidYouKnowScreen = ({ answers, onAnswer, onNext }: DidYouKnowScreenProps) => {
  const allAnswered = useMemo(
    () => STATEMENTS.every((s) => answers[s.id] === "yes" || answers[s.id] === "no"),
    [answers],
  );

  return (
    <ScreenContainer variant="warm">
      {/* Animated gradient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-primary/25 blur-3xl animate-float" />
        <div
          className="absolute top-1/3 -right-24 w-[380px] h-[380px] rounded-full bg-primary-glow/30 blur-3xl animate-float"
          style={{ animationDelay: "1.2s" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[320px] h-[320px] rounded-full bg-primary-soft blur-3xl animate-float"
          style={{ animationDelay: "2.4s" }}
        />
      </div>

      <div className="relative flex-1 flex flex-col gap-6 pt-6">
        <ChatBubble mood="thinking">
          <span className="font-semibold">Você sabia que…</span>
          <br />
          <span className="text-muted-foreground text-base">Leia cada afirmação e marque sua resposta.</span>
        </ChatBubble>

        <div className="space-y-4 mt-2">
          {STATEMENTS.map((s, idx) => {
            const value = answers[s.id] ?? null;
            return (
              <div
                key={s.id}
                className="animate-slide-in-up"
                style={{ animationDelay: `${180 + idx * 110}ms`, animationFillMode: "backwards" }}
              >
                <StatementCard statement={s} value={value} onAnswer={(v) => onAnswer(s.id, v)} />
              </div>
            );
          })}
        </div>
      </div>

      <NextButton onClick={onNext} disabled={!allAnswered} />
    </ScreenContainer>
  );
};

/* ---------------- Card ---------------- */

interface StatementCardProps {
  statement: Statement;
  value: DidYouKnowAnswer;
  onAnswer: (v: DidYouKnowAnswer) => void;
}

const StatementCard = ({ statement, value, onAnswer }: StatementCardProps) => {
  return (
    <div
      className={cn(
        "group relative rounded-3xl p-[1.5px] transition-all duration-500 ease-out-soft",
        "bg-gradient-to-br",
        value
          ? "from-primary/60 via-primary-glow/40 to-primary/30 shadow-elevated"
          : "from-white/80 via-white/40 to-white/10 hover:from-primary/30 hover:via-primary-glow/20 hover:to-white/40",
      )}
    >
      <div
        className={cn(
          "glass-card rounded-[calc(1.5rem-1.5px)] px-4 py-4 md:px-5 md:py-5",
          "flex items-center gap-3 md:gap-4",
          "transition-transform duration-500 ease-out-soft",
          "group-hover:-translate-y-0.5",
        )}
      >
        {/* Icon with gradient halo */}
        <div className="relative shrink-0">
          <div
            className={cn(
              "absolute inset-0 rounded-2xl blur-md opacity-70 bg-gradient-to-br transition-opacity duration-500",
              statement.tint,
              value && "opacity-100",
            )}
          />
          <div
            className={cn(
              "relative w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center",
              "bg-white/70 backdrop-blur-md border border-white/60 text-primary-deep",
              "transition-transform duration-500 ease-out-soft",
              value && "scale-105",
            )}
          >
            {statement.icon}
          </div>
        </div>

        {/* Statement */}
        <p className="flex-1 text-sm md:text-[15px] leading-snug text-foreground/90 text-balance">
          {statement.text}
        </p>

        {/* Segmented Sim / Não */}
        <SegmentedYesNo value={value} onChange={onAnswer} />
      </div>
    </div>
  );
};

/* ---------------- Segmented control ---------------- */

interface SegmentedYesNoProps {
  value: DidYouKnowAnswer;
  onChange: (v: DidYouKnowAnswer) => void;
}

const SegmentedYesNo = ({ value, onChange }: SegmentedYesNoProps) => {
  return (
    <div
      className={cn(
        "relative shrink-0 flex items-center p-1 rounded-full",
        "bg-white/50 backdrop-blur-md border border-white/60",
        "shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),inset_0_-1px_2px_rgba(0,0,0,0.04)]",
      )}
    >
      {/* Sliding pill */}
      <div
        aria-hidden
        className={cn(
          "absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full transition-all duration-400 ease-out-soft",
          "bg-gradient-to-br from-primary to-primary-deep shadow-soft",
          value === "yes" && "left-1 opacity-100",
          value === "no" && "left-[calc(50%+0rem)] opacity-100",
          !value && "opacity-0 scale-90 left-1",
        )}
        style={{ transitionDuration: "350ms" }}
      />

      <PillButton active={value === "yes"} onClick={() => onChange("yes")} label="Sim">
        <Check className="w-3.5 h-3.5" strokeWidth={3} />
      </PillButton>
      <PillButton active={value === "no"} onClick={() => onChange("no")} label="Não">
        <X className="w-3.5 h-3.5" strokeWidth={3} />
      </PillButton>
    </div>
  );
};

const PillButton = ({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "relative z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold",
      "transition-colors duration-300",
      active ? "text-primary-foreground" : "text-foreground/60 hover:text-primary-deep",
    )}
  >
    <span
      className={cn(
        "inline-flex transition-transform duration-300",
        active && "animate-check-pop",
      )}
    >
      {children}
    </span>
    {label}
  </button>
);
