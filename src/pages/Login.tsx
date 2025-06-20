import { useState, useContext } from "react"; // Import useContext
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import AuthContext from "../context/AuthContext"; // Import AuthContext

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState(""); // Changed to match backend DTO
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false); // For styling messages
  
  const { login } = useContext(AuthContext); // Use useContext to get the login function
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsError(false); // Reset error status

    try {
      // Call the login function from AuthContext
      const loggedInUser = await login(usernameOrEmail, password);
      
      setMessage("Login successful!");
      setIsError(false);
      console.log("Logged in user:", loggedInUser);

      // Redirect based on role or to a default dashboard
      // Example:
      switch (loggedInUser.role) {
        case 'ADMIN':
          navigate('/admin-dashboard'); // Or wherever your admin dashboard is
          break;
        case 'CUSTOMER':
          navigate('/dashboard'); // Or wherever your customer dashboard is
          break;
        case 'CSR':
          navigate('/csr-dashboard');
          break;
        case 'Underwriter':
          navigate('/underwriter-dashboard');
          break;
        default:
          navigate('/dashboard'); // Default fallback
          break;
      }

    } catch (error: any) {
      // Catch errors thrown by the login function in AuthProvider
      setMessage(error.message || "An unexpected login error occurred.");
      setIsError(true);
      console.error("Login failed:", error); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex items-center justify-center py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-insurance-primary">
              Welcome Back
            </CardTitle>
            <p className="text-gray-600">Sign in to your account</p>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username or Email
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your username or email"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm text-insurance-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-insurance-primary hover:bg-insurance-dark"
                >
                  Sign In
                </Button>

                {message && (
                  <div className={`px-4 py-3 rounded text-center ${isError ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700'}`} role="alert">
                    {message}
                  </div>
                )}

                <div className="text-center">
                  <span className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-insurance-primary hover:underline">
                      Sign up
                    </Link>
                  </span>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;