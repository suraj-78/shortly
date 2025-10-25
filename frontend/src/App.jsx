import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';

// --- Import your real pages ---
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import RedirectPage from '@/pages/RedirectPage'; // Import the new RedirectPage

function MainLayout() {
  return (
    <main className="min-h-screen bg-background">
      <Outlet />
      <Toaster /> 

       <footer className="py-4 px-6 text-center text-sm text-muted-foreground border-t bg-background">
        <span className="font-semibold"> {/* Added font-semibold for boldness */}
          Made with ❤️ by Suraj Pandit
        </span>
      </footer>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* All pages are rendered inside the MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="dashboard" element={<DashboardPage />} />

            <Route path=":shortUrl" element={<RedirectPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

