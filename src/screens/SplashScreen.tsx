import { Mascot } from "@/components/Mascot";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen = ({ onStart }: SplashScreenProps) => {
  return (
    <ScreenContainer variant="warm" contentClassName="items-center justify-center text-center">
      <div className="flex-1 flex flex-col items-center justify-center gap-8 max-w-md">
        <div className="relative">
          <div className="absolute inset-0 -z-10 blur-3xl opacity-40 bg-gradient-primary rounded-full scale-90" />
          <Mascot mood="happy" size="xl" />
        </div>

        <div className="space-y-3 animate-slide-in-up">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-soft text-primary-deep text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Ficha Digital
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Sou <span className="text-primary">Coluna</span>
          </h1>
          <p className="text-lg text-muted-foreground text-balance">
            Vamos fazer sua ficha de atendimento de um jeito leve e rápido.
            É só uma conversa.
          </p>
        </div>

        <Button
          size="lg"
          onClick={onStart}
          className="h-14 px-10 rounded-full bg-gradient-primary hover:opacity-95 hover:scale-[1.02] text-base font-semibold shadow-elevated hover:shadow-glow transition-all duration-300 ease-out-soft animate-slide-in-up"
        >
          Iniciar
        </Button>

        <p className="text-xs text-muted-foreground/70 mt-2">
          Leva cerca de 8 minutos · Suas respostas são confidenciais
        </p>
      </div>
    </ScreenContainer>
  );
};
