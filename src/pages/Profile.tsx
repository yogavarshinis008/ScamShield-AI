import { useAuthStore } from '../store/authStore';
import { useScanStore } from '../store/scanStore';
import { User, Mail, LogOut, Trash2, Bell, Moon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuthStore();
  const { clearHistory, scans } = useScanStore();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to delete all scan history? This cannot be undone.')) {
      clearHistory();
      alert('Scan history cleared successfully.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Profile & Settings</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="glassmorphism-strong p-8 rounded-lg border border-white/10">
        <div className="flex items-center gap-6 mb-8">
          <img
            src={user?.avatar}
            alt={user?.username}
            className="w-24 h-24 rounded-full border-2 border-cyan-400 object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{user?.username}</h2>
            <p className="text-gray-400">{user?.email}</p>
            <p className="text-xs text-cyan-400 mt-2">Demo Account • Active Protection</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8 border-t border-white/10 pt-8">
          <div className="text-center">
            <p className="text-2xl font-bold text-cyan-400">{scans.length}</p>
            <p className="text-sm text-gray-400">Total Scans</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">{scans.filter(s => s.riskLevel === 'low').length}</p>
            <p className="text-sm text-gray-400">Safe Items</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-400">{scans.filter(s => s.riskLevel === 'high').length}</p>
            <p className="text-sm text-gray-400">High Risk</p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <div className="glassmorphism-strong p-6 rounded-lg border border-white/10">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyan-400" />
            Notifications
          </h3>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="w-5 h-5 rounded bg-white/10 border border-white/20 cursor-pointer accent-cyan-400"
            />
            <span className="text-gray-300 group-hover:text-white transition">High-risk scan alerts</span>
          </label>
          <p className="text-xs text-gray-500 mt-2">Receive notifications for suspicious findings</p>
        </div>

        {/* Theme Settings */}
        <div className="glassmorphism-strong p-6 rounded-lg border border-white/10">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Moon className="w-5 h-5 text-cyan-400" />
            Display
          </h3>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
              className="w-5 h-5 rounded bg-white/10 border border-white/20 cursor-pointer accent-cyan-400"
            />
            <span className="text-gray-300 group-hover:text-white transition">Dark mode (enabled)</span>
          </label>
          <p className="text-xs text-gray-500 mt-2">Protects your eyes during night browsing</p>
        </div>
      </div>

      {/* Account Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clear History */}
        <div className="glassmorphism-strong p-6 rounded-lg border border-red-500/30 hover:border-red-500/50 transition">
          <h3 className="font-bold text-white mb-2 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-400" />
            Clear Scan History
          </h3>
          <p className="text-sm text-gray-400 mb-4">Permanently delete all your scan records and history</p>
          <button
            onClick={handleClearHistory}
            className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg font-medium transition"
          >
            Clear All History
          </button>
        </div>

        {/* Logout */}
        <div className="glassmorphism-strong p-6 rounded-lg border border-orange-500/30 hover:border-orange-500/50 transition">
          <h3 className="font-bold text-white mb-2 flex items-center gap-2">
            <LogOut className="w-5 h-5 text-orange-400" />
            Sign Out
          </h3>
          <p className="text-sm text-gray-400 mb-4">End your current session and return to login</p>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 rounded-lg font-medium transition"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Privacy Info */}
      <div className="glassmorphism p-6 rounded-lg border border-blue-500/30">
        <h3 className="font-bold text-blue-300 mb-3">🔒 Privacy & Security</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>• Your scan data is stored locally in your browser</li>
          <li>• No financial information is collected or stored</li>
          <li>• This is a demo application for educational purposes</li>
          <li>• All data is cleared when you clear history</li>
          <li>• Your profile information is not shared</li>
        </ul>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-gray-500 pt-4">
        <p>ScamShield AI • v1.0.0</p>
        <p className="mt-1">Demo Application • Educational Purpose</p>
      </div>
    </div>
  );
}
