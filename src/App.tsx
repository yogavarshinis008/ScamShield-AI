import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MessageScanner from './pages/MessageScanner';
import WebsiteScanner from './pages/WebsiteScanner';
import ShoppingProtection from './pages/ShoppingProtection';
import ScanHistory from './pages/ScanHistory';
import ScamReports from './pages/ScamReports';
import SafetyCenter from './pages/SafetyCenter';
import Profile from './pages/Profile';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      useAuthStore.setState({ 
        user: JSON.parse(savedUser), 
        isAuthenticated: true 
      });
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          <p className="mt-4 text-cyan-400 font-semibold">ScamShield AI Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/message-scanner" element={<MessageScanner />} />
            <Route path="/website-scanner" element={<WebsiteScanner />} />
            <Route path="/shopping-protection" element={<ShoppingProtection />} />
            <Route path="/scan-history" element={<ScanHistory />} />
            <Route path="/scam-reports" element={<ScamReports />} />
            <Route path="/safety-center" element={<SafetyCenter />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
