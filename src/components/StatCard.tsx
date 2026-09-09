import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: 'up' | 'down';
  trendValue?: string;
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  trend,
  trendValue,
  className = '',
}: StatCardProps) {
  return (
    <div
      className={`glassmorphism-strong p-6 rounded-lg border border-white/10 hover:border-cyan-400/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20 ${
        className
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-cyan-300">{value}</p>
            {trend && trendValue && (
              <p className={`text-sm font-semibold ${
                trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {trend === 'up' ? '↑' : '↓'} {trendValue}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-cyan-500/20 border border-cyan-500/50">
          <div className="text-cyan-400">{icon}</div>
        </div>
      </div>
    </div>
  );
}
