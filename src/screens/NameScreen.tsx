import { ChatBubble } from "@/components/ChatBubble";
import { NextButton } from "@/components/NextButton";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Input } from "@/components/ui/input";

interface NameScreenProps {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
}

export const NameScreen = ({ value, onChange, onNext }: NameScreenProps) => {
  return (
    <ScreenContainer variant="warm">
      <div className="flex-1 flex flex-col gap-8 pt-8">
        <ChatBubble mood="happy">
          Olá! Eu sou o seu assistente da Sou Coluna. <br />
          Para começar, <strong>qual é o seu nome?</strong>
        </ChatBubble>

        <div className="px-2 animate-slide-in-up" style={{ animationDelay: "200ms" }}>
          <Input
            autoFocus
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Digite seu nome"
            className="h-16 text-xl md:text-2xl px-6 rounded-2xl border-2 border-border bg-card focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
            onKeyDown={(e) => {
              if (e.key === "Enter" && value.trim().length > 1) onNext();
            }}
          />
          <p className="text-xs text-muted-foreground mt-3 px-2">
            Pode ser só seu primeiro nome
          </p>
        </div>
      </div>

      <NextButton onClick={onNext} disabled={value.trim().length < 2} />
    </ScreenContainer>
  );
};
