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
    <div className="w-full py-6">
      <div className="flex items-start justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;
          const isClickable = step.number <= currentStep;

          return (
            <div
              key={step.number}
              className={cn(
                'flex flex-col items-center relative z-10 cursor-pointer transition-opacity',
                !isClickable && 'opacity-50 cursor-not-allowed'
              )}
              onClick={() => isClickable && onStepClick?.(step.number as WorkflowStep)}
            >
              <div
                className={cn(
                  'w-10 h-10 flex items-center justify-center border-2 font-mono font-bold text-sm transition-all',
                  isCompleted && 'bg-charcoal text-white border-charcoal',
                  isActive && 'bg-primary text-primary-foreground border-primary shadow-industrial animate-pulse-glow',
                  !isCompleted && !isActive && 'bg-background border-border text-muted-foreground'
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step.number}
              </div>
              <div className="mt-3 text-center">
                <p
                  className={cn(
                    'text-xs font-bold uppercase tracking-wide',
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
  );
}
