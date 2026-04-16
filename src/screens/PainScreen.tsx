import { ChatBubble } from "@/components/ChatBubble";
import { NextButton } from "@/components/NextButton";
import { PainSpine } from "@/components/PainSpine";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Slider } from "@/components/ui/slider";
import { useMemo } from "react";

interface PainScreenProps {
  level: number;
  onChange: (v: number) => void;
  onNext: () => void;
}

const labelFor = (lvl: number) => {
  if (lvl === 0) return "Sem dor";
  if (lvl <= 2) return "Quase nada";
  if (lvl <= 4) return "Leve";
  if (lvl <= 6) return "Moderada";
  if (lvl <= 8) return "Forte";
  return "Insuportável";
};

const moodFor = (lvl: number): "happy" | "thinking" | "worried" => {
  if (lvl <= 3) return "happy";
  if (lvl <= 6) return "thinking";
  return "worried";
};

export const PainScreen = ({ level, onChange, onNext }: PainScreenProps) => {
  const label = useMemo(() => labelFor(level), [level]);
  const numberColor = useMemo(() => {
    if (level <= 3) return "text-success";
    if (level <= 6) return "text-warning";
    return "text-danger";
  }, [level]);

  return (
    <ScreenContainer variant="warm">
      <div className="flex-1 flex flex-col gap-6 pt-4">
        <ChatBubble mood={moodFor(level)}>
          De <strong>0 a 10</strong>, qual é a intensidade da sua dor agora?
        </ChatBubble>

        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <PainSpine level={level} />

          <div className="text-center">
            <div className={`text-7xl font-bold tabular-nums transition-colors duration-300 ${numberColor}`}>
              {level}
            </div>
            <div className="mt-1 text-lg font-medium text-muted-foreground">{label}</div>
          </div>

          <div className="w-full max-w-md px-4 space-y-3">
            <div className="relative h-3 rounded-full bg-gradient-pain opacity-90 shadow-inner" />
            <div className="-mt-[1.4rem]">
              <Slider
                value={[level]}
                min={0}
                max={10}
                step={1}
                onValueChange={(v) => onChange(v[0])}
                className="[&_[role=slider]]:h-9 [&_[role=slider]]:w-9 [&_[role=slider]]:bg-white [&_[role=slider]]:border-[3px] [&_[role=slider]]:border-primary [&_[role=slider]]:shadow-card [&_[data-orientation=horizontal]]:bg-transparent [&>span:first-child]:bg-transparent [&>span:first-child>span]:bg-transparent"
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground px-1">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
        </div>
      </div>

      <NextButton onClick={onNext} />
    </ScreenContainer>
  );
};
