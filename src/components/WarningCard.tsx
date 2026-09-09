import { AlertCircle } from 'lucide-react';

interface WarningCardProps {
  title: string;
  message: string;
  warnings: string[];
  severity?: 'low' | 'medium' | 'high';
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function WarningCard({
  title,
  message,
  warnings,
  severity = 'medium',
  action,
}: WarningCardProps) {
  const severityStyles = {
    low: 'bg-green-500/20 border-green-500/50 text-green-300',
    medium: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300',
    high: 'bg-red-500/20 border-red-500/50 text-red-300',
  };

  return (
    <div className={`glassmorphism-strong p-6 rounded-lg border ${severityStyles[severity]}`}>
      <div className="flex gap-4">
        <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-sm mb-4 opacity-90">{message}</p>
          {warnings.length > 0 && (
            <ul className="space-y-2 mb-4">
              {warnings.map((warning, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-lg leading-none">⚠️</span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          )}
          {action && (
            <button
              onClick={action.onClick}
              className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition font-medium text-sm"
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
