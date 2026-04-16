import { Mascot } from "@/components/Mascot";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface SuccessScreenProps {
  name: string;
  onRestart: () => void;
}

export const SuccessScreen = ({ name, onRestart }: SuccessScreenProps) => {
  return (
    <ScreenContainer variant="warm" contentClassName="items-center justify-center text-center">
      <div className="flex-1 flex flex-col items-center justify-center gap-6 max-w-md">
        <div className="relative">
          <div className="absolute inset-0 -z-10 blur-3xl opacity-50 bg-gradient-primary rounded-full" />
          <div className="relative w-28 h-28 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow animate-check-pop">
            <Check className="w-14 h-14 text-primary-foreground" strokeWidth={3} />
          </div>
        </div>

        <Mascot mood="celebrate" size="xl" />

        <div className="space-y-3 animate-slide-in-up">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Ficha enviada!
          </h1>
          <p className="text-lg text-muted-foreground text-balance">
            Obrigado, <strong className="text-primary-deep">{name || "amigo(a)"}</strong>!
            <br />Sua ficha já está com a equipe Sou Coluna. Em instantes você será chamado(a).
          </p>
        </div>

        <Button
          onClick={onRestart}
          variant="outline"
          size="lg"
          className="h-14 px-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-out-soft mt-4"
        >
          Nova Ficha
        </Button>
      </div>
    </ScreenContainer>
  );
};
