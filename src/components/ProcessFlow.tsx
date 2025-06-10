
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessFlowProps {
  currentStep: number;
  steps: string[];
  className?: string;
}

const ProcessFlow = ({ currentStep, steps, className }: ProcessFlowProps) => {
  return (
    <div className={cn("w-full py-8", className)}>
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-medium transition-all duration-300",
                    isCompleted && "bg-insurance-primary border-insurance-primary text-white",
                    isCurrent && "bg-insurance-primary border-insurance-primary text-white ring-4 ring-insurance-primary/20",
                    isUpcoming && "bg-background border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                
                {/* Step Label */}
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      "text-sm font-medium transition-colors",
                      (isCompleted || isCurrent) && "text-insurance-primary",
                      isUpcoming && "text-muted-foreground"
                    )}
                  >
                    {step}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-16 mx-4 transition-colors duration-300",
                    isCompleted && "bg-insurance-primary",
                    !isCompleted && "bg-muted-foreground/30"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessFlow;
