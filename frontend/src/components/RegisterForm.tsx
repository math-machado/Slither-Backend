import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Lock, CreditCard, Calendar } from 'lucide-react';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpf: '',
    birth_date: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(formData);
      setSuccess(true);
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-green-500/30 text-center">
        <div className="text-green-400 text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-bold text-green-400 mb-2">Registration Successful!</h2>
        <p className="text-green-300">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-green-500/30">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-green-400 mb-2">Join the Game</h2>
        <p className="text-green-300">Create your account to start playing</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-green-300 text-sm font-medium mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-black/30 border border-green-500/50 rounded-lg text-white placeholder-green-400/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-green-300 text-sm font-medium mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-black/30 border border-green-500/50 rounded-lg text-white placeholder-green-400/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-green-300 text-sm font-medium mb-2">
            CPF
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-black/30 border border-green-500/50 rounded-lg text-white placeholder-green-400/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
              placeholder="000.000.000-00"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-green-300 text-sm font-medium mb-2">
            Birth Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-black/30 border border-green-500/50 rounded-lg text-white placeholder-green-400/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
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
          <User className="w-5 h-5" />
          <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-green-300">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-green-400 hover:text-green-300 font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};