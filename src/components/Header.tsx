import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, Search } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="border-b border-white/10 bg-navy-900/50 backdrop-blur px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
          >
            <Menu className="w-5 h-5 text-gray-300" />
          </button>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search scans..."
              className="bg-transparent text-sm text-gray-300 placeholder-gray-500 outline-none w-40"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-xs text-green-300 font-medium">Protection Active</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg transition"
            >
              <img
                src={user?.avatar}
                alt={user?.username}
                className="w-8 h-8 rounded-full border border-cyan-400/50"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-200">{user?.username}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 glassmorphism rounded-lg shadow-xl z-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-red-300 hover:bg-red-500/20 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
