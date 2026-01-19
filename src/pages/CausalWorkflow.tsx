import { useState } from 'react';
import { WorkflowStep, CausalQuery } from '@/types/workflow';
import { WorkflowStepper } from '@/components/WorkflowStepper';
import { UnifyContext } from '@/components/steps/UnifyContext';
import { CausalQuery as CausalQueryStep } from '@/components/steps/CausalQuery';
import { IdentificationGating } from '@/components/steps/IdentificationGating';
import { EffectEstimation } from '@/components/steps/EffectEstimation';
import { ExperimentPlanner } from '@/components/steps/ExperimentPlanner';
import { DecisionBrief } from '@/components/steps/DecisionBrief';
import { ActionInfoPanel } from '@/components/ActionInfoPanel';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function CausalWorkflow() {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>(1);
  const [query, setQuery] = useState<CausalQuery | null>(null);

  const handleReset = () => {
    setCurrentStep(1);
    setQuery(null);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <UnifyContext onComplete={() => setCurrentStep(2)} />;
      case 2:
        return (
          <CausalQueryStep
            onComplete={(q) => {
              setQuery(q);
              setCurrentStep(3);
            }}
          />
        );
      case 3:
        return <IdentificationGating onComplete={() => setCurrentStep(4)} />;
      case 4:
        return <EffectEstimation onComplete={() => setCurrentStep(5)} />;
      case 5:
        return <ExperimentPlanner onComplete={() => setCurrentStep(6)} />;
      case 6:
        return <DecisionBrief />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-4 md:py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
          {/* Action Info Panel */}
          <ActionInfoPanel currentStep={currentStep} />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link to="/">
              <Button variant="outline" size="sm" className="min-h-[44px] sm:min-h-0">
                <ArrowLeft className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">BACK TO SILOS</span>
              </Button>
            </Link>
            <div className="flex-1 sm:flex-none">
              <h1 className="text-lg md:text-xl font-extrabold text-charcoal">CAUSEWAY WORKFLOW</h1>
              <p className="text-xs md:text-sm text-muted-foreground">
                6-step causal analysis
              </p>
            </div>
          </div>
          {currentStep > 1 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleReset}
              className="min-h-[44px] sm:min-h-0"
            >
              <RotateCcw className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">RESET</span>
            </Button>
          )}
        </div>

        {/* Stepper */}
        <div className="mb-8 md:mb-12 border-b border-border pb-4 md:pb-8">
          <WorkflowStepper
            currentStep={currentStep}
            onStepClick={(step) => step <= currentStep && setCurrentStep(step)}
          />
        </div>

        {/* Step Content */}
        <div className="max-w-5xl mx-auto">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
