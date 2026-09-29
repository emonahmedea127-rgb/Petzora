import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SavedArticlesProvider } from './context/SavedArticlesContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { SavedArticlesDrawer } from './components/SavedArticlesDrawer';
import { CookieConsent } from './components/CookieConsent';

// Public Pages
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { BlogArchivePage } from './pages/BlogArchivePage';
import { AuthorPage } from './pages/AuthorPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { EditorialPolicyPage } from './pages/EditorialPolicyPage';
import { AffiliateDisclosurePage } from './pages/AffiliateDisclosurePage';
import { ReviewsPage } from './pages/ReviewsPage';
import { BehaviorHubPage } from './pages/BehaviorHubPage';
import { SearchPage } from './pages/SearchPage';
import { SitemapPage } from './pages/SitemapPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin CMS Components & Pages
import { AdminRoute } from './components/admin/AdminRoute';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminArticlesListPage } from './pages/admin/AdminArticlesListPage';
import { AdminArticleEditPage } from './pages/admin/AdminArticleEditPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminMediaPage } from './pages/admin/AdminMediaPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('config', 'G-DKRVYNKDMK', {
        page_path: pathname + search,
        page_title: document.title,
      });
    }
  }, [pathname, search]);

  return null;
}

function MainLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-stone-950 text-stone-900 dark:text-stone-100 selection:bg-orange-500/20 selection:text-orange-900 dark:selection:bg-orange-500/30 dark:selection:text-orange-200 transition-colors">
      {/* Only render public header and navigation if NOT on admin routes */}
      {!isAdminPath && (
        <Navbar
          onOpenSearch={() => setSearchOpen(true)}
          onOpenSaved={() => setSavedDrawerOpen(true)}
        />
      )}

      <main className="flex-1">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/articles"
            element={
              <AdminRoute>
                <AdminArticlesListPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/articles/new"
            element={
              <AdminRoute>
                <AdminArticleEditPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/articles/edit/:id"
            element={
              <AdminRoute>
                <AdminArticleEditPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <AdminRoute>
                <AdminCategoriesPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/media"
            element={
              <AdminRoute>
                <AdminMediaPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminRoute>
                <AdminSettingsPage />
              </AdminRoute>
            }
          />

          {/* Public Home */}
          <Route path="/" element={<HomePage />} />

          {/* Direct Pet Categories */}
          <Route path="/dogs" element={<CategoryPage categorySlug="dogs" />} />
          <Route path="/cats" element={<CategoryPage categorySlug="cats" />} />
          <Route path="/care" element={<CategoryPage categorySlug="care" />} />
          <Route path="/pet-care" element={<CategoryPage categorySlug="pet-care" />} />
          <Route path="/nutrition" element={<CategoryPage categorySlug="nutrition" />} />
          <Route path="/training" element={<CategoryPage categorySlug="training" />} />
          <Route path="/health" element={<CategoryPage categorySlug="health" />} />
          <Route path="/product-guides" element={<CategoryPage categorySlug="product-guides" />} />
          <Route path="/stories" element={<CategoryPage categorySlug="stories" />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/behavior" element={<BehaviorHubPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />

          {/* All Guides Catalog */}
          <Route path="/guides" element={<BlogArchivePage />} />
          <Route path="/blog" element={<BlogArchivePage />} />

          {/* Dynamic Article URLs */}
          <Route path="/:category/:slug" element={<ArticleDetailPage />} />
          <Route path="/article/:slug" element={<ArticleDetailPage />} />

          {/* Editorial Authors */}
          <Route path="/author" element={<AuthorPage />} />
          <Route path="/author/:slug" element={<AuthorPage />} />

          {/* About & Contact */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Required Trust & Legal Compliance */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/editorial-policy" element={<EditorialPolicyPage />} />
          <Route path="/affiliate-disclosure" element={<AffiliateDisclosurePage />} />

          {/* Search & Sitemap */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Only render public footer and floating dialogs if NOT on admin routes */}
      {!isAdminPath && (
        <>
          <Footer />
          <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
          <SavedArticlesDrawer isOpen={savedDrawerOpen} onClose={() => setSavedDrawerOpen(false)} />
          <CookieConsent />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SavedArticlesProvider>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <MainLayout />
          </BrowserRouter>
        </AuthProvider>
      </SavedArticlesProvider>
    </ThemeProvider>
  );
}
