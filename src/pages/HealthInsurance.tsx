
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Chatbot from "@/components/Chatbot";
import { Check, Star, User, Calendar, Phone, Mail } from "lucide-react";

const HealthInsurance = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const healthPlans = [
    {
      id: "individual",
      name: "Individual Health Plan",
      price: "₹3,500",
      coverage: "₹5,00,000",
      features: [
        "Individual coverage",
        "Pre & Post hospitalization",
        "Day care procedures",
        "Ambulance charges",
        "Annual health check-up"
      ],
      popular: false
    },
    {
      id: "family",
      name: "Family Floater Plan",
      price: "₹8,500",
      coverage: "₹10,00,000",
      features: [
        "Covers entire family",
        "Shared sum insured",
        "Maternity coverage",
        "Child vaccination",
        "Critical illness cover",
        "Worldwide emergency"
      ],
      popular: true
    },
    {
      id: "senior",
      name: "Senior Citizen Plan",
      price: "₹12,000",
      coverage: "₹7,00,000",
      features: [
        "Age up to 80 years",
        "No medical check-up",
        "Pre-existing diseases covered",
        "Home nursing",
        "Ayurveda treatment"
      ],
      popular: false
    }
  ];

  const handleChoosePlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Health Insurance Application</h1>
              <p className="text-gray-600">Fill in your details to get a personalized quote</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter your complete address" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Enter your city" />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pin Code</Label>
                    <Input id="pincode" placeholder="Enter pin code" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="familyMembers">Number of Family Members</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of members" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 (Self)</SelectItem>
                      <SelectItem value="2">2 (Self + Spouse)</SelectItem>
                      <SelectItem value="3">3 (Self + Spouse + 1 Child)</SelectItem>
                      <SelectItem value="4">4 (Self + Spouse + 2 Children)</SelectItem>
                      <SelectItem value="5+">5 or more</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sumInsured">Preferred Sum Insured</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select coverage amount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="300000">₹3,00,000</SelectItem>
                      <SelectItem value="500000">₹5,00,000</SelectItem>
                      <SelectItem value="1000000">₹10,00,000</SelectItem>
                      <SelectItem value="1500000">₹15,00,000</SelectItem>
                      <SelectItem value="2000000">₹20,00,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowForm(false)}
                  >
                    Back to Plans
                  </Button>
                  <Button className="flex-1 bg-insurance-primary hover:bg-insurance-dark">
                    Get Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Chatbot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Insurance Plans</h1>
          <p className="text-xl text-gray-600">Comprehensive health coverage for you and your family</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {healthPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedPlan === plan.id ? 'ring-2 ring-insurance-primary' : ''
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-insurance-primary text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-insurance-primary">{plan.price}</div>
                <p className="text-gray-600">per year</p>
                <div className="text-lg font-semibold">Coverage: {plan.coverage}</div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-insurance-primary hover:bg-insurance-dark' 
                      : 'bg-gray-700 hover:bg-gray-800'
                  }`}
                  onClick={() => handleChoosePlan(plan.id)}
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Our Health Insurance?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="font-semibold mb-2">5000+ Hospitals</h3>
              <p className="text-gray-600">Cashless treatment across India</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-semibold mb-2">Quick Claims</h3>
              <p className="text-gray-600">Hassle-free claim settlement</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round the clock assistance</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-semibold mb-2">No Hidden Costs</h3>
              <p className="text-gray-600">Transparent pricing</p>
            </div>
          </div>
        </div>
      </div>
      
      <Chatbot />
    </div>
  );
};

export default HealthInsurance;
