import { Silo } from '@/types/workflow';
import { Box, DollarSign, TrendingUp, Shield, AlertTriangle } from 'lucide-react';

const iconMap = {
  Box,
  DollarSign,
  TrendingUp,
  Shield,
};

interface SiloCardProps {
  silo: Silo;
  onClick?: () => void;
}

export function SiloCard({ silo, onClick }: SiloCardProps) {
  const Icon = iconMap[silo.icon as keyof typeof iconMap];

  return (
    <div
      className="industrial-card cursor-pointer group kpi-alert transition-transform active:scale-[0.98]"
      onClick={onClick}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4 gap-2">
          <div className="p-2 md:p-3 bg-charcoal text-white flex-shrink-0">
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex items-center gap-1 md:gap-2 bg-primary/10 px-2 md:px-3 py-1 border border-primary">
            <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 text-primary flex-shrink-0" />
            <span className="text-[10px] md:text-xs font-bold text-primary uppercase">Conflict</span>
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-extrabold text-charcoal mb-2">{silo.name}</h3>
        <p className="text-xs md:text-sm text-muted-foreground mb-4 line-clamp-2">{silo.description}</p>

        <div className="border-t-2 border-border pt-4">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-[10px] md:text-xs font-semibold uppercase text-muted-foreground">
              {silo.kpi}
            </span>
          </div>
          <div className="flex items-baseline gap-2 md:gap-3 flex-wrap">
            <span className="data-value text-2xl md:text-3xl text-primary">{silo.kpiValue}</span>
            <span className="text-xs md:text-sm text-muted-foreground">
              target: <span className="data-value">{silo.kpiTarget}</span>
            </span>
          </div>
        </div>

        <div className="mt-4 h-2 bg-muted border border-charcoal overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{
              width: `${(parseFloat(silo.kpiValue.replace(/[^0-9.]/g, '')) / parseFloat(silo.kpiTarget.replace(/[^0-9.]/g, ''))) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
