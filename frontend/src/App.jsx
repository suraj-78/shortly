import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'sonner';

// --- Import your real pages ---
import HomePage from '@/pages/HomePage'; // Import the new HomePage

// --- Placeholder Page Components ---
const DashboardPage = () => <div className="p-4">Dashboard Page</div>;
const LoginPage = () => <div className="p-4">Login Page</div>;
const RegisterPage = () => <div className="p-4">Register Page</div>;
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
      <Toaster position="bottom-right" richColors />
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
            {/* Use the real HomePage component */}
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

