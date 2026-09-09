import { Link, useLocation } from 'react-router-dom';
import {
  Shield,
  Home,
  MessageSquare,
  Globe,
  ShoppingCart,
  History,
  AlertTriangle,
  Info,
  User,
  X,
  Menu,
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Message Scanner', href: '/message-scanner', icon: MessageSquare },
  { name: 'Website Scanner', href: '/website-scanner', icon: Globe },
  { name: 'Shopping Protection', href: '/shopping-protection', icon: ShoppingCart },
  { name: 'Scan History', href: '/scan-history', icon: History },
  { name: 'Scam Reports', href: '/scam-reports', icon: AlertTriangle },
  { name: 'Safety Center', href: '/safety-center', icon: Info },
  { name: 'Profile', href: '/profile', icon: User },
];

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="hidden max-md:block fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          open ? 'translate-x-0' : '-translate-x-full'
        } fixed md:relative w-64 h-screen bg-navy-900/80 backdrop-blur border-r border-white/10 flex flex-col transition-transform duration-300 z-50 md:z-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-cyan-400" />
            <span className="text-xl font-bold gradient-text">ScamShield</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/30 to-cyan-400/20 text-cyan-300 border border-cyan-400/50'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="glassmorphism p-4 rounded-lg text-center">
            <p className="text-xs text-gray-400 mb-2">Protection Status</p>
            <p className="text-sm font-semibold text-green-400">🟢 Active</p>
          </div>
        </div>
      </div>
    </>
  );
}
