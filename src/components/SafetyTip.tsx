import { AlertCircle, CheckCircle, Info } from 'lucide-react';

interface SafetyTipProps {
  title: string;
  description: string;
  type?: 'warning' | 'tip' | 'info';
}

export default function SafetyTip({ title, description, type = 'tip' }: SafetyTipProps) {
  const icons = {
    warning: <AlertCircle className="w-6 h-6" />,
    tip: <CheckCircle className="w-6 h-6" />,
    info: <Info className="w-6 h-6" />,
  };

  const styles = {
    warning: 'bg-red-500/20 border-red-500/50 text-red-300',
    tip: 'bg-green-500/20 border-green-500/50 text-green-300',
    info: 'bg-blue-500/20 border-blue-500/50 text-blue-300',
  };

  return (
    <div className={`glassmorphism p-6 rounded-lg border ${styles[type]}`}>
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-1">{icons[type]}</div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-sm opacity-90 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
