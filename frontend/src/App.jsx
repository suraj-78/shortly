import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster'; // Import the correct Toaster

// --- Import your real pages ---
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

// --- Placeholder Page Components ---
const DashboardPage = () => <div className="p-4">Dashboard Page</div>;
const RedirectPage = () => <div className="p-4">Redirecting...</div>;
// --- End of Placeholders ---

/**
 * This is the main layout component.
 * It includes the main tag and the Toaster.
 * The <Outlet /> is where the router will render the current page.
 */
function MainLayout() {
  return (
    <main className="min-h-screen bg-background">
      <Outlet />
      <Toaster /> {/* Use the shadcn/ui Toaster */}
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

