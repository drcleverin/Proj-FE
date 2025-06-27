// src/components/HealthInsuranceSteps/HealthReviewStep.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from 'axios'; // Import axios for API calls

// Define the interface for PersonalDetails here, or import it from a common types file
interface PersonalDetails {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string; // This will be a string in "YYYY-MM-DD" format
    gender: string;
    address: string;
    city: string;
    pinCode: string;
    familyMembers: string;
    sumInsured: string;
}

// Define the DTO format expected by your backend
interface PersonalDetailsDTO {
    userId: number; // Assuming userId is a number (Long in Java)
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string; // Backend expects LocalDate, send as "YYYY-MM-DD" string
    gender: string;
    address: string;
    city: string;
    pinCode: string;
    // Add other fields if your DTO has them and you need to send them
}


interface HealthReviewStepProps {
    selectedPlan: { name: string; price: string; coverage: string } | undefined;
    personalDetails: PersonalDetails; // personalDetails prop passed from parent
    onNext: () => void;
    onPrevious: () => void;
}






const HealthReviewStep: React.FC<HealthReviewStepProps> = ({ selectedPlan, personalDetails, onNext, onPrevious }) => {

    console.log("Selected Plan:", selectedPlan);

    const handleConfirmAndPay = async () => {
        let userId: number | null = null;
        const userStr = localStorage.getItem("userWithId");
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                userId = user.userId;
            } catch (error) {
                console.error("Failed to parse user from localStorage:", error);
                alert("Error: User information not found. Please log in again.");
                return;
            }
        } else {
            // fallback if userWithId is not found
            const user = localStorage.getItem("user");
            if (user) {
                try {
                    userId = JSON.parse(user).userId;
                } catch (error) {
                    alert("Error: User information not found. Please log in again.");
                    return;
                }
            }
        }

        if (userId === null) {
            alert("User ID is missing. Cannot submit application.");
            return;
        }

        // 1. Submit personal details (existing logic)
        const dataToSend: PersonalDetailsDTO = {
            userId: userId,
            firstName: personalDetails.firstName,
            lastName: personalDetails.lastName,
            email: personalDetails.email,
            phoneNumber: personalDetails.phoneNumber,
            dateOfBirth: personalDetails.dateOfBirth,
            gender: personalDetails.gender,
            address: personalDetails.address,
            city: personalDetails.city,
            pinCode: personalDetails.pinCode,
        };

        try {
            await axios.post("http://localhost:8093/api/personal-details/save", dataToSend);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(`Failed to submit personal details: ${error.response?.data?.message || "Please try again."}`);
            } else {
                alert("An unexpected error occurred. Please try again.");
            }
            return;
        }

        // 2. Submit policy details
        if (!selectedPlan) {
            alert("No plan selected. Please select a plan.");
            return;
        }

        // Prepare policy data (dummy values for required fields, replace as needed)
        const now = new Date();

// Get today's date components in local time
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();
const currentDay = now.getDate();

// For policyStartDate: Set it to the beginning of today in UTC
const policyStartDate = new Date(Date.UTC(currentYear, currentMonth, currentDay)).toISOString();

// For policyEndDate: Set it to the beginning of the same day next year in UTC
const policyEndDate = new Date(Date.UTC(currentYear + 1, currentMonth, currentDay)).toISOString();

console.log(policyStartDate, policyEndDate, "............... (Using Date.UTC)");
        const policyData = {
            policyId: null, // Let backend generate
            policyStartDate,
            policyEndDate,
            policyStatus: "PENDING",
            premiumAmount: Number(selectedPlan.price.replace(/[^\d.]/g, "")), // Extract number from price string
            planname: selectedPlan.name, // Replace with actual planId if available in selectedPlan
            userId: userId,
            // vehicleId: 1, // Replace with actual vehicleId if applicable
        };

        try {
            console.log("Submitting policy data...........:", policyData);
            const response = await axios.post("http://localhost:8093/api/policies/addPolicy", policyData);
            console.log("Policy created successfully:", response.data);
            alert("Your health insurance application and policy have been submitted successfully!");
            onNext();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(`Failed to create policy: ${error.response?.data?.message || "Please try again."}`);
            } else {
                alert("An unexpected error occurred while creating policy.");
            }
        }
    };

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Review Your Application</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Selected Plan</h3>
                    <p className="text-insurance-primary font-bold">
                        {selectedPlan ? `${selectedPlan.name} - ${selectedPlan.price}/year` : 'N/A'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Coverage: {selectedPlan ? selectedPlan.coverage : 'N/A'}
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold">Personal Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-muted-foreground">Name:</span>
                            <p>{personalDetails.firstName} {personalDetails.lastName}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Email:</span>
                            <p>{personalDetails.email}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Phone:</span>
                            <p>{personalDetails.phoneNumber}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Date of Birth:</span>
                            <p>{personalDetails.dateOfBirth}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Gender:</span>
                            <p>{personalDetails.gender}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Address:</span>
                            <p>{personalDetails.address}, {personalDetails.city}, {personalDetails.pinCode}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Family Members:</span>
                            <p>{personalDetails.familyMembers}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Sum Insured:</span>
                            <p>₹{personalDetails.sumInsured}</p>
                        </div>
                    </div>
                </div>

                <div className="flex space-x-4 pt-4">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={onPrevious}
                    >
                        Back to Edit
                    </Button>
                    <Button
                        className="flex-1 bg-insurance-primary hover:bg-insurance-dark"
                        onClick={handleConfirmAndPay} // Call the new handler
                    >
                        Confirm & Pay
                    </Button>
                </div>
            </CardContent>
        </Card>



    );
};

export default HealthReviewStep;
