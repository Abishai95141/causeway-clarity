import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, FlaskConical, AlertTriangle, Users, Calendar, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExperimentPlannerProps {
  onComplete: () => void;
}

export function ExperimentPlanner({ onComplete }: ExperimentPlannerProps) {
  const [planGenerated, setPlanGenerated] = useState(false);

  const handleGeneratePlan = () => {
    setPlanGenerated(true);
  };

  const dataPlan = [
    {
      variable: 'Customer Satisfaction Score',
      currentCoverage: '67%',
      requiredCoverage: '95%',
      priority: 'HIGH',
      source: 'Survey Integration',
    },
    {
      variable: 'Competitor Price Index',
      currentCoverage: '0%',
      requiredCoverage: '80%',
      priority: 'HIGH',
      source: 'Market API',
    },
    {
      variable: 'Usage Frequency (Daily)',
      currentCoverage: '89%',
      requiredCoverage: '95%',
      priority: 'MEDIUM',
      source: 'Product Analytics',
    },
    {
      variable: 'Income Bracket',
      currentCoverage: '45%',
      requiredCoverage: '70%',
      priority: 'MEDIUM',
      source: 'Third-party Enrichment',
    },
  ];

  const experimentDesign = {
    type: 'A/B Test with Stratified Randomization',
    duration: '6 weeks',
    sampleSize: '2,500 customers',
    groups: [
      { name: 'Control', size: '50%', treatment: 'Current pricing' },
      { name: 'Treatment', size: '50%', treatment: '+15% price increase' },
    ],
    stratification: ['Customer tenure', 'Usage tier', 'Geographic region'],
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-charcoal mb-2">
          STEP 5: EXPERIMENT PLANNER
        </h2>
        <p className="text-muted-foreground">
          Design a data collection and experimental validation plan.
        </p>
      </div>

      <div className="industrial-card mb-8">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          <h3 className="font-bold text-lg">Uncertainty Analysis</h3>
        </div>
        <div className="p-4 bg-orange-50 border-2 border-orange-300 mb-6">
          <p className="text-sm">
            <span className="font-bold text-orange-700">HIGH UNCERTAINTY DETECTED:</span>{' '}
            The estimated effect has a wide confidence interval (±1.9pp). 
            Additional data collection is recommended before full deployment.
          </p>
        </div>

        {!planGenerated ? (
          <div className="text-center py-8">
            <FlaskConical className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-6">
              Generate a minimal data collection plan to reduce uncertainty.
            </p>
            <Button onClick={handleGeneratePlan} size="lg">
              <FlaskConical className="w-5 h-5 mr-2" />
              GENERATE DATA PLAN
            </Button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <h4 className="font-bold mb-4">Minimal Data Collection Plan</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-charcoal text-white">
                    <th className="p-3 text-left text-xs font-bold uppercase">Variable</th>
                    <th className="p-3 text-left text-xs font-bold uppercase">Current</th>
                    <th className="p-3 text-left text-xs font-bold uppercase">Required</th>
                    <th className="p-3 text-left text-xs font-bold uppercase">Priority</th>
                    <th className="p-3 text-left text-xs font-bold uppercase">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPlan.map((row, i) => (
                    <tr key={i} className={cn('border-b border-border', i % 2 === 0 && 'bg-muted/50')}>
                      <td className="p-3 font-medium">{row.variable}</td>
                      <td className="p-3">
                        <span className={cn(
                          'data-value',
                          parseFloat(row.currentCoverage) < parseFloat(row.requiredCoverage) * 0.7
                            ? 'text-primary'
                            : 'text-green-600'
                        )}>
                          {row.currentCoverage}
                        </span>
                      </td>
                      <td className="p-3 data-value">{row.requiredCoverage}</td>
                      <td className="p-3">
                        <span className={cn(
                          'px-2 py-1 text-xs font-bold',
                          row.priority === 'HIGH' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        )}>
                          {row.priority}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {planGenerated && (
        <div className="industrial-card animate-fade-in">
          <h3 className="font-bold text-lg mb-6">Recommended Experiment Design</h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="p-4 bg-muted border-2 border-border">
              <div className="flex items-center gap-2 mb-2">
                <FlaskConical className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase text-muted-foreground">Design</span>
              </div>
              <p className="data-value text-sm">{experimentDesign.type}</p>
            </div>
            <div className="p-4 bg-muted border-2 border-border">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase text-muted-foreground">Duration</span>
              </div>
              <p className="data-value text-2xl">{experimentDesign.duration}</p>
            </div>
            <div className="p-4 bg-muted border-2 border-border">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase text-muted-foreground">Sample Size</span>
              </div>
              <p className="data-value text-2xl">{experimentDesign.sampleSize}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 border-2 border-border">
              <h4 className="font-bold mb-3">Test Groups</h4>
              {experimentDesign.groups.map((group, i) => (
                <div key={i} className={cn(
                  'p-3 mb-2 last:mb-0 border-l-4',
                  i === 0 ? 'border-charcoal bg-muted' : 'border-primary bg-primary/5'
                )}>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{group.name}</span>
                    <span className="data-value">{group.size}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{group.treatment}</p>
                </div>
              ))}
            </div>

            <div className="p-4 border-2 border-border">
              <h4 className="font-bold mb-3">Stratification Variables</h4>
              <ul className="space-y-2">
                {experimentDesign.stratification.map((variable, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="text-sm">{variable}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {planGenerated && (
        <div className="mt-8 flex justify-end animate-fade-in">
          <Button onClick={onComplete} size="lg">
            GENERATE DECISION BRIEF
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
