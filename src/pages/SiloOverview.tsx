import { silos } from '@/data/mockData';
import { SiloCard } from '@/components/SiloCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlertTriangle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StarburstBackground } from '@/components/StarburstBackground';

export default function SiloOverview() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b-2 border-charcoal relative overflow-hidden">
        <StarburstBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold uppercase tracking-wide text-primary">
                4 Silo Conflicts Detected
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-charcoal mb-6 leading-tight">
              Your Silos Are Making
              <br />
              <span className="text-primary">Locally Rational</span>
              <br />
              Decisions
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Each functional team optimizes for their own KPIs, creating conflicts that 
              harm overall business outcomes. The Causal Workflow Engine unifies context 
              to reveal the true impact of decisions.
            </p>
            <Link to="/workflow">
              <Button size="xl">
                START CAUSEWAY ANALYSIS
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Silo Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-charcoal">FUNCTIONAL SILOS</h2>
              <p className="text-muted-foreground">
                All silos showing KPI conflicts with global optimization targets
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary">REAL-TIME MONITORING</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {silos.map((silo) => (
              <SiloCard key={silo.id} silo={silo} />
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-charcoal text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold mb-6">THE SILO PROBLEM</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  <span className="text-primary font-bold">Finance</span> recommends a 15% price increase 
                  to improve margins, while <span className="text-primary font-bold">Risk</span> flags 
                  unsustainable churn patterns.
                </p>
                <p>
                  <span className="text-primary font-bold">Product</span> pushes aggressive feature 
                  rollouts, while <span className="text-primary font-bold">Growth</span> scales expensive 
                  acquisition channels.
                </p>
                <p className="text-lg font-medium text-white pt-4">
                  Each decision is <span className="text-primary">locally rational</span> but 
                  <span className="text-primary"> globally harmful</span>.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Conflicting Decisions', value: '12/week' },
                { label: 'Revenue at Risk', value: '$2.3M' },
                { label: 'Churn Increase', value: '+34%' },
                { label: 'CAC Inefficiency', value: '+49%' },
              ].map((stat, i) => (
                <div key={i} className="p-6 border-2 border-gray-700 bg-gray-800/50">
                  <p className="text-xs font-bold uppercase text-gray-400 mb-2">{stat.label}</p>
                  <p className="data-value text-3xl text-primary">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-charcoal mb-4">
            BREAK THE SILO CYCLE
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Use the 6-step Causal Workflow to unify context, identify true causal effects, 
            and make decisions grounded in evidence—not intuition.
          </p>
          <Link to="/workflow">
            <Button size="xl">
              LAUNCH CAUSEWAY ENGINE
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
