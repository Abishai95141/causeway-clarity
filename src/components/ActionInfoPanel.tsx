import { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { WorkflowStep } from '@/types/workflow';
import { cn } from '@/lib/utils';

// Step-specific illustrations
import stepUnifyContext from '@/assets/step-unify-context.svg';
import stepCausalQuery from '@/assets/step-causal-query.svg';
import stepIdentification from '@/assets/step-identification.svg';
import stepEstimation from '@/assets/step-estimation.svg';
import stepExperiment from '@/assets/step-experiment.svg';
import stepDecisionBrief from '@/assets/step-decision-brief.svg';

interface ActionInfoPanelProps {
  currentStep: WorkflowStep;
}

const stepInfo: Record<WorkflowStep, { title: string; action: string; illustration: string }> = {
  1: {
    title: 'UNIFY CONTEXT',
    action: 'Action: SLM is identifying semantic overlaps between Product and Finance datasets to create a shared feature space.',
    illustration: stepUnifyContext,
  },
  2: {
    title: 'CAUSAL QUERY',
    action: 'Action: Translating natural language business questions into a formal (Treatment, Outcome, Confounder) triplet.',
    illustration: stepCausalQuery,
  },
  3: {
    title: 'IDENTIFICATION GATING',
    action: 'Action: Evaluating the Micro-DAG for "Backdoor Paths". The SLM is blocking non-causal associations.',
    illustration: stepIdentification,
  },
  4: {
    title: 'EFFECT ESTIMATION',
    action: 'Action: Running double-machine learning via EconML to isolate the true treatment effect.',
    illustration: stepEstimation,
  },
  5: {
    title: 'EXPERIMENT PLANNER',
    action: 'Action: Calculating Value of Information (VoI) to suggest the smallest necessary test to resolve uncertainty.',
    illustration: stepExperiment,
  },
  6: {
    title: 'DECISION BRIEF',
    action: 'Action: Synthesizing reasoning, data, and uncertainty into a human-auditable memo.',
    illustration: stepDecisionBrief,
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
        <div className="m-4 bg-background/95 backdrop-blur-sm border-2 border-primary shadow-industrial-lg overflow-hidden">
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

          {/* Title with integrated illustration */}
          <div className="relative px-4 py-4 border-b border-border bg-gradient-to-br from-primary/5 to-transparent">
            {/* Illustration as background overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-24 opacity-20 overflow-hidden">
              <img 
                src={info.illustration} 
                alt="" 
                className="w-full h-full object-cover object-left scale-150"
              />
            </div>
            <h3 className="relative text-sm font-extrabold uppercase tracking-wide text-primary z-10">
              {info.title}
            </h3>
          </div>

          {/* Illustration - properly integrated */}
          <div className="relative px-4 py-4 border-b border-border bg-gradient-to-b from-muted/30 to-transparent">
            <div className="flex items-center justify-center p-3 bg-white/50 rounded-lg border border-border/50 shadow-inner">
              <img 
                src={info.illustration} 
                alt={`${info.title} illustration`} 
                className="w-28 h-28 object-contain drop-shadow-sm"
              />
            </div>
          </div>

          {/* Action Content */}
          <div className="px-4 py-4 bg-gradient-to-t from-muted/20 to-transparent">
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
