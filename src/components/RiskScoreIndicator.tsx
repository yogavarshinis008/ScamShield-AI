import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface RiskScoreIndicatorProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function RiskScoreIndicator({
  score,
  size = 'md',
  showLabel = true,
}: RiskScoreIndicatorProps) {
  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: 'LOW', color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/50', icon: CheckCircle };
    if (score < 70) return { level: 'MEDIUM', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', icon: AlertTriangle };
    return { level: 'HIGH', color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/50', icon: AlertCircle };
  };

  const risk = getRiskLevel(score);
  const Icon = risk.icon;

  const sizes = {
    sm: 'w-12 h-12 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-20 h-20 text-lg',
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${
          sizes[size]
        } rounded-full flex items-center justify-center border-2 ${risk.bg} ${risk.border}`}
      >
        <div className="flex flex-col items-center">
          <span className={`font-bold ${risk.color}`}>{score}</span>
          {size !== 'sm' && <span className="text-xs text-gray-400">/100</span>}
        </div>
      </div>
      {showLabel && (
        <div className="flex items-center gap-1">
          <Icon className={`w-4 h-4 ${risk.color}`} />
          <span className={`text-sm font-semibold ${risk.color}`}>{risk.level}</span>
        </div>
      )}
    </div>
  );
}
