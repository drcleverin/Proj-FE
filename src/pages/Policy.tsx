// src/pages/Policy.tsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Make sure react-router-dom is installed (v6+)

// Import your components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ProcessFlow from "@/components/ProcessFlow";
import PolicyTypeSelection from "./PolicyTypeSelection";
import MotorInsuranceContent from "./MotorInsuranceContent";
import HealthInsuranceContent from "./HealthInsuranceContent";
import ProductInsuranceContent from "./ProductInsuranceContent";

const Policy = () => {
  // useSearchParams provides both getter and setter for URL query parameters
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize selectedPolicy state based on the 'type' parameter from the URL.
  // Normalize to lowercase immediately to match your switch cases and policyTypes IDs.
  const [selectedPolicy, setSelectedPolicy] = useState<string>(
    (searchParams.get('type') || '').toLowerCase()
  );

  // State specific to the Health Insurance application flow.
  const [currentHealthStep, setCurrentHealthStep] = useState(1);

  // This useEffect hook is the SINGLE SOURCE OF TRUTH for updating
  // selectedPolicy and currentHealthStep based on URL changes.
  useEffect(() => {
    const typeParam = searchParams.get('type');
    // Normalize the incoming URL parameter to lowercase for consistent comparison
    const normalizedTypeParam = typeParam ? typeParam.toLowerCase() : '';

    // --- DEBUGGING LOGS (Uncomment for troubleshooting) ---
    // console.log('useEffect (searchParams) triggered');
    // console.log('  - Raw typeParam from URL:', typeParam);
    // console.log('  - Normalized typeParam:', normalizedTypeParam);
    // console.log('  - Current selectedPolicy state:', selectedPolicy);
    // console.log('  - Current currentHealthStep state:', currentHealthStep);
    // --- END DEBUGGING LOGS ---

    // Only update if the URL parameter has actually changed the policy type
    if (normalizedTypeParam !== selectedPolicy) {
      // --- DEBUGGING LOGS ---
      // console.log(`  -> Policy type change detected. Updating selectedPolicy to: ${normalizedTypeParam}`);
      // --- END DEBUGGING LOGS ---

      setSelectedPolicy(normalizedTypeParam);

      // Reset currentHealthStep only when there's a significant policy type switch.
      // This prevents accidental resets if currentHealthStep is managed within HealthInsuranceContent
      // and the URL doesn't represent a policy type change (e.g., just a URL param update unrelated to type).
      if (normalizedTypeParam === 'health' || selectedPolicy === 'health') {
        // If we are moving TO health, or moving FROM health, reset the health step.
        // This ensures a fresh start for the health flow when selected or deselected.
        // console.log('  -> Policy switch involving Health. Resetting currentHealthStep to 1.'); // Debug
        setCurrentHealthStep(1);
      } else {
        // For other policy switches (motor to product, product to motor),
        // you might still want to reset currentHealthStep if it's generally tied
        // to multi-step flows that aren't Health. Or, if it's purely for Health,
        // this else block might not need a setCurrentHealthStep.
        setCurrentHealthStep(1); // Default reset for simplicity, adjust as needed
      }
    } else if (!normalizedTypeParam && selectedPolicy) {
      // This block handles cases where the 'type' URL parameter is removed (e.g., manually clearing URL)
      // console.log('  -> URL param removed. Clearing selectedPolicy and resetting health step.'); // Debug
      setSelectedPolicy('');
      setCurrentHealthStep(1);
    }
  }, [searchParams, selectedPolicy]); // Dependencies: Re-run when searchParams or selectedPolicy change

  
  // Data for policy types
  const policyTypes = [
    {
      id: "motor", // These IDs are consistently lowercase
      title: "Motor Insurance",
      description: "Complete protection for your car and bike. Get comprehensive coverage for vehicle damage, third-party liability, and personal accident benefits.",
      icon: "🚗"
    },
    {
      id: "health", // These IDs are consistently lowercase
      title: "Health Insurance",
      description: "Comprehensive health coverage for individuals and families. Protect yourself and your loved ones against unexpected medical expenses.",
      icon: "💊"
    },
    {
      id: "product", // These IDs are consistently lowercase
      title: "Product Insurance",
      description: "Extended warranty for electronics and appliances. Protect your valuable gadgets against damage, theft, or technical failures.",
      icon: "📺"
    }
  ];

  // Steps for the Health Insurance application flow (could be moved to HealthInsuranceContent if desired)
  const healthApplicationSteps = ["Select Plan", "Personal Info", "Review", "Confirmation"];

  // This function is called when a policy type button is clicked.
  // Its SOLE responsibility is to update the URL. The useEffect will then react.
  const handlePolicySelect = (policyId: string) => {
    const normalizedPolicyId = policyId.toLowerCase(); // Ensure the ID is lowercase
    // console.log('handlePolicySelect triggered - updating URL with type:', normalizedPolicyId); // Debug
    setSearchParams({ type: normalizedPolicyId }); // This triggers the useEffect above!
  };

  // Helper function to render the correct policy content component
  const renderPolicyContent = () => {
    // console.log('renderPolicyContent called - based on selectedPolicy:', selectedPolicy); // Debug
    switch (selectedPolicy) {
      case 'motor':
        return <MotorInsuranceContent />;
      case 'health':
        return (
          <HealthInsuranceContent
            currentStep={currentHealthStep}
            setCurrentStep={setCurrentHealthStep} // Pass the setter to allow internal step changes
          />
        );
      case 'product':
        return <ProductInsuranceContent />;
      default:
        // Default content when no policy is selected or an invalid one is in URL
        return (
          <div className="text-center mt-8 p-4 border rounded shadow-sm bg-white">
            <h3 className="text-xl font-semibold mb-2">Select an Insurance Type Above</h3>
            <p className="text-muted-foreground">Choose from Motor, Health, or Product insurance to get started.</p>
          </div>
        );
    }
  };

  // Helper functions for ProcessFlow component
  const getProcessFlowSteps = () => {
    if (selectedPolicy === 'health') {
      return healthApplicationSteps;
    }
    // Default steps if no policy or a non-health policy is selected
    return ["Select Policy Type", "Application", "Premium", "Review", "Confirmation"];
  };

  const getProcessFlowCurrentStep = () => {
    if (selectedPolicy === 'health') {
      return currentHealthStep;
    }
    // If another policy type is selected, or none, adjust the general flow step as appropriate
    return selectedPolicy ? 2 : 1; // If a policy is chosen, assume step 2 (Application); otherwise step 1 (Select Policy Type)
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

        {/* PolicyTypeSelection component allows users to click and change the URL */}
        <PolicyTypeSelection
          policyTypes={policyTypes}
          selectedPolicy={selectedPolicy} // Pass the current selected policy (lowercase)
          onSelectPolicy={handlePolicySelect} // Pass the URL updater function
        />

        {/* Conditionally render content section only if a policy is selected */}
        {selectedPolicy && (
          <div className="space-y-8">
            <div className="text-center">
              {/* Find the policy title and description based on the normalized ID */}
              <h2 className="text-3xl font-bold mb-4">
                {policyTypes.find(p => p.id === selectedPolicy)?.title}
              </h2>
              <p className="text-muted-foreground text-lg">
                {policyTypes.find(p => p.id === selectedPolicy)?.description}
              </p>
            </div>

            {/* This is where the specific policy content component is rendered */}
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