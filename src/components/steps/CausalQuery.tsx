import { useState } from 'react';
import { treatments, outcomes } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ArrowRight, Beaker, Target, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CausalQueryProps {
  onComplete: (query: { treatment: string; outcome: string; assumptions: string[] }) => void;
}

export function CausalQuery({ onComplete }: CausalQueryProps) {
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);
  const [assumptions, setAssumptions] = useState<string[]>([
    'No unmeasured confounders',
    'Treatment is well-defined',
  ]);
  const [newAssumption, setNewAssumption] = useState('');

  const addAssumption = () => {
    if (newAssumption.trim()) {
      setAssumptions([...assumptions, newAssumption.trim()]);
      setNewAssumption('');
    }
  };

  const removeAssumption = (index: number) => {
    setAssumptions(assumptions.filter((_, i) => i !== index));
  };

  const canProceed = selectedTreatment && selectedOutcome && assumptions.length > 0;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-charcoal mb-2">
          STEP 2: CAUSAL QUERY
        </h2>
        <p className="text-muted-foreground">
          Define the treatment-outcome relationship to analyze.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Treatment Selection */}
        <div className="industrial-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary text-primary-foreground">
              <Beaker className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Treatment</h3>
              <p className="text-xs text-muted-foreground">What intervention are we evaluating?</p>
            </div>
          </div>

          <div className="space-y-2">
            {treatments.map((treatment) => (
              <button
                key={treatment}
                onClick={() => setSelectedTreatment(treatment)}
                className={cn(
                  'w-full p-3 text-left border-2 transition-all text-sm font-medium',
                  selectedTreatment === treatment
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border hover:border-charcoal'
                )}
              >
                {treatment}
              </button>
            ))}
          </div>
        </div>

        {/* Outcome Selection */}
        <div className="industrial-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-charcoal text-white">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Outcome</h3>
              <p className="text-xs text-muted-foreground">What effect are we measuring?</p>
            </div>
          </div>

          <div className="space-y-2">
            {outcomes.map((outcome) => (
              <button
                key={outcome}
                onClick={() => setSelectedOutcome(outcome)}
                className={cn(
                  'w-full p-3 text-left border-2 transition-all text-sm font-medium',
                  selectedOutcome === outcome
                    ? 'bg-charcoal text-white border-charcoal'
                    : 'bg-background border-border hover:border-charcoal'
                )}
              >
                {outcome}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Assumptions */}
      <div className="industrial-card mt-8">
        <h3 className="font-bold text-lg mb-4">Causal Assumptions</h3>
        <p className="text-sm text-muted-foreground mb-6">
          List the key assumptions underlying this causal analysis.
        </p>

        <div className="space-y-3 mb-4">
          {assumptions.map((assumption, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-muted border border-border"
            >
              <span className="data-value text-xs text-muted-foreground">
                A{index + 1}
              </span>
              <span className="flex-1 text-sm">{assumption}</span>
              <button
                onClick={() => removeAssumption(index)}
                className="p-1 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newAssumption}
            onChange={(e) => setNewAssumption(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addAssumption()}
            placeholder="Add new assumption..."
            className="flex-1 p-3 border-2 border-border bg-background text-sm focus:outline-none focus:border-primary"
          />
          <Button onClick={addAssumption} variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Query Preview */}
      {selectedTreatment && selectedOutcome && (
        <div className="mt-8 p-6 bg-accent border-2 border-primary animate-fade-in">
          <h4 className="text-sm font-bold uppercase text-primary mb-2">Causal Query Defined</h4>
          <p className="font-mono text-lg">
            "What is the causal effect of{' '}
            <span className="text-primary font-bold">{selectedTreatment}</span>
            {' '}on{' '}
            <span className="text-primary font-bold">{selectedOutcome}</span>?"
          </p>
        </div>
      )}

      {canProceed && (
        <div className="mt-8 flex justify-end animate-fade-in">
          <Button
            onClick={() => onComplete({
              treatment: selectedTreatment!,
              outcome: selectedOutcome!,
              assumptions,
            })}
            size="lg"
          >
            PROCEED TO IDENTIFICATION
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
