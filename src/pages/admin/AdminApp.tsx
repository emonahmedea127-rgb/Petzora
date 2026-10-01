import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import { AdminRoute } from '../../components/admin/AdminRoute';

const AdminLoginPage = lazy(() => import('./AdminLoginPage').then((m) => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('./AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })));
const AdminArticlesListPage = lazy(() => import('./AdminArticlesListPage').then((m) => ({ default: m.AdminArticlesListPage })));
const AdminArticleEditPage = lazy(() => import('./AdminArticleEditPage').then((m) => ({ default: m.AdminArticleEditPage })));
const AdminCategoriesPage = lazy(() => import('./AdminCategoriesPage').then((m) => ({ default: m.AdminCategoriesPage })));
const AdminMediaPage = lazy(() => import('./AdminMediaPage').then((m) => ({ default: m.AdminMediaPage })));
const AdminSettingsPage = lazy(() => import('./AdminSettingsPage').then((m) => ({ default: m.AdminSettingsPage })));
const AdminSyncPage = lazy(() => import('./AdminSyncPage').then((m) => ({ default: m.AdminSyncPage })));

function AdminFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950" aria-busy="true">
      <div className="h-8 w-8 rounded-full border-2 border-stone-700 border-t-orange-500 animate-spin" />
    </div>
  );
}

export const AdminApp: React.FC = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<AdminFallback />}>
        <Routes>
          <Route path="login" element={<AdminLoginPage />} />
          <Route
            index
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            }
          />
          <Route
            path="articles"
            element={
              <AdminRoute>
                <AdminArticlesListPage />
              </AdminRoute>
            }
          />
          <Route
            path="articles/new"
            element={
              <AdminRoute>
                <AdminArticleEditPage />
              </AdminRoute>
            }
          />
          <Route
            path="articles/edit/:id"
            element={
              <AdminRoute>
                <AdminArticleEditPage />
              </AdminRoute>
            }
          />
          <Route
            path="categories"
            element={
              <AdminRoute>
                <AdminCategoriesPage />
              </AdminRoute>
            }
          />
          <Route
            path="media"
            element={
              <AdminRoute>
                <AdminMediaPage />
              </AdminRoute>
            }
          />
          <Route
            path="settings"
            element={
              <AdminRoute>
                <AdminSettingsPage />
              </AdminRoute>
            }
          />
          <Route
            path="sync"
            element={
              <AdminRoute>
                <AdminSyncPage />
              </AdminRoute>
            }
          />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};
