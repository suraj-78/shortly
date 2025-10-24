import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/lib/api';
import { toast } from 'sonner';
// We'll create this loading spinner soon
// import { LoadingSpinner } from '@/components/ui/loading-spinner'; 

// --- Create the Context ---
const AuthContext = createContext(undefined);

// --- AuthProvider Component ---
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Will store user data (e.g., { id: '...' })
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For login/register spinners
  const [isInitialLoading, setIsInitialLoading] = useState(true); // For page load spinner
  
  const navigate = useNavigate();

  // This effect runs once when the app loads
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // Try to get the user from the backend
        const response = await authApi.getMe();
        if (response.data && response.data.data) {
          setUser(response.data.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        // If it fails (e.g., 401), the user is not logged in
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        // We're done with the initial page load check
        setIsInitialLoading(false);
      }
    };
    checkUserSession();
  }, []);

  const login = async (data) => {
    try {
      setIsLoading(true);
      const response = await authApi.login(data);

      toast.success('You have successfully logged in');
      
      // Manually set auth state
      setIsAuthenticated(true);
      setUser(response.data.data); // Assuming token response includes user info (or just { token: '...' })

      navigate('/dashboard');
      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data) => {
    try {
      setIsLoading(true);
      const response = await authApi.register(data);

      toast.success('Your account has been created successfully!');
      
      // Manually set auth state
      setIsAuthenticated(true);
      setUser(response.data.data);

      navigate('/dashboard');
      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to register');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authApi.logout();

      toast.success('You have been logged out successfully');
      
      // Clear auth state
      setUser(null);
      setIsAuthenticated(false);

      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Failed to logout');
    } finally {
      setIsLoading(false);
    }
  };

  // Show a full-page loader while checking the session
  if (isInitialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        {/* <LoadingSpinner size={32} /> */}
        <p>Loading...</p> 
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        isInitialLoading, // Renamed from 'isLoading'
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// --- Custom Hook ---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

