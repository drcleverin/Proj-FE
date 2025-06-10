
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import { ArrowLeft, Download, Phone, Mail } from "lucide-react";

const PolicyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock policy data - in real app this would come from API
  const policy = {
    id: "HEALTH9876543210",
    type: "Comprehensive Health Plan - Family Floater",
    insured: "The Sharma Family (Rajesh, Priya, Rohan, Siya)",
    effectiveDate: "01 Jan 2025",
    expiryDate: "31 Dec 2025",
    premium: "₹18,500",
    status: "Active",
    icon: "💊",
    coverage: "₹10,00,000",
    deductible: "₹5,000",
    coPayment: "10%",
    networkHospitals: "5000+",
    description: "Comprehensive health insurance plan covering hospitalization, pre and post hospitalization expenses, day care procedures, and ambulance charges.",
    benefits: [
      "Hospitalization expenses up to sum insured",
      "Pre-hospitalization expenses (30 days)",
      "Post-hospitalization expenses (60 days)",
      "Day care procedures",
      "Ambulance charges up to ₹2,000",
      "Annual health check-up",
      "Coverage for critical illness"
    ],
    exclusions: [
      "Pre-existing diseases (first 2 years)",
      "Maternity expenses (first 3 years)",
      "Cosmetic surgeries",
      "Dental treatment (unless due to accident)",
      "War and nuclear risks"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Policies
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Policy Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Policy Overview */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{policy.icon}</div>
                    <div>
                      <CardTitle className="text-xl">{policy.type}</CardTitle>
                      <p className="text-gray-600">Policy ID: {policy.id}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {policy.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Sum Insured</p>
                    <p className="font-semibold">{policy.coverage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Annual Premium</p>
                    <p className="font-semibold">{policy.premium}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Deductible</p>
                    <p className="font-semibold">{policy.deductible}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Co-Payment</p>
                    <p className="font-semibold">{policy.coPayment}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Effective Date</p>
                    <p className="font-semibold">{policy.effectiveDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expiry Date</p>
                    <p className="font-semibold text-red-600">{policy.expiryDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Insured Members</p>
                    <p className="font-semibold">{policy.insured}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Network Hospitals</p>
                    <p className="font-semibold">{policy.networkHospitals}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Policy Description */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Policy Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{policy.description}</p>
              </CardContent>
            </Card>

            {/* Benefits & Coverage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">Benefits & Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {policy.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-700">Exclusions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {policy.exclusions.map((exclusion, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        <span className="text-sm">{exclusion}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Actions Sidebar */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-insurance-primary">
                  <Download className="h-4 w-4 mr-2" />
                  Download Policy
                </Button>
                <Button variant="outline" className="w-full">
                  Make a Claim
                </Button>
                <Button variant="outline" className="w-full">
                  Renew Policy
                </Button>
                <Button variant="outline" className="w-full">
                  Add Nominee
                </Button>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Need Help?</h4>
                  <Button variant="ghost" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Support
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
