import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary';
import { Button } from './components/ui/button';
import './index.css';

// Lazy load components with explicit file extensions for Vite
const Home = lazy(() => import('./home/index.jsx'));
const Dashboard = lazy(() => import('./dashboard/index.jsx'));
const EditResume = lazy(() => import('./dashboard/resume/[resumeId]/edit/index.jsx'));
const ViewResume = lazy(() => import('./my-resume/[resumeId]/view/index.jsx'));

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Error boundary fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
    <div className="bg-red-50 p-6 rounded-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong</h2>
      <pre className="text-sm text-red-500 mb-6 overflow-auto max-h-60 p-2 bg-white rounded">
        {error.message}
      </pre>
      <div className="flex gap-3 justify-center">
        <Button onClick={resetErrorBoundary} variant="outline">
          Try again
        </Button>
        <Button onClick={() => window.location.href = '/'} variant="default">
          Go to Home
        </Button>
      </div>
    </div>
  </div>
);

// Auth context (simplified - implement your auth logic)
const isAuthenticated = () => {
  // Implement your authentication check here
  return true; // For demo purposes
};

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <App />
      </Suspense>
    ),
    errorElement: <ErrorBoundary FallbackComponent={ErrorFallback} />,
    children: [
      {
        path: '/',
        element: <Suspense fallback={<LoadingFallback />}><Home /></Suspense>,
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/resume/:resumeId/edit',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <EditResume />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/my-resume/:resumeId/view',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ViewResume />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-right" richColors />
  </React.StrictMode>
);
