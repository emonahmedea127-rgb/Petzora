import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  Settings,
  Save,
  CheckCircle,
  Database,
  Globe,
  Share2,
  AlertCircle,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import {
  getSiteSettings,
  updateSiteSettings,
  getSupabaseCredentials,
  saveCustomSupabaseConfig,
  clearCustomSupabaseConfig,
  isSupabaseConfigured,
  getSyncStatus,
  syncBuiltInArticlesToSupabase,
  ContentSyncStatus,
} from '../../lib/supabase';
import { SiteSettings } from '../../types';
import { useAuth } from '../../context/AuthContext';

export const AdminSettingsPage: React.FC = () => {
  const { refreshAuth } = useAuth();
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'Petzora',
    siteDescription: 'Better Care. Happier Pets. Practical dog and cat care guides fact-checked by veterinarians.',
    logoUrl: '',
    defaultSeoTitle: 'Petzora – Better Care. Happier Pets. | Dog & Cat Guides',
    defaultSeoDescription: 'Practical pet care advice, puppy training, cat health, canine nutrition, product recommendations, and heartwarming stories for dog and cat owners.',
    defaultOgImage: 'https://petzora.shop/images/hero-dog-cat.webp',
    socialLinks: {
      x: 'https://x.com',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<ContentSyncStatus | null>(null);
  const [syncing, setSyncing] = useState(false);

  // Supabase direct connection settings
  const creds = getSupabaseCredentials();
  const [customUrl, setCustomUrl] = useState(creds.url);
  const [customKey, setCustomKey] = useState(creds.anonKey);
  const [dbStatus, setDbStatus] = useState(isSupabaseConfigured());

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [data, syncInfo] = await Promise.all([
        getSiteSettings(),
        getSyncStatus(),
      ]);
      setSettings(data);
      setSyncStatus(syncInfo);
      setLoading(false);
    }
    load();
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
      showToast(`Successfully synced ${res.syncedCount} articles to Supabase!`);
      const updatedSync = await getSyncStatus();
      setSyncStatus(updatedSync);
    } else {
      showToast(`Sync failed: ${res.error}`);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { success, error } = await updateSiteSettings(settings);
    setSaving(false);

    if (success) {
      showToast('Site settings updated in Supabase!');
    } else {
      showToast(`Notice: ${error}`);
    }
  };

  const handleSaveSupabaseConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    saveCustomSupabaseConfig(customUrl, customKey);
    await refreshAuth();
    setDbStatus(isSupabaseConfigured());
    showToast('Supabase connection updated!');
  };

  const handleResetSupabaseConfig = async () => {
    clearCustomSupabaseConfig();
    await refreshAuth();
    const updated = getSupabaseCredentials();
    setCustomUrl(updated.url);
    setCustomKey(updated.anonKey);
    setDbStatus(isSupabaseConfigured());
    showToast('Reset to environment variables.');
  };

  return (
    <AdminLayout
      title="Site Settings & SEO"
      subtitle="Configure global publishing metadata, branding, and database connections"
    >
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-orange-600 text-white text-xs font-semibold shadow-2xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl space-y-8">
        {/* Supabase Connection Card */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-white text-base">
                  Supabase Backend Configuration
                </h3>
                <p className="text-xs text-stone-400">
                  Connect your live Supabase database for articles, categories, and image storage
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  dbStatus ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              <span className="text-xs font-mono text-stone-300">
                {dbStatus ? 'Connected' : 'Missing Config'}
              </span>
            </div>
          </div>

          <form onSubmit={handleSaveSupabaseConfig} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-stone-400 mb-1 font-semibold">
                  Supabase Project URL (VITE_SUPABASE_URL)
                </label>
                <input
                  type="url"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://xyzcompany.supabase.co"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-stone-400 mb-1 font-semibold">
                  Supabase Anon Key (VITE_SUPABASE_ANON_KEY)
                </label>
                <input
                  type="password"
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1Ni..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-white outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleResetSupabaseConfig}
                className="text-xs text-stone-500 hover:text-stone-300 transition"
              >
                Reset to default env
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 transition"
              >
                Save Supabase Credentials
              </button>
            </div>
          </form>
        </div>

        {/* Database Content Sync Card */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-white text-base">
                  Database & Content Sync
                </h3>
                <p className="text-xs text-stone-400">
                  Import built-in editorial guides from code into your live Supabase database
                </p>
              </div>
            </div>
            {syncStatus && (
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
                {syncStatus.inSupabaseCount} in Supabase / {syncStatus.totalBuiltIn} Built-in
              </span>
            )}
          </div>

          <div className="space-y-4 pt-1">
            <p className="text-xs text-stone-300 leading-relaxed">
              Petzora comes bundled with <strong>{syncStatus?.totalBuiltIn || 9} comprehensive pillar guides</strong>. When you initialize a new Supabase database, only categories and authors are created by default. Use this tool to upload all remaining built-in guides directly into your Supabase <code>articles</code> table.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
                <span className="text-[10px] font-mono text-stone-500 uppercase">In Supabase DB</span>
                <p className="text-xl font-bold text-white mt-1">{syncStatus?.inSupabaseCount ?? '—'}</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
                <span className="text-[10px] font-mono text-stone-500 uppercase">Built-in Guides</span>
                <p className="text-xl font-bold text-white mt-1">{syncStatus?.totalBuiltIn ?? '—'}</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
                <span className="text-[10px] font-mono text-stone-500 uppercase">Ready to Sync</span>
                <p className="text-xl font-bold text-orange-400 mt-1">{syncStatus?.unsyncedCount ?? '—'}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-stone-400">
                {syncStatus?.unsyncedCount === 0
                  ? 'All built-in articles are synchronized in Supabase!'
                  : `${syncStatus?.unsyncedCount} articles waiting to be imported`}
              </span>
              <button
                type="button"
                onClick={handleSyncToSupabase}
                disabled={syncing || syncStatus?.unsyncedCount === 0}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 disabled:bg-stone-800 disabled:text-stone-500 text-white transition flex items-center gap-2 shadow-md shadow-emerald-950 disabled:shadow-none"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
                <span>{syncing ? 'Importing to Supabase...' : 'Sync All Guides to Supabase'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* General Site Metadata & Branding */}
        <form onSubmit={handleSaveSettings} className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-white text-base">
                  General Branding & Information
                </h3>
                <p className="text-xs text-stone-400">
                  Global website identity and default editorial descriptions
                </p>
              </div>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition flex items-center gap-1.5 shadow-md shadow-orange-950 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-stone-400 mb-1 font-semibold">
                  Site Name *
                </label>
                <input
                  type="text"
                  required
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-stone-400 mb-1 font-semibold">
                  Logo Image URL
                </label>
                <input
                  type="text"
                  value={settings.logoUrl || ''}
                  onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                  placeholder="/images/logo.png"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-400 mb-1 font-semibold">
                Site Tagline / Description *
              </label>
              <textarea
                rows={2}
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white outline-none focus:border-orange-500 leading-relaxed"
              />
            </div>
          </div>

          {/* Default SEO Defaults */}
          <div className="pt-4 border-t border-stone-800 space-y-4">
            <h4 className="font-serif font-bold text-sm text-white">
              Default Global SEO & Social Sharing
            </h4>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-400 mb-1 font-semibold">
                Default Meta Title
              </label>
              <input
                type="text"
                value={settings.defaultSeoTitle}
                onChange={(e) => setSettings({ ...settings, defaultSeoTitle: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-400 mb-1 font-semibold">
                Default Meta Description
              </label>
              <textarea
                rows={2}
                value={settings.defaultSeoDescription}
                onChange={(e) => setSettings({ ...settings, defaultSeoDescription: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-400 mb-1 font-semibold">
                Default Open Graph Share Image (Absolute URL)
              </label>
              <input
                type="text"
                value={settings.defaultOgImage}
                onChange={(e) => setSettings({ ...settings, defaultOgImage: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-white outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-4 border-t border-stone-800 space-y-4">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-orange-400" />
              <h4 className="font-serif font-bold text-sm text-white">Social Channel Links</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                  X (Twitter) URL
                </label>
                <input
                  type="text"
                  value={settings.socialLinks?.x || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, x: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                  Facebook URL
                </label>
                <input
                  type="text"
                  value={settings.socialLinks?.facebook || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                  Instagram URL
                </label>
                <input
                  type="text"
                  value={settings.socialLinks?.instagram || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
