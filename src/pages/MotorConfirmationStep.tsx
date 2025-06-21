// src/components/MotorConfirmationStep.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define props for the component
interface MotorConfirmationStepProps {
  resetForm: () => void;
}

const MotorConfirmationStep: React.FC<MotorConfirmationStepProps> = ({ resetForm }) => {
  return (
    <Card className="max-w-xl mx-auto p-4 text-center rounded-lg shadow-lg">
      <CardHeader className="flex flex-col items-center justify-center">
        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4 animate-bounce" />
        <CardTitle className="text-3xl font-bold text-green-600">Application Submitted!</CardTitle>
        <CardDescription className="text-lg text-muted-foreground mt-2">
          Your motor insurance application has been successfully submitted.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-md">
          We've sent a confirmation email to your provided address. Our team will review your details and get back to you shortly.
        </p>
        <p className="text-sm text-gray-500">
          Thank you for choosing our insurance services!
        </p>
        <Button
          onClick={resetForm}
          className="mt-6 bg-insurance-primary hover:bg-insurance-dark text-white rounded-md py-2 px-8 transition duration-300"
        >
          Apply for another policy
        </Button>
      </CardContent>
    </Card>
  );
};

export default MotorConfirmationStep;
