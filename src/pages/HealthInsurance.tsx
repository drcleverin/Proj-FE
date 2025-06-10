
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ProcessFlow from "@/components/ProcessFlow";
import { Check, Star } from "lucide-react";

const HealthInsurance = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = ["Select Policy Type", "Application", "Preview", "Confirmation"];

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
    setCurrentStep(2);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (currentStep >= 2) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <ProcessFlow currentStep={currentStep} steps={steps} className="bg-muted/30" />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">Health Insurance Application</h1>
              <p className="text-muted-foreground">Fill in your details to get a personalized quote</p>
            </div>

            {currentStep === 2 && (
              <Card className="shadow-lg">
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
                      onClick={handlePreviousStep}
                    >
                      Back to Plans
                    </Button>
                    <Button 
                      className="flex-1 bg-insurance-primary hover:bg-insurance-dark"
                      onClick={handleNextStep}
                    >
                      Continue to Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Review Your Application</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Selected Plan</h3>
                    <p className="text-insurance-primary font-bold">Family Floater Plan - ₹8,500/year</p>
                    <p className="text-sm text-muted-foreground">Coverage: ₹10,00,000</p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Personal Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Name:</span>
                        <p>Rajesh Sharma</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <p>rajesh@example.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={handlePreviousStep}
                    >
                      Back to Edit
                    </Button>
                    <Button 
                      className="flex-1 bg-insurance-primary hover:bg-insurance-dark"
                      onClick={handleNextStep}
                    >
                      Confirm & Pay
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 4 && (
              <Card className="shadow-lg">
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Application Submitted!</h2>
                  <p className="text-muted-foreground mb-6">Your policy application has been received and is being processed.</p>
                  <Button className="bg-insurance-primary hover:bg-insurance-dark">
                    Go to Dashboard
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        <Footer />
        <Chatbot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <ProcessFlow currentStep={currentStep} steps={steps} className="bg-muted/30" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Health Insurance Plans</h1>
          <p className="text-xl text-muted-foreground">Comprehensive health coverage for you and your family</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {healthPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                selectedPlan === plan.id ? 'ring-2 ring-insurance-primary shadow-lg' : ''
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-insurance-primary text-white px-4 py-1 shadow-lg">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-insurance-primary">{plan.price}</div>
                <p className="text-muted-foreground">per year</p>
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
                  className={`w-full transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-insurance-primary hover:bg-insurance-dark shadow-lg hover:shadow-xl' 
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
        <div className="bg-card rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Our Health Insurance?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="font-semibold mb-2">5000+ Hospitals</h3>
              <p className="text-muted-foreground">Cashless treatment across India</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-semibold mb-2">Quick Claims</h3>
              <p className="text-muted-foreground">Hassle-free claim settlement</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">Round the clock assistance</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-semibold mb-2">No Hidden Costs</h3>
              <p className="text-muted-foreground">Transparent pricing</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default HealthInsurance;
