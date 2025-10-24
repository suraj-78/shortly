import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Import useParams and Link
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { LinkIcon } from "lucide-react";
import { urlApi } from "@/lib/api"; // Import urlApi

export default function RedirectPage() {
  const { shortUrl } = useParams(); // Get the dynamic param from React Router
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUrlAndRedirect = async () => {
      // Ignore if shortUrl is not defined yet
      if (!shortUrl) return;

      try {
        // Use the redirect function from urlApi
        const response = await urlApi.redirect(shortUrl);

        // The API returns the long URL in response.data.data
        const longUrl = response.data?.data;

        if (!longUrl || longUrl === "") {
          setError(
            "The URL you're trying to visit doesn't exist or has been removed."
          );
        } else {
          // Perform the client-side redirect
          window.location.href = longUrl;
        }
      } catch (err) {
        // Handle errors (like 404)
        setError(
          err.message ||
            "The URL you're trying to visit doesn't exist or has been removed."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUrlAndRedirect();
  }, [shortUrl]); // Re-run effect if shortUrl changes

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <LinkIcon className="h-12 w-12 text-primary mb-4" />
        <h1 className="text-2xl font-bold mb-2">Redirecting you...</h1>
        <LoadingSpinner size={32} className="mb-4" />
        <p className="text-muted-foreground text-center">
          You're being redirected to your destination.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <LinkIcon className="h-12 w-12 text-primary mb-4" />
        <h1 className="text-2xl font-bold mb-2">URL Not Found</h1>
        <p className="text-muted-foreground text-center mb-6">{error}</p>
        <Link to="/"> {/* Changed from Next Link */}
          <Button>Return to Homepage</Button>
        </Link>
      </div>
    );
  }

  // If not loading and no error, it should have redirected already.
  // We can return null or a minimal message.
  return null; 
}
