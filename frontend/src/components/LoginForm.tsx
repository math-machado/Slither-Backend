import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, LogIn } from 'lucide-react';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-green-500/30">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-green-400 mb-2">Welcome Back</h2>
        <p className="text-green-300">Sign in to continue playing</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-green-300 text-sm font-medium mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black/30 border border-green-500/50 rounded-lg text-white placeholder-green-400/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-green-300 text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black/30 border border-green-500/50 rounded-lg text-white placeholder-green-400/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-medium rounded-lg transition-colors"
        >
          <LogIn className="w-5 h-5" />
          <span>{loading ? 'Signing in...' : 'Sign In'}</span>
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-green-300">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-green-400 hover:text-green-300 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};