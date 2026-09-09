import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface ReportForm {
  type: 'website' | 'message' | 'shopping' | 'payment';
  identifier: string;
  description: string;
  warnings: string;
  date: string;
}

export default function ScamReports() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<ReportForm>({
    type: 'website',
    identifier: '',
    description: '',
    warnings: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        type: 'website',
        identifier: '',
        description: '',
        warnings: '',
        date: new Date().toISOString().split('T')[0],
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Report Scam</h1>
        <p className="text-gray-400">Help protect others by reporting suspicious websites and scams</p>
      </div>

      {/* Form */}
      <div className="glassmorphism-strong p-8 rounded-lg border border-white/10 max-w-2xl">
        {submitted ? (
          <div className="text-center py-12">
            <div className="inline-block p-3 bg-green-500/20 rounded-full mb-4">
              <AlertTriangle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-green-400 mb-2">Thank You!</h3>
            <p className="text-gray-300">
              Your report has been recorded for awareness purposes and will help us protect other users.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Scam Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type of Scam</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition"
              >
                <option value="website">Fraudulent Website</option>
                <option value="message">Scam Message</option>
                <option value="shopping">Fake Shopping Website</option>
                <option value="payment">Payment Fraud</option>
              </select>
            </div>

            {/* Identifier */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {formData.type === 'website' || formData.type === 'shopping' ? 'Website URL' : 'Sender/Identifier'}
              </label>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                placeholder={formData.type === 'website' ? 'https://scam-website.com' : 'Phone number or sender name'}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what happened and why you believe this is a scam..."
                rows={5}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition resize-none"
                required
              />
            </div>

            {/* Warning Signs */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Warning Signs Observed</label>
              <textarea
                name="warnings"
                value={formData.warnings}
                onChange={handleChange}
                placeholder="List any suspicious indicators (fake certificates, poor grammar, pressure tactics, etc.)..."
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition resize-none"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date of Incident</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition"
              />
            </div>

            {/* Important Note */}
            <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4">
              <p className="text-sm text-yellow-300">
                <strong>Important:</strong> Please do not include personal information, bank details, OTPs, or financial data in your report.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full gradient-button text-white font-bold py-3 rounded-lg hover:opacity-90 transition"
            >
              Submit Report
            </button>
          </form>
        )}
      </div>

      {/* Info Box */}
      <div className="glassmorphism p-6 rounded-lg border border-white/10">
        <h3 className="font-bold text-white mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          Report Guidelines
        </h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>✓ Be specific about what made it suspicious</li>
          <li>✓ Include dates and times if possible</li>
          <li>✓ Do not include sensitive financial information</li>
          <li>✓ Reports are reviewed for community awareness</li>
          <li>✓ Your report helps protect other users</li>
        </ul>
      </div>
    </div>
  );
}
