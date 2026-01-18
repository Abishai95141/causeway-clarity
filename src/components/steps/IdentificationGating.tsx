import { useState, useEffect } from 'react';
import { dagNodes, dagEdges } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ArrowRight, Scan, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IdentificationGatingProps {
  onComplete: () => void;
}

export function IdentificationGating({ onComplete }: IdentificationGatingProps) {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [identifiedEdges, setIdentifiedEdges] = useState<Set<string>>(new Set());
  const [backdoorPaths, setBackdoorPaths] = useState<string[]>([]);

  const handleIdentify = async () => {
    setScanning(true);
    setIdentifiedEdges(new Set());

    // Animate edge identification one by one
    for (let i = 0; i < dagEdges.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setIdentifiedEdges(prev => new Set([...prev, `${dagEdges[i].from}-${dagEdges[i].to}`]));
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    
    setBackdoorPaths([
      'Satisfaction → Price → Usage → Retention',
      'Income → Price → Usage → Retention',
    ]);
    
    setScanning(false);
    setScanned(true);
  };

  const getNodePosition = (id: string) => {
    const node = dagNodes.find(n => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  const nodeColors: Record<string, string> = {
    treatment: 'bg-primary text-primary-foreground border-primary',
    outcome: 'bg-charcoal text-white border-charcoal',
    confounder: 'bg-orange-500 text-white border-orange-600',
    mediator: 'bg-blue-500 text-white border-blue-600',
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-charcoal mb-2">
          STEP 3: IDENTIFICATION GATING
        </h2>
        <p className="text-muted-foreground">
          Analyze the causal structure to identify confounding paths.
        </p>
      </div>

      {/* DAG Visualization */}
      <div className="industrial-card relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg">Micro-DAG Analysis</h3>
          {!scanned && (
            <Button
              onClick={handleIdentify}
              disabled={scanning}
              variant={scanning ? 'loading' : 'default'}
            >
              {scanning ? (
                <>
                  <Scan className="w-4 h-4 animate-pulse" />
                  SCANNING PATHS...
                </>
              ) : (
                <>
                  <Scan className="w-4 h-4" />
                  IDENTIFY PATHS
                </>
              )}
            </Button>
          )}
        </div>

        <div className="relative h-[320px] bg-muted border-2 border-border">
          {/* SVG for edges */}
          <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  className="fill-charcoal"
                />
              </marker>
              <marker
                id="arrowhead-red"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  className="fill-primary"
                />
              </marker>
            </defs>
            {dagEdges.map((edge, index) => {
              const from = getNodePosition(edge.from);
              const to = getNodePosition(edge.to);
              const isIdentified = identifiedEdges.has(`${edge.from}-${edge.to}`);

              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={from.x + 60}
                  y1={from.y + 20}
                  x2={to.x}
                  y2={to.y + 20}
                  className={cn(
                    'transition-all duration-500 stroke-2',
                    isIdentified ? 'stroke-primary animate-flow-path' : 'stroke-charcoal'
                  )}
                  markerEnd={isIdentified ? 'url(#arrowhead-red)' : 'url(#arrowhead)'}
                  style={{
                    opacity: identifiedEdges.size > 0 && !isIdentified ? 0.3 : 1,
                  }}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {dagNodes.map((node) => (
            <div
              key={node.id}
              className={cn(
                'absolute dag-node transition-all duration-300',
                nodeColors[node.type],
                scanning && 'animate-pulse'
              )}
              style={{
                left: node.x,
                top: node.y,
              }}
            >
              {node.label}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary" />
            <span>Treatment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-charcoal" />
            <span>Outcome</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500" />
            <span>Confounder</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500" />
            <span>Mediator</span>
          </div>
        </div>
      </div>

      {/* Backdoor Paths */}
      {scanned && (
        <div className="mt-8 grid md:grid-cols-2 gap-6 animate-fade-in">
          <div className="industrial-card border-primary">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-primary" />
              <h4 className="font-bold">Backdoor Paths Identified</h4>
            </div>
            <ul className="space-y-2">
              {backdoorPaths.map((path, i) => (
                <li key={i} className="p-3 bg-primary/5 border border-primary/30 text-sm font-mono">
                  <span className="text-primary font-bold">PATH {i + 1}:</span> {path}
                </li>
              ))}
            </ul>
          </div>

          <div className="industrial-card">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <h4 className="font-bold">Identification Strategy</h4>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-300 text-sm">
                <span className="font-bold text-green-800">ADJUSTABLE:</span>
                <span className="ml-2 font-mono">Customer Income, Satisfaction</span>
              </div>
              <div className="p-3 bg-muted border border-border text-sm">
                <span className="font-bold">Method:</span>
                <span className="ml-2 font-mono">Backdoor Adjustment</span>
              </div>
              <div className="p-3 bg-muted border border-border text-sm">
                <span className="font-bold">Status:</span>
                <span className="ml-2 data-value text-green-600">IDENTIFIABLE</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {scanned && (
        <div className="mt-8 flex justify-end animate-fade-in">
          <Button onClick={onComplete} size="lg">
            PROCEED TO ESTIMATION
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
