import { ScanResult } from '../types';
import { Trash2, Eye } from 'lucide-react';
import RiskScoreIndicator from './RiskScoreIndicator';

interface ScanCardProps {
  scan: ScanResult;
  onDelete: (id: string) => void;
  onView?: (scan: ScanResult) => void;
}

const typeLabels = {
  message: '📨 Message',
  website: '🌐 Website',
  shopping: '🛒 Shopping',
};

export default function ScanCard({ scan, onDelete, onView }: ScanCardProps) {
  return (
    <div className="glassmorphism-strong p-6 rounded-lg border border-white/10 hover:border-cyan-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{typeLabels[scan.type]}</span>
            <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
              {new Date(scan.timestamp).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-gray-400 truncate">{scan.content.substring(0, 60)}...</p>
        </div>
        <RiskScoreIndicator score={scan.riskScore} size="sm" showLabel={false} />
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-xs text-gray-500 font-medium">Detected Indicators:</p>
        <div className="flex flex-wrap gap-2">
          {scan.indicators.slice(0, 3).map((indicator, idx) => (
            <span key={idx} className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">
              {indicator}
            </span>
          ))}
          {scan.indicators.length > 3 && (
            <span className="text-xs bg-gray-500/20 text-gray-300 px-2 py-1 rounded">
              +{scan.indicators.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {onView && (
          <button
            onClick={() => onView(scan)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition text-cyan-300 text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
        )}
        <button
          onClick={() => onDelete(scan.id)}
          className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition text-red-300"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
