import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SavedArticlesProvider } from './context/SavedArticlesContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { HomePage } from './pages/HomePage';

const CategoryPage = lazy(() => import('./pages/CategoryPage').then((m) => ({ default: m.CategoryPage })));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage').then((m) => ({ default: m.ArticleDetailPage })));
const BlogArchivePage = lazy(() => import('./pages/BlogArchivePage').then((m) => ({ default: m.BlogArchivePage })));
const AuthorPage = lazy(() => import('./pages/AuthorPage').then((m) => ({ default: m.AuthorPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage').then((m) => ({ default: m.DisclaimerPage })));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage').then((m) => ({ default: m.CookiePolicyPage })));
const EditorialPolicyPage = lazy(() => import('./pages/EditorialPolicyPage').then((m) => ({ default: m.EditorialPolicyPage })));
const AffiliateDisclosurePage = lazy(() => import('./pages/AffiliateDisclosurePage').then((m) => ({ default: m.AffiliateDisclosurePage })));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage').then((m) => ({ default: m.ReviewsPage })));
const BehaviorHubPage = lazy(() => import('./pages/BehaviorHubPage').then((m) => ({ default: m.BehaviorHubPage })));
const SearchPage = lazy(() => import('./pages/SearchPage').then((m) => ({ default: m.SearchPage })));
const SitemapPage = lazy(() => import('./pages/SitemapPage').then((m) => ({ default: m.SitemapPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));
const AdminApp = lazy(() => import('./pages/admin/AdminApp').then((m) => ({ default: m.AdminApp })));
const SearchModal = lazy(() => import('./components/SearchModal').then((m) => ({ default: m.SearchModal })));
const SavedArticlesDrawer = lazy(() =>
  import('./components/SavedArticlesDrawer').then((m) => ({ default: m.SavedArticlesDrawer }))
);

function RouteFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center" aria-live="polite" aria-busy="true">
      <div className="h-7 w-7 rounded-full border-2 border-stone-300 border-t-[#D95D39] animate-spin" />
    </div>
  );
}

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
      {!isAdminPath && (
        <Navbar
          onOpenSearch={() => setSearchOpen(true)}
          onOpenSaved={() => setSavedDrawerOpen(true)}
        />
      )}

      <main className="flex-1">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/admin/*" element={<AdminApp />} />

            <Route path="/" element={<HomePage />} />

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

            <Route path="/guides" element={<BlogArchivePage />} />
            <Route path="/blog" element={<BlogArchivePage />} />

            <Route path="/:category/:slug" element={<ArticleDetailPage />} />
            <Route path="/article/:slug" element={<ArticleDetailPage />} />

            <Route path="/author" element={<AuthorPage />} />
            <Route path="/author/:slug" element={<AuthorPage />} />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-conditions" element={<TermsPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/editorial-policy" element={<EditorialPolicyPage />} />
            <Route path="/affiliate-disclosure" element={<AffiliateDisclosurePage />} />

            <Route path="/search" element={<SearchPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      {!isAdminPath && (
        <>
          <Footer />
          {searchOpen && (
            <Suspense fallback={null}>
              <SearchModal isOpen onClose={() => setSearchOpen(false)} />
            </Suspense>
          )}
          {savedDrawerOpen && (
            <Suspense fallback={null}>
              <SavedArticlesDrawer isOpen onClose={() => setSavedDrawerOpen(false)} />
            </Suspense>
          )}
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
        <BrowserRouter>
          <ScrollToTop />
          <MainLayout />
        </BrowserRouter>
      </SavedArticlesProvider>
    </ThemeProvider>
  );
}
