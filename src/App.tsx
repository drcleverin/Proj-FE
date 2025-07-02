// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ThemeProvider } from "@/contexts/ThemeContext";
// import { AuthProvider } from "@/context/AuthContext";
// import ProtectedRoute from "@/components/ProtectedRoute";
 
// import Index from "./pages/Index";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import Dashboard from "./pages/Dashboard";
// import Policy from "./pages/Policy";
// import PolicyDetails from "./pages/PolicyDetails";
// import HealthInsurance from "./pages/HealthInsurance";
// import MotorInsurance from "./pages/MotorInsurance";
// import ProductInsurance from "./pages/ProductInsurance";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminUsers from "./pages/admin/AdminUsers";
// import AdminPolicies from "./pages/admin/AdminPolicies";
// import AdminClaims from "./pages/admin/AdminClaims";
// import NotFound from "./pages/NotFound";
// import SignupPage from "./pages/SignupPage";
// import ClaimPage from "./pages/ClaimPage";

// import RetrieveQuotePage from "./pages/RetrieveQuotePage";
// import TrackClaimPage from "./pages/TrackClaimPage";
// import LiveChatPage from "./pages/LiveChatPage";
// import RenewPolicyPage from "./pages/RenewPolicyPage";
// import CustomerFeedbackPage from "./pages/CustomerFeedbackPage";
// import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
// import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
// // Removed: import MotorThirdPartyClaimsPage from "./pages/MotorThirdPartyClaimsPage";
// import AboutOverviewPage from "./pages/AboutOverviewPage";
// import AboutPromotersPage from "./pages/Aboutpromoterspage";
// import AboutCSRPage from "./pages/AboutCSRPage";
// import CustomerSupportPage from "./pages/CustomerSupportPage";
// const queryClient = new QueryClient();
 
// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <ThemeProvider defaultTheme="light" storageKey="ui-theme">
//       <AuthProvider>
//         <TooltipProvider>
//           <Toaster />
//           <Sonner />
//           <BrowserRouter>
//             <Routes>
//               {/* Public Routes */}
//               <Route path="/" element={<Index />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/forgot-password" element={<ForgotPassword />} />
//               <Route path="/reset-password" element={<ResetPassword />} />
//               {/* <Route path="/signup" element={<SignupPage />} /> */}
//               <Route path="/claimpg" element={<ClaimPage />} />

//               <Route path="/retrieve-quote" element={<ProtectedRoute><RetrieveQuotePage /></ProtectedRoute>} />
//               <Route path="/track-claim" element={<ProtectedRoute><TrackClaimPage /></ProtectedRoute>} />
//               <Route path="/live-chat" element={<ProtectedRoute><LiveChatPage /></ProtectedRoute>} />
//               <Route path="/renew-policy" element={<ProtectedRoute><RenewPolicyPage /></ProtectedRoute>} />
//               <Route path="/customer-feedback" element={<ProtectedRoute><CustomerFeedbackPage /></ProtectedRoute>} />

//               {/* Legal Section */}
//               <Route path="/legal/privacy-policy" element={<PrivacyPolicyPage />} />
//               <Route path="/legal/terms-conditions" element={<TermsAndConditionsPage />} />
//               {/* Removed: <Route path="/legal/motor-third-party-claims" element={<MotorThirdPartyClaimsPage />} /> */}

//               {/* About Us Section */}
//               <Route path="/about/overview" element={<AboutOverviewPage />} />
//               <Route path="/about/promoters" element={<AboutPromotersPage />} />
//               <Route path="/about/csr" element={<AboutCSRPage />} />

//               {/* Protected Routes */}
//               <Route path="/dashboard" element={
//                 <ProtectedRoute><Dashboard /></ProtectedRoute>
//               } />
              
//               <Route path="/policy" element={
//                 <ProtectedRoute><Policy /></ProtectedRoute>
//               } />
 
//               <Route path="/policy/:id" element={
//                 <ProtectedRoute><PolicyDetails /></ProtectedRoute>
//               } />
 
//               <Route path="/claim/:policyId" element={
//                 <ProtectedRoute><ClaimPage /></ProtectedRoute>
//               } />
 
//               <Route path="/health-insurance" element={
//                 <ProtectedRoute><HealthInsurance /></ProtectedRoute>
//               } />
 
//               <Route path="/motor-insurance" element={
//                 <ProtectedRoute><MotorInsurance /></ProtectedRoute>
//               } />
 
//               <Route path="/product-insurance" element={
//                 <ProtectedRoute><ProductInsurance /></ProtectedRoute>
//               } />
 
//               <Route path="/claim" element={
//                 <ProtectedRoute><Dashboard /></ProtectedRoute>
//               } />
 
//               <Route path="/support" element={
//                 <ProtectedRoute><Dashboard /></ProtectedRoute>
//               } />
 
//               <Route path="/blogs" element={
//                 <ProtectedRoute><Dashboard /></ProtectedRoute>
//               } />
 
//               {/* Admin Routes (can also be wrapped with role check) */}
//               <Route path="/admin" element={
//                 <ProtectedRoute><AdminDashboard /></ProtectedRoute>
//               } />
//               <Route path="/admin/users" element={
//                 <ProtectedRoute><AdminUsers /></ProtectedRoute>
//               } />
//               <Route path="/admin/policies" element={
//                 <ProtectedRoute><AdminPolicies /></ProtectedRoute>
//               } />
//               <Route path="/admin/claims" element={
//                 <ProtectedRoute><AdminClaims /></ProtectedRoute>
//               } />
//               <Route path="/admin/products" element={
//                 <ProtectedRoute><AdminDashboard /></ProtectedRoute>
//               } />
//               <Route path="/admin/analytics" element={
//                 <ProtectedRoute><AdminDashboard /></ProtectedRoute>
//               } />
//               <Route path="/admin/settings" element={
//                 <ProtectedRoute><AdminDashboard /></ProtectedRoute>
//               } />
//               <Route path="/admin/support" element={
//                 <ProtectedRoute><AdminDashboard /></ProtectedRoute>
//               } />
 
//               {/* Catch-All */}
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </BrowserRouter>
//         </TooltipProvider>
//       </AuthProvider>
//     </ThemeProvider>
//   </QueryClientProvider>
// );
 
// export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
// Import the updated ProtectedRoute component
import ProtectedRoute from "@/components/ProtectedRoute"; 

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
import SignupPage from "./pages/SignupPage";
import ClaimPage from "./pages/ClaimPage";

import RetrieveQuotePage from "./pages/RetrieveQuotePage";
import TrackClaimPage from "./pages/TrackClaimPage";
import LiveChatPage from "./pages/LiveChatPage";
import RenewPolicyPage from "./pages/RenewPolicyPage";
import CustomerFeedbackPage from "./pages/CustomerFeedbackPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import AboutOverviewPage from "./pages/AboutOverviewPage";
import AboutPromotersPage from "./pages/Aboutpromoterspage";
import AboutCSRPage from "./pages/AboutCSRPage";
import CustomerSupportPage from "./pages/CustomerSupportPage"; // Ensure this is used if it's a page
import Blog from "./pages/Blogs";
import Blogs from "./pages/Blogs";
import ComingSoon from "./pages/ComingSoon";
import Profile from "./pages/Profile";

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
              {/* Public Routes - Accessible to all */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              {/* <Route path="/signup" element={<SignupPage />} /> - Uncomment if needed */}
              <Route path="/claimpg" element={<ClaimPage />} /> {/* This route seems to be generic or public */}

              {/* Legal Section - Public */}
              <Route path="/legal/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/legal/terms-conditions" element={<TermsAndConditionsPage />} />

              {/* About Us Section - Public */}
              <Route path="/about/overview" element={<AboutOverviewPage />} />
              <Route path="/about/promoters" element={<AboutPromotersPage />} />
              <Route path="/about/csr" element={<AboutCSRPage />} />

              {/* Customer-facing Protected Routes - Accessible ONLY to CUSTOMER roles (or other specified customer-like roles) */}
              {/* If an ADMIN tries to access any of these, ProtectedRoute will redirect them to /admin */}
              <Route path="/retrieve-quote" element={<ProtectedRoute allowedRoles={['CUSTOMER']}><RetrieveQuotePage /></ProtectedRoute>} />
              <Route path="/track-claim" element={<ProtectedRoute allowedRoles={['CUSTOMER']}><TrackClaimPage /></ProtectedRoute>} />
              <Route path="/live-chat" element={<ProtectedRoute allowedRoles={['CUSTOMER', 'CSR']}><LiveChatPage /></ProtectedRoute>} /> {/* Live Chat might be for CUSTOMER and CSR */}
              <Route path="/renew-policy" element={<ProtectedRoute allowedRoles={['CUSTOMER']}><RenewPolicyPage /></ProtectedRoute>} />
              <Route path="/customer-feedback" element={<ProtectedRoute allowedRoles={['CUSTOMER']}><CustomerFeedbackPage /></ProtectedRoute>} />

              {/* General Protected Routes for Customers */}
              {/* Dashboard is explicitly for CUSTOMERS only here. */}
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['CUSTOMER']}><Dashboard /></ProtectedRoute>
              } />
              
              <Route path="/policy" element={
                <ProtectedRoute allowedRoles={['CUSTOMER']}><Policy /></ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute allowedRoles={['CUSTOMER']}><Profile /></ProtectedRoute>
              } />

                <Route path="/comingSoon" element={
                <ProtectedRoute allowedRoles={['CUSTOMER']}><ComingSoon /></ProtectedRoute>
              } />

              <Route path="/policy/:id" element={
                <ProtectedRoute allowedRoles={['CUSTOMER']}><PolicyDetails /></ProtectedRoute>
              } />

              <Route path="/claim/:policyId" element={
                <ProtectedRoute allowedRoles={['CUSTOMER']}><ClaimPage /></ProtectedRoute>
              } />

              <Route path="/health-insurance" element={
                <ProtectedRoute allowedRoles={['CUSTOMER']}><HealthInsurance /></ProtectedRoute>
              } />

              <Route path="/motor-insurance" element={
                <ProtectedRoute allowedRoles={['CUSTOMER']}><MotorInsurance /></ProtectedRoute>
              } />

              <Route path="/product-insurance" element={
                <ProtectedRoute allowedRoles={['CUSTOMER']}><ProductInsurance /></ProtectedRoute>
              } />
              
              {/* Note: The following routes were pointing to Dashboard, consider if they need dedicated components */}
              <Route path="/claim" element={
                <ProtectedRoute allowedRoles={['CUSTOMER']}><Dashboard /></ProtectedRoute>
              } />

              <Route path="/support" element={
                <ProtectedRoute allowedRoles={['CUSTOMER']}><CustomerSupportPage /></ProtectedRoute> // Assuming CustomerSupportPage is the correct component
              } />

              <Route path="/blogs" element={
                <ProtectedRoute allowedRoles={['CUSTOMER']}><Blogs /></ProtectedRoute>
              } />

              {/* Admin Routes - Accessible ONLY to ADMIN role */}
              {/* If a CUSTOMER tries to access any of these, ProtectedRoute will redirect them to /dashboard */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute allowedRoles={['ADMIN']}><AdminUsers /></ProtectedRoute>
              } />
              <Route path="/admin/policies" element={
                <ProtectedRoute allowedRoles={['ADMIN']}><AdminPolicies /></ProtectedRoute>
              } />
              <Route path="/admin/claims" element={
                <ProtectedRoute allowedRoles={['ADMIN']}><AdminClaims /></ProtectedRoute>
              } />
              {/* Admin routes currently pointing to AdminDashboard */}
              <Route path="/admin/products" element={
                <ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>
              } />
              <Route path="/admin/analytics" element={
                <ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>
              } />
              <Route path="/admin/support" element={
                <ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>
              } />

              {/* Catch-All Route for 404 - Should be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
