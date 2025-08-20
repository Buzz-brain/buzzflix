// ...existing code...
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from '@/contexts/AppContext';
import { AdminProvider } from '@/contexts/AdminContext';
import { Navbar } from '@/components/Navbar';
import { HomePage } from '@/pages/HomePage';
import { MoviesPage } from '@/pages/MoviesPage';
import { SeriesPage } from '@/pages/SeriesPage';
import { MovieDetailsPage } from '@/pages/MovieDetailsPage';
import { SearchPage } from '@/pages/SearchPage';
import { MyListPage } from '@/pages/MyListPage';
import { TrendingPage } from '@/pages/TrendingPage';
import { AccountPage } from '@/pages/AccountPage';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminLayout } from '@/pages/admin/AdminLayout';
import { AdminOverviewPage } from '@/pages/admin/AdminOverviewPage';
import { AdminStructuredDataPage } from '@/pages/admin/AdminStructuredDataPage';
import { AdminUnstructuredDataPage } from '@/pages/admin/AdminUnstructuredDataPage';
import { AdminHybridQueriesPage } from '@/pages/admin/AdminHybridQueriesPage';
import { AdminAnalyticsPage } from '@/pages/admin/AdminAnalyticsPage';
import { AdminSettingsPage } from '@/pages/admin/AdminSettingsPage';

function AnimatedRoutes() {
  const location = useLocation();
  
  // Check if we're in admin routes
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        {!isAdminRoute && (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/series" element={<SeriesPage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/my-list" element={<MyListPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/account" element={<AccountPage />} />
          </>
        )}
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverviewPage />} />
          <Route path="structured" element={<AdminStructuredDataPage />} />
          <Route path="unstructured" element={<AdminUnstructuredDataPage />} />
          <Route path="queries" element={<AdminHybridQueriesPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AdminProvider>
      <AppProvider>
        <div className="min-h-screen bg-black text-white">
          {!isAdminRoute && <Navbar />}
          <AnimatedRoutes />
        </div>
      </AppProvider>
    </AdminProvider>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;