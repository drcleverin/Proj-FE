// src/components/PolicyTypeSelection.tsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PolicyType {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface PolicyTypeSelectionProps {
  policyTypes: PolicyType[];
  selectedPolicy: string;
  onSelectPolicy: (policyId: string) => void;
}

const PolicyTypeSelection: React.FC<PolicyTypeSelectionProps> = ({
  policyTypes,
  selectedPolicy,
  onSelectPolicy,
}) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {policyTypes.map((policy) => (
        <Card
          key={policy.id}
          className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
            selectedPolicy === policy.id
              ? "ring-2 ring-insurance-primary bg-insurance-light/10"
              : "hover:shadow-md"
          }`}
          onClick={() => onSelectPolicy(policy.id)}
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
                e.stopPropagation(); // Prevent card onClick from firing again
                onSelectPolicy(policy.id);
              }}
            >
              Get Quote
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PolicyTypeSelection;