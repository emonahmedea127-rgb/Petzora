import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PawPrint, Lock, Mail, AlertCircle, Key, Database, CheckCircle2, ArrowRight } from 'lucide-react';
import { saveCustomSupabaseConfig, getSupabaseCredentials } from '../../lib/supabase';
import { SEO } from '../../components/SEO';

export const AdminLoginPage: React.FC = () => {
  const { user, signIn, signUp, isConfigured, refreshAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Setup accordion for entering Supabase Project details if not set in .env
  const [showConfig, setShowConfig] = useState(!isConfigured);
  const creds = getSupabaseCredentials();
  const [customUrl, setCustomUrl] = useState(creds.url || '');
  const [customKey, setCustomKey] = useState(creds.anonKey || '');
  const [configSuccess, setConfigSuccess] = useState(false);

  // If already authenticated, redirect to /admin or requested path
  React.useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    if (authMode === 'login') {
      const { error: loginError } = await signIn(email, password);
      setLoading(false);

      if (loginError) {
        setError(loginError);
      } else {
        const from = (location.state as any)?.from?.pathname || '/admin';
        navigate(from, { replace: true });
      }
    } else {
      const { error: signUpError, needsConfirmation } = await signUp(email, password);
      setLoading(false);

      if (signUpError) {
        setError(signUpError);
      } else if (needsConfirmation) {
        setSuccessMsg('Account created successfully! If email confirmation is enabled in your Supabase project, please check your inbox to confirm, then sign in.');
        setAuthMode('login');
      } else {
        // Automatically signed in!
        const from = (location.state as any)?.from?.pathname || '/admin';
        navigate(from, { replace: true });
      }
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.startsWith('https://') || !customKey) {
      setError('Please provide a valid Supabase project URL (https://...) and Anon key.');
      return;
    }
    saveCustomSupabaseConfig(customUrl, customKey);
    await refreshAuth();
    setConfigSuccess(true);
    setTimeout(() => setConfigSuccess(false), 4000);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col justify-center items-center p-4 sm:p-6 text-stone-100 font-sans antialiased">
      <SEO
        title="Admin Login – Petzora CMS"
        description="Petzora Editorial Content Management System Admin Login"
      />

      <div className="w-full max-w-md space-y-8">
        {/* Branding header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-orange-600 flex items-center justify-center text-white mx-auto shadow-xl shadow-orange-950">
            <PawPrint className="w-7 h-7 fill-white" />
          </div>
          <div>
            <h1 className="font-serif font-black text-2xl sm:text-3xl text-white tracking-tight">
              Petzora Editorial CMS
            </h1>
            <p className="text-xs font-mono text-stone-400 mt-1 uppercase tracking-widest">
              Authorized Publisher Access
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Mode Switcher */}
          <div className="flex rounded-xl bg-stone-950 p-1 border border-stone-800">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setError(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                authMode === 'login'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setError(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                authMode === 'signup'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 flex items-start gap-3 text-rose-200 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 flex items-start gap-3 text-emerald-200 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-1.5 font-semibold">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@petzora.shop"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white placeholder-stone-600 text-sm outline-none focus:border-orange-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-1.5 font-semibold">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white placeholder-stone-600 text-sm outline-none focus:border-orange-500 transition"
                />
              </div>
              {authMode === 'signup' && (
                <p className="text-[11px] text-stone-500 mt-1">
                  Password must be at least 6 characters.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-orange-950 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{authMode === 'login' ? 'Authenticating...' : 'Creating Account...'}</span>
                </>
              ) : (
                <>
                  <span>{authMode === 'login' ? 'Sign In to Dashboard' : 'Create Admin Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Supabase Connection Setup Accordion */}
          <div className="pt-4 border-t border-stone-800/80">
            <button
              type="button"
              onClick={() => setShowConfig(!showConfig)}
              className="w-full flex items-center justify-between text-xs text-stone-400 hover:text-stone-200 transition py-1"
            >
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-orange-400" />
                <span>Supabase Connection Settings</span>
              </div>
              <span className="font-mono text-[10px] text-stone-500">
                {isConfigured ? '✓ Configured' : '⚠ Action Needed'}
              </span>
            </button>

            {showConfig && (
              <form onSubmit={handleSaveConfig} className="mt-3 space-y-3 p-3.5 rounded-2xl bg-stone-950 border border-stone-800/80">
                <p className="text-[11px] text-stone-400 leading-normal">
                  Configure your live Supabase credentials here or add them to your Vercel project environment variables (<code>VITE_SUPABASE_URL</code> & <code>VITE_SUPABASE_ANON_KEY</code>).
                </p>

                {configSuccess && (
                  <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-[11px] text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Credentials saved successfully!</span>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-mono text-stone-400 uppercase mb-1">
                    Supabase Project URL
                  </label>
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://xyzcompany.supabase.co"
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-white outline-none focus:border-orange-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-stone-400 uppercase mb-1">
                    Supabase Anon Key
                  </label>
                  <input
                    type="password"
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-white outline-none focus:border-orange-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition"
                >
                  Save Supabase Settings
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Back to website */}
        <div className="text-center">
          <a
            href="/"
            className="text-xs text-stone-500 hover:text-stone-300 transition"
          >
            ← Return to Petzora Website
          </a>
        </div>
      </div>
    </div>
  );
};
