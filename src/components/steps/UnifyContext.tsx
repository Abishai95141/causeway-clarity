import { useState } from 'react';
import { DataSource } from '@/types/workflow';
import { dataSources as initialDataSources } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Database, ArrowRight, CheckCircle2, Merge } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UnifyContextProps {
  onComplete: () => void;
}

export function UnifyContext({ onComplete }: UnifyContextProps) {
  const [sources, setSources] = useState<DataSource[]>(initialDataSources);
  const [merging, setMerging] = useState(false);
  const [merged, setMerged] = useState(false);

  const siloColors: Record<string, string> = {
    product: 'bg-blue-100 border-blue-400 text-blue-800',
    finance: 'bg-green-100 border-green-400 text-green-800',
    growth: 'bg-purple-100 border-purple-400 text-purple-800',
    risk: 'bg-orange-100 border-orange-400 text-orange-800',
  };

  const handleMerge = async () => {
    setMerging(true);
    
    // Animate sources merging one by one
    for (let i = 0; i < sources.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setSources(prev => prev.map((s, idx) => 
        idx === i ? { ...s, merged: true } : s
      ));
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setMerging(false);
    setMerged(true);
  };

  const allMerged = sources.every(s => s.merged);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-charcoal mb-2">
          STEP 1: UNIFY CONTEXT
        </h2>
        <p className="text-muted-foreground">
          Consolidate fragmented data silos into a unified analytical context.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr,auto,1fr] gap-8 items-center">
        {/* Data Silos */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-4">
            Fragmented Data Silos
          </h3>
          {sources.map((source, idx) => (
            <div
              key={source.id}
              className={cn(
                'p-4 border-2 transition-all duration-500',
                siloColors[source.silo],
                source.merged && 'opacity-30 scale-95 translate-x-4'
              )}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5" />
                <div>
                  <p className="font-semibold text-sm">{source.name}</p>
                  <p className="text-xs opacity-70 uppercase">{source.silo} Silo</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrow / Merge Action */}
        <div className="flex flex-col items-center gap-4">
          {!merged && (
            <Button
              onClick={handleMerge}
              disabled={merging}
              variant={merging ? 'loading' : 'default'}
              size="lg"
              className="min-w-[180px]"
            >
              {merging ? (
                <>
                  <Merge className="w-5 h-5 animate-spin" />
                  MERGING...
                </>
              ) : (
                <>
                  <Merge className="w-5 h-5" />
                  UNIFY DATA
                </>
              )}
            </Button>
          )}
          <div className="flex items-center gap-2">
            <ArrowRight className={cn(
              'w-8 h-8 transition-all duration-500',
              allMerged ? 'text-primary' : 'text-muted-foreground'
            )} />
          </div>
        </div>

        {/* Unified Context */}
        <div
          className={cn(
            'industrial-card transition-all duration-500 min-h-[300px]',
            allMerged ? 'border-primary' : 'border-dashed border-muted-foreground'
          )}
        >
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-4">
            Unified Context
          </h3>
          
          {!allMerged ? (
            <div className="flex items-center justify-center h-48 text-muted-foreground">
              <p className="text-sm">Awaiting data consolidation...</p>
            </div>
          ) : (
            <div className="space-y-4 animate-scale-in">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-bold">CONTEXT UNIFIED</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {sources.map(source => (
                  <div
                    key={source.id}
                    className="p-2 bg-muted border border-charcoal text-xs"
                  >
                    <span className="data-value">{source.name}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Sources:</span>
                  <span className="data-value">{sources.length}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Data Quality:</span>
                  <span className="data-value text-primary">HIGH</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {allMerged && (
        <div className="mt-8 flex justify-end animate-fade-in">
          <Button onClick={onComplete} size="lg">
            PROCEED TO CAUSAL QUERY
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
