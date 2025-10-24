import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
// import { AuthProvider } from '@/contexts/AuthContext'; // We'll create this soon
// import { Toaster } from '@/components/ui/toaster'; // We'll add this soon

// --- Placeholder Page Components ---
// We'll replace these with your real pages
const DashboardPage = () => <div className="p-4">Dashboard Page</div>;
const LoginPage = () => <div className="p-4">Login Page</div>;
const RegisterPage = () => <div className="p-4">Register Page</div>;
const RedirectPage = () => <div className="p-4">Redirecting...</div>;
const HomePage = () => <div className="p-4">Home Page</div>;
// --- End of Placeholders ---

/**
 * This is the main layout component.
 * It includes the main tag and the Toaster.
 * The <Outlet /> is where the router will render the current page.
 */
function MainLayout() {
  return (
    <main className="min-h-screen bg-background">
      <Outlet /> {/* This renders the matched child route (e.g., HomePage, LoginPage) */}
      {/* <Toaster /> */}
    </main>
  );
}

function App() {
  return (
    // <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* All pages are rendered inside the MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            
            {/* This route handles the short URL redirects */}
            <Route path=":shortUrl" element={<RedirectPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;