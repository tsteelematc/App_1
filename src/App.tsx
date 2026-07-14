import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthPage } from '@/components/AuthPage';
import { useAuth } from '@/hooks/AuthContext';
import { HomePage } from '@/pages/HomePage';

function AuthGuard({
  children,
  requireAuth,
}: {
  children: React.ReactNode;
  requireAuth: boolean;
}) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) return <Navigate to="/auth" replace />;
  if (!requireAuth && isAuthenticated) return <Navigate to="/" replace />;

  return <>{children}</>;
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-base-100 text-base-content">
        <nav className="navbar border-b border-base-300 bg-base-200 px-4 md:px-6">
          <div className="flex-1">
            <span className="text-lg font-semibold">App 1</span>
          </div>
          <div className="flex-none">
            <label className="swap swap-rotate btn btn-ghost btn-circle" aria-label="Toggle light and dark mode">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={() => setIsDarkMode((prev) => !prev)}
                aria-label="Toggle theme"
              />

              <svg
                className="swap-off h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64 17.66A9 9 0 1 1 18.36 4.34a1 1 0 0 0-1.16 1.61 7 7 0 1 0-9.87 9.87 1 1 0 1 0-1.69 1.84Z" />
              </svg>

              <svg
                className="swap-on h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5 12a1 1 0 0 1 1-1h1.2a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm10.8-7.8a1 1 0 0 1 1.4 0l.85.85a1 1 0 1 1-1.41 1.41l-.84-.84a1 1 0 0 1 0-1.42ZM12 4a1 1 0 0 1 1 1v1.2a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Zm6.8 7h1.2a1 1 0 1 1 0 2h-1.2a1 1 0 1 1 0-2Zm-2.16 6.94a1 1 0 0 1 1.41 0l.85.85a1 1 0 0 1-1.41 1.41l-.85-.84a1 1 0 0 1 0-1.42ZM12 17.8a1 1 0 0 1 1 1V20a1 1 0 1 1-2 0v-1.2a1 1 0 0 1 1-1Zm-6.94.14a1 1 0 0 1 1.42 0 1 1 0 0 1 0 1.41l-.85.85a1 1 0 0 1-1.41-1.41l.84-.85Zm.14-13.74a1 1 0 0 1 1.41 1.42l-.84.84a1 1 0 0 1-1.42-1.41l.85-.85ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
              </svg>
            </label>
          </div>
        </nav>

        {/* ensure all new routes require auth */}
        <Routes>
          <Route
            path="/auth"
            element={
              <AuthGuard requireAuth={false}>
                <AuthPage />
              </AuthGuard>
            }
          />
          <Route
            path="/"
            element={
              <AuthGuard requireAuth={true}>
                <HomePage />
              </AuthGuard>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
