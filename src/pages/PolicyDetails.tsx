// src/components/PolicyDetails.tsx
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react"; // Import useState and useEffect
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import { ArrowLeft, Download, Phone, Mail, FileText, Calendar, CreditCard, Shield } from "lucide-react";

// Updated interfaces to match backend structure more closely where possible
interface PolicyData {
  policyId: number; // Backend uses Integer
  policyNumber: string;
  customerId: number;
  policyTypeId: number;
  descriptionId: number | null;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  premiumAmount: number; // Backend uses BigDecimal, but number is fine for fetch
  sumInsured: number;    // Backend uses BigDecimal, but number is fine for fetch
  policyStatus: string;
}

// Frontend-specific fields to enrich display (these will be mapped)
interface PolicyDisplay extends PolicyData {
  id: string; // Using string for frontend routing
  type: string; // Mapped from policyTypeId
  category: string; // Mapped from policyTypeId
  insured: string; // Mapped from customerId
  icon: string; // Mapped from policyTypeId
  benefits: string[]; // Mock or derived
  documents: string[]; // Mock or derived

  // Optional fields for specific policy types (not from backend directly)
  members?: string[]; // For Health
  vehicle?: string; // For Motor
  registrationNo?: string; // For Motor
  product?: string; // For Product
  modelNo?: string; // For Product
}


const PolicyDetails = () => {
  const { id } = useParams<{ id: string }>(); // ID from URL path, will be policyId
  const [policy, setPolicy] = useState<PolicyDisplay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        // Using the /admin/policies/{id} endpoint
        console.log(`Fetching policy details for ID: ${id}`);
        const response = await fetch(`http://localhost:8093/api/dashboard/viewpolicy/${id}`);
                                                        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Policy not found.");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: PolicyData = await response.json(); // Backend returns PolicyData

        // Map backend data to frontend display format
        // This mapping logic needs to be robust and potentially use more backend data
        // if the backend can provide more specific details (e.g., actual vehicle name, product name).
        const mappedPolicy: PolicyDisplay = {
          ...data,
          id: data.policyId.toString(), // Use policyId as frontend ID
          type: `Policy Type ${data.policyTypeId}`, // Placeholder
          category: getCategoryName(data.policyTypeId), // Map type to category name
          insured: `Customer ID: ${data.customerId}`, // Placeholder
          icon: getPolicyIcon(data.policyTypeId), // Get icon based on type
          benefits: getMockBenefits(data.policyTypeId), // Mock benefits
          documents: getMockDocuments(data.policyTypeId), // Mock documents
          premium: `₹${data.premiumAmount.toLocaleString('en-IN')}`, // Format premium
          sumInsured: `₹${data.sumInsured.toLocaleString('en-IN')}`, // Format sum insured
          effectiveDate: formatDate(data.startDate),
          expiryDate: formatDate(data.endDate),
          // Add specific fields if they were retrieved for certain types
          ...(data.policyTypeId === 2 && { members: getMockHealthMembers() }), // Example for health
          ...(data.policyTypeId === 1 && { vehicle: "Vehicle Example", registrationNo: data.policyNumber }), // Example for motor
          ...(data.policyTypeId === 3 && { product: "Product Example", modelNo: "Model Example" }), // Example for product
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
  }, [id]);

  // Helper functions (same as in Dashboard.tsx or centralized)
  const getPolicyIcon = (policyTypeId: number): string => {
    switch (policyTypeId) {
      case 1: return "🚗"; // Motor
      case 2: return "💊"; // Health
      case 3: return "📺"; // Product
      default: return "📄";
    }
  };

  const getCategoryName = (policyTypeId: number): string => {
    switch (policyTypeId) {
      case 1: return "Motor Insurance";
      case 2: return "Health Insurance";
      case 3: return "Product Insurance";
      default: return "Unknown Policy";
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Mock benefits and documents - ideally these would come from more detailed backend APIs
  const getMockBenefits = (policyTypeId: number): string[] => {
    switch (policyTypeId) {
      case 1: return ["Own Damage Coverage", "Third Party Liability", "Personal Accident: ₹15,00,000", "24x7 Roadside Assistance"];
      case 2: return ["Hospitalization Coverage", "Pre & Post Hospitalization", "Day Care Procedures", "Annual Health Check-up"];
      case 3: return ["Manufacturing Defects", "Electrical/Mechanical Breakdown", "Screen Protection", "Pick-up & Drop Service"];
      default: return ["Basic Coverage"];
    }
  };

  const getMockDocuments = (policyTypeId: number): string[] => {
    switch (policyTypeId) {
      case 1: return ["Policy Certificate (Motor)", "Insurance Certificate (Motor)"];
      case 2: return ["Policy Certificate (Health)", "Health Cards"];
      case 3: return ["Warranty Certificate (Product)", "Service Terms"];
      default: return ["Policy Document"];
    }
  };

  const getMockHealthMembers = (): string[] => {
    return ["Rajesh Sharma (Primary)", "Priya Sharma (Spouse)", "Rohan Sharma (Son)"];
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-500">Loading policy details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !policy) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p className="mb-4">{error || "Policy details could not be loaded."}</p>
            <Button asChild>
              <Link to="/dashboard">Back to My Policies</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isHealthPolicy = (p: PolicyDisplay): p is PolicyDisplay & { members: string[] } => {
    return p.category === "Health Insurance" && 'members' in p;
  };

  const isMotorPolicy = (p: PolicyDisplay): p is PolicyDisplay & { vehicle: string, registrationNo: string } => {
    return p.category === "Motor Insurance" && 'vehicle' in p;
  };

  const isProductPolicy = (p: PolicyDisplay): p is PolicyDisplay & { product: string, modelNo: string } => {
    return p.category === "Product Insurance" && 'product' in p;
  };


  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button asChild variant="outline" className="mb-4">
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to My Policies
            </Link>
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Policy Details</h1>
              <p className="text-muted-foreground">Complete information about your {policy.category.toLowerCase()}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant={policy.policyStatus === "Active" ? "default" : "secondary"}
                className={policy.policyStatus === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"}
              >
                {policy.policyStatus}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Policy Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-3">{policy.icon}</span>
                  {policy.type}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-sm text-muted-foreground">Policy Number</span>
                    <p className="font-semibold">{policy.policyNumber}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Category</span>
                    <p className="font-semibold">{policy.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Policy Holder</span>
                    <p className="font-semibold">{policy.insured}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Sum Insured</span>
                    <p className="font-semibold text-insurance-primary">{policy.sumInsured}</p>
                  </div>
                </div>

                {isHealthPolicy(policy) && policy.members && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Covered Members</h4>
                    <ul className="space-y-1">
                      {policy.members.map((member, index) => (
                        <li key={index} className="text-sm text-muted-foreground">• {member}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {isMotorPolicy(policy) && policy.vehicle && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Vehicle Details</h4>
                    <p className="text-sm text-muted-foreground">Vehicle: {policy.vehicle}</p>
                    <p className="text-sm text-muted-foreground">Registration: {policy.registrationNo}</p>
                  </div>
                )}

                {isProductPolicy(policy) && policy.product && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Product Details</h4>
                    <p className="text-sm text-muted-foreground">Product: {policy.product}</p>
                    <p className="text-sm text-muted-foreground">Model: {policy.modelNo}</p>
                  </div>
                )}

                <Separator className="my-4" />

                <div>
                  <h4 className="font-semibold mb-3">Coverage Benefits</h4>
                  <ul className="space-y-2">
                    {policy.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Shield className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Policy Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Start Date</span>
                    <p className="font-semibold">{policy.effectiveDate}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">End Date</span>
                    <p className="font-semibold text-red-600">{policy.expiryDate}</p>
                  </div>
                  <Separator />
                  <div>
                    <span className="text-sm text-muted-foreground">Annual Premium</span>
                    <p className="text-xl font-bold text-insurance-primary">{policy.premium}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-insurance-primary hover:bg-insurance-dark">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Renew Policy
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Make a Claim
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Policy
                </Button>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {policy.documents.map((doc, index) => (
                    <Button key={index} variant="ghost" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      {doc}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Support
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default PolicyDetails;

