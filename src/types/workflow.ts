export interface Silo {
  id: string;
  name: string;
  kpi: string;
  kpiValue: string;
  kpiTarget: string;
  status: 'conflict' | 'aligned';
  icon: string;
  description: string;
}

export interface DataSource {
  id: string;
  name: string;
  silo: string;
  merged: boolean;
}

export interface CausalQuery {
  treatment: string;
  outcome: string;
  assumptions: string[];
}

export interface DAGNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'treatment' | 'outcome' | 'confounder' | 'mediator';
}

export interface DAGEdge {
  from: string;
  to: string;
  identified: boolean;
}

export interface DecisionBrief {
  id: string;
  timestamp: Date;
  query: CausalQuery;
  assumptions: { text: string; verified: boolean }[];
  estimatedImpact: {
    metric: string;
    baseline: number;
    projected: number;
    confidence: number;
  }[];
  monitoringPlan: {
    metric: string;
    frequency: string;
    threshold: string;
  }[];
  recommendation: string;
}

export type WorkflowStep = 1 | 2 | 3 | 4 | 5 | 6;
