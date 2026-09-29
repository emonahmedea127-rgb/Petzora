import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  FileText,
  CheckCircle,
  FileEdit,
  FolderTree,
  PlusCircle,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Calendar,
  Eye,
  Database,
} from 'lucide-react';
import {
  getDashboardStats,
  DashboardStats,
  isSupabaseConfigured,
  getSyncStatus,
  syncBuiltInArticlesToSupabase,
  ContentSyncStatus,
} from '../../lib/supabase';
import { SafeImage } from '../../components/SafeImage';
import { RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalCategories: 0,
    recentArticles: [],
  });
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<ContentSyncStatus | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const isConfigured = isSupabaseConfigured();

  const loadStats = async () => {
    setLoading(true);
    const [data, syncInfo] = await Promise.all([
      getDashboardStats(),
      getSyncStatus(),
    ]);
    setStats(data);
    setSyncStatus(syncInfo);
    setLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleSyncToSupabase = async () => {
    setSyncing(true);
    setSyncFeedback(null);
    const res = await syncBuiltInArticlesToSupabase();
    setSyncing(false);

    if (res.success) {
      setSyncFeedback({
        message: `Successfully synced ${res.syncedCount} articles into your Supabase database!`,
        type: 'success',
      });
      await loadStats();
    } else {
      setSyncFeedback({
        message: res.error || 'Failed to sync articles. Check database connection or RLS permissions.',
        type: 'error',
      });
    }
  };

  return (
    <AdminLayout
      title="Editorial Dashboard"
      subtitle="Real-time publishing metrics and content overview"
      action={
        <div className="flex items-center gap-2">
          {syncStatus && syncStatus.unsyncedCount > 0 && (
            <button
              onClick={handleSyncToSupabase}
              disabled={syncing}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Syncing...' : `Sync ${syncStatus.unsyncedCount} to Supabase`}</span>
            </button>
          )}
          <Link
            to="/admin/articles/new"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Article</span>
          </Link>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Sync Feedback Message */}
        {syncFeedback && (
          <div
            className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-medium border ${
              syncFeedback.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                : 'bg-red-950/40 border-red-800 text-red-200'
            }`}
          >
            {syncFeedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <p className="flex-1">{syncFeedback.message}</p>
            <button
              onClick={() => setSyncFeedback(null)}
              className="text-xs opacity-75 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        )}

        {/* Sync Banner if there are unsynced articles */}
        {syncStatus && syncStatus.unsyncedCount > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-950/50 via-stone-900 to-amber-950/40 border border-orange-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{syncStatus.unsyncedCount} Built-in Guides Ready to Add to Supabase</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                    Database Sync
                  </span>
                </h3>
                <p className="text-xs text-stone-300 mt-1 max-w-2xl leading-relaxed">
                  Your Supabase database currently has <strong>{syncStatus.inSupabaseCount}</strong> article, but your website has <strong>{syncStatus.totalBuiltIn}</strong> comprehensive guides loaded from code files. Click &quot;Sync to Supabase&quot; to import the remaining {syncStatus.unsyncedCount} articles directly into your Supabase <code>articles</code> table!
                </p>
              </div>
            </div>
            <button
              onClick={handleSyncToSupabase}
              disabled={syncing}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white shrink-0 transition flex items-center gap-2 shadow-md shadow-orange-950/40 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Importing Articles...' : `Import ${syncStatus.unsyncedCount} Articles to Supabase`}</span>
            </button>
          </div>
        )}
        {/* Setup Banner if Supabase not configured */}
        {!isConfigured && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/40 border border-amber-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Database className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-amber-200">
                  Supabase Backend Configuration Required
                </h3>
                <p className="text-xs text-amber-300/80 mt-0.5">
                  Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in Vercel or configure in Settings to activate database persistence.
                </p>
              </div>
            </div>
            <Link
              to="/admin/settings"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white shrink-0 transition"
            >
              Configure Now →
            </Link>
          </div>
        )}

        {/* Real Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {/* Total Articles */}
          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs font-mono uppercase tracking-wider">Total Articles</span>
              <FileText className="w-4 h-4 text-orange-400" />
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-serif font-black text-white">
                {loading ? '—' : stats.totalArticles}
              </span>
            </div>
          </div>

          {/* Published Articles */}
          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs font-mono uppercase tracking-wider">Published</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-serif font-black text-emerald-400">
                {loading ? '—' : stats.publishedArticles}
              </span>
            </div>
          </div>

          {/* Draft Articles */}
          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs font-mono uppercase tracking-wider">Drafts</span>
              <FileEdit className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-serif font-black text-amber-400">
                {loading ? '—' : stats.draftArticles}
              </span>
            </div>
          </div>

          {/* Categories */}
          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs font-mono uppercase tracking-wider">Categories</span>
              <FolderTree className="w-4 h-4 text-blue-400" />
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-serif font-black text-white">
                {loading ? '—' : stats.totalCategories}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Link
            to="/admin/articles/new"
            className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-orange-500/50 hover:bg-stone-900 transition flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white group-hover:text-orange-400 transition">
                  Create New Article
                </p>
                <p className="text-[11px] text-stone-500">Draft or publish a guide</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-600 group-hover:text-orange-400 transition" />
          </Link>

          <Link
            to="/admin/media"
            className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-orange-500/50 hover:bg-stone-900 transition flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white group-hover:text-purple-400 transition">
                  Upload Media
                </p>
                <p className="text-[11px] text-stone-500">Manage Supabase storage</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-600 group-hover:text-purple-400 transition" />
          </Link>

          <Link
            to="/admin/categories"
            className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-orange-500/50 hover:bg-stone-900 transition flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <FolderTree className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white group-hover:text-blue-400 transition">
                  Manage Categories
                </p>
                <p className="text-[11px] text-stone-500">Dogs, Cats, Health & more</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-600 group-hover:text-blue-400 transition" />
          </Link>
        </div>

        {/* Recent Articles Section */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden">
          <div className="p-5 sm:px-6 border-b border-stone-800 flex items-center justify-between">
            <div>
              <h2 className="font-serif font-bold text-base text-white">Recent Articles</h2>
              <p className="text-xs text-stone-400">Latest content stored in Supabase</p>
            </div>
            <Link
              to="/admin/articles"
              className="text-xs font-medium text-orange-400 hover:text-orange-300 transition flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-stone-500 font-mono">
              Loading recent articles...
            </div>
          ) : stats.recentArticles.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-800 flex items-center justify-center text-stone-500 mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-white text-base">No Articles Found</h4>
                <p className="text-xs text-stone-400 max-w-sm mx-auto mt-1">
                  You have not published or drafted any articles yet. Create your first post to see it appear on the website!
                </p>
              </div>
              <Link
                to="/admin/articles/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition mt-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish First Article</span>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-stone-800">
              {stats.recentArticles.map((art) => (
                <div
                  key={art.id}
                  className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-850/60 transition"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-stone-800 border border-stone-700">
                      <SafeImage
                        src={art.featuredImage}
                        alt={art.title}
                        className="w-full h-full object-cover"
                        fallbackSrc="/images/pet-fallback.webp"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold ${
                            art.status === 'published'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/80'
                              : 'bg-amber-950 text-amber-400 border border-amber-800/80'
                          }`}
                        >
                          {art.status}
                        </span>
                        <span className="text-[11px] font-mono text-stone-400 uppercase">
                          {art.category}
                        </span>
                        {art.isFeatured && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-950 text-orange-400 border border-orange-800/80">
                            ★ Featured
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif font-bold text-sm text-white truncate">
                        {art.title}
                      </h3>
                      <p className="text-[11px] text-stone-500 truncate mt-0.5">
                        /{art.category}/{art.slug}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {art.status === 'published' && (
                      <a
                        href={`/${art.category}/${art.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
                        title="View Public URL"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <Link
                      to={`/admin/articles/edit/${art.id}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 transition"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
