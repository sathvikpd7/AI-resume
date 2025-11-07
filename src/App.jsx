import { Outlet, useNavigation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Header from './components/custom/Header';
import ErrorBoundary from './components/ErrorBoundary';
import { Loader2 } from 'lucide-react';

function App() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Global Loading Indicator */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span>Loading...</span>
            </div>
          </div>
        )}
        
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>
        
        <Toaster position="top-right" richColors />
      </div>
    </ErrorBoundary>
  );
}

export default App;
