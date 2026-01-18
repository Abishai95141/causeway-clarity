import { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { WorkflowStep } from '@/types/workflow';
import { cn } from '@/lib/utils';
import causewayIllustration from '@/assets/causeway-illustration.svg';

interface ActionInfoPanelProps {
  currentStep: WorkflowStep;
}

const stepInfo: Record<WorkflowStep, { title: string; action: string }> = {
  1: {
    title: 'UNIFY CONTEXT',
    action: 'Action: SLM is identifying semantic overlaps between Product and Finance datasets to create a shared feature space.',
  },
  2: {
    title: 'CAUSAL QUERY',
    action: 'Action: Translating natural language business questions into a formal (Treatment, Outcome, Confounder) triplet.',
  },
  3: {
    title: 'IDENTIFICATION GATING',
    action: 'Action: Evaluating the Micro-DAG for "Backdoor Paths". The SLM is blocking non-causal associations.',
  },
  4: {
    title: 'EFFECT ESTIMATION',
    action: 'Action: Running double-machine learning via EconML to isolate the true treatment effect.',
  },
  5: {
    title: 'EXPERIMENT PLANNER',
    action: 'Action: Calculating Value of Information (VoI) to suggest the smallest necessary test to resolve uncertainty.',
  },
  6: {
    title: 'DECISION BRIEF',
    action: 'Action: Synthesizing reasoning, data, and uncertainty into a human-auditable memo.',
  },
};

export function ActionInfoPanel({ currentStep }: ActionInfoPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Auto-open when step changes
  useEffect(() => {
    setIsOpen(true);
  }, [currentStep]);

  const info = stepInfo[currentStep];

  return (
    <>
      {/* Panel */}
      <div
        className={cn(
          'fixed right-0 top-20 z-40 w-80 max-w-[calc(100vw-2rem)] transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="m-4 bg-background/95 backdrop-blur-sm border-2 border-primary shadow-industrial-lg">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b-2 border-primary bg-primary/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                STEP {currentStep}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-primary/10 transition-colors"
            >
              <X className="w-4 h-4 text-primary" />
            </button>
          </div>

          {/* Title */}
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-primary">
              {info.title}
            </h3>
          </div>

          {/* Illustration */}
          <div className="px-4 py-3 border-b border-border flex justify-center">
            <img 
              src={causewayIllustration} 
              alt="Causeway workflow illustration" 
              className="w-32 h-32 object-contain"
            />
          </div>

          {/* Action Content */}
          <div className="px-4 py-4">
            <div className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="font-mono text-xs leading-relaxed text-charcoal">
                {info.action}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-border bg-muted/50">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-border overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${(currentStep / 6) * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">
                {currentStep}/6
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsed Indicator */}
      {!isOpen && (
        <div className="fixed right-0 top-36 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-3 text-[10px] font-bold uppercase tracking-wider hover:pr-4 transition-all"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            ACTION INFO
          </button>
        </div>
      )}
    </>
  );
}
