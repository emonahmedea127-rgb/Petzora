import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  RefreshCw,
  Database,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  FileText,
  ShieldCheck,
  ExternalLink,
  Layers,
} from 'lucide-react';
import {
  getSyncStatus,
  syncBuiltInArticlesToSupabase,
  ContentSyncStatus,
  isSupabaseConfigured,
  getSupabaseCredentials,
  allArticles,
} from '../../lib/supabase';

export const AdminSyncPage: React.FC = () => {
  const [syncStatus, setSyncStatus] = useState<ContentSyncStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  // Sync Mode: 'database_only' vs 'hybrid'
  const [syncMode, setSyncMode] = useState<'database_only' | 'hybrid'>(() => {
    return (localStorage.getItem('petzora_sync_mode') as 'database_only' | 'hybrid') || 'database_only';
  });

  const isConfigured = isSupabaseConfigured();
  const creds = getSupabaseCredentials();

  const loadStatus = async () => {
    setLoading(true);
    const status = await getSyncStatus();
    setSyncStatus(status);
    setLoading(false);
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const handleSyncToSupabase = async () => {
    setSyncing(true);
    setFeedback(null);
    const res = await syncBuiltInArticlesToSupabase();
    setSyncing(false);

    if (res.success) {
      setFeedback({
        message: `Successfully imported ${res.syncedCount} articles into your Supabase articles table!`,
        type: 'success',
      });
      await loadStatus();
    } else {
      setFeedback({
        message: res.error || 'Sync failed. Please verify Supabase credentials and permissions.',
        type: 'error',
      });
    }
  };

  const handleModeChange = (mode: 'database_only' | 'hybrid') => {
    setSyncMode(mode);
    localStorage.setItem('petzora_sync_mode', mode);
    setFeedback({
      message:
        mode === 'database_only'
          ? 'Website is now set to Strict Database Sync (only articles present in Supabase will be shown on the public site).'
          : 'Website is now set to Hybrid Mode (Supabase articles + built-in fallback guides).',
      type: 'success',
    });
  };

  const handleCopySql = () => {
    fetch('/supabase-seed-articles.sql')
      .then((res) => res.text())
      .then((text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(() => {
        // Fallback: direct simple script copy
        const sampleSql = `-- Run this in Supabase Dashboard -> SQL Editor\n-- It inserts all built-in Petzora articles.\n-- Download the full file at: /supabase-seed-articles.sql`;
        navigator.clipboard.writeText(sampleSql);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
  };

  return (
    <AdminLayout
      title="Database Sync"
      subtitle="Synchronize articles between project code and your live Supabase database"
    >
      <div className="max-w-4xl space-y-6">
        {/* Status Feedback */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-sm font-medium border ${
              feedback.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                : 'bg-red-950/40 border-red-800 text-red-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
              <p>{feedback.message}</p>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="text-xs opacity-75 hover:opacity-100 px-2 py-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Overview Banner */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-orange-600/20 text-orange-400 flex items-center justify-center shrink-0">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Supabase Database Sync Hub</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isConfigured
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {isConfigured ? 'Connected' : 'Not Connected'}
                  </span>
                </h3>
                <p className="text-xs text-stone-400 mt-0.5 font-mono truncate max-w-md">
                  {creds.url || 'No Supabase URL configured'}
                </p>
              </div>
            </div>

            <button
              onClick={handleSyncToSupabase}
              disabled={syncing || !isConfigured || syncStatus?.unsyncedCount === 0}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 disabled:bg-stone-800 disabled:text-stone-500 text-white transition flex items-center justify-center gap-2 shadow-lg shadow-orange-950 disabled:shadow-none"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              <span>
                {syncing
                  ? 'Syncing to Database...'
                  : syncStatus?.unsyncedCount === 0
                  ? 'All Articles Synchronized'
                  : `Sync All ${syncStatus?.unsyncedCount || ''} Articles to Supabase`}
              </span>
            </button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80">
              <div className="flex items-center justify-between text-stone-400 text-xs">
                <span>In Supabase Database</span>
                <Database className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-serif font-black text-white mt-2">
                {loading ? '—' : syncStatus?.inSupabaseCount ?? 0}
              </p>
              <span className="text-[11px] text-stone-500 mt-1 block">Live rows in articles table</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80">
              <div className="flex items-center justify-between text-stone-400 text-xs">
                <span>Built-in Guides in Code</span>
                <FileText className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-2xl font-serif font-black text-white mt-2">
                {loading ? '—' : syncStatus?.totalBuiltIn ?? allArticles.length}
              </p>
              <span className="text-[11px] text-stone-500 mt-1 block">Static guides in project repository</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80">
              <div className="flex items-center justify-between text-stone-400 text-xs">
                <span>Missing from Database</span>
                <AlertCircle className="w-4 h-4 text-orange-400" />
              </div>
              <p className="text-2xl font-serif font-black text-orange-400 mt-2">
                {loading ? '—' : syncStatus?.unsyncedCount ?? 0}
              </p>
              <span className="text-[11px] text-stone-500 mt-1 block">
                {syncStatus?.unsyncedCount === 0 ? 'Everything is in database!' : 'Ready to import'}
              </span>
            </div>
          </div>
        </div>

        {/* Website Sync Mode Configuration */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-base">
                Public Website Sync Source
              </h3>
              <p className="text-xs text-stone-400">
                Choose whether the website strictly reads only from Supabase or includes built-in guides
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Mode 1: Strict Database Sync */}
            <div
              onClick={() => handleModeChange('database_only')}
              className={`p-5 rounded-2xl border cursor-pointer transition ${
                syncMode === 'database_only'
                  ? 'bg-orange-950/20 border-orange-500 ring-1 ring-orange-500'
                  : 'bg-stone-950 border-stone-800 hover:border-stone-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-orange-400" />
                  Strict Database Sync (Recommended)
                </span>
                <input
                  type="radio"
                  name="syncMode"
                  checked={syncMode === 'database_only'}
                  onChange={() => handleModeChange('database_only')}
                  className="accent-orange-500"
                />
              </div>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                The public website displays <strong>only</strong> articles that exist in your Supabase database. If you have 1 article in Supabase, the website will show only that 1 article.
              </p>
              <div className="mt-3 text-[11px] text-orange-400/90 font-mono">
                ✓ 100% synchronized with database
              </div>
            </div>

            {/* Mode 2: Hybrid Mode */}
            <div
              onClick={() => handleModeChange('hybrid')}
              className={`p-5 rounded-2xl border cursor-pointer transition ${
                syncMode === 'hybrid'
                  ? 'bg-orange-950/20 border-orange-500 ring-1 ring-orange-500'
                  : 'bg-stone-950 border-stone-800 hover:border-stone-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  Hybrid Mode (Fallback Enabled)
                </span>
                <input
                  type="radio"
                  name="syncMode"
                  checked={syncMode === 'hybrid'}
                  onChange={() => handleModeChange('hybrid')}
                  className="accent-orange-500"
                />
              </div>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                Shows all Supabase articles, plus any built-in guides from code files that haven&apos;t been imported yet.
              </p>
              <div className="mt-3 text-[11px] text-blue-400/90 font-mono">
                ✓ Website always displays 9+ guides
              </div>
            </div>
          </div>
        </div>

        {/* SQL Seed Script Option */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-white text-base">
                  Run SQL Script in Supabase Editor
                </h3>
                <p className="text-xs text-stone-400">
                  Prefer SQL? Run our pre-generated seed script directly in the Supabase Dashboard
                </p>
              </div>
            </div>

            <button
              onClick={handleCopySql}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 transition flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'SQL Copied!' : 'Copy SQL Script'}</span>
            </button>
          </div>

          <div className="space-y-3 pt-1">
            <p className="text-xs text-stone-300 leading-relaxed">
              We generated <code>supabase-seed-articles.sql</code> in your project with complete SQL <code>INSERT</code> statements for all built-in articles, with automated category and author ID lookups.
            </p>
            <ol className="text-xs text-stone-400 space-y-1.5 list-decimal list-inside bg-stone-950 p-4 rounded-2xl border border-stone-800">
              <li>Open your <strong>Supabase Dashboard</strong></li>
              <li>Go to <strong>SQL Editor</strong> &gt; <strong>New Query</strong></li>
              <li>Click the <strong>Copy SQL Script</strong> button above and paste into the editor</li>
              <li>Click <strong>Run</strong> — all 9 articles will appear in your Supabase table!</li>
            </ol>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
