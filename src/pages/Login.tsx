import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Shield, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginAsDemo } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email, password);
      navigate('/dashboard');
      setLoading(false);
    }, 500);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      loginAsDemo();
      navigate('/dashboard');
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-cyan-400" />
            <span className="text-3xl font-bold gradient-text">ScamShield</span>
          </div>
          <p className="text-gray-400">AI-Powered Fraud Detection</p>
        </div>

        {/* Login Card */}
        <div className="glassmorphism-strong p-8 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Welcome Back</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-button text-white font-bold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in...' : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Demo Button */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-navy-900/80 text-gray-400">Or try</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full border border-cyan-400/50 text-cyan-300 font-bold py-3 rounded-lg hover:bg-cyan-400/10 transition disabled:opacity-50"
          >
            Try Demo Account
          </button>

          {/* Links */}
          <div className="mt-6 space-y-2 text-center text-sm">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <a href="/register" className="text-cyan-400 hover:text-cyan-300 font-medium">
                Sign up
              </a>
            </p>
            <a href="#" className="text-gray-500 hover:text-gray-400 block">
              Forgot password?
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          🛡️ This is a demo application for educational purposes
        </p>
      </div>
    </div>
  );
}
