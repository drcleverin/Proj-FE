import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('http://localhost:8093/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ username, email, password,roleType: role })
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Registration successful!');
        setIsError(false);
        console.log("Registration successful:", data);
        navigate('/login');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'An unexpected error occurred.');
        setIsError(true);
        console.error("Registration failed:", errorData);
      }
    } catch (error: any) {
      setMessage('Network error or invalid response from server: ' + error.message);
      setIsError(true);
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex items-center justify-center py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-insurance-primary">
              Create Account
            </CardTitle>
            <p className="text-gray-600">Join us today</p>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleRegister}>
              <div className="space-y-4">
                {/* Username Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="CUSTOMER">Customer</option>
                    {/* <option value="csr">CSR</option>
                    <option value="underwriter">Underwriter</option> */}
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>

                {/* Submit & Navigation */}
                <div className="flex flex-col space-y-2">
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Register
                  </Button>
                  <Link
                    to="/login"
                    className="text-center text-sm text-insurance-primary hover:underline"
                  >
                    Already have an account? Login
                  </Link>
                </div>

                {/* Alert Message */}
                {message && (
                  <div
                    className={`bg-blue-50 border border-blue-200 px-4 py-3 rounded text-center ${
                      isError
                        ? 'text-red-700 border-red-200 bg-red-50'
                        : 'text-blue-700'
                    }`}
                    role="alert"
                  >
                    {message}
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;

