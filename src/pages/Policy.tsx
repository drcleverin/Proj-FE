// src/pages/Policy.tsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ProcessFlow from "@/components/ProcessFlow";
import PolicyTypeSelection from "./PolicyTypeSelection";
import MotorInsuranceContent from "./MotorInsuranceContent";
import HealthInsuranceContent from "./HealthInsuranceContent";
import ProductInsuranceContent from "./ProductInsuranceContent";

const Policy = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || '';
  const [selectedPolicy, setSelectedPolicy] = useState<string>(initialType);
  const [currentHealthStep, setCurrentHealthStep] = useState(1); // Specific for Health application flow

  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam && typeParam !== selectedPolicy) {
      setSelectedPolicy(typeParam);
      setCurrentHealthStep(1); // Reset health step if policy type changes
    }
  }, [searchParams, selectedPolicy]);

  const policyTypes = [
    {
      id: "motor",
      title: "Motor Insurance",
      description: "Complete protection for your car and bike. Get comprehensive coverage for vehicle damage, third-party liability, and personal accident benefits.",
      icon: "🚗"
    },
    {
      id: "health",
      title: "Health Insurance",
      description: "Comprehensive health coverage for individuals and families. Protect yourself and your loved ones against unexpected medical expenses.",
      icon: "💊"
    },
    {
      id: "product",
      title: "Product Insurance",
      description: "Extended warranty for electronics and appliances. Protect your valuable gadgets against damage, theft, or technical failures.",
      icon: "📺"
    }
  ];

  // Steps for the Health Insurance application flow
  const healthApplicationSteps = ["Select Plan", "Personal Info", "Review", "Confirmation"];

  const handlePolicySelect = (policyId: string) => {
    setSelectedPolicy(policyId);
    setCurrentHealthStep(1); // Reset step when selecting a new policy type
    // Update URL without causing full page reload
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('type', policyId);
    window.history.pushState({}, '', newUrl);
  };

  const renderPolicyContent = () => {
    switch (selectedPolicy) {
      case 'motor':
        return <MotorInsuranceContent />;
      case 'health':
        return (
          <HealthInsuranceContent
            currentStep={currentHealthStep}
            setCurrentStep={setCurrentHealthStep}
          />
        );
      case 'product':
        return <ProductInsuranceContent />;
      default:
        return null;
    }
  };

  const getProcessFlowSteps = () => {
    if (selectedPolicy === 'health') {
      return healthApplicationSteps;
    }
    // Default steps if no policy or a non-health policy is selected
    return ["Select Policy Type", "Application", "Premium", "Review", "Confirmation"];
  };

  const getProcessFlowCurrentStep = () => {
    if (selectedPolicy === 'health') {
      // If health policy is selected, the current step is tied to the health application flow
      return currentHealthStep;
    }
    // If another policy type is selected, or none, default to the first step of the general flow
    // or handle specific step logic for other policies if they had multi-step flows
    return selectedPolicy ? 2 : 1; // If a policy is selected, assume we're on the 'Application' step (step 2) of a general flow, otherwise 'Select Policy Type' (step 1)
  };


  return (
    <div className="min-h-screen bg-background">
      <Header />

      <ProcessFlow
        currentStep={getProcessFlowCurrentStep()}
        steps={getProcessFlowSteps()}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Buy New Policy</h1>
          <p className="text-muted-foreground">Start by choosing the type of insurance you need.</p>
        </div>

        <PolicyTypeSelection
          policyTypes={policyTypes}
          selectedPolicy={selectedPolicy}
          onSelectPolicy={handlePolicySelect}
        />

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