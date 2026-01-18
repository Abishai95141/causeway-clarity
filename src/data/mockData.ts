import { Silo, DataSource, DAGNode, DAGEdge, DecisionBrief } from '@/types/workflow';

export const silos: Silo[] = [
  {
    id: 'product',
    name: 'Product',
    kpi: 'Feature Adoption Rate',
    kpiValue: '23%',
    kpiTarget: '40%',
    status: 'conflict',
    icon: 'Box',
    description: 'Pushing aggressive feature rollouts to boost engagement',
  },
  {
    id: 'finance',
    name: 'Finance',
    kpi: 'Gross Margin',
    kpiValue: '18%',
    kpiTarget: '25%',
    status: 'conflict',
    icon: 'DollarSign',
    description: 'Recommending price increase to improve margins',
  },
  {
    id: 'growth',
    name: 'Growth',
    kpi: 'Customer Acquisition Cost',
    kpiValue: '$142',
    kpiTarget: '$95',
    status: 'conflict',
    icon: 'TrendingUp',
    description: 'Scaling paid channels despite rising costs',
  },
  {
    id: 'risk',
    name: 'Risk',
    kpi: 'Churn Probability',
    kpiValue: '34%',
    kpiTarget: '15%',
    status: 'conflict',
    icon: 'Shield',
    description: 'Flagging unsustainable growth patterns',
  },
];

export const dataSources: DataSource[] = [
  { id: 'ds1', name: 'User Behavior Logs', silo: 'product', merged: false },
  { id: 'ds2', name: 'Pricing Database', silo: 'finance', merged: false },
  { id: 'ds3', name: 'Marketing Spend', silo: 'growth', merged: false },
  { id: 'ds4', name: 'Churn Predictions', silo: 'risk', merged: false },
  { id: 'ds5', name: 'Customer Segments', silo: 'product', merged: false },
  { id: 'ds6', name: 'Revenue Pipeline', silo: 'finance', merged: false },
];

export const treatments = [
  'Price Increase (+15%)',
  'Feature Rollout (Premium Tier)',
  'Marketing Spend Cut (-30%)',
  'Retention Campaign Launch',
  'Product Bundle Offer',
];

export const outcomes = [
  'Customer Retention (90-day)',
  'Monthly Revenue',
  'Customer Lifetime Value',
  'Net Promoter Score',
  'Churn Rate',
];

export const dagNodes: DAGNode[] = [
  { id: 'price', label: 'Price Change', x: 50, y: 150, type: 'treatment' },
  { id: 'retention', label: 'Retention', x: 450, y: 150, type: 'outcome' },
  { id: 'satisfaction', label: 'Customer Satisfaction', x: 250, y: 50, type: 'confounder' },
  { id: 'usage', label: 'Product Usage', x: 250, y: 150, type: 'mediator' },
  { id: 'income', label: 'Customer Income', x: 150, y: 250, type: 'confounder' },
  { id: 'competition', label: 'Competitor Pricing', x: 350, y: 250, type: 'confounder' },
];

export const dagEdges: DAGEdge[] = [
  { from: 'price', to: 'usage', identified: false },
  { from: 'usage', to: 'retention', identified: false },
  { from: 'satisfaction', to: 'price', identified: false },
  { from: 'satisfaction', to: 'retention', identified: false },
  { from: 'income', to: 'price', identified: false },
  { from: 'income', to: 'retention', identified: false },
  { from: 'competition', to: 'retention', identified: false },
];

export const generateDecisionBrief = (): DecisionBrief => ({
  id: `BRIEF-${Date.now()}`,
  timestamp: new Date(),
  query: {
    treatment: 'Price Increase (+15%)',
    outcome: 'Customer Retention (90-day)',
    assumptions: [
      'Customer income distribution is measurable',
      'No unmeasured confounders between price and satisfaction',
      'Competitor pricing is stable during evaluation period',
    ],
  },
  assumptions: [
    { text: 'SUTVA: No interference between customer units', verified: true },
    { text: 'Positivity: All customer segments have price variation', verified: true },
    { text: 'Consistency: Price treatment is well-defined', verified: true },
    { text: 'No unmeasured confounding via satisfaction pathway', verified: false },
  ],
  estimatedImpact: [
    { metric: 'Retention Rate', baseline: 72.3, projected: 68.1, confidence: 85 },
    { metric: 'Revenue per Customer', baseline: 89.50, projected: 98.40, confidence: 92 },
    { metric: 'Net Revenue Impact', baseline: 0, projected: 142000, confidence: 78 },
  ],
  monitoringPlan: [
    { metric: 'Daily Churn Rate', frequency: 'Daily', threshold: '>1.2% triggers alert' },
    { metric: 'Customer Complaints', frequency: 'Weekly', threshold: '>15% increase' },
    { metric: 'Competitor Response', frequency: 'Bi-weekly', threshold: 'Price match detected' },
  ],
  recommendation: 'PROCEED WITH CAUTION: Estimated +$142K net revenue impact, but retention drop of 4.2pp requires active monitoring. Recommend A/B test on 20% of customer base before full rollout.',
});
