import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FolderTree,
  Image as ImageIcon,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  PawPrint,
  ChevronRight,
  Database,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
  action,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isConfigured } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Articles', path: '/admin/articles', icon: FileText },
    { label: 'New Article', path: '/admin/articles/new', icon: PlusCircle },
    { label: 'Categories', path: '/admin/categories', icon: FolderTree },
    { label: 'Media Library', path: '/admin/media', icon: ImageIcon },
    { label: 'Settings & SEO', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex font-sans antialiased">
      {/* Mobile Off-Canvas Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar (Desktop fixed + Mobile off-canvas) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-stone-900 border-r border-stone-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Logo / Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-stone-800">
            <Link to="/admin" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-900/30">
                <PawPrint className="w-4 h-4 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-lg text-white tracking-tight leading-tight">
                  Petzora
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-orange-400 font-bold">
                  CMS Admin
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1.5 flex-1">
            <div className="px-3 py-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-stone-500">
              Content Management
            </div>
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-orange-600 text-white font-semibold shadow-sm shadow-orange-950'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-stone-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {active && <ChevronRight className="w-4 h-4 opacity-70" />}
                </Link>
              );
            })}

            <div className="pt-4 px-3 py-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-stone-500">
              Quick Links
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-stone-400 hover:text-stone-200 hover:bg-stone-800/60 transition"
            >
              <div className="flex items-center gap-2.5">
                <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                <span>View Public Site</span>
              </div>
              <span className="text-[10px] text-stone-600 font-mono">Live ↗</span>
            </a>
          </div>

          {/* Database status pill */}
          <div className="p-4 mx-4 mb-2 rounded-xl bg-stone-950/70 border border-stone-800/80">
            <div className="flex items-center gap-2 text-xs">
              <Database className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-stone-300 font-medium">Supabase Backend</span>
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <div
                className={`w-2 h-2 rounded-full ${
                  isConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              <span className="text-[11px] text-stone-400">
                {isConfigured ? 'Connected & Active' : 'Setup Required'}
              </span>
            </div>
          </div>
        </div>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-stone-800 flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <p className="text-xs font-semibold text-white truncate">
              {user?.email || 'Admin'}
            </p>
            <p className="text-[10px] font-mono text-stone-500 uppercase">Super Admin</p>
          </div>
          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-2 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top bar on mobile/desktop */}
        <header className="h-16 bg-stone-900/80 backdrop-blur-md border-b border-stone-800/90 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-serif font-bold text-white tracking-tight leading-none">
                {title || 'Petzora Admin'}
              </h1>
              {subtitle && (
                <p className="text-xs text-stone-400 mt-0.5 hidden sm:block">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {action}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition border border-stone-700/60"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Visit Site</span>
            </a>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
