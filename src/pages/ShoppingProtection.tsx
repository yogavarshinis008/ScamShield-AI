import { useState } from 'react';
import { useScanStore } from '../store/scanStore';
import { analyzeShoppingWebsite } from '../utils/aiAnalysis';
import { ShoppingCart, AlertTriangle } from 'lucide-react';
import RiskScoreIndicator from '../components/RiskScoreIndicator';
import WarningCard from '../components/WarningCard';

export default function ShoppingProtection() {
  const [formData, setFormData] = useState({
    url: '',
    productName: '',
    productPrice: '',
    sellerInfo: '',
    codAvailable: true,
    refundPolicy: true,
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { addScan } = useScanStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? !prev[name as keyof typeof formData] : value,
    }));
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url || !formData.productName || !formData.productPrice) return;

    setLoading(true);
    setTimeout(() => {
      const analysis = analyzeShoppingWebsite(
        formData.url,
        formData.productName,
        parseFloat(formData.productPrice),
        formData.sellerInfo,
        formData.codAvailable,
        formData.refundPolicy
      );
      setResult(analysis);

      addScan({
        id: Date.now().toString(),
        type: 'shopping',
        content: `${formData.productName} on ${formData.url}`,
        riskScore: analysis.riskScore,
        riskLevel: analysis.riskLevel,
        indicators: analysis.warnings,
        explanation: `Shopping safety analysis for ${formData.productName}`,
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
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Shopping Protection</h1>
        <p className="text-gray-400">Check website safety BEFORE making a payment</p>
      </div>

      {/* Form Section */}
      <div className="glassmorphism-strong p-8 rounded-lg border border-white/10">
        <form onSubmit={handleAnalyze} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Website URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Shopping Website URL</label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://shopping-site.com"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition"
                required
              />
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="e.g., iPhone 15 Pro"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition"
                required
              />
            </div>

            {/* Product Price */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Product Price</label>
              <input
                type="number"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleChange}
                placeholder="9999"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition"
                required
              />
            </div>

            {/* Seller Info */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Seller Information</label>
              <input
                type="text"
                name="sellerInfo"
                value={formData.sellerInfo}
                onChange={handleChange}
                placeholder="Company name or seller details"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4 border-t border-white/10 pt-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="codAvailable"
                checked={formData.codAvailable}
                onChange={handleChange}
                className="w-5 h-5 rounded bg-white/10 border border-white/20 cursor-pointer accent-cyan-400"
              />
              <span className="text-gray-300 group-hover:text-white transition">Cash on Delivery (COD) Available</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="refundPolicy"
                checked={formData.refundPolicy}
                onChange={handleChange}
                className="w-5 h-5 rounded bg-white/10 border border-white/20 cursor-pointer accent-cyan-400"
              />
              <span className="text-gray-300 group-hover:text-white transition">Clear Refund/Return Policy Available</span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-button text-white font-bold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? 'Analyzing...' : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Check Before Payment
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Main Alert */}
          {result.riskLevel === 'high' && (
            <div className="glassmorphism-strong p-8 rounded-lg border-2 border-red-500/50 bg-red-500/10">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-red-300 mb-2">🚨 HIGH RISK PAYMENT ALERT</h3>
                  <p className="text-red-200 mb-4">
                    We detected multiple warning signs on this shopping website. Please verify the seller and website before continuing with payment.
                  </p>
                  <div className="flex gap-3">
                    <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition">
                      Go Back
                    </button>
                    <button className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition">
                      Verify Website
                    </button>
                    <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition">
                      Continue Anyway
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Risk Score */}
          <div className="glassmorphism-strong p-8 rounded-lg border border-white/10">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-400 mb-4">Payment Safety Check</p>
              <RiskScoreIndicator score={result.riskScore} size="lg" showLabel={true} />
            </div>
          </div>

          {/* Analysis Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glassmorphism p-4 rounded-lg border border-white/10">
              <p className="text-xs text-gray-500 mb-2">SELLER INFORMATION</p>
              <p className={`font-bold ${
                result.seller_info ? 'text-green-400' : 'text-yellow-400'
              }`}>
                {result.seller_info ? '✓ Available' : '✗ Missing'}
              </p>
            </div>
            <div className="glassmorphism p-4 rounded-lg border border-white/10">
              <p className="text-xs text-gray-500 mb-2">REFUND POLICY</p>
              <p className={`font-bold ${
                result.refund_policy ? 'text-green-400' : 'text-yellow-400'
              }`}>
                {result.refund_policy ? '✓ Clear' : '✗ Unclear'}
              </p>
            </div>
            <div className="glassmorphism p-4 rounded-lg border border-white/10">
              <p className="text-xs text-gray-500 mb-2">COD AVAILABLE</p>
              <p className={`font-bold ${
                result.cod_available ? 'text-green-400' : 'text-yellow-400'
              }`}>
                {result.cod_available ? '✓ Yes' : '✗ No'}
              </p>
            </div>
            <div className="glassmorphism p-4 rounded-lg border border-white/10">
              <p className="text-xs text-gray-500 mb-2">WEBSITE SECURITY</p>
              <p className="text-cyan-400 font-bold">Checking...</p>
            </div>
          </div>

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <WarningCard
              title="Warning Signs Detected"
              message={`Found ${result.warnings.length} potential issue${result.warnings.length > 1 ? 's' : ''}`}
              warnings={result.warnings}
              severity={result.riskLevel}
            />
          )}

          {/* Recommendation */}
          <div className="glassmorphism-strong p-6 rounded-lg border border-white/10">
            <h3 className="font-bold text-white mb-4">Recommendation</h3>
            <p className="text-gray-300">{result.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
