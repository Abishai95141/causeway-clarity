import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Cpu, Activity, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EffectEstimationProps {
  onComplete: () => void;
}

export function EffectEstimation({ onComplete }: EffectEstimationProps) {
  const [calculating, setCalculating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<string>('');
  const [completed, setCompleted] = useState(false);
  const [results, setResults] = useState<{
    ate: number;
    ci: [number, number];
    pValue: number;
    samples: number;
  } | null>(null);

  const phases = [
    'Initializing causal engine...',
    'Loading unified context...',
    'Applying backdoor adjustment...',
    'Bootstrap resampling (1000 iterations)...',
    'Computing confidence intervals...',
    'Validating assumptions...',
    'Finalizing estimates...',
  ];

  const handleCalculate = async () => {
    setCalculating(true);
    setProgress(0);

    for (let i = 0; i <= 100; i += 2) {
      await new Promise(resolve => setTimeout(resolve, 60));
      setProgress(i);
      
      const phaseIndex = Math.floor((i / 100) * phases.length);
      setPhase(phases[Math.min(phaseIndex, phases.length - 1)]);
    }

    setResults({
      ate: -4.2,
      ci: [-6.1, -2.3],
      pValue: 0.002,
      samples: 12847,
    });

    setCalculating(false);
    setCompleted(true);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-charcoal mb-2">
          STEP 4: EFFECT ESTIMATION
        </h2>
        <p className="text-muted-foreground">
          Calculate the causal effect using the identified strategy.
        </p>
      </div>

      <div className="industrial-card">
        <div className="flex items-center gap-4 mb-8">
          <div className={cn(
            'p-4 transition-all duration-300',
            calculating ? 'bg-primary text-primary-foreground animate-pulse' : 'bg-charcoal text-white'
          )}>
            <Cpu className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-xl">Causal Engine</h3>
            <p className="text-sm text-muted-foreground">
              Doubly Robust Estimator with Bootstrap Confidence Intervals
            </p>
          </div>
        </div>

        {!calculating && !completed && (
          <div className="text-center py-12">
            <Activity className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-6">
              Ready to estimate the causal effect of the treatment on the outcome.
            </p>
            <Button onClick={handleCalculate} size="xl">
              <Cpu className="w-5 h-5 mr-2" />
              RUN ESTIMATION
            </Button>
          </div>
        )}

        {calculating && (
          <div className="py-8 animate-fade-in">
            <div className="progress-industrial mb-4">
              <div
                className="progress-industrial-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-mono text-muted-foreground">{phase}</span>
              <span className="data-value text-lg text-primary">{progress}%</span>
            </div>

            <div className="mt-8 grid grid-cols-4 gap-4">
              {['Bootstrap', 'Propensity', 'Outcome', 'Doubly Robust'].map((model, i) => (
                <div
                  key={model}
                  className={cn(
                    'p-3 border-2 text-center transition-all duration-300',
                    progress > (i + 1) * 20
                      ? 'bg-charcoal text-white border-charcoal'
                      : 'bg-muted border-border'
                  )}
                >
                  <span className="text-xs font-bold uppercase">{model}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {completed && results && (
          <div className="py-8 animate-scale-in">
            <div className="flex items-center gap-2 text-green-600 mb-6">
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-bold text-lg">ESTIMATION COMPLETE</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 bg-accent border-2 border-primary">
                <p className="text-xs font-bold uppercase text-muted-foreground mb-2">
                  Average Treatment Effect
                </p>
                <p className="data-value text-4xl text-primary">{results.ate}pp</p>
                <p className="text-xs text-muted-foreground mt-1">Retention Change</p>
              </div>

              <div className="p-6 bg-muted border-2 border-border">
                <p className="text-xs font-bold uppercase text-muted-foreground mb-2">
                  95% Confidence Interval
                </p>
                <p className="data-value text-2xl">
                  [{results.ci[0]}, {results.ci[1]}]
                </p>
                <p className="text-xs text-muted-foreground mt-1">Percentage Points</p>
              </div>

              <div className="p-6 bg-muted border-2 border-border">
                <p className="text-xs font-bold uppercase text-muted-foreground mb-2">
                  P-Value
                </p>
                <p className="data-value text-2xl text-green-600">{results.pValue}</p>
                <p className="text-xs text-muted-foreground mt-1">Statistically Significant</p>
              </div>

              <div className="p-6 bg-muted border-2 border-border">
                <p className="text-xs font-bold uppercase text-muted-foreground mb-2">
                  Sample Size
                </p>
                <p className="data-value text-2xl">{results.samples.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Customer Records</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-orange-50 border-2 border-orange-300">
              <p className="text-sm">
                <span className="font-bold text-orange-700">⚠ INTERPRETATION:</span>{' '}
                A 15% price increase is estimated to cause a{' '}
                <span className="data-value text-primary">{Math.abs(results.ate)}pp decrease</span>{' '}
                in 90-day retention. This effect is statistically significant (p {'<'} 0.01).
              </p>
            </div>
          </div>
        )}
      </div>

      {completed && (
        <div className="mt-8 flex justify-end animate-fade-in">
          <Button onClick={onComplete} size="lg">
            PROCEED TO EXPERIMENT PLAN
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
