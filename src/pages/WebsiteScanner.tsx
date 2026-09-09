import { useState } from 'react';
import { useScanStore } from '../store/scanStore';
import { analyzeWebsite } from '../utils/aiAnalysis';
import { Globe, Search } from 'lucide-react';
import RiskScoreIndicator from '../components/RiskScoreIndicator';
import WarningCard from '../components/WarningCard';

const exampleURLs = [
  'https://example-banking-site.com',
  'https://amazon-deals.xyz',
  'https://google.com',
  'http://suspicious-site.tk',
];

export default function WebsiteScanner() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { addScan } = useScanStore();

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setTimeout(() => {
      const analysis = analyzeWebsite(url);
      setResult(analysis);

      addScan({
        id: Date.now().toString(),
        type: 'website',
        content: url,
        riskScore: analysis.riskScore,
        riskLevel: analysis.riskLevel,
        indicators: analysis.warnings,
        explanation: `Website analysis completed for ${url}`,
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
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Website Scanner</h1>
        <p className="text-gray-400">Check website safety and identify potential threats</p>
      </div>

      {/* Input Section */}
      <div className="glassmorphism-strong p-8 rounded-lg border border-white/10">
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Enter Website URL:</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!url.trim() || loading}
              className="flex-1 md:flex-none gradient-button text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Scanning...' : (
                <>
                  <Search className="w-5 h-5" />
                  Scan Website
                </>
              )}
            </button>

            {/* Quick Examples */}
            <div className="hidden md:block text-sm text-gray-400">Try an example:</div>
            <select
              onChange={(e) => setUrl(e.target.value)}
              className="hidden md:block bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-cyan-400/50 transition"
              defaultValue=""
            >
              <option value="">Select example URL</option>
              {exampleURLs.map((exUrl, i) => (
                <option key={i} value={exUrl}>
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
          {/* Risk Score */}
          <div className="glassmorphism-strong p-8 rounded-lg border border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-2">Website Risk Score</p>
                <p className="text-gray-300 mb-4">{result.url}</p>
              </div>
              <RiskScoreIndicator score={result.riskScore} size="lg" showLabel={true} />
            </div>
          </div>

          {/* Website Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glassmorphism p-4 rounded-lg border border-white/10">
              <p className="text-xs text-gray-500 mb-1">HTTPS Security</p>
              <p className={`font-bold ${
                result.https ? 'text-green-400' : 'text-red-400'
              }`}>
                {result.https ? '✓ Enabled' : '✗ Not Enabled'}
              </p>
            </div>
            <div className="glassmorphism p-4 rounded-lg border border-white/10">
              <p className="text-xs text-gray-500 mb-1">Domain Age</p>
              <p className="text-gray-300 font-bold">{result.domain_age}</p>
            </div>
            <div className="glassmorphism p-4 rounded-lg border border-white/10">
              <p className="text-xs text-gray-500 mb-1">Business Info</p>
              <p className={`font-bold ${
                result.business_info ? 'text-green-400' : 'text-yellow-400'
              }`}>
                {result.business_info ? '✓ Available' : '✗ Missing'}
              </p>
            </div>
            <div className="glassmorphism p-4 rounded-lg border border-white/10">
              <p className="text-xs text-gray-500 mb-1">Contact Info</p>
              <p className={`font-bold ${
                result.contact_info ? 'text-green-400' : 'text-yellow-400'
              }`}>
                {result.contact_info ? '✓ Available' : '✗ Missing'}
              </p>
            </div>
          </div>

          {/* Warning Signs */}
          {result.warnings.length > 0 && (
            <WarningCard
              title={`Detected ${result.warnings.length} Warning Sign${result.warnings.length > 1 ? 's' : ''}`}
              message="Review the potential issues below before visiting this website."
              warnings={result.warnings}
              severity={result.riskLevel}
            />
          )}

          {/* Recommendation */}
          <div className="glassmorphism-strong p-6 rounded-lg border border-white/10">
            <h3 className="font-bold text-white mb-4">Recommendation</h3>
            <p className="text-gray-300 mb-4">{result.recommendation}</p>
            <p className="text-xs text-gray-500 italic">
              ⚠️ AI assessment — Always verify independently before proceeding.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
