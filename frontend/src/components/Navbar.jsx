import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom"; // Changed from 'next/link'
import { Button } from "./ui/button";
import { LogOut, Link as LinkIcon } from "lucide-react";
// We'll use the LoadingSpinner we created earlier
import { LoadingSpinner } from "./ui/loading-spinner"; 

// The 'isAuthenticated' prop is no longer needed,
// as the component gets this from the useAuth hook.
export default function Navbar() {
  const { isAuthenticated, isLoading, logout } = useAuth();

  return (
    <header className="bg-background border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <LinkIcon className="h-6 w-6" />
          <Link
            to={isAuthenticated ? "/dashboard" : "/"} // Changed 'href' to 'to'
            className="text-xl font-bold"
          >
            Shortly
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          {isLoading ? (
            // Show a small spinner in the navbar during login/logout
            <LoadingSpinner size={20} />
          ) : isAuthenticated ? (
            // User is logged in
            <Button
              variant="ghost"
              onClick={() => logout()}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : (
            // User is not logged in
            <div className="flex items-center gap-2">
              <Link to="/login"> {/* Changed 'href' to 'to' */}
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register"> {/* Changed 'href' to 'to' */}
                <Button>Register</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
