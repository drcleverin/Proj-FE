
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Policy from "./pages/Policy";
import PolicyDetails from "./pages/PolicyDetails";
import HealthInsurance from "./pages/HealthInsurance";
import MotorInsurance from "./pages/MotorInsurance";
import ProductInsurance from "./pages/ProductInsurance";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPolicies from "./pages/admin/AdminPolicies";
import AdminClaims from "./pages/admin/AdminClaims";
import NotFound from "./pages/NotFound";
import RaiseClaimPage from "./pages/ClaimPage";
import SignupPage from "./pages/SignupPage";
import ClaimPage from "./pages/ClaimPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/policy" element={<Policy />} />
              {/* <Route path="/chatting" element={<Chatting/>}/> */}
              <Route path="/signup" element={<SignupPage />} />


              <Route path="/policy/:id" element={<PolicyDetails />} />
              <Route path="/claim/:policyId" element={<ClaimPage />} />
        
              <Route path="/health-insurance" element={<HealthInsurance />} />
              <Route path="/motor-insurance" element={<MotorInsurance />} />
              <Route path="/product-insurance" element={<ProductInsurance />} />
              <Route path="/claim" element={<Dashboard />} />
              <Route path="/support" element={<Dashboard />} />
              <Route path="/blogs" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/policies" element={<AdminPolicies />} />
              <Route path="/admin/claims" element={<AdminClaims />} />
              <Route path="/admin/products" element={<AdminDashboard />} />
              <Route path="/admin/analytics" element={<AdminDashboard />} />
              <Route path="/admin/settings" element={<AdminDashboard />} />
              <Route path="/admin/support" element={<AdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

