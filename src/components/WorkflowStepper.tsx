import { WorkflowStep } from '@/types/workflow';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkflowStepperProps {
  currentStep: WorkflowStep;
  onStepClick?: (step: WorkflowStep) => void;
}

const steps = [
  { number: 1, title: 'Unify Context', description: 'Merge data silos' },
  { number: 2, title: 'Causal Query', description: 'Define treatment & outcome' },
  { number: 3, title: 'Identification', description: 'Analyze causal paths' },
  { number: 4, title: 'Estimation', description: 'Calculate effects' },
  { number: 5, title: 'Experiment Plan', description: 'Design data collection' },
  { number: 6, title: 'Decision Brief', description: 'Export findings' },
];

export function WorkflowStepper({ currentStep, onStepClick }: WorkflowStepperProps) {
  return (
    <div className="w-full py-4 md:py-6">
      {/* Mobile: Horizontal scroll container */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible">
        <div className="flex items-start justify-between relative min-w-[500px] md:min-w-0">
          {/* Progress line - hidden on mobile */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-border hidden md:block" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500 hidden md:block"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, index) => {
            const isCompleted = step.number < currentStep;
            const isActive = step.number === currentStep;
            const isClickable = step.number <= currentStep;

            return (
              <div
                key={step.number}
                className={cn(
                  'flex flex-col items-center relative z-10 cursor-pointer transition-opacity flex-shrink-0',
                  'min-w-[70px] md:min-w-0 md:flex-1',
                  !isClickable && 'opacity-50 cursor-not-allowed'
                )}
                onClick={() => isClickable && onStepClick?.(step.number as WorkflowStep)}
              >
                <div
                  className={cn(
                    'w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border-2 font-mono font-bold text-xs md:text-sm transition-all',
                    isCompleted && 'bg-charcoal text-white border-charcoal',
                    isActive && 'bg-primary text-primary-foreground border-primary shadow-industrial animate-pulse-glow',
                    !isCompleted && !isActive && 'bg-background border-border text-muted-foreground'
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : step.number}
                </div>
                <div className="mt-2 md:mt-3 text-center">
                  <p
                    className={cn(
                      'text-[10px] md:text-xs font-bold uppercase tracking-wide leading-tight',
                      isActive ? 'text-primary' : 'text-charcoal'
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 hidden md:block">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Mobile progress indicator */}
      <div className="mt-3 flex items-center gap-2 md:hidden">
        <div className="flex-1 h-1 bg-border overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          {currentStep}/{steps.length}
        </span>
      </div>
    </div>
  );
}
