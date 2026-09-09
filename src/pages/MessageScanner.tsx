import { useState } from 'react';
import { useScanStore } from '../store/scanStore';
import { analyzeMessage } from '../utils/aiAnalysis';
import { MessageSquare, Send, AlertTriangle } from 'lucide-react';
import RiskScoreIndicator from '../components/RiskScoreIndicator';
import WarningCard from '../components/WarningCard';

const exampleMessages = [
  'Congratulations! You have won a cash prize. Click the link immediately to claim your reward: bit.ly/claim',
  'Your bank account has been locked. Verify your identity now: verify-bank.com',
  'Hi, how are you doing today?',
  'Urgent! Your package is held. Pay customs fee here: shipping-fee.xyz',
];

export default function MessageScanner() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { addScan } = useScanStore();

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setTimeout(() => {
      const analysis = analyzeMessage(message);
      setResult(analysis);

      // Save to history
      addScan({
        id: Date.now().toString(),
        type: 'message',
        content: message.substring(0, 100),
        riskScore: analysis.riskScore,
        riskLevel: analysis.riskScore < 30 ? 'low' : analysis.riskScore < 70 ? 'medium' : 'high',
        indicators: Object.entries(analysis.indicators)
          .filter(([, value]) => value)
          .map(([key]) => key.replace(/_/g, ' ')),
        explanation: analysis.explanation,
        recommendation: analysis.recommendation,
        timestamp: new Date(),
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Message Scanner</h1>
        <p className="text-gray-400">Analyze SMS, WhatsApp, Email, or Social Media messages for scam indicators</p>
      </div>

      {/* Input Section */}
      <div className="glassmorphism-strong p-8 rounded-lg border border-white/10">
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Paste your message here:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Paste the suspicious message..."
              className="w-full h-32 bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!message.trim() || loading}
              className="flex-1 md:flex-none gradient-button text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Analyzing...' : (
                <>
                  <Send className="w-5 h-5" />
                  Analyze Message
                </>
              )}
            </button>

            {/* Quick Examples */}
            <div className="hidden md:block text-sm text-gray-400">Try an example:</div>
            <select
              onChange={(e) => setMessage(e.target.value)}
              className="hidden md:block bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-cyan-400/50 transition"
              defaultValue=""
            >
              <option value="">Select example message</option>
              {exampleMessages.map((msg, i) => (
                <option key={i} value={msg}>
                  Example {i + 1}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Classification */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glassmorphism-strong p-6 rounded-lg border border-white/10 text-center">
              <p className="text-sm text-gray-400 mb-2">Classification</p>
              <p
                className={`text-2xl font-bold ${
                  result.classification === 'SAFE'
                    ? 'text-green-400'
                    : result.classification === 'SUSPICIOUS'
                    ? 'text-yellow-400'
                    : 'text-red-400'
                }`}
              >
                {result.classification}
              </p>
            </div>

            <div className="glassmorphism-strong p-6 rounded-lg border border-white/10 flex flex-col items-center justify-center">
              <RiskScoreIndicator score={result.riskScore} size="md" showLabel={true} />
            </div>

            <div className="glassmorphism-strong p-6 rounded-lg border border-white/10 text-center">
              <p className="text-sm text-gray-400 mb-2">Assessment</p>
              <p className="text-sm text-cyan-400 font-medium">Prototype AI Risk Assessment</p>
              <p className="text-xs text-gray-500 mt-2">Verify independently</p>
            </div>
          </div>

          {/* Detected Indicators */}
          <div className="glassmorphism-strong p-6 rounded-lg border border-white/10">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Detected Indicators
            </h3>
            <div className="space-y-3">
              {Object.entries(result.indicators).map(([key, value]) => (
                <div key={key} className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      value ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {value ? '✓' : '✓'}
                  </div>
                  <span className="text-gray-300">
                    {key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                  {value && <span className="ml-auto text-red-400 text-sm">Detected</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Explanation */}
          <div className="glassmorphism-strong p-6 rounded-lg border border-white/10">
            <h3 className="font-bold text-white mb-4">Why was this flagged?</h3>
            <p className="text-gray-300 leading-relaxed mb-4">{result.explanation}</p>
            <p className="text-xs text-gray-500 italic">
              ⚠️ AI assessment — verify independently before taking action.
            </p>
          </div>

          {/* Recommendation */}
          <WarningCard
            title="Safety Recommendation"
            message={result.recommendation}
            warnings={[]}
            severity={result.riskScore < 30 ? 'low' : result.riskScore < 70 ? 'medium' : 'high'}
          />
        </div>
      )}
    </div>
  );
}
