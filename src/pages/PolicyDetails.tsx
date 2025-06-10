
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Chatbot from "@/components/Chatbot";
import { ArrowLeft, Download, Phone, Mail, FileText, Calendar, CreditCard, Shield } from "lucide-react";

const PolicyDetails = () => {
  const { id } = useParams();

  // Mock policy data - in real app this would come from API
  const policyData = {
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
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Policy Not Found</h1>
            <Button asChild>
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Policy Details</h1>
              <p className="text-gray-600">Complete information about your {policy.category.toLowerCase()}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge 
                variant={policy.status === "Active" ? "default" : "secondary"}
                className={policy.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
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
                    <span className="text-sm text-gray-500">Policy Number</span>
                    <p className="font-semibold">{policy.id}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Category</span>
                    <p className="font-semibold">{policy.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Policy Holder</span>
                    <p className="font-semibold">{policy.insured}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Sum Insured</span>
                    <p className="font-semibold text-insurance-primary">{policy.sumInsured}</p>
                  </div>
                </div>

                {policy.members && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Covered Members</h4>
                    <ul className="space-y-1">
                      {policy.members.map((member, index) => (
                        <li key={index} className="text-sm text-gray-600">• {member}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {policy.vehicle && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Vehicle Details</h4>
                    <p className="text-sm text-gray-600">Vehicle: {policy.vehicle}</p>
                    <p className="text-sm text-gray-600">Registration: {policy.registrationNo}</p>
                  </div>
                )}

                {policy.product && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Product Details</h4>
                    <p className="text-sm text-gray-600">Product: {policy.product}</p>
                    <p className="text-sm text-gray-600">Model: {policy.modelNo}</p>
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
                    <span className="text-sm text-gray-500">Start Date</span>
                    <p className="font-semibold">{policy.effectiveDate}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">End Date</span>
                    <p className="font-semibold text-red-600">{policy.expiryDate}</p>
                  </div>
                  <Separator />
                  <div>
                    <span className="text-sm text-gray-500">Annual Premium</span>
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
      
      <Chatbot />
    </div>
  );
};

export default PolicyDetails;
