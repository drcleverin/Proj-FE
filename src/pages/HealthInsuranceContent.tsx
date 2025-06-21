// src/components/HealthInsuranceContent.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import HealthPersonalInfoStep from './HealthPersonalInfoStep';
import HealthReviewStep from './HealthReviewStep';
import HealthConfirmationStep from './HealthConfirmationStep';

interface HealthInsuranceContentProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

// Define the interface for your form data
interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  pinCode: string;
  familyMembers: string;
  sumInsured: string;
}

const HealthInsuranceContent: React.FC<HealthInsuranceContentProps> = ({
  currentStep,
  setCurrentStep,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  // Add state to hold personal details
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    pinCode: "",
    familyMembers: "",
    sumInsured: "",
  });

  const healthPlans = [
    {
      id: "individual",
      name: "Individual Health Plan",
      planId:1,
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
      planId:2,
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
      planId:3,
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
    setCurrentStep(2); // Move to the Personal Info step
  };

  // Modify handleNextStep to accept data from personal info step
  const handleNextStep = (data?: PersonalDetails) => {
    if (data) {
      setPersonalDetails(data); // Save the personal details
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderHealthApplicationStep = () => {
    switch (currentStep) {
      case 2:
        return (
          <HealthPersonalInfoStep
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
            initialData={personalDetails} // Pass initial data to pre-fill the form
          />
        );
      case 3:
        return (
          <HealthReviewStep
            selectedPlan={healthPlans.find(plan => plan.id === selectedPlan)}
            personalDetails={personalDetails} // Pass personal details to the review step
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
          />
        );
      case 4:
        return <HealthConfirmationStep />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {currentStep === 1 && (
        <>
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
                    onClick={() => handleChoosePlan(plan.id)}
                    disabled={selectedPlan !== plan.id}
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
        </>
      )}

      {currentStep > 1 && renderHealthApplicationStep()}
    </div>
  );
};

export default HealthInsuranceContent;
