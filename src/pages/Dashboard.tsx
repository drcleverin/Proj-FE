
// src/pages/Dashboard.tsx
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom"; // Assuming react-router-dom is used for routing
// Corrected import paths assuming Dashboard is in src/pages and Header/Chatbot are in src/components/
import Header from "../components/Header";
import Chatbot from "../components/Chatbot";

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
  // id: string; // Not strictly needed here, policyId is enough for key
  type: string; // Derived from planName
  insured: string; // Derived from userId (could be customer's name if fetched)
  icon: string; // Emoji based on planType
  category: string; // "motor", "health", "product" based on planType
  premium: string; // Formatted premiumAmount
  sumInsuredFormatted: string; // Formatted coverage
  effectiveDate: string; // Formatted policyStartDate
  expiryDate: string; // Formatted policyEndDate
}

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [policies, setPolicies] = useState<PolicyDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRenewalPopup, setShowRenewalPopup] = useState(false);
  const [selectedPolicyForRenewal, setSelectedPolicyForRenewal] = useState<PolicyDisplay | null>(null);

  // Helper functions to map backend planType to frontend UI elements
  const getPolicyIcon = (planType: string): string => {
    switch (planType.toLowerCase()) {
      case "motor": return "🚗";
      case "health": return "💊";
      case "product": return "📺";
      default: return "📄";
    }
  };

  const getPolicyCategory = (planType: string): string => {
    return planType.toLowerCase(); // Directly use lowercased planType for filter
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    // Ensure date parsing is robust (e.g., if backend sends just date or timestamp)
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

  const getDaysUntilExpiration = (endDateString: string): number => {
    if (!endDateString) return -1;
    const endDate = new Date(endDateString);
    const currentDate = new Date();

    // Reset time to midnight for accurate day comparison
    endDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    const diffTime = endDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Handler for the Renew button click
  const handleRenewPolicyClick = (policyToRenew: PolicyDisplay) => {
    const daysUntilExpiration = getDaysUntilExpiration(policyToRenew.policyEndDate);
    const renewalThresholdDays = 90; // Policies can be renewed within 90 days

    if (daysUntilExpiration > renewalThresholdDays) {
      // Policy is not yet within the renewal window, show the pop-up
      setSelectedPolicyForRenewal(policyToRenew);
      setShowRenewalPopup(true);
    } else {
      // Policy is within or past the renewal window, you might want to navigate
      // For now, we'll also show the pop-up for consistency with the prompt.
      // In a real application, you might navigate to a dedicated renewal form:
      // navigate(`/renew-policy/${policyToRenew.policyId}`);
      setSelectedPolicyForRenewal(policyToRenew); // Still set for the pop-up
      setShowRenewalPopup(true);
    }
  };
  // Fetch policies from the backend
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        setError(null);
    // Removed undefined userWithId references


        // Using the new backend endpoint
        // Get userId from localStorage (assuming user is stored after login)
        const storedUser = localStorage.getItem('user');
        const userId = storedUser ? JSON.parse(storedUser).userId : null;

        console.log("Fetching policies for userId:", userId);
        if (!userId) throw new Error("User not logged in or userId missing.");

        const response = await fetch(`http://localhost:8093/api/dashboard/policies/user/${userId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Check if response has content before parsing JSON
        const text = await response.text();
        if (!text) {
          throw new Error("No data received from server.");
        }
        const data: FetchedPolicyData[] = JSON.parse(text);

        console.log(data, "Fetched policies data.");

        // Map backend policy data to frontend display format
        const mappedPolicies: PolicyDisplay[] = data.map(p => ({
          ...p,
          type: p.planName || `Policy Type ${p.planId}`, // Use planName for display type
          insured: `User ID ${p.userId}`, // Placeholder, ideally this would be customer's actual name
          icon: getPolicyIcon(p.planType), // Get icon based on planType
          category: getPolicyCategory(p.planType), // Get category for filtering
          premium: `₹${p.premiumAmount.toLocaleString('en-IN')}`, // Format premium
          sumInsuredFormatted: `₹${p.coverage.toLocaleString('en-IN')}`, // Format sum insured from coverage
          effectiveDate: formatDate(p.policyStartDate), // Format policyStartDate
          expiryDate: formatDate(p.policyEndDate), // Format policyEndDate
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
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

          <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
            {filterButtons.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={activeFilter === filter.id ? "bg-insurance-primary text-white hover:bg-insurance-dark" : "border-gray-300 text-gray-700 hover:bg-gray-100"}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {loading ? (
            <Card className="p-8 text-center rounded-lg shadow-md">
              <p className="text-gray-500">Loading policies...</p>
            </Card>
          ) : error ? (
            <Card className="p-8 text-center bg-red-50 border border-red-200 text-red-700 rounded-lg shadow-md">
              <p>{error}</p>
            </Card>
          ) : filteredPolicies.length === 0 ? (
            <Card className="p-8 text-center rounded-lg shadow-md">
              <p className="text-gray-500">No policies found for the selected filter.</p>
            </Card>
          ) : (
            <div className="flex flex-col gap-4 flex-1">
              {filteredPolicies.map((policy) => (
                <div
                  key={policy.policyId}
                  className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg shadow-sm px-6 py-4 border border-gray-200 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center gap-4 flex-1 w-full">
                    <div className="text-4xl">{policy.icon}</div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{policy.type}</h3>
                        <p className="text-sm text-gray-500">Policy No: {policy.policyNumber}</p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Insured:</span> {policy.insured}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-6 sm:ml-8">
                        <div>
                          <span className="text-gray-500 text-xs">Effective:</span>
                          <div className="font-medium">{policy.effectiveDate}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-xs">Expiry:</span>
                          <div className="font-medium text-red-600">{policy.expiryDate}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-xs">Premium:</span>
                          <div className="font-medium">{policy.premium}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 mt-4 md:mt-0 min-w-[180px]">
                    <Badge
                      variant={policy.policyStatus.toLowerCase() === "active" ? "default" : "secondary"}
                      className={policy.policyStatus.toLowerCase() === "active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1 text-sm font-semibold" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-3 py-1 text-sm font-semibold"}
                    >
                      {policy.policyStatus}
                    </Badge>
                    <div className="flex flex-wrap justify-end gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/policy/${policy.policyId}`}>View</Link>
                      </Button>
                      <Button size="sm" className="bg-insurance-primary hover:bg-insurance-dark text-white">
                        Renew
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        {/* Link to the new ClaimPage */}
                        <Link to={`/claim/${policy.policyId}`}>Claim</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Chatbot />
    </div>
  );
};

export default Dashboard;
