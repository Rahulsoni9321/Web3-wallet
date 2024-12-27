import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProps {
  currentStep: number;
  steps: { title: string; description: string }[];
}

export function WalletStepper({ currentStep, steps }: StepProps) {
  return (
    <div className="relative">
      <div className="absolute left-0 top-[15px] w-full h-0.5 bg-muted"></div>
      <div className="relative flex justify-between ">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center relative z-10 transition-colors",
                currentStep > index + 1
                  ? "bg-primary text-primary-foreground"
                  : currentStep === index + 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {currentStep > index + 1 ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm font-medium">{step.title}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}