import { ChatBubble } from "@/components/ChatBubble";
import { NextButton } from "@/components/NextButton";
import { OptionCard } from "@/components/OptionCard";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Activity, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

interface ReasonScreenProps {
  name: string;
  value: "symptom" | "preventive" | null;
  onChange: (v: "symptom" | "preventive") => void;
  onNext: () => void;
}

export const ReasonScreen = ({ name, value, onChange, onNext }: ReasonScreenProps) => {
  const [showEmpathy, setShowEmpathy] = useState(false);

  useEffect(() => {
    if (value) {
      setShowEmpathy(false);
      const t = setTimeout(() => setShowEmpathy(true), 350);
      return () => clearTimeout(t);
    }
  }, [value]);

  const empathyMessage =
    value === "symptom"
      ? "Sentimos muito por isso. Estamos aqui pra te ajudar."
      : value === "preventive"
        ? "Que ótimo! Prevenção é o melhor caminho. 💪"
        : "";

  return (
    <ScreenContainer variant="warm">
      <div className="flex-1 flex flex-col gap-6 pt-8">
        <ChatBubble mood="thinking">
          Prazer, <strong>{name || "amigo(a)"}</strong>! <br />
          Por qual motivo você está aqui hoje?
        </ChatBubble>

        <div className="space-y-3 mt-2 animate-slide-in-up" style={{ animationDelay: "200ms" }}>
          <OptionCard
            selected={value === "symptom"}
            onClick={() => onChange("symptom")}
            icon={<Activity className="w-6 h-6" strokeWidth={2.2} />}
            title="Tenho um sintoma ou problema"
            description="Sinto dor ou desconforto na coluna"
          />
          <OptionCard
            selected={value === "preventive"}
            onClick={() => onChange("preventive")}
            icon={<ShieldCheck className="w-6 h-6" strokeWidth={2.2} />}
            title="Cuidado preventivo"
            description="Quero cuidar da minha coluna antes que algo aconteça"
          />
        </div>

        {showEmpathy && value && (
          <ChatBubble
            variant="empathy"
            mood={value === "symptom" ? "worried" : "happy"}
            className="mt-4"
          >
            {empathyMessage}
          </ChatBubble>
        )}
      </div>

      <NextButton onClick={onNext} disabled={!value} />
    </ScreenContainer>
  );
};
