import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  PlusCircle,
  Search,
  Filter,
  Trash2,
  Edit3,
  ExternalLink,
  Eye,
  CheckCircle,
  FileEdit,
  Star,
  AlertTriangle,
  Loader2,
  Calendar,
} from 'lucide-react';
import {
  getAllArticlesAdmin,
  deleteArticle,
  updateArticle,
  getCategories,
  getSyncStatus,
  syncBuiltInArticlesToSupabase,
  ContentSyncStatus,
} from '../../lib/supabase';
import { Article, CategoryInfo } from '../../types';
import { SafeImage } from '../../components/SafeImage';
import { RefreshCw, Database } from 'lucide-react';

export const AdminArticlesListPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [syncStatus, setSyncStatus] = useState<ContentSyncStatus | null>(null);
  const [syncing, setSyncing] = useState(false);

  // Delete modal state
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    const [arts, cats, syncInfo] = await Promise.all([
      getAllArticlesAdmin(),
      getCategories(),
      getSyncStatus(),
    ]);
    setArticles(arts);
    setCategories(cats);
    setSyncStatus(syncInfo);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSyncToSupabase = async () => {
    setSyncing(true);
    const res = await syncBuiltInArticlesToSupabase();
    setSyncing(false);

    if (res.success) {
      showToast(`Synced ${res.syncedCount} articles to Supabase!`);
      await fetchArticles();
    } else {
      showToast(`Sync failed: ${res.error}`);
    }
  };

  const handleToggleStatus = async (article: Article) => {
    const newStatus = article.status === 'published' ? 'draft' : 'published';
    const { error } = await updateArticle(article.id, {
      status: newStatus,
      published_at: newStatus === 'published' ? new Date().toISOString() : null,
      category_slug: article.category,
    });

    if (error) {
      showToast(`Error: ${error}`);
    } else {
      setArticles((prev) =>
        prev.map((a) => (a.id === article.id ? { ...a, status: newStatus } : a))
      );
      showToast(newStatus === 'published' ? 'Article published!' : 'Article reverted to draft.');
    }
  };

  const handleToggleFeatured = async (article: Article) => {
    const newFeatured = !article.isFeatured;
    const { error } = await updateArticle(article.id, {
      is_featured: newFeatured,
      category_slug: article.category,
    });

    if (error) {
      showToast(`Error: ${error}`);
    } else {
      setArticles((prev) =>
        prev.map((a) => (a.id === article.id ? { ...a, isFeatured: newFeatured } : a))
      );
      showToast(newFeatured ? 'Marked as Featured!' : 'Removed from Featured.');
    }
  };

  const confirmDelete = async () => {
    if (!articleToDelete) return;
    setDeleting(true);
    const { success, error } = await deleteArticle(articleToDelete.id);
    setDeleting(false);

    if (success) {
      setArticles((prev) => prev.filter((a) => a.id !== articleToDelete.id));
      showToast('Article deleted successfully.');
      setArticleToDelete(null);
    } else {
      showToast(`Error deleting article: ${error}`);
    }
  };

  // Filtered list
  const filtered = articles.filter((art) => {
    if (statusFilter !== 'all' && art.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && art.category.toLowerCase() !== categoryFilter.toLowerCase()) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        art.title.toLowerCase().includes(q) ||
        art.slug.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AdminLayout
      title="Articles"
      subtitle="Manage, draft, publish, and edit all editorial guides"
      action={
        <div className="flex items-center gap-2">
          {syncStatus && syncStatus.unsyncedCount > 0 && (
            <button
              onClick={handleSyncToSupabase}
              disabled={syncing}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Syncing...' : `Import ${syncStatus.unsyncedCount} to Supabase`}</span>
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
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-orange-600 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Unsynced Banner */}
        {syncStatus && syncStatus.unsyncedCount > 0 && (
          <div className="p-4 rounded-2xl bg-stone-900 border border-orange-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">
                  {syncStatus.unsyncedCount} built-in guides are ready to be added to your Supabase Database
                </h4>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  Currently, {articles.length} article is stored in Supabase. Import the rest to edit and manage them here.
                </p>
              </div>
            </div>
            <button
              onClick={handleSyncToSupabase}
              disabled={syncing}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white shrink-0 transition flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Importing...' : `Import ${syncStatus.unsyncedCount} Guides`}</span>
            </button>
          </div>
        )}
        {/* Controls Bar */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, slug, or content..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-600 outline-none focus:border-orange-500 transition"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e: any) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 outline-none focus:border-orange-500"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published Only</option>
              <option value="draft">Drafts Only</option>
            </select>

            {/* Category filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 outline-none focus:border-orange-500"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Articles Table */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-lg">
          {loading ? (
            <div className="p-16 text-center text-xs text-stone-400 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
              <span>Fetching articles from Supabase...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-800 flex items-center justify-center text-stone-500 mx-auto">
                <FileEdit className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-white text-base">No Articles Found</h3>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                {search || statusFilter !== 'all' || categoryFilter !== 'all'
                  ? 'No articles match your active search filters.'
                  : 'Your database currently has zero articles. Publish your first pet guide below!'}
              </p>
              <Link
                to="/admin/articles/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition mt-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create New Article</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-950 text-stone-400 font-mono uppercase tracking-wider border-b border-stone-800">
                  <tr>
                    <th className="p-4 sm:px-6">Article</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right sm:pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/80">
                  {filtered.map((art) => (
                    <tr key={art.id} className="hover:bg-stone-850/50 transition">
                      <td className="p-4 sm:px-6">
                        <div className="flex items-center gap-3.5 min-w-[280px]">
                          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-stone-800 border border-stone-700">
                            <SafeImage
                              src={art.featuredImage}
                              alt={art.title}
                              className="w-full h-full object-cover"
                              fallbackSrc="/images/pet-fallback.webp"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-serif font-bold text-sm text-white truncate max-w-md">
                              {art.title}
                            </h4>
                            <p className="text-[11px] font-mono text-stone-500 truncate mt-0.5">
                              /{art.category}/{art.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300 font-mono text-[11px] uppercase">
                          {art.category}
                        </span>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(art)}
                          title="Click to toggle Draft / Published"
                          className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                            art.status === 'published'
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800 hover:bg-emerald-900/60'
                              : 'bg-amber-950/80 text-amber-400 border border-amber-800 hover:bg-amber-900/60'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              art.status === 'published' ? 'bg-emerald-400' : 'bg-amber-400'
                            }`}
                          />
                          <span>{art.status}</span>
                        </button>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(art)}
                          className={`p-1.5 rounded-lg transition ${
                            art.isFeatured
                              ? 'text-orange-400 bg-orange-950/60 border border-orange-800'
                              : 'text-stone-600 hover:text-stone-300'
                          }`}
                          title={art.isFeatured ? 'Featured on Homepage' : 'Mark as Featured'}
                        >
                          <Star className={`w-4 h-4 ${art.isFeatured ? 'fill-orange-400' : ''}`} />
                        </button>
                      </td>

                      <td className="p-4 whitespace-nowrap text-stone-400 font-mono text-[11px]">
                        {new Date(art.publishedAt || art.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>

                      <td className="p-4 text-right sm:pr-6 whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {art.status === 'published' && (
                            <a
                              href={`/${art.category}/${art.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
                              title="View Public Page"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <Link
                            to={`/admin/articles/edit/${art.id}`}
                            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
                            title="Edit Article"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setArticleToDelete(art)}
                            className="p-2 rounded-lg text-stone-500 hover:text-rose-400 hover:bg-stone-800 transition"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog Modal */}
      {articleToDelete && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl w-full max-w-md space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-serif font-bold text-white text-lg">
                Delete This Article?
              </h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Are you sure you want to permanently delete{' '}
                <strong className="text-white">"{articleToDelete.title}"</strong>? This will remove it from Supabase and it will immediately disappear from the public website.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setArticleToDelete(null)}
                disabled={deleting}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-300 hover:text-white hover:bg-stone-800 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Yes, Delete Article</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
