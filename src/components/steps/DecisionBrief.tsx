import { useState } from 'react';
import { generateDecisionBrief } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  CheckCircle2, 
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
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-extrabold text-charcoal mb-2">
            STEP 6: DECISION BRIEF
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Generate an auditable decision document with all findings.
          </p>
        </div>

        <div className="industrial-card text-center py-12 md:py-16">
          <FileText className="w-12 h-12 md:w-16 md:h-16 mx-auto text-muted-foreground mb-4 md:mb-6" />
          <h3 className="text-lg md:text-xl font-bold mb-2">Ready to Generate Brief</h3>
          <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto px-4">
            The decision brief will compile all causal analysis findings into a 
            formal, exportable document with explicit assumptions and recommendations.
          </p>
          <Button
            onClick={handleGenerate}
            disabled={generating}
            variant={generating ? 'loading' : 'default'}
            size="xl"
            className="min-h-[44px]"
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
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-charcoal mb-2">
            DECISION BRIEF
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Auditable summary of causal analysis findings
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none min-h-[44px]">
            <Printer className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">PRINT</span>
          </Button>
          <Button variant="industrial" size="sm" className="flex-1 sm:flex-none min-h-[44px]">
            <Download className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">EXPORT PDF</span>
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="industrial-card border-l-4 md:border-l-8 border-l-primary mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
          <div>
            <span className="data-value text-[10px] md:text-xs text-muted-foreground">BRIEF ID</span>
            <p className="font-mono font-bold text-sm md:text-lg">{brief.id}</p>
          </div>
          <div className="sm:text-right">
            <span className="data-value text-[10px] md:text-xs text-muted-foreground">GENERATED</span>
            <p className="font-mono text-sm md:text-base">{brief.timestamp.toLocaleString()}</p>
          </div>
        </div>
        <div className="p-3 md:p-4 bg-muted border-2 border-border">
          <span className="text-[10px] md:text-xs font-bold uppercase text-muted-foreground">Causal Query</span>
          <p className="font-mono text-sm md:text-lg mt-1">
            Effect of <span className="text-primary font-bold">{brief.query.treatment}</span> on{' '}
            <span className="text-primary font-bold">{brief.query.outcome}</span>
          </p>
        </div>
      </div>

      {/* Causal Assumptions */}
      <div className="memo-section">
        <h3 className="text-base md:text-lg font-extrabold uppercase mb-4">1. Causal Assumptions</h3>
        <div className="space-y-2 md:space-y-3">
          {brief.assumptions.map((assumption, i) => (
            <div
              key={i}
              className={cn(
                'flex items-start gap-2 md:gap-3 p-2 md:p-3 border-2',
                assumption.verified 
                  ? 'bg-green-50 border-green-300' 
                  : 'bg-orange-50 border-orange-300'
              )}
            >
              {assumption.verified ? (
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-xs md:text-sm font-medium">{assumption.text}</p>
                <span className={cn(
                  'text-[10px] md:text-xs font-bold uppercase mt-1 inline-block',
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
        <h3 className="text-base md:text-lg font-extrabold uppercase mb-4">2. Estimated Impact</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {brief.estimatedImpact.map((impact, i) => (
            <div key={i} className="industrial-card">
              <span className="text-[10px] md:text-xs font-bold uppercase text-muted-foreground">
                {impact.metric}
              </span>
              <div className="mt-2 flex items-end gap-2">
                <span className="data-value text-xs md:text-sm text-muted-foreground line-through">
                  {typeof impact.baseline === 'number' && impact.baseline !== 0 
                    ? impact.baseline.toLocaleString() 
                    : '—'}
                </span>
                <span className={cn(
                  'data-value text-2xl md:text-3xl',
                  impact.projected < impact.baseline ? 'text-primary' : 'text-green-600'
                )}>
                  {impact.metric.includes('Revenue') && impact.projected > 0 ? '+$' : ''}
                  {impact.projected.toLocaleString()}
                  {impact.metric.includes('Rate') ? '%' : ''}
                </span>
                {impact.projected < impact.baseline ? (
                  <TrendingDown className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                ) : (
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                )}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1 bg-muted">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${impact.confidence}%` }}
                  />
                </div>
                <span className="data-value text-[10px] md:text-xs text-muted-foreground">
                  {impact.confidence}% conf.
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monitoring Plan */}
      <div className="memo-section">
        <h3 className="text-base md:text-lg font-extrabold uppercase mb-4">3. Monitoring Plan</h3>
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <table className="w-full border-collapse min-w-[400px]">
            <thead>
              <tr className="bg-charcoal text-white">
                <th className="p-2 md:p-3 text-left text-[10px] md:text-xs font-bold uppercase">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-3 h-3 md:w-4 md:h-4" />
                    Metric
                  </div>
                </th>
                <th className="p-2 md:p-3 text-left text-[10px] md:text-xs font-bold uppercase">Frequency</th>
                <th className="p-2 md:p-3 text-left text-[10px] md:text-xs font-bold uppercase">Alert Threshold</th>
              </tr>
            </thead>
            <tbody>
              {brief.monitoringPlan.map((plan, i) => (
                <tr key={i} className={cn('border-b border-border', i % 2 === 0 && 'bg-muted/50')}>
                  <td className="p-2 md:p-3 font-medium text-xs md:text-sm">{plan.metric}</td>
                  <td className="p-2 md:p-3 data-value text-xs md:text-sm">{plan.frequency}</td>
                  <td className="p-2 md:p-3">
                    <span className="px-1.5 md:px-2 py-0.5 md:py-1 bg-primary/10 text-primary text-[10px] md:text-xs font-bold">
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
      <div className="industrial-card border-2 md:border-4 border-primary bg-accent">
        <h3 className="text-base md:text-lg font-extrabold uppercase mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
          Final Recommendation
        </h3>
        <p className="text-sm md:text-lg font-medium leading-relaxed">{brief.recommendation}</p>
      </div>

      <div className="mt-6 md:mt-8 text-center text-xs md:text-sm text-muted-foreground">
        <p>
          This decision brief was generated by the Causality-Aware Decision Intelligence System.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          All estimates are based on observational data and should be validated with experimental evidence.
        </p>
      </div>
    </div>
  );
}
