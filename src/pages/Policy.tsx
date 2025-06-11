
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ProcessFlow from "@/components/ProcessFlow";
import { useNavigate } from "react-router-dom";

const Policy = () => {
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);
  const navigate = useNavigate();

  const policyTypes = [
    {
      id: "motor",
      title: "Motor Insurance",
      description: "Complete protection for your car and bike. Get comprehensive coverage for vehicle damage, third-party liability, and personal accident benefits.",
      features: ["Comprehensive Coverage", "Third-Party Liability", "Personal Accident Cover", "24/7 Roadside Assistance"],
      icon: "🚗",
      route: "/motor-insurance"
    },
    {
      id: "health",
      title: "Health Insurance",
      description: "Comprehensive health coverage for individuals and families. Protect yourself and your loved ones against unexpected medical expenses.",
      features: ["Cashless Treatment", "Family Floater Options", "Pre & Post Hospitalization", "Critical Illness Cover"],
      icon: "💊",
      route: "/health-insurance"
    },
    {
      id: "product",
      title: "Product Insurance",
      description: "Extended warranty for electronics and appliances. Protect your valuable gadgets against damage, theft, or technical failures.",
      features: ["Extended Warranty", "Accidental Damage", "Theft Protection", "Technical Support"],
      icon: "📺",
      route: "/product-insurance"
    }
  ];

  const handlePolicySelect = (policyId: string) => {
    setSelectedPolicy(policyId);
  };

  const handleGetStarted = () => {
    if (selectedPolicy) {
      const policy = policyTypes.find(p => p.id === selectedPolicy);
      if (policy) {
        navigate(policy.route);
      }
    }
  };

  const steps = ["Select Policy Type", "Application", "Premium", "Review", "Confirmation"];

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
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {policyTypes.find(p => p.id === selectedPolicy)?.title}
                </h2>
                <p className="text-muted-foreground">
                  {policyTypes.find(p => p.id === selectedPolicy)?.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-3">Key Features:</h3>
                  <ul className="space-y-2">
                    {policyTypes.find(p => p.id === selectedPolicy)?.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-insurance-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Why Choose Us?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Quick and easy online process</li>
                    <li>• Competitive premium rates</li>
                    <li>• 24/7 customer support</li>
                    <li>• Hassle-free claim settlement</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={handleGetStarted}
                  className="bg-insurance-primary hover:bg-insurance-dark px-8 py-3"
                  size="lg"
                >
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Policy;
