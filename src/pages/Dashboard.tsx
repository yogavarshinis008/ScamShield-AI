import { useState, useMemo } from 'react';
import { useScanStore } from '../store/scanStore';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowRight, MessageSquare, Globe, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import ScanCard from '../components/ScanCard';

export default function Dashboard() {
  const { scans, getStats } = useScanStore();
  const stats = getStats();
  const recentScans = scans.slice(0, 5);

  const chartData = useMemo(() => {
    return [
      { name: 'Safe', value: stats.safe, fill: '#10b981' },
      { name: 'Suspicious', value: stats.suspicious, fill: '#f59e0b' },
      { name: 'High Risk', value: stats.highRisk, fill: '#ef4444' },
    ];
  }, [stats]);

  const typeData = useMemo(() => {
    const types = { message: 0, website: 0, shopping: 0 };
    scans.forEach((scan) => {
      types[scan.type]++;
    });
    return [
      { name: 'Messages', value: types.message },
      { name: 'Websites', value: types.website },
      { name: 'Shopping', value: types.shopping },
    ].filter((d) => d.value > 0);
  }, [scans]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Your cybersecurity overview and recent activity</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Scans"
          value={stats.total}
          icon={<MessageSquare className="w-6 h-6" />}
        />
        <StatCard
          title="Safe Results"
          value={stats.safe}
          icon={<Globe className="w-6 h-6" />}
          trend="up"
          trendValue="Good"
        />
        <StatCard
          title="Suspicious"
          value={stats.suspicious}
          icon={<ShoppingCart className="w-6 h-6" />}
        />
        <StatCard
          title="High Risk"
          value={stats.highRisk}
          icon={<MessageSquare className="w-6 h-6" />}
          trend="down"
          trendValue="Protected"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        {chartData.some((d) => d.value > 0) && (
          <div className="glassmorphism-strong p-6 rounded-lg border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Risk Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Scan Types */}
        {typeData.length > 0 && (
          <div className="glassmorphism-strong p-6 rounded-lg border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Scan Types</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={typeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(26, 37, 85, 0.8)', border: '1px solid rgba(34, 211, 238, 0.5)', borderRadius: '8px' }} />
                <Bar dataKey="value" fill="#22d3ee" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/message-scanner"
          className="glassmorphism-strong p-6 rounded-lg border border-white/10 hover:border-cyan-400/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-6 h-6 text-cyan-400" />
                <h3 className="font-bold text-white">Scan Message</h3>
              </div>
              <p className="text-sm text-gray-400">Check SMS, WhatsApp, Email</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition" />
          </div>
        </Link>

        <Link
          to="/website-scanner"
          className="glassmorphism-strong p-6 rounded-lg border border-white/10 hover:border-cyan-400/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-6 h-6 text-cyan-400" />
                <h3 className="font-bold text-white">Scan Website</h3>
              </div>
              <p className="text-sm text-gray-400">Verify website safety</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition" />
          </div>
        </Link>

        <Link
          to="/shopping-protection"
          className="glassmorphism-strong p-6 rounded-lg border border-white/10 hover:border-cyan-400/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="w-6 h-6 text-cyan-400" />
                <h3 className="font-bold text-white">Shopping Check</h3>
              </div>
              <p className="text-sm text-gray-400">Before payment analysis</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition" />
          </div>
        </Link>
      </div>

      {/* Recent Scans */}
      {recentScans.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Recent Scans</h2>
            <Link to="/scan-history" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentScans.map((scan) => (
              <ScanCard key={scan.id} scan={scan} onDelete={() => {}} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {stats.total === 0 && (
        <div className="glassmorphism-strong p-12 rounded-lg border border-white/10 text-center">
          <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">No scans yet</h3>
          <p className="text-gray-400 mb-6">Start by scanning a message, website, or shopping page</p>
          <div className="flex gap-3 justify-center">
            <Link to="/message-scanner" className="px-4 py-2 gradient-button text-white rounded-lg font-medium">
              Scan Message
            </Link>
            <Link to="/website-scanner" className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition">
              Scan Website
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
