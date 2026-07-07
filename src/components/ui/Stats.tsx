import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  suffix?: string;
}

export function StatsCard({ title, value, change, trend = 'neutral', icon, suffix }: StatsCardProps) {
  const trendColors = {
    up: 'text-emerald-400',
    down: 'text-red-400',
    neutral: 'text-slate-400',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400 mb-1">{title}</p>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-bold text-white">{value}</p>
            {suffix && <span className="text-slate-400">{suffix}</span>}
          </div>
          {change && (
            <div className={`flex items-center gap-1 mt-1 ${trendColors[trend]}`}>
              <TrendIcon className="w-4 h-4" />
              <span className="text-sm">{change}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
