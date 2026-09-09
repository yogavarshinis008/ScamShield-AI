import { useState } from 'react';
import { useScanStore } from '../store/scanStore';
import { ScanResult } from '../types';
import { Trash2, Search, Filter, Eye, MoreVertical } from 'lucide-react';
import ScanCard from '../components/ScanCard';

type FilterType = 'all' | 'message' | 'website' | 'shopping';
type SortType = 'recent' | 'riskHigh' | 'riskLow';

export default function ScanHistory() {
  const { scans, deleteScan, clearHistory, getScanHistory } = useScanStore();
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScan, setSelectedScan] = useState<ScanResult | null>(null);

  const filteredScans = getScanHistory()
    .filter((scan) => (filter === 'all' ? true : scan.type === filter))
    .filter((scan) => scan.content.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'recent') return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      if (sort === 'riskHigh') return b.riskScore - a.riskScore;
      return a.riskScore - b.riskScore;
    });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Scan History</h1>
        <p className="text-gray-400">View all your previous scans and analysis results</p>
      </div>

      {/* Controls */}
      <div className="glassmorphism-strong p-6 rounded-lg border border-white/10 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search scans..."
            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'all'
                ? 'gradient-button text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('message')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'message'
                ? 'gradient-button text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => setFilter('website')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'website'
                ? 'gradient-button text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Websites
          </button>
          <button
            onClick={() => setFilter('shopping')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'shopping'
                ? 'gradient-button text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Shopping
          </button>
        </div>

        {/* Sort & Actions */}
        <div className="flex gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortType)}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-cyan-400/50 transition"
          >
            <option value="recent">Most Recent</option>
            <option value="riskHigh">Highest Risk</option>
            <option value="riskLow">Lowest Risk</option>
          </select>

          {scans.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all scan history?')) {
                  clearHistory();
                }
              }}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg font-medium transition"
            >
              Clear History
            </button>
          )}
        </div>
      </div>

      {/* Scans Grid */}
      {filteredScans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredScans.map((scan) => (
            <ScanCard
              key={scan.id}
              scan={scan}
              onDelete={deleteScan}
              onView={setSelectedScan}
            />
          ))}
        </div>
      ) : (
        <div className="glassmorphism-strong p-12 rounded-lg border border-white/10 text-center">
          <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">No scans found</h3>
          <p className="text-gray-400">Start by scanning a message, website, or shopping page</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedScan && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glassmorphism-strong max-w-2xl w-full max-h-96 overflow-y-auto rounded-lg border border-white/10 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Scan Details</h2>
              <button
                onClick={() => setSelectedScan(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Type</p>
                <p className="text-white font-bold capitalize">{selectedScan.type}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Content</p>
                <p className="text-gray-300">{selectedScan.content}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Risk Score</p>
                <p className="text-white font-bold">{selectedScan.riskScore}/100</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Explanation</p>
                <p className="text-gray-300">{selectedScan.explanation}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Recommendation</p>
                <p className="text-gray-300">{selectedScan.recommendation}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Date</p>
                <p className="text-gray-300">{new Date(selectedScan.timestamp).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
