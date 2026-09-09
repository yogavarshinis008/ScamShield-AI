import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useState } from 'react';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gradient-to-br from-navy-900 to-navy-800">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-6">
            <Outlet />
          </div>
        </main>
        <footer className="border-t border-white/10 bg-navy-900/50 px-4 md:px-6 py-4 text-center text-sm text-gray-400">
          <p>🛡️ ScamShield AI provides automated risk assessments for awareness and educational purposes. Results are not guaranteed.</p>
        </footer>
      </div>
    </div>
  );
}
