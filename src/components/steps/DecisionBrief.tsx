import { useState } from 'react';
import { generateDecisionBrief } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Download, 
  Printer,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  BarChart3 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function DecisionBrief() {
  const [generating, setGenerating] = useState(false);
  const [brief, setBrief] = useState<ReturnType<typeof generateDecisionBrief> | null>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setBrief(generateDecisionBrief());
    setGenerating(false);
  };

  if (!brief) {
    return (
      <div className="animate-fade-in">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-charcoal mb-2">
            STEP 6: DECISION BRIEF
          </h2>
          <p className="text-muted-foreground">
            Generate an auditable decision document with all findings.
          </p>
        </div>

        <div className="industrial-card text-center py-16">
          <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
          <h3 className="text-xl font-bold mb-2">Ready to Generate Brief</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The decision brief will compile all causal analysis findings into a 
            formal, exportable document with explicit assumptions and recommendations.
          </p>
          <Button
            onClick={handleGenerate}
            disabled={generating}
            variant={generating ? 'loading' : 'default'}
            size="xl"
          >
            {generating ? (
              <>
                <FileText className="w-5 h-5 animate-pulse" />
                GENERATING BRIEF...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                SIMULATE DECISION
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-charcoal mb-2">
            DECISION BRIEF
          </h2>
          <p className="text-muted-foreground">
            Auditable summary of causal analysis findings
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="w-4 h-4 mr-2" />
            PRINT
          </Button>
          <Button variant="industrial" size="sm">
            <Download className="w-4 h-4 mr-2" />
            EXPORT PDF
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="industrial-card border-l-8 border-l-primary mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="data-value text-xs text-muted-foreground">BRIEF ID</span>
            <p className="font-mono font-bold text-lg">{brief.id}</p>
          </div>
          <div className="text-right">
            <span className="data-value text-xs text-muted-foreground">GENERATED</span>
            <p className="font-mono">{brief.timestamp.toLocaleString()}</p>
          </div>
        </div>
        <div className="p-4 bg-muted border-2 border-border">
          <span className="text-xs font-bold uppercase text-muted-foreground">Causal Query</span>
          <p className="font-mono text-lg mt-1">
            Effect of <span className="text-primary font-bold">{brief.query.treatment}</span> on{' '}
            <span className="text-primary font-bold">{brief.query.outcome}</span>
          </p>
        </div>
      </div>

      {/* Causal Assumptions */}
      <div className="memo-section">
        <h3 className="text-lg font-extrabold uppercase mb-4">1. Causal Assumptions</h3>
        <div className="space-y-3">
          {brief.assumptions.map((assumption, i) => (
            <div
              key={i}
              className={cn(
                'flex items-start gap-3 p-3 border-2',
                assumption.verified 
                  ? 'bg-green-50 border-green-300' 
                  : 'bg-orange-50 border-orange-300'
              )}
            >
              {assumption.verified ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-sm font-medium">{assumption.text}</p>
                <span className={cn(
                  'text-xs font-bold uppercase mt-1 inline-block',
                  assumption.verified ? 'text-green-600' : 'text-orange-600'
                )}>
                  {assumption.verified ? 'VERIFIED' : 'REQUIRES SENSITIVITY ANALYSIS'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estimated Impact */}
      <div className="memo-section">
        <h3 className="text-lg font-extrabold uppercase mb-4">2. Estimated Impact</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {brief.estimatedImpact.map((impact, i) => (
            <div key={i} className="industrial-card">
              <span className="text-xs font-bold uppercase text-muted-foreground">
                {impact.metric}
              </span>
              <div className="mt-2 flex items-end gap-2">
                <span className="data-value text-sm text-muted-foreground line-through">
                  {typeof impact.baseline === 'number' && impact.baseline !== 0 
                    ? impact.baseline.toLocaleString() 
                    : '—'}
                </span>
                <span className={cn(
                  'data-value text-3xl',
                  impact.projected < impact.baseline ? 'text-primary' : 'text-green-600'
                )}>
                  {impact.metric.includes('Revenue') && impact.projected > 0 ? '+$' : ''}
                  {impact.projected.toLocaleString()}
                  {impact.metric.includes('Rate') ? '%' : ''}
                </span>
                {impact.projected < impact.baseline ? (
                  <TrendingDown className="w-5 h-5 text-primary" />
                ) : (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                )}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1 bg-muted">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${impact.confidence}%` }}
                  />
                </div>
                <span className="data-value text-xs text-muted-foreground">
                  {impact.confidence}% conf.
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monitoring Plan */}
      <div className="memo-section">
        <h3 className="text-lg font-extrabold uppercase mb-4">3. Monitoring Plan</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-charcoal text-white">
                <th className="p-3 text-left text-xs font-bold uppercase">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Metric
                  </div>
                </th>
                <th className="p-3 text-left text-xs font-bold uppercase">Frequency</th>
                <th className="p-3 text-left text-xs font-bold uppercase">Alert Threshold</th>
              </tr>
            </thead>
            <tbody>
              {brief.monitoringPlan.map((plan, i) => (
                <tr key={i} className={cn('border-b border-border', i % 2 === 0 && 'bg-muted/50')}>
                  <td className="p-3 font-medium">{plan.metric}</td>
                  <td className="p-3 data-value">{plan.frequency}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold">
                      {plan.threshold}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendation */}
      <div className="industrial-card border-4 border-primary bg-accent">
        <h3 className="text-lg font-extrabold uppercase mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-primary" />
          Final Recommendation
        </h3>
        <p className="text-lg font-medium leading-relaxed">{brief.recommendation}</p>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          This decision brief was generated by the Causality-Aware Decision Intelligence System.
          <br />
          All estimates are based on observational data and should be validated with experimental evidence.
        </p>
      </div>
    </div>
  );
}
