// src/components/PolicyDetails.tsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "../components/Header"; // Corrected import path
import Chatbot from "../components/Chatbot"; // Corrected import path
import Footer from "../components/Footer"; // Corrected import path
import ClaimPage from "../pages/ClaimPage"
import { ArrowLeft, Download, Phone, Mail, FileText, Calendar, CreditCard, Shield } from "lucide-react";

// Define the interface for the policy data fetched from the backend (matches PolicyResponseDTO)
interface FetchedPolicyData {
  policyId: number;
  policyNumber: string;
  policyEndDate: string; // ISO string from Java Instant
  policyStartDate: string; // ISO string from Java Instant
  policyStatus: string;
  premiumAmount: number; // From Policy, number in TS
  userId: number;
  vehicleId: number | null; // Can be null if not motor policy

  // Fields from associated InsurancePlan
  planId: number;
  planName: string;
  planType: string; // "Motor", "Health", "Product"
  basePremium: number; // From InsurancePlan
  coverage: number; // Sum Insured from InsurancePlan
  descriptionAboutPolicy: string;
}

// Frontend-specific fields to enrich display
interface PolicyDisplay extends FetchedPolicyData {
  // Frontend specific derived properties
  id: string; // policyId as string for URL
  type: string; // planName or "Policy Type {X}"
  category: string; // "Motor Insurance", "Health Insurance" etc.
  insured: string; // "Customer ID: {X}" (or fetched name)
  icon: string; // Emoji based on planType
  benefits: string[]; // Mock or derived
  documents: string[]; // Mock or derived

  // Optional fields for specific policy types (derived or mocked in frontend currently)
  members?: string[]; // For Health
  vehicle?: string; // For Motor (mock)
  registrationNo?: string; // For Motor (mock, using policyNumber for now)
  product?: string; // For Product (mock)
  modelNo?: string; // For Product (mock)
  effectiveDate: string; // Formatted policyStartDate
  premiumFormatted: string; // Formatted premiumAmount
  sumInsuredFormatted: string; // Formatted coverage
  expiryDate: string;
}

const PolicyDetails = () => {
  const { id } = useParams<{ id: string }>(); // ID from URL path, will be policyId
  const [policy, setPolicy] = useState<PolicyDisplay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRenewalPopup, setShowRenewalPopup] = useState(false); // New state for pop-up visibility
  // Helper functions (same as in Dashboard.tsx or centralized)
  const getPolicyIcon = (planType: string): string => {
    switch (planType.toLowerCase()) {
      case "motor": return "🚗";
      case "health": return "💊";
      case "product": return "📺";
      default: return "📄";
    }
  };

  const getCategoryName = (planType: string): string => {
    switch (planType.toLowerCase()) {
      case "motor": return "Motor Insurance";
      case "health": return "Health Insurance";
      case "product": return "Product Insurance";
      default: return "Unknown Policy";
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      try {
        // Try parsing as YYYY-MM-DD if ISO string fails for some reason
        const [year, month, day] = dateString.split('-').map(Number);
        const parsedDate = new Date(year, month - 1, day);
        if (!isNaN(parsedDate.getTime())) {
            return parsedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        }
      } catch (e) {
        console.warn("Could not parse dateString:", dateString, e);
      }
      return "Invalid Date";
    }
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Mock benefits and documents - ideally these would come from more detailed backend APIs
  // const getMockBenefits = (planType: string): string[] => {
  //   switch (planType.toLowerCase()) {
  //     case "motor": return ["Own Damage Coverage", "Third Party Liability", "Personal Accident: ₹15,00,000", "24x7 Roadside Assistance"];
  //     case "health": return ["Hospitalization Coverage", "Pre & Post Hospitalization", "Day Care Procedures", "Annual Health Check-up"];
  //     case "product": return ["Manufacturing Defects", "Electrical/Mechanical Breakdown", "Screen Protection", "Pick-up & Drop Service"];
  //     default: return ["Basic Coverage"];
  //   }
  // };

  const getMockDocuments = (planType: string): string[] => {
    switch (planType.toLowerCase()) {
      case "motor": return ["Policy Certificate (Motor)", "Insurance Certificate (Motor)"];
      case "health": return ["Policy Certificate (Health)", "Health Cards"];
      case "product": return ["Warranty Certificate (Product)", "Service Terms"];
      default: return ["Policy Document"];
    }
  };

  const getMockHealthMembers = (): string[] => {
    // This would ideally come from backend with specific Health policy member details
    return ["Rajesh Sharma (Primary)", "Priya Sharma (Spouse)", "Rohan Sharma (Son)"];
  };

  // Add this helper function inside or outside your component, or as a utility
const getDaysUntilExpiration = (endDateString: string): number => {
  if (!endDateString) return -1; // Or handle as an error state
  const endDate = new Date(endDateString);
  const currentDate = new Date();

  // Reset time to midnight for accurate day comparison
  endDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  const diffTime = endDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
// Inside your PolicyDetails functional component
const handleRenewPolicyClick = () => {
  if (!policy) return; // Should not happen if button is only rendered when policy is loaded

  const daysUntilExpiration = getDaysUntilExpiration(policy.policyEndDate);
  const renewalThresholdDays = 90; // Define your threshold

  if (daysUntilExpiration > renewalThresholdDays) {
    setShowRenewalPopup(true); // Show the pop-up
  } else {
    // If within or past the renewal window, navigate to the renewal page
    // Replace '/renew-policy' with your actual renewal route
    // navigate(`/renew-policy/${policy.id}`);
  }
};

  useEffect(() => {
    const fetchPolicyDetails = async () => {
      if (!id) {
        setError("Policy ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        // Using the new backend endpoint
        console.log(`Fetching policy details for ID: ${id}`);
        const response = await fetch(`http://localhost:8093/api/dashboard/viewpolicy/${id}`);

        if (!response.ok) { 
          if (response.status === 404) {
            throw new Error("Policy not found.");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: FetchedPolicyData = await response.json(); // Backend returns FetchedPolicyData

        const parsedBenefitsArray: string[] = [];
        if (data.descriptionAboutPolicy && typeof data.descriptionAboutPolicy === 'string') {
          // Split by '.' and filter out any empty strings (e.g., from trailing dots)
          data.descriptionAboutPolicy.split('.')
            .forEach(benefit => {
              const trimmedBenefit = benefit.trim();
              if (trimmedBenefit) { // Add only non-empty, non-whitespace benefits
                parsedBenefitsArray.push(trimmedBenefit);
              }
            });
        }

        // Map backend data to frontend display format
        const mappedPolicy: PolicyDisplay = {
          ...data,
          id: data.policyId.toString(), // Use policyId as frontend ID
          type: data.planName || `Policy Type ${data.planId}`, // Use planName for display
          category: getCategoryName(data.planType), // Map type to category name
          insured: `Customer ID: ${data.userId}`, // Placeholder
          icon: getPolicyIcon(data.planType), // Get icon based on planType
          // benefits: getMockBenefits(data.planType), // Mock benefits
          benefits:parsedBenefitsArray,
          documents: getMockDocuments(data.planType), // Mock documents
          premiumFormatted: `₹${data.premiumAmount.toLocaleString('en-IN')}`, // Format premium
          sumInsuredFormatted: `₹${data.coverage.toLocaleString('en-IN')}`, // Format sum insured from coverage
          effectiveDate: formatDate(data.policyStartDate),
          expiryDate: formatDate(data.policyEndDate),
          // Add specific fields if they were retrieved for certain types, or mock if not
          ...(data.planType.toLowerCase() === "health" && { members: getMockHealthMembers() }),
          ...(data.planType.toLowerCase() === "motor" && { vehicle: "Vehicle Details Available", registrationNo: data.policyNumber }),
          ...(data.planType.toLowerCase() === "product" && { product: "Product Details Available", modelNo: "N/A" }),
        };
        setPolicy(mappedPolicy);
      } catch (e: any) {
        console.error("Error fetching policy details:", e);
        setError(`Failed to load policy details: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicyDetails();
  }, [id]); // Dependency array includes 'id' to re-fetch when ID changes

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-[calc(100vh-150px)]">
          <p className="text-gray-500 text-lg">Loading policy details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !policy) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-[calc(100vh-150px)]">
          <div className="text-center bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p className="mb-6">{error || "Policy details could not be loaded."}</p>
            <Button asChild className="bg-insurance-primary hover:bg-insurance-dark text-white">
              <Link to="/dashboard">Back to My Policies</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Type guards for conditional rendering of specific details
  const isHealthPolicy = (p: PolicyDisplay): p is PolicyDisplay & { members: string[] } => {
    return p.planType.toLowerCase() === "health" && 'members' in p && Array.isArray(p.members);
  };

  const isMotorPolicy = (p: PolicyDisplay): p is PolicyDisplay & { vehicle: string, registrationNo: string } => {
    return p.planType.toLowerCase() === "motor" && 'vehicle' in p;
  };

  const isProductPolicy = (p: PolicyDisplay): p is PolicyDisplay & { product: string, modelNo: string } => {
    return p.planType.toLowerCase() === "product" && 'product' in p;
  };


  // const navigate = useNavigate(); // Initialize useNavigate
  
  //   const handleGoToClaimPage = () => {
  //     navigate('/claimPage'); // Navigate to the /dashboard route
  //   };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button asChild variant="outline" className="mb-6 text-gray-700 hover:bg-gray-100 border-gray-300">
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to My Policies
            </Link>
          </Button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-extrabold text-foreground mb-2">Policy Details</h1>
              <p className="text-lg text-muted-foreground">Comprehensive information about your {policy.category.toLowerCase()}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Badge
                variant={policy.policyStatus.toLowerCase() === "active" ? "default" : "secondary"}
                className={policy.policyStatus.toLowerCase() === "active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-base px-4 py-2" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-base px-4 py-2"}
              >
                {policy.policyStatus}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Policy Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-lg shadow-md p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="flex items-center text-3xl font-bold text-insurance-primary">
                  <span className="text-4xl mr-4">{policy.icon}</span>
                  {policy.type}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 mb-6 text-base">
                  <div>
                    <span className="text-sm text-muted-foreground block">Policy Number</span>
                    <p className="font-semibold text-gray-900">{policy.id}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">Category</span>
                    <p className="font-semibold text-gray-900">{policy.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">Policy Holder</span>
                    <p className="font-semibold text-gray-900">{policy.insured}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">Sum Insured (Coverage)</span>
                    <p className="font-semibold text-insurance-primary text-xl">{policy.sumInsuredFormatted}</p>
                  </div>
                </div>

                {isHealthPolicy(policy) && policy.members && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">Covered Members</h4>
                    <ul className="space-y-1 pl-5 list-disc text-base text-muted-foreground">
                      {policy.members.map((member, index) => (
                        <li key={index}>{member}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {isMotorPolicy(policy) && policy.vehicle && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">Vehicle Details</h4>
                    <p className="text-base text-muted-foreground">Vehicle: {policy.vehicle}</p>
                    <p className="text-base text-muted-foreground">Registration No: {policy.registrationNo}</p>
                  </div>
                )}

                {isProductPolicy(policy) && policy.product && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">Product Details</h4>
                    <p className="text-base text-muted-foreground">Product: {policy.product}</p>
                    <p className="text-base text-muted-foreground">Model: {policy.modelNo}</p>
                  </div>
                )}

                <Separator className="my-6" />

                <div>
                  <h4 className="font-semibold text-xl text-gray-800 mb-3">Coverage Benefits</h4>
                  <ul className="space-y-3">
                    {policy.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-base text-gray-700">
                        <Shield className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Policy Dates & Premium */}
            <Card className="rounded-lg shadow-md p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="flex items-center text-xl font-bold text-gray-800">
                  <Calendar className="h-6 w-6 mr-3 text-insurance-primary" />
                  Policy Timeline & Costs
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-5 text-base">
                  <div>
                    <span className="text-sm text-muted-foreground block">Policy Start Date</span>
                    <p className="font-semibold text-gray-900">{policy.effectiveDate}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">Policy End Date</span>
                    <p className="font-semibold text-red-600">{policy.expiryDate}</p>
                  </div>
                  <Separator />
                  <div>
                    <span className="text-sm text-muted-foreground block">Annual Premium</span>
                    <p className="text-2xl font-bold text-insurance-primary">{policy.premiumFormatted}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="rounded-lg shadow-md p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl font-bold text-gray-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <Button
                  className="w-full bg-insurance-primary hover:bg-insurance-dark text-white text-base py-2.5"
                  onClick={handleRenewPolicyClick} // Add the onClick handler
                >
                  <CreditCard className="h-5 w-5 mr-3" />
                  Renew Policy
                </Button>
                <Button variant="outline" className="w-full text-base py-2.5 text-gray-700 hover:bg-gray-100 border-gray-300">
                  <FileText className="h-5 w-5 mr-3" />
                  <Link to={`/claim/${id}`}>Make a Claim</Link>
                  {/* <FileText className="h-5 w-5 mr-3" />
                  Make a Claim */}
                </Button>
                <Button variant="outline" className="w-full text-base py-2.5 text-gray-700 hover:bg-gray-100 border-gray-300">
                  <Download className="h-5 w-5 mr-3" />
                  Download Policy
                </Button>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="rounded-lg shadow-md p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl font-bold text-gray-800">Documents</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2">
                  {policy.documents.map((doc, index) => (
                    <Button key={index} variant="ghost" className="w-full justify-start text-base px-3 py-2.5">
                      {/* <a
                        href="public/documents/doc.pdf" // Direct path to the file in the public folder
                        download="file.pdf" // Suggested filename for the downloaded file
                        // target="_blank" // Optional: Opens the link in a new tab
                        // rel="noopener noreferrer" // Recommended for security with target="_blank"
        
                      >
                        <FileText className="h-5 w-5 mr-3 text-insurance-primary" />
                      {doc}
                      </a> */}
                      <FileText className="h-5 w-5 mr-3 text-insurance-primary" />
                      {doc}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="rounded-lg shadow-md p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl font-bold text-gray-800">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <Button
                  variant="outline"
                  className="w-full text-base py-2.5 text-gray-700 hover:bg-gray-100 border-gray-300"
                  asChild // Important: tells the Button to render as its child (the <a> tag)
                >
                  <a href="tel:+919876543210"> {/* Tel link */}
                    <Phone className="h-5 w-5 mr-3" />
                    Call Support
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-base py-2.5 text-gray-700 hover:bg-gray-100 border-gray-300"
                  asChild // Important: tells the Button to render as its child (the <a> tag)
                >
                  <a href="mailto:ajay1heroic1@gmail.com"> {/* Mailto link */}
                    <Mail className="h-5 w-5 mr-3" />
                    Email Support
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
      <Chatbot />
      {showRenewalPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Renewal Not Yet Available</h3>
      <p className="text-gray-700 mb-6">
        Policy renewal is typically enabled when the expiration date is less than 90 days away.
        Your policy expires on <span className="font-semibold">{policy.expiryDate}</span>.
      </p>
      <Button
        onClick={() => setShowRenewalPopup(false)}
        className="bg-insurance-primary hover:bg-insurance-dark text-white"
      >
        Got It
      </Button>
    </div>
  </div>
)}
    </div>
  );
};

export default PolicyDetails;


// // src/components/PolicyDetails.tsx
// import { useParams, Link } from "react-router-dom";
// import { useState, useEffect } from "react"; // Import useState and useEffect
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import Header from "@/components/Header";
// import Chatbot from "@/components/Chatbot";
// import Footer from "@/components/Footer";
// import { ArrowLeft, Download, Phone, Mail, FileText, Calendar, CreditCard, Shield } from "lucide-react";

// // Updated interfaces to match backend structure more closely where possible
// interface PolicyData {
//   policyId: number; // Backend uses Integer
//   policyNumber: string;
//   customerId: number;
//   policyTypeId: number;
//   descriptionId: number | null;
//   startDate: string; // YYYY-MM-DD
//   endDate: string;   // YYYY-MM-DD
//   premiumAmount: number; // Backend uses BigDecimal, but number is fine for fetch
//   sumInsured: number;    // Backend uses BigDecimal, but number is fine for fetch
//   policyStatus: string;
// }

// // Frontend-specific fields to enrich display (these will be mapped)
// interface PolicyDisplay extends PolicyData {
//   id: string; // Using string for frontend routing
//   type: string; // Mapped from policyTypeId
//   category: string; // Mapped from policyTypeId
//   insured: string; // Mapped from customerId
//   icon: string; // Mapped from policyTypeId
//   benefits: string[]; // Mock or derived
//   documents: string[]; // Mock or derived

//   // Optional fields for specific policy types (not from backend directly)
//   members?: string[]; // For Health
//   vehicle?: string; // For Motor
//   registrationNo?: string; // For Motor
//   product?: string; // For Product
//   modelNo?: string; // For Product
// }


// const PolicyDetails = () => {
//   const { id } = useParams<{ id: string }>(); // ID from URL path, will be policyId
//   const [policy, setPolicy] = useState<PolicyDisplay | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPolicyDetails = async () => {
//       if (!id) {
//         setError("Policy ID is missing.");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         setError(null);
//         // Using the /admin/policies/{id} endpoint
//         console.log(`Fetching policy details for ID: ${id}`);
//         const response = await fetch(`http://localhost:8093/api/dashboard/viewpolicy/${id}`);
                                                        
//         if (!response.ok) {
//           if (response.status === 404) {
//             throw new Error("Policy not found.");
//           }
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: PolicyData = await response.json(); // Backend returns PolicyData

//         // Map backend data to frontend display format
//         // This mapping logic needs to be robust and potentially use more backend data
//         // if the backend can provide more specific details (e.g., actual vehicle name, product name).
//         const mappedPolicy: PolicyDisplay = {
//           ...data,
//           id: data.policyId.toString(), // Use policyId as frontend ID
//           type: `Policy Type ${data.policyTypeId}`, // Placeholder
//           category: getCategoryName(data.policyTypeId), // Map type to category name
//           insured: `Customer ID: ${data.customerId}`, // Placeholder
//           icon: getPolicyIcon(data.policyTypeId), // Get icon based on type
//           benefits: getMockBenefits(data.policyTypeId), // Mock benefits
//           documents: getMockDocuments(data.policyTypeId), // Mock documents
//           premium: `₹${data.premiumAmount.toLocaleString('en-IN')}`, // Format premium
//           sumInsured: `₹${data.sumInsured.toLocaleString('en-IN')}`, // Format sum insured
//           effectiveDate: formatDate(data.startDate),
//           expiryDate: formatDate(data.endDate),
//           // Add specific fields if they were retrieved for certain types
//           ...(data.policyTypeId === 2 && { members: getMockHealthMembers() }), // Example for health
//           ...(data.policyTypeId === 1 && { vehicle: "Vehicle Example", registrationNo: data.policyNumber }), // Example for motor
//           ...(data.policyTypeId === 3 && { product: "Product Example", modelNo: "Model Example" }), // Example for product
//         };
//         setPolicy(mappedPolicy);
//       } catch (e: any) {
//         console.error("Error fetching policy details:", e);
//         setError(`Failed to load policy details: ${e.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPolicyDetails();
//   }, [id]);

//   // Helper functions (same as in Dashboard.tsx or centralized)
//   const getPolicyIcon = (policyTypeId: number): string => {
//     switch (policyTypeId) {
//       case 1: return "🚗"; // Motor
//       case 2: return "💊"; // Health
//       case 3: return "📺"; // Product
//       default: return "📄";
//     }
//   };

//   const getCategoryName = (policyTypeId: number): string => {
//     switch (policyTypeId) {
//       case 1: return "Motor Insurance";
//       case 2: return "Health Insurance";
//       case 3: return "Product Insurance";
//       default: return "Unknown Policy";
//     }
//   };

//   const formatDate = (dateString: string): string => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
//   };

//   // Mock benefits and documents - ideally these would come from more detailed backend APIs
//   const getMockBenefits = (policyTypeId: number): string[] => {
//     switch (policyTypeId) {
//       case 1: return ["Own Damage Coverage", "Third Party Liability", "Personal Accident: ₹15,00,000", "24x7 Roadside Assistance"];
//       case 2: return ["Hospitalization Coverage", "Pre & Post Hospitalization", "Day Care Procedures", "Annual Health Check-up"];
//       case 3: return ["Manufacturing Defects", "Electrical/Mechanical Breakdown", "Screen Protection", "Pick-up & Drop Service"];
//       default: return ["Basic Coverage"];
//     }
//   };

//   const getMockDocuments = (policyTypeId: number): string[] => {
//     switch (policyTypeId) {
//       case 1: return ["Policy Certificate (Motor)", "Insurance Certificate (Motor)"];
//       case 2: return ["Policy Certificate (Health)", "Health Cards"];
//       case 3: return ["Warranty Certificate (Product)", "Service Terms"];
//       default: return ["Policy Document"];
//     }
//   };

//   const getMockHealthMembers = (): string[] => {
//     return ["Rajesh Sharma (Primary)", "Priya Sharma (Spouse)", "Rohan Sharma (Son)"];
//   };


//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="text-center">
//             <p className="text-gray-500">Loading policy details...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (error || !policy) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="text-center bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
//             <h1 className="text-2xl font-bold mb-4">Error</h1>
//             <p className="mb-4">{error || "Policy details could not be loaded."}</p>
//             <Button asChild>
//               <Link to="/dashboard">Back to My Policies</Link>
//             </Button>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const isHealthPolicy = (p: PolicyDisplay): p is PolicyDisplay & { members: string[] } => {
//     return p.category === "Health Insurance" && 'members' in p;
//   };

//   const isMotorPolicy = (p: PolicyDisplay): p is PolicyDisplay & { vehicle: string, registrationNo: string } => {
//     return p.category === "Motor Insurance" && 'vehicle' in p;
//   };

//   const isProductPolicy = (p: PolicyDisplay): p is PolicyDisplay & { product: string, modelNo: string } => {
//     return p.category === "Product Insurance" && 'product' in p;
//   };


//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <div className="container mx-auto px-4 py-8">
//         <div className="mb-6">
//           <Button asChild variant="outline" className="mb-4">
//             <Link to="/dashboard">
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Back to My Policies
//             </Link>
//           </Button>

//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-foreground mb-2">Policy Details</h1>
//               <p className="text-muted-foreground">Complete information about your {policy.category.toLowerCase()}</p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Badge
//                 variant={policy.policyStatus === "Active" ? "default" : "secondary"}
//                 className={policy.policyStatus === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"}
//               >
//                 {policy.policyStatus}
//               </Badge>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Main Policy Information */}
//           <div className="lg:col-span-2 space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <span className="text-2xl mr-3">{policy.icon}</span>
//                   {policy.type}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                   <div>
//                     <span className="text-sm text-muted-foreground">Policy Number</span>
//                     <p className="font-semibold">{policy.policyNumber}</p>
//                   </div>
//                   <div>
//                     <span className="text-sm text-muted-foreground">Category</span>
//                     <p className="font-semibold">{policy.category}</p>
//                   </div>
//                   <div>
//                     <span className="text-sm text-muted-foreground">Policy Holder</span>
//                     <p className="font-semibold">{policy.insured}</p>
//                   </div>
//                   <div>
//                     <span className="text-sm text-muted-foreground">Sum Insured</span>
//                     <p className="font-semibold text-insurance-primary">{policy.sumInsured}</p>
//                   </div>
//                 </div>

//                 {isHealthPolicy(policy) && policy.members && (
//                   <div className="mb-6">
//                     <h4 className="font-semibold mb-2">Covered Members</h4>
//                     <ul className="space-y-1">
//                       {policy.members.map((member, index) => (
//                         <li key={index} className="text-sm text-muted-foreground">• {member}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {isMotorPolicy(policy) && policy.vehicle && (
//                   <div className="mb-6">
//                     <h4 className="font-semibold mb-2">Vehicle Details</h4>
//                     <p className="text-sm text-muted-foreground">Vehicle: {policy.vehicle}</p>
//                     <p className="text-sm text-muted-foreground">Registration: {policy.registrationNo}</p>
//                   </div>
//                 )}

//                 {isProductPolicy(policy) && policy.product && (
//                   <div className="mb-6">
//                     <h4 className="font-semibold mb-2">Product Details</h4>
//                     <p className="text-sm text-muted-foreground">Product: {policy.product}</p>
//                     <p className="text-sm text-muted-foreground">Model: {policy.modelNo}</p>
//                   </div>
//                 )}

//                 <Separator className="my-4" />

//                 <div>
//                   <h4 className="font-semibold mb-3">Coverage Benefits</h4>
//                   <ul className="space-y-2">
//                     {policy.benefits.map((benefit, index) => (
//                       <li key={index} className="flex items-start">
//                         <Shield className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
//                         <span className="text-sm">{benefit}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Policy Dates & Premium */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <Calendar className="h-5 w-5 mr-2" />
//                   Policy Timeline
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div>
//                     <span className="text-sm text-muted-foreground">Start Date</span>
//                     <p className="font-semibold">{policy.effectiveDate}</p>
//                   </div>
//                   <div>
//                     <span className="text-sm text-muted-foreground">End Date</span>
//                     <p className="font-semibold text-red-600">{policy.expiryDate}</p>
//                   </div>
//                   <Separator />
//                   <div>
//                     <span className="text-sm text-muted-foreground">Annual Premium</span>
//                     <p className="text-xl font-bold text-insurance-primary">{policy.premium}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Actions */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Quick Actions</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <Button className="w-full bg-insurance-primary hover:bg-insurance-dark">
//                   <CreditCard className="h-4 w-4 mr-2" />
//                   Renew Policy
//                 </Button>
//                 <Button variant="outline" className="w-full">
//                   <FileText className="h-4 w-4 mr-2" />
//                   Make a Claim
//                 </Button>
//                 <Button variant="outline" className="w-full">
//                   <Download className="h-4 w-4 mr-2" />
//                   Download Policy
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Documents */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Documents</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   {policy.documents.map((doc, index) => (
//                     <Button key={index} variant="ghost" className="w-full justify-start">
//                       <FileText className="h-4 w-4 mr-2" />
//                       {doc}
//                     </Button>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Contact Support */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Need Help?</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <Button variant="outline" className="w-full">
//                   <Phone className="h-4 w-4 mr-2" />
//                   Call Support
//                 </Button>
//                 <Button variant="outline" className="w-full">
//                   <Mail className="h-4 w-4 mr-2" />
//                   Email Support
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       <Footer />
//       <Chatbot />
//     </div>
//   );
// };

// export default PolicyDetails;

