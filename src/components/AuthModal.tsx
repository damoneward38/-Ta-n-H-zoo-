import React, { useState } from 'react';
import {
  X,
  LogIn,
  UserCheck,
  Lock,
  Mail,
  Shield,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { platformStore } from '../services/store';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  if (!isOpen) return null;

  const [email, setEmail] = useState('damoneward38@gmail.com');
  const [password, setPassword] = useState('313Damone');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = platformStore.login(email, password);
    if (res.success) {
      setError(null);
      onSuccess();
      onClose();
    } else {
      setError(res.message);
    }
  };

  const handleQuickAdminLogin = () => {
    platformStore.loginAsAdmin();
    setError(null);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Platform Authentication</h2>
              <p className="text-[11px] text-slate-400">תכנית הצופה (Taḥnīʿ Hâzoo)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Master Admin Quick Login Banner */}
        <div className="p-3.5 rounded-xl border border-cyan-500/40 bg-cyan-950/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              Pre-Configured Admin Account
            </span>
            <span className="text-[10px] font-mono text-cyan-400 uppercase bg-cyan-900/60 px-1.5 py-0.5 rounded">
              Ready
            </span>
          </div>
          <p className="text-[11px] text-slate-300">
            Log in directly as Master Admin <strong className="text-white">damoneward38@gmail.com</strong> with Enterprise permissions.
          </p>
          <button
            type="button"
            onClick={handleQuickAdminLogin}
            className="w-full py-2 px-3 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 rounded-lg shadow transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Quick-Login as Damone Ward (Admin)
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            Sign In with Credentials
          </button>
        </form>
      </div>
    </div>
  );
};
