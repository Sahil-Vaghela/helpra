interface ProgressStepperProps {
  currentStep: number;
  steps: string[];
}

export default function ProgressStepper({ currentStep, steps }: ProgressStepperProps) {
  return (
    <div className="flex items-center justify-between mb-8 relative">
      {/* Connector Line */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
      <div 
        className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-500"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      ></div>

      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div key={step} className="relative z-10 flex flex-col items-center gap-2">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                isActive 
                  ? 'bg-primary text-white scale-110' 
                  : 'bg-white border-2 border-gray-200 text-gray-400'
              } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}
            >
              {stepNumber}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${
              isActive ? 'text-primary' : 'text-gray-400'
            }`}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
