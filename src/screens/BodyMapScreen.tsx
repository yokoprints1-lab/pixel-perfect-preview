import { BodyMap } from "@/components/BodyMap";
import { NextButton } from "@/components/NextButton";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";

interface BodyMapScreenProps {
  selected: string[];
  onToggle: (id: string) => void;
  onNext: () => void;
}

export const BodyMapScreen = ({ selected, onToggle, onNext }: BodyMapScreenProps) => {
  return (
    <ScreenContainer variant="scanner">
      {/* Subtle scanner grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative flex-1 flex flex-col text-scanner-fg">
        <div className="text-center space-y-2 animate-fade-in">
          <p className="text-xs uppercase tracking-[0.3em] text-scanner-fg/50">
            Body Scan · Posterior
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Marque as áreas afetadas</h2>
          <p className="text-sm text-scanner-fg/60">
            Toque nas regiões onde sente dor ou desconforto
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center py-6">
          <BodyMap selected={selected} onToggle={onToggle} />
        </div>

        {/* Scanner controls */}
        <div className="flex items-center justify-center gap-3 pb-2 animate-slide-in-up">
          <button className="glass-dark w-11 h-11 rounded-full flex items-center justify-center text-scanner-fg/80 hover:text-scanner-fg transition">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="glass-dark w-11 h-11 rounded-full flex items-center justify-center text-scanner-fg/80 hover:text-scanner-fg transition">
            <Minus className="w-5 h-5" />
          </button>
          <div className="glass-dark px-4 h-11 rounded-full flex items-center text-sm text-scanner-fg/80">
            {selected.length} selecionado{selected.length !== 1 ? "s" : ""}
          </div>
          <button className="glass-dark w-11 h-11 rounded-full flex items-center justify-center text-scanner-fg/80 hover:text-scanner-fg transition">
            <Plus className="w-5 h-5" />
          </button>
          <button className="glass-dark w-11 h-11 rounded-full flex items-center justify-center text-scanner-fg/80 hover:text-scanner-fg transition">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <NextButton onClick={onNext} disabled={selected.length === 0} />
    </ScreenContainer>
  );
};
