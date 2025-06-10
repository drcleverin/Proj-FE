
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import { ArrowLeft, Download, Phone, Mail, FileText, Calendar, CreditCard, Shield } from "lucide-react";

interface BasePolicy {
  id: string;
  type: string;
  category: string;
  insured: string;
  effectiveDate: string;
  expiryDate: string;
  premium: string;
  sumInsured: string;
  status: string;
  icon: string;
  benefits: string[];
  documents: string[];
}

interface HealthPolicy extends BasePolicy {
  members?: string[];
}

interface MotorPolicy extends BasePolicy {
  vehicle?: string;
  registrationNo?: string;
}

interface ProductPolicy extends BasePolicy {
  product?: string;
  modelNo?: string;
}

type Policy = HealthPolicy | MotorPolicy | ProductPolicy;

const PolicyDetails = () => {
  const { id } = useParams();

  // Mock policy data - in real app this would come from API
  const policyData: Record<string, Policy> = {
    "HEALTH9876543210": {
      id: "HEALTH9876543210",
      type: "Comprehensive Health Plan - Family Floater",
      category: "Health Insurance",
      insured: "The Sharma Family",
      members: ["Rajesh Sharma (Primary)", "Priya Sharma (Spouse)", "Rohan Sharma (Son, Age 15)", "Siya Sharma (Daughter, Age 12)"],
      effectiveDate: "01 Jan 2025",
      expiryDate: "31 Dec 2025",
      premium: "₹18,500",
      sumInsured: "₹10,00,000",
      status: "Active",
      icon: "💊",
      benefits: [
        "Hospitalization Coverage: ₹10,00,000",
        "Pre & Post Hospitalization: 30/60 days",
        "Day Care Procedures: Covered",
        "Ambulance Charges: ₹2,000 per incident",
        "Annual Health Check-up: Free for all members",
        "Maternity Coverage: ₹1,00,000",
        "Critical Illness: ₹5,00,000"
      ],
      documents: [
        "Policy Certificate",
        "Health Cards",
        "Claim Forms",
        "Network Hospital List"
      ]
    },
    "MOTOR1234567890": {
      id: "MOTOR1234567890",
      type: "Private Car Package Policy",
      category: "Motor Insurance",
      insured: "Rajesh Sharma",
      vehicle: "Maruti Swift VDI (2020)",
      registrationNo: "KA01AB1234",
      effectiveDate: "01 Jan 2025",
      expiryDate: "31 Dec 2025",
      premium: "₹12,500",
      sumInsured: "₹6,50,000",
      status: "Expiring soon",
      icon: "🚗",
      benefits: [
        "Own Damage Coverage: ₹6,50,000",
        "Third Party Liability: Unlimited",
        "Personal Accident: ₹15,00,000",
        "Zero Depreciation",
        "Roadside Assistance: 24x7",
        "Return to Invoice",
        "Engine Protection"
      ],
      documents: [
        "Policy Certificate",
        "Insurance Certificate",
        "Claim Forms",
        "Garage Network List"
      ]
    },
    "PROD5554443332": {
      id: "PROD5554443332",
      type: "Extended Warranty - Smart TV",
      category: "Product Insurance",
      insured: "Rajesh Sharma",
      product: "Samsung 55\" Smart QLED TV",
      modelNo: "QA55Q70CAKLXL",
      effectiveDate: "01 Jan 2025",
      expiryDate: "31 Dec 2025",
      premium: "₹12,500",
      sumInsured: "₹85,000",
      status: "Expiring soon",
      icon: "📺",
      benefits: [
        "Manufacturing Defects: Covered",
        "Electrical/Mechanical Breakdown: Covered",
        "Screen Protection: Included",
        "Pick-up & Drop Service: Free",
        "Genuine Parts Replacement",
        "On-site Repair: Available",
        "Customer Support: 24x7"
      ],
      documents: [
        "Warranty Certificate",
        "Service Terms",
        "Claim Forms",
        "Service Center List"
      ]
    }
  };

  const policy = policyData[id as keyof typeof policyData];

  if (!policy) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Policy Not Found</h1>
            <Button asChild>
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isHealthPolicy = (policy: Policy): policy is HealthPolicy => {
    return 'members' in policy;
  };

  const isMotorPolicy = (policy: Policy): policy is MotorPolicy => {
    return 'vehicle' in policy;
  };

  const isProductPolicy = (policy: Policy): policy is ProductPolicy => {
    return 'product' in policy;
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
                variant={policy.status === "Active" ? "default" : "secondary"}
                className={policy.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"}
              >
                {policy.status}
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
                    <p className="font-semibold">{policy.id}</p>
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
