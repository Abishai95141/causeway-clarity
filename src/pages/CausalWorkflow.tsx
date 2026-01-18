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
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {/* Action Info Panel */}
          <ActionInfoPanel currentStep={currentStep} />

          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                BACK TO SILOS
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-extrabold text-charcoal">CAUSEWAY WORKFLOW ENGINE</h1>
              <p className="text-sm text-muted-foreground">
                6-step causal analysis process
              </p>
            </div>
          </div>
          {currentStep > 1 && (
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              RESET
            </Button>
          )}
        </div>

        {/* Stepper */}
        <div className="mb-12 border-b border-border pb-8">
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
