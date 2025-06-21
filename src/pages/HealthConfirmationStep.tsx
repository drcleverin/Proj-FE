// src/components/HealthInsuranceSteps/HealthConfirmationStep.tsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const HealthConfirmationStep: React.FC = () => {
  return (
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
  );
};

export default HealthConfirmationStep;