import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/lib/api';
import { useToast } from "@/components/ui/use-toast"; // Changed from 'sonner'
import { LoadingSpinner } from '@/components/ui/loading-spinner'; // Uncommented

// --- Create the Context ---
const AuthContext = createContext(undefined);

// --- AuthProvider Component ---
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const navigate = useNavigate();
  const { toast } = useToast(); // Use the shadcn/ui hook

  // This effect runs once when the app loads
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await authApi.getMe();
        if (response.data && response.data.data) {
          setUser(response.data.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsInitialLoading(false);
      }
    };
    checkUserSession();
  }, []);

  const login = async (data) => {
    try {
      setIsLoading(true);
      const response = await authApi.login(data);

      // Changed to shadcn/ui toast
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
      
      setIsAuthenticated(true);
      setUser(response.data.data);

      navigate('/dashboard');
      return true;
    } catch (error) {
      // Changed to shadcn/ui toast
      toast({
        title: "Login Failed",
        description: error.message || 'Failed to login',
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data) => {
    try {
      setIsLoading(true);
      const response = await authApi.register(data);

      // Changed to shadcn/ui toast
      toast({
        title: "Welcome!",
        description: "Your account has been created successfully!",
      });
      
      setIsAuthenticated(true);
      setUser(response.data.data);

      navigate('/dashboard');
      return true;
    } catch (error) {
      // Changed to shadcn/ui toast
      toast({
        title: "Registration Failed",
        description: error.message || 'Failed to register',
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authApi.logout();

      // Changed to shadcn/ui toast
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully",
      });
      
      setUser(null);
      setIsAuthenticated(false);

      navigate('/login');
    } catch (error) {
      // Changed to shadcn/ui toast
      toast({
        title: "Logout Failed",
        description: error.message || 'Failed to logout',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show a full-page loader while checking the session
  if (isInitialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <LoadingSpinner size={32} />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        isInitialLoading,
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

