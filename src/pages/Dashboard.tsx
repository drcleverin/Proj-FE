
// // src/components/Dashboard.tsx
// import { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Link } from "react-router-dom";
// import Header from "@/components/Header";
// import Chatbot from "@/components/Chatbot";

// // Define an interface for the policy data fetched from the backend
// interface Policy {
//   policyId: number; // Changed to number to match backend `Integer`
//   policyNumber: string;
//   customerId: number; // Assuming customerId is also a number
//   policyTypeId: number;
//   descriptionId: number | null; // Can be null
//   startDate: string; // Using string for date, can be converted to Date object
//   endDate: string; // Using string for date
//   premiumAmount: string; // Changed to string for display, can be BigDecimal in backend
//   sumInsured: string; // Changed to string for display
//   policyStatus: string;
//   // Frontend-specific fields not in backend, keeping for UI display consistency
//   type: string;
//   insured: string;
//   icon: string;
//   category: string;
// }

// const Dashboard = () => {
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [policies, setPolicies] = useState<Policy[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch policies from the backend
//   useEffect(() => {
//     const fetchPolicies = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         // Using the /admin/policies/list endpoint
//         const response = await fetch('http://localhost:8093/admin/policies/list');
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: Policy[] = await response.json();

//         console.log(data," is ssssssssss......");
//         // Map backend policy data to frontend display format
//         // This is a placeholder mapping; you might need more complex logic
//         // to determine 'type', 'insured', 'icon', 'category' based on policyTypeId etc.
//         const mappedPolicies = data.map(p => ({
//           ...p,
//           id: p.policyNumber, // Use policyNumber as frontend ID for now
//           type: `Policy Type ${p.policyTypeId}`, // Placeholder
//           insured: `Customer ID ${p.customerId}`, // Placeholder
//           icon: getPolicyIcon(p.policyTypeId), // Helper to get icon
//           category: getPolicyCategory(p.policyTypeId), // Helper to get category
//           premium: `₹${p.premiumAmount}`, // Format premium
//           sumInsured: `₹${p.sumInsured}`, // Format sum insured
//           effectiveDate: formatDate(p.startDate), // Format date
//           expiryDate: formatDate(p.endDate), // Format date
//         }));
//         setPolicies(mappedPolicies);
//       } catch (e: any) {
//         console.error("Error fetching policies:", e);
//         setError(`Failed to load policies: ${e.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPolicies();
//   }, []);

//   // Helper functions to map backend policyTypeId to frontend UI elements
//   const getPolicyIcon = (policyTypeId: number): string => {
//     switch (policyTypeId) {
//       case 1: return "🚗"; // Motor
//       case 2: return "💊"; // Health
//       case 3: return "📺"; // Product
//       default: return "📄";
//     }
//   };

//   const getPolicyCategory = (policyTypeId: number): string => {
//     switch (policyTypeId) {
//       case 1: return "motor";
//       case 2: return "health";
//       case 3: return "product";
//       default: return "unknown";
//     }
//   };

//   const formatDate = (dateString: string): string => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
//   };


//   const filteredPolicies = activeFilter === "all"
//     ? policies
//     : policies.filter(policy => policy.category === activeFilter);

//   const filterButtons = [
//     { id: "all", label: "All Policies" },
//     { id: "motor", label: "Motor" },
//     { id: "health", label: "Health" },
//     { id: "product", label: "Product" }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       <div className="container mx-auto px-4 py-8">
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <h1 className="text-3xl font-bold text-gray-900">My Policies</h1>
//             <div className="flex items-center space-x-2">
//               <span className="text-gray-600">15,000+ Insured (Static)</span> {/* This remains static */}
//             </div>
//           </div>

//           <p className="text-gray-600 mb-6">
//             Your complete overview of all health, motor, and product policies. Manage details, check status, and renew with ease.
//           </p>

//           <div className="flex space-x-4 mb-8">
//             {filterButtons.map((filter) => (
//               <Button
//                 key={filter.id}
//                 variant={activeFilter === filter.id ? "default" : "outline"}
//                 className={activeFilter === filter.id ? "bg-insurance-primary" : ""}
//                 onClick={() => setActiveFilter(filter.id)}
//               >
//                 {filter.label}
//               </Button>
//             ))}
//           </div>
//         </div>

//         {loading ? (
//           <Card className="p-8 text-center">
//             <p className="text-gray-500">Loading policies...</p>
//           </Card>
//         ) : error ? (
//           <Card className="p-8 text-center bg-red-50 border border-red-200 text-red-700">
//             <p>{error}</p>
//           </Card>
//         ) : filteredPolicies.length === 0 ? (
//           <Card className="p-8 text-center">
//             <p className="text-gray-500">No policies found for the selected filter.</p>
//           </Card>
//         ) : (
//           filteredPolicies.map((policy) => (
//             <Card key={policy.policyId} className="hover:shadow-lg transition-shadow mb-6">
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-start space-x-4">
//                     <div className="text-3xl">{policy.icon}</div>
//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                         {policy.type} {/* Display mapped type */}
//                       </h3>
//                       <p className="text-sm text-gray-500 mb-2">Policy Number: {policy.policyNumber}</p>
//                       <p className="text-sm text-gray-600 mb-3">
//                         <span className="font-medium">Insured:</span> {policy.insured} {/* Display mapped insured */}
//                       </p>
//                       <div className="grid grid-cols-3 gap-4 text-sm">
//                         <div>
//                           <span className="text-gray-500">Effective Date:</span>
//                           <p className="font-medium">{policy.effectiveDate}</p>
//                         </div>
//                         <div>
//                           <span className="text-gray-500">Expiry Date:</span>
//                           <p className="font-medium text-red-600">{policy.expiryDate}</p>
//                         </div>
//                         <div>
//                           <span className="text-gray-500">Annual Premium:</span>
//                           <p className="font-medium">{policy.premium}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex flex-col items-end space-y-3">
//                     <Badge
//                       variant={policy.policyStatus === "Active" ? "default" : "secondary"}
//                       className={policy.policyStatus === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
//                     >
//                       {policy.policyStatus}
//                     </Badge>

//                     <div className="flex space-x-2">
//                       <Button asChild variant="outline" size="sm">
//                         <Link to={`/policy/${policy.policyId}`}>View Policy</Link>
//                       </Button>
//                       <Button size="sm" className="bg-insurance-primary hover:bg-insurance-dark">
//                         Renew Policy
//                       </Button>
//                       <Button variant="outline" size="sm">
//                         <Link to={`/policyClaim/${policy.policyId}`}>Make a Claim </Link>
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))
//         )}
//       </div>

//       <Chatbot />
//     </div>
//   );
// };

// export default Dashboard;






// src/components/Dashboard.tsx
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Chatbot from "@/components/Chatbot"; // Assuming Chatbot is correctly implemented

// --- Updated Policy Interface to match Backend Java Model ---
interface PolicyType {
  policyTypeId: number;
  typeName: string; // Assuming PolicyType has a name property
  // Add other PolicyType fields if needed for display
}

interface PolicyDescription {
  descriptionId: number;
  description: string; // Assuming PolicyDescription has a description field
  // Add other PolicyDescription fields if needed
}

interface Customer {
  customerId: number;
  customerName: string; // Assuming Customer has a name field. Adjust as per your actual Customer model.
  // Add other Customer fields if needed for display
}

interface Policy {
  policyId: number;
  policyNumber: string;
  customer: Customer; // Nested Customer object
  policyType: PolicyType; // Nested PolicyType object
  description: PolicyDescription | null; // Nested PolicyDescription object, can be null
  startDate: string; // LocalDate in Java typically serializes to YYYY-MM-DD string
  endDate: string; // LocalDate in Java typically serializes to YYYY-MM-DD string
  premiumAmount: number; // BigDecimal in Java often serializes to number in JSON
  sumInsured: number;    // BigDecimal in Java often serializes to number in JSON
  policyStatus: "Active" | "Lapsed" | "Cancelled" | "Expired" | "Pending"; // Enum as string
  issueDate: string; // Timestamp in Java might serialize to ISO string or epoch ms
  // Note: motorDetails, healthDetails, productDetails, claims, history are likely omitted from /list endpoint or handled via DTOs

  // Frontend-specific fields derived from backend data
  type: string;
  insured: string;
  icon: string;
  category: string;
  premium: string; // Formatted string for display
  sumInsured: string; // Formatted string for display
  effectiveDate: string; // Formatted string for display
  expiryDate: string; // Formatted string for display
}

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch policies from the backend
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:8093/api/dashboard/list');
        console.log(response, " is response from backend.");
        // console.log(response.json())
        if (!response.ok) {
          // Attempt to read error message from backend if available
          const errorText = await response.text();
          
          throw new Error(`HTTP error! Status: ${response.status} - ${errorText || response.statusText}`);
        }

        // Ensure the data matches the Policy[] interface
        const data: Policy[] = await response.json(); // Use any[] temporarily for flexible mapping
        
        console.log(data, " is policies data from backend.........");

        // Map backend policy data to frontend display format
        // This is a placeholder mapping; you might need more complex logic
        // to determine 'type', 'insured', 'icon', 'category' based on policyType.typeName or policyType.policyTypeId
        const mappedPolicies: Policy[] = data.map(p => ({
          policyId: p.policyId,
          policyNumber: p.policyNumber,
          customer: p.customer || { customerId: 0, customerName: 'N/A' }, // Provide default if customer is null
          policyType: p.policyType || { policyTypeId: 0, typeName: 'Unknown Type' }, // Provide default if policyType is null
          description: p.description || null,
          startDate: p.startDate,
          endDate: p.endDate,
          premiumAmount: p.premiumAmount,
          sumInsured: p.sumInsured,
          policyStatus: p.policyStatus as Policy['policyStatus'], // Cast to enum type
          issueDate: p.issueDate,
          // Derive 'type' from policyType.typeName
          type: p.policyType?.typeName || `Policy Type ${p.policyTypeId}`,
          // Derive 'insured' from customer.customerName
          insured: p.customer?.customerName || `Customer ID: ${p.customer?.customerId || 'N/A'}`,
          icon: getPolicyIcon(p.policyType?.policyTypeId), // Use policyTypeId for icon mapping
          category: getPolicyCategory(p.policyType?.policyTypeId), // Use policyTypeId for category mapping
          premium: `₹${p.premiumAmount?.toFixed(2) || '0.00'}`, // Format premium to 2 decimal places
          sumInsured: `₹${p.sumInsured?.toFixed(2) || '0.00'}`, // Format sum insured to 2 decimal places
          effectiveDate: formatDate(p.startDate), // Format date
          expiryDate: formatDate(p.endDate),     // Format date
        }));
        setPolicies(mappedPolicies);
      } catch (e: any) {
        console.error("Error fetching policies:", e);
        setError(`Failed to load policies: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []); // Empty dependency array means this runs once on mount

  // Helper functions to map backend policyTypeId to frontend UI elements
  // Assuming policyTypeId is consistent and maps to specific types
  const getPolicyIcon = (policyTypeId?: number): string => {
    switch (policyTypeId) {
      case 1: return "🚗"; // Motor
      case 2: return "💊"; // Health
      case 3: return "📺"; // Product
      default: return "📄"; // Default icon
    }
  };

  const getPolicyCategory = (policyTypeId?: number): string => {
    switch (policyTypeId) {
      case 1: return "motor";
      case 2: return "health";
      case 3: return "product";
      default: return "unknown";
    }
  };

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "N/A";
    // LocalDate from Java (YYYY-MM-DD) can be directly used
    const date = new Date(dateString);
    // Ensure date is valid, especially for older browsers or invalid date strings
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const filteredPolicies = activeFilter === "all"
    ? policies
    : policies.filter(policy => policy.category === activeFilter);

  const filterButtons = [
    { id: "all", label: "All Policies" },
    { id: "motor", label: "Motor" },
    { id: "health", label: "Health" },
    { id: "product", label: "Product" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Policies</h1>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">15,000+ Insured (Static)</span>
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            Your complete overview of all health, motor, and product policies. Manage details, check status, and renew with ease.
          </p>

          <div className="flex space-x-4 mb-8">
            {filterButtons.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={activeFilter === filter.id ? "bg-insurance-primary" : ""}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500">Loading policies...</p>
          </Card>
        ) : error ? (
          <Card className="p-8 text-center bg-red-50 border border-red-200 text-red-700">
            <p>{error}</p>
          </Card>
        ) : filteredPolicies.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500">No policies found for the selected filter.</p>
          </Card>
        ) : (
          filteredPolicies.map((policy) => (
            // Use policy.policyId as the key
            <Card key={policy.policyId} className="hover:shadow-lg transition-shadow mb-6">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{policy.icon}</div> {/* Derived icon */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {policy.type} {/* Derived type */}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">Policy Number: {policy.policyNumber}</p>
                      <p className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">Insured:</span> {policy.insured} {/* Derived insured */}
                      </p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Effective Date:</span>
                          <p className="font-medium">{policy.effectiveDate}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Expiry Date:</span>
                          <p className="font-medium text-red-600">{policy.expiryDate}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Annual Premium:</span>
                          <p className="font-medium">{policy.premium}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-3">
                    <Badge
                      variant={policy.policyStatus === "Active" ? "default" : "secondary"}
                      className={
                        policy.policyStatus === "Active" ? "bg-green-100 text-green-800" :
                        policy.policyStatus === "Expired" || policy.policyStatus === "Cancelled" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {policy.policyStatus}
                    </Badge>

                    <div className="flex space-x-2">
                      <Button asChild variant="outline" size="sm">
                
                        <Link to={`/policy/${policy.policyId}`}>View Policy</Link>
                      </Button>
                      <Button size="sm" className="bg-insurance-primary hover:bg-insurance-dark">
                        Renew Policy
                      </Button>
                      <Button variant="outline" size="sm">
                        <Link to={`/policyClaim/${policy.policyId}`}>Make a Claim </Link>
                      </Button>
                    </div>
                  </div>
                </div> 
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Chatbot />
    </div>
  );
};

export default Dashboard;