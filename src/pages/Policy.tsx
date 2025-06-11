
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ProcessFlow from "@/components/ProcessFlow";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Car, Shield, Wrench, Users, Smartphone, Laptop, Home, Camera, Check, Star } from "lucide-react";

const Policy = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || '';
  const [selectedPolicy, setSelectedPolicy] = useState<string>(initialType);
  const navigate = useNavigate();

  const policyTypes = [
    {
      id: "motor",
      title: "Motor Insurance",
      description: "Complete protection for your car and bike. Get comprehensive coverage for vehicle damage, third-party liability, and personal accident benefits.",
      features: ["Comprehensive Coverage", "Third-Party Liability", "Personal Accident Cover", "24/7 Roadside Assistance"],
      icon: "🚗"
    },
    {
      id: "health",
      title: "Health Insurance",
      description: "Comprehensive health coverage for individuals and families. Protect yourself and your loved ones against unexpected medical expenses.",
      features: ["Cashless Treatment", "Family Floater Options", "Pre & Post Hospitalization", "Critical Illness Cover"],
      icon: "💊"
    },
    {
      id: "product",
      title: "Product Insurance",
      description: "Extended warranty for electronics and appliances. Protect your valuable gadgets against damage, theft, or technical failures.",
      features: ["Extended Warranty", "Accidental Damage", "Theft Protection", "Technical Support"],
      icon: "📺"
    }
  ];

  const steps = ["Select Policy Type", "Application", "Premium", "Review", "Confirmation"];

  const handlePolicySelect = (policyId: string) => {
    setSelectedPolicy(policyId);
  };

  // Motor Insurance Content
  const MotorInsuranceContent = () => {
    const [formData, setFormData] = useState({
      vehicleType: "",
      registrationNumber: "",
      make: "",
      model: "",
      year: ""
    });

    const features = [
      {
        icon: <Shield className="h-8 w-8 text-insurance-primary" />,
        title: "Comprehensive Coverage",
        description: "Protection against accidents, theft, and natural disasters"
      },
      {
        icon: <Wrench className="h-8 w-8 text-insurance-primary" />,
        title: "Cashless Repairs",
        description: "Network of 4000+ authorized garages across India"
      },
      {
        icon: <Users className="h-8 w-8 text-insurance-primary" />,
        title: "24/7 Roadside Assistance",
        description: "Emergency support wherever you are"
      },
      {
        icon: <Car className="h-8 w-8 text-insurance-primary" />,
        title: "Zero Depreciation",
        description: "Get full claim amount without depreciation"
      }
    ];

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Get Instant Quote</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Vehicle Type</Label>
                <Select onValueChange={(value) => setFormData({...formData, vehicleType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="bike">Bike</SelectItem>
                    <SelectItem value="commercial">Commercial Vehicle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Registration Number</Label>
                <Input 
                  placeholder="e.g., KA01AB1234"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Make</Label>
                  <Select onValueChange={(value) => setFormData({...formData, make: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Make" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maruti">Maruti Suzuki</SelectItem>
                      <SelectItem value="hyundai">Hyundai</SelectItem>
                      <SelectItem value="honda">Honda</SelectItem>
                      <SelectItem value="toyota">Toyota</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Year</Label>
                  <Select onValueChange={(value) => setFormData({...formData, year: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button className="w-full bg-insurance-primary hover:bg-insurance-dark">
                Get Quote
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Why Choose Our Motor Insurance?</h3>
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">{feature.icon}</div>
                <div>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Coverage Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Third Party</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Basic coverage as per law</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Third party liability</li>
                    <li>• Personal accident cover</li>
                    <li>• Legal compliance</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="ring-2 ring-insurance-primary">
                <CardHeader>
                  <CardTitle>Comprehensive</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Complete protection</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Own damage cover</li>
                    <li>• Third party liability</li>
                    <li>• Theft protection</li>
                    <li>• Natural disasters</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Zero Depreciation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Maximum claim amount</p>
                  <ul className="space-y-2 text-sm">
                    <li>• No depreciation on parts</li>
                    <li>• Full claim settlement</li>
                    <li>• Premium coverage</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Health Insurance Content
  const HealthInsuranceContent = () => {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

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

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Why Choose Our Health Insurance?</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🏥</div>
                <h4 className="font-semibold mb-2">5000+ Hospitals</h4>
                <p className="text-muted-foreground">Cashless treatment across India</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h4 className="font-semibold mb-2">Quick Claims</h4>
                <p className="text-muted-foreground">Hassle-free claim settlement</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📞</div>
                <h4 className="font-semibold mb-2">24/7 Support</h4>
                <p className="text-muted-foreground">Round the clock assistance</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💰</div>
                <h4 className="font-semibold mb-2">No Hidden Costs</h4>
                <p className="text-muted-foreground">Transparent pricing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Product Insurance Content
  const ProductInsuranceContent = () => {
    const [selectedProduct, setSelectedProduct] = useState("");

    const productCategories = [
      {
        icon: <Smartphone className="h-12 w-12 text-insurance-primary" />,
        title: "Mobile & Electronics",
        description: "Smartphones, tablets, earphones",
        coverage: "Accidental damage, liquid damage, theft"
      },
      {
        icon: <Laptop className="h-12 w-12 text-insurance-primary" />,
        title: "Laptops & Computers",
        description: "Laptops, desktops, accessories",
        coverage: "Hardware failure, accidental damage"
      },
      {
        icon: <Home className="h-12 w-12 text-insurance-primary" />,
        title: "Home Appliances",
        description: "TV, refrigerator, washing machine",
        coverage: "Breakdown, electrical surge, repair"
      },
      {
        icon: <Camera className="h-12 w-12 text-insurance-primary" />,
        title: "Photography Equipment",
        description: "Cameras, lenses, drones",
        coverage: "Accidental damage, theft, breakdown"
      }
    ];

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">{category.icon}</div>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-3">{category.description}</p>
                <p className="text-sm text-insurance-primary font-semibold">{category.coverage}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Get Product Insurance Quote</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Product Category</Label>
                <Select onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mobile">Mobile & Electronics</SelectItem>
                    <SelectItem value="laptop">Laptops & Computers</SelectItem>
                    <SelectItem value="appliance">Home Appliances</SelectItem>
                    <SelectItem value="camera">Photography Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Brand</Label>
                <Input placeholder="e.g., Apple, Samsung, Sony" />
              </div>
              
              <div>
                <Label>Model</Label>
                <Input placeholder="e.g., iPhone 15, MacBook Pro" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Purchase Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Product Value</Label>
                  <Input placeholder="₹50,000" />
                </div>
              </div>
              
              <div>
                <Label>Coverage Period</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select coverage period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="2years">2 Years</SelectItem>
                    <SelectItem value="3years">3 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full bg-insurance-primary hover:bg-insurance-dark">
                Calculate Premium
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">What's Covered?</h3>
            
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-green-700 mb-3">✓ Covered</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Accidental damage including drops and spills</li>
                  <li>• Liquid damage and water exposure</li>
                  <li>• Electrical and mechanical breakdown</li>
                  <li>• Theft and burglary</li>
                  <li>• Screen damage and internal component failure</li>
                  <li>• Power surge damage</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-red-700 mb-3">✗ Not Covered</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Intentional damage</li>
                  <li>• War, nuclear risks</li>
                  <li>• Normal wear and tear</li>
                  <li>• Cosmetic damage not affecting functionality</li>
                  <li>• Damage due to software issues</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Simple Claim Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-insurance-primary">1</span>
                </div>
                <h4 className="font-semibold mb-2">Report Damage</h4>
                <p className="text-muted-foreground">Call our helpline or file claim online</p>
              </div>
              <div className="text-center">
                <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-insurance-primary">2</span>
                </div>
                <h4 className="font-semibold mb-2">Assessment</h4>
                <p className="text-muted-foreground">Our expert will assess the damage</p>
              </div>
              <div className="text-center">
                <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-insurance-primary">3</span>
                </div>
                <h4 className="font-semibold mb-2">Approval</h4>
                <p className="text-muted-foreground">Quick claim approval process</p>
              </div>
              <div className="text-center">
                <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-insurance-primary">4</span>
                </div>
                <h4 className="font-semibold mb-2">Repair/Replace</h4>
                <p className="text-muted-foreground">Get your product repaired or replaced</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderPolicyContent = () => {
    switch (selectedPolicy) {
      case 'motor':
        return <MotorInsuranceContent />;
      case 'health':
        return <HealthInsuranceContent />;
      case 'product':
        return <ProductInsuranceContent />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <ProcessFlow currentStep={1} steps={steps} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Buy New Policy</h1>
          <p className="text-muted-foreground">Start by choosing the type of insurance you need.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {policyTypes.map((policy) => (
            <Card 
              key={policy.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedPolicy === policy.id 
                  ? "ring-2 ring-insurance-primary bg-insurance-light/10" 
                  : "hover:shadow-md"
              }`}
              onClick={() => handlePolicySelect(policy.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{policy.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{policy.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{policy.description}</p>
                <Button 
                  className={`w-full ${
                    selectedPolicy === policy.id 
                      ? "bg-insurance-primary" 
                      : "bg-insurance-secondary hover:bg-insurance-primary"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePolicySelect(policy.id);
                  }}
                >
                  Get Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedPolicy && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                {policyTypes.find(p => p.id === selectedPolicy)?.title}
              </h2>
              <p className="text-muted-foreground text-lg">
                {policyTypes.find(p => p.id === selectedPolicy)?.description}
              </p>
            </div>
            
            {renderPolicyContent()}
          </div>
        )}
      </div>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Policy;
