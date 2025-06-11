
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ProcessFlow from "@/components/ProcessFlow";
import { useNavigate, useSearchParams } from "react-router-dom";

const Policy = () => {
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const policyTypes = [
    {
      id: "motor",
      title: "Motor Insurance",
      description: "Complete protection for your car and bike. Get comprehensive coverage for vehicle damage, third-party liability, and personal accident benefits.",
      features: ["Comprehensive Coverage", "Third-Party Liability", "Personal Accident Cover", "24/7 Roadside Assistance"],
      icon: "🚗",
      detailedContent: {
        title: "Motor Insurance - Complete Vehicle Protection",
        subtitle: "Comprehensive coverage for all your driving needs",
        benefits: [
          "Own Damage Cover - Protection against accidents, theft, fire, and natural disasters",
          "Third Party Liability - Legal coverage for damages to third parties",
          "Personal Accident Cover - Coverage for driver and passengers",
          "Zero Depreciation Add-on - No depreciation deduction on claims",
          "Engine Protection - Coverage for engine damage due to water ingression",
          "24/7 Roadside Assistance - Emergency support anywhere, anytime"
        ],
        pricing: "Starting from ₹2,500/year",
        coverage: "Up to ₹15 Lakhs"
      }
    },
    {
      id: "health",
      title: "Health Insurance",
      description: "Comprehensive health coverage for individuals and families. Protect yourself and your loved ones against unexpected medical expenses.",
      features: ["Cashless Treatment", "Family Floater Options", "Pre & Post Hospitalization", "Critical Illness Cover"],
      icon: "💊",
      detailedContent: {
        title: "Health Insurance - Complete Medical Protection",
        subtitle: "Comprehensive healthcare coverage for you and your family",
        benefits: [
          "Cashless Treatment - Network of 10,000+ hospitals across India",
          "Family Floater - Single policy for entire family",
          "Pre & Post Hospitalization - 30 days pre and 60 days post coverage",
          "Critical Illness Cover - Coverage for 30+ critical illnesses",
          "Maternity Benefits - Coverage for pregnancy and newborn care",
          "Annual Health Check-ups - Free preventive health screenings"
        ],
        pricing: "Starting from ₹5,000/year",
        coverage: "Up to ₹25 Lakhs"
      }
    },
    {
      id: "product",
      title: "Product Insurance",
      description: "Extended warranty for electronics and appliances. Protect your valuable gadgets against damage, theft, or technical failures.",
      features: ["Extended Warranty", "Accidental Damage", "Theft Protection", "Technical Support"],
      icon: "📺",
      detailedContent: {
        title: "Product Insurance - Extended Device Protection",
        subtitle: "Complete protection for your valuable electronics and appliances",
        benefits: [
          "Extended Warranty - Coverage beyond manufacturer warranty",
          "Accidental Damage - Protection against drops, spills, and accidents",
          "Theft Protection - Coverage against theft and burglary",
          "Technical Support - 24/7 expert technical assistance",
          "Screen Protection - Coverage for mobile and laptop screens",
          "Quick Replacement - Same-day replacement for eligible devices"
        ],
        pricing: "Starting from ₹500/year",
        coverage: "Up to device value"
      }
    }
  ];

  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam && policyTypes.find(p => p.id === typeParam)) {
      setSelectedPolicy(typeParam);
    }
  }, [searchParams]);

  const handlePolicySelect = (policyId: string) => {
    setSelectedPolicy(policyId);
    // Update URL without navigation
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('type', policyId);
    window.history.replaceState({}, '', `${window.location.pathname}?${newSearchParams}`);
  };

  const handleGetStarted = () => {
    if (selectedPolicy) {
      navigate('/dashboard');
    }
  };

  const steps = ["Select Policy Type", "Application", "Premium", "Review", "Confirmation"];
  const selectedPolicyData = policyTypes.find(p => p.id === selectedPolicy);

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
                  ? "ring-2 ring-insurance-primary bg-insurance-light/10 dark:bg-insurance-primary/10" 
                  : "hover:shadow-md"
              }`}
              onClick={() => handlePolicySelect(policy.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{policy.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{policy.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{policy.description}</p>
                <ul className="text-left text-sm space-y-1 mb-4">
                  {policy.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-insurance-primary rounded-full mr-2 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    selectedPolicy === policy.id 
                      ? "bg-insurance-primary text-white" 
                      : "bg-insurance-secondary hover:bg-insurance-primary"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePolicySelect(policy.id);
                  }}
                >
                  Select Policy
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedPolicy && selectedPolicyData && (
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{selectedPolicyData.icon}</div>
                <h2 className="text-3xl font-bold mb-2 text-insurance-primary">
                  {selectedPolicyData.detailedContent.title}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {selectedPolicyData.detailedContent.subtitle}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-insurance-primary">Coverage Benefits:</h3>
                  <ul className="space-y-3">
                    {selectedPolicyData.detailedContent.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-insurance-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-insurance-light/20 dark:bg-insurance-primary/10 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-insurance-primary">Policy Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Premium:</span>
                        <span className="font-semibold">{selectedPolicyData.detailedContent.pricing}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Coverage:</span>
                        <span className="font-semibold">{selectedPolicyData.detailedContent.coverage}</span>
                      </div>
                      <div className="pt-3 border-t">
                        <p className="text-sm text-muted-foreground">
                          • Quick and easy online process<br/>
                          • Competitive premium rates<br/>
                          • 24/7 customer support<br/>
                          • Hassle-free claim settlement
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleGetStarted}
                    className="w-full bg-insurance-primary hover:bg-insurance-dark px-8 py-4 text-lg"
                    size="lg"
                  >
                    Proceed to Application
                  </Button>
                </div>
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
