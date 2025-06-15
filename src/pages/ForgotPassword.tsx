
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import authService from '../api/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);
    try {
      const response = await authService.requestPasswordReset(email);
      setMessage(response.data.message);
      setIsSuccess(true);
    } catch (error: any) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage);
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex items-center justify-center py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-insurance-primary">
              Forgot Password
            </CardTitle>
            <p className="text-gray-600">Enter your email address and we'll send you a password reset link.</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleRequestReset}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-insurance-primary hover:bg-insurance-dark"
                >
                  Request Reset Link
                </Button>
                
                {message && (
                  <div className={`px-4 py-3 rounded text-center ${
                    isSuccess 
                      ? 'bg-green-50 border border-green-200 text-green-700' 
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`} role="alert">
                    {message}
                  </div>
                )}
                
                <div className="text-center">
                  <Link to="/login" className="text-sm text-gray-600 hover:underline">
                    Back to Login
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
