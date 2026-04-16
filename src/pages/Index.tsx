import { useState } from "react";
import { SplashScreen } from "@/screens/SplashScreen";
import { NameScreen } from "@/screens/NameScreen";
import { ReasonScreen } from "@/screens/ReasonScreen";
import { BodyMapScreen } from "@/screens/BodyMapScreen";
import { PainScreen } from "@/screens/PainScreen";
import { SuccessScreen } from "@/screens/SuccessScreen";

type Step = "splash" | "name" | "reason" | "body" | "pain" | "success";

interface FormState {
  name: string;
  reason: "symptom" | "preventive" | null;
  painAreas: string[];
  painLevel: number;
}

const initial: FormState = {
  name: "",
  reason: null,
  painAreas: [],
  painLevel: 5,
};

const Index = () => {
  const [step, setStep] = useState<Step>("splash");
  const [data, setData] = useState<FormState>(initial);

  const update = (patch: Partial<FormState>) => setData((d) => ({ ...d, ...patch }));

  const restart = () => {
    setData(initial);
    setStep("splash");
  };

  return (
    <main key={step}>
      {step === "splash" && <SplashScreen onStart={() => setStep("name")} />}
      {step === "name" && (
        <NameScreen
          value={data.name}
          onChange={(name) => update({ name })}
          onNext={() => setStep("reason")}
        />
      )}
      {step === "reason" && (
        <ReasonScreen
          name={data.name}
          value={data.reason}
          onChange={(reason) => update({ reason })}
          onNext={() => setStep(data.reason === "symptom" ? "body" : "pain")}
        />
      )}
      {step === "body" && (
        <BodyMapScreen
          selected={data.painAreas}
          onToggle={(id) =>
            update({
              painAreas: data.painAreas.includes(id)
                ? data.painAreas.filter((x) => x !== id)
                : [...data.painAreas, id],
            })
          }
          onNext={() => setStep("pain")}
        />
      )}
      {step === "pain" && (
        <PainScreen
          level={data.painLevel}
          onChange={(painLevel) => update({ painLevel })}
          onNext={() => setStep("success")}
        />
      )}
      {step === "success" && <SuccessScreen name={data.name} onRestart={restart} />}
    </main>
  );
};

export default Index;
