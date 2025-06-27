// // src/components/MotorReviewStep.tsx
// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import axios from 'axios'; // Import axios for API calls

// // Define an interface for personal details only
// interface PersonalDetailsOnly {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
//   dateOfBirth: string;
//   gender: string;
//   address: string;
//   city: string;
//   pinCode: string;
// }

// // Define the interface for fetched vehicle details (matches VehicleDTO from backend)
// interface FetchedVehicleDetails {
//   vehicleId: number;
//   registrationNumber: string;
//   make: string;
//   model: string;
//   year: number;
//   fuelType: string;
//   chassisNumber: string;
//   engineNumber: string;
// }

// // Define the interface for a motor plan (copied from MotorInsuranceContent for consistency)
// interface MotorPlan {
//   id: string; // Unique string ID for frontend display/selection
//   planId: number; // Backend plan_id (matches insurance_plans.plan_id)
//   name: string;
//   price: string; // Formatted string, e.g., "₹5,000"
//   coverage: string; // Formatted string, e.g., "₹10,00,000"
//   features: string[];
//   popular: boolean;
// }

// // Define the DTO format expected by your backend for personal details
// interface PersonalDetailsDTO {
//     userId: number; // Assuming userId is a number (Long in Java)
//     firstName: string;
//     lastName: string;
//     email: string;
//     phoneNumber: string;
//     dateOfBirth: string; // Backend expects LocalDate, send as "YYYY-MM-DD" string
//     gender: string;
//     address: string;
//     city: string;
//     pinCode: string;
// }

// // Define the DTO format expected by your backend for policy details
// interface PolicyDTO {
//     policyId: number | null; // Null for auto-generated
//     policyEndDate: string; // ISO 8601 string
//     policyStartDate: string; // ISO 8601 string
//     policyStatus: string;
//     premiumAmount: number;
//     planId: number;
//     userId: number;
//     vehicleId: number; // Motor policies need a vehicleId
// }


// interface MotorReviewStepProps {
//   personalFormData: PersonalDetailsOnly;
//   fetchedVehicle: FetchedVehicleDetails | undefined; // Now explicitly passed
//   selectedPlan: MotorPlan | undefined; // Now explicitly passed
//   nextStep: () => void;
//   prevStep: () => void;
// }

// const MotorReviewStep: React.FC<MotorReviewStepProps> = ({ personalFormData, fetchedVehicle, selectedPlan, nextStep, prevStep }) => {

//   const handleConfirmAndPay = async () => {
//     if (!fetchedVehicle) {
//         alert("Vehicle details are missing. Please go back and fetch your vehicle.");
//         return;
//     }
//     if (!selectedPlan) {
//         alert("No motor plan selected. Please go back and select a plan.");
//         return;
//     }

//     let userId: number | null = null;
//     const userStr = localStorage.getItem("userWithId"); // Prioritize userWithId
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         userId = user.userId;
//       } catch (error) {
//         console.error("Failed to parse user from localStorage (userWithId):", error);
//         const fallbackUserStr = localStorage.getItem("user");
//         if (fallbackUserStr) {
//           try {
//             userId = JSON.parse(fallbackUserStr).userId;
//           } catch (fallbackError) {
//             console.error("Failed to parse user from localStorage (user fallback):", fallbackError);
//           }
//         }
//       }
//     } else {
//       const fallbackUserStr = localStorage.getItem("user");
//       if (fallbackUserStr) {
//         try {
//           userId = JSON.parse(fallbackUserStr).userId;
//         } catch (fallbackError) {
//           console.error("Failed to parse user from localStorage (user direct):", fallbackError);
//         }
//       }
//     }

//     if (userId === null) {
//       alert("User ID is missing. Cannot submit application. Please ensure you are logged in.");
//       return;
//     }

//     // 1. Submit personal details
//     const personalDetailsToSend: PersonalDetailsDTO = {
//         userId: userId,
//         firstName: personalFormData.firstName,
//         lastName: personalFormData.lastName,
//         email: personalFormData.email,
//         phoneNumber: personalFormData.phoneNumber,
//         dateOfBirth: personalFormData.dateOfBirth, // "YYYY-MM-DD" format
//         gender: personalFormData.gender,
//         address: personalFormData.address,
//         city: personalFormData.city,
//         pinCode: personalFormData.pinCode,
//     };

//     try {
//         console.log("Submitting personal details:", personalDetailsToSend);
//         await axios.post("http://localhost:8093/api/personal-details/save", personalDetailsToSend);
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             alert(`Failed to submit personal details: ${error.response?.data?.message || "Please try again."}`);
//         } else {
//             alert("An unexpected error occurred while submitting personal details. Please try again.");
//         }
//         return;
//     }

//     // 2. Submit policy details
//     const now = new Date();
//     const policyStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString(); // Tomorrow's date
//     const policyEndDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate() + 1).toISOString(); // One year from tomorrow

//     // Extract numerical premium from the formatted string, e.g., "₹7,800" -> 7800
//     const premiumAmountNumber = parseFloat(selectedPlan.price.replace(/[₹,]/g, ''));

//     const policyData: PolicyDTO = {
//         policyId: null, // Let backend generate
//         policyStartDate,
//         policyEndDate,
//         policyStatus: "PENDING", // Initial status
//         premiumAmount: premiumAmountNumber, // Use premium from selected plan
//         planId: selectedPlan.planId, // Use planId from selected plan
//         userId: userId,
//         vehicleId: fetchedVehicle.vehicleId, // Use fetched vehicleId
//     };

//     try {
//         console.log("Submitting motor policy data:", policyData);
//         // Assuming the policy endpoint is correct and can handle vehicleId
//         const response = await axios.post("http://localhost:8093/api/policies", policyData);
//         console.log("Motor Policy created successfully:", response.data);
//         alert("Your motor insurance application and policy have been submitted successfully!");
//         nextStep(); // Move to confirmation step
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             alert(`Failed to create motor policy: ${error.response?.data?.message || "Please try again."}`);
//         } else {
//             alert("An unexpected error occurred while creating motor policy.");
//         }
//     }
//   };


//   return (
//     <Card className="max-w-3xl mx-auto p-6 rounded-lg shadow-xl bg-white">
//       <CardHeader className="pb-4">
//         <CardTitle className="text-3xl font-bold text-center text-insurance-primary">Review Your Motor Insurance Details</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-6 text-lg text-gray-800">
//         {/* Selected Plan Details */}
//         <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//             <h4 className="font-semibold text-xl text-insurance-primary mb-3">Selected Plan</h4>
//             {selectedPlan ? (
//                 <div className="space-y-1">
//                     <p><span className="font-medium">Plan Name:</span> {selectedPlan.name}</p>
//                     <p><span className="font-medium">Price:</span> {selectedPlan.price} / year</p>
//                     <p><span className="font-medium">Coverage:</span> {selectedPlan.coverage}</p>
//                     <p className="text-sm text-muted-foreground mt-2">
//                         Features: {selectedPlan.features.join(", ")}
//                     </p>
//                 </div>
//             ) : (
//                 <p className="text-red-500">No plan selected.</p>
//             )}
//         </div>

//         {/* Vehicle Details */}
//         <div className="border-b pb-4 mb-4">
//           <h4 className="font-semibold text-xl text-insurance-primary mb-3">Vehicle Details</h4>
//           {fetchedVehicle ? (
//             <div className="space-y-1">
//               <p><span className="font-medium">Registration Number:</span> {fetchedVehicle.registrationNumber}</p>
//               <p><span className="font-medium">Make:</span> {fetchedVehicle.make}</p>
//               <p><span className="font-medium">Model:</span> {fetchedVehicle.model}</p>
//               <p><span className="font-medium">Year:</span> {fetchedVehicle.year}</p>
//               <p><span className="font-medium">Fuel Type:</span> {fetchedVehicle.fuelType}</p>
//             </div>
//           ) : (
//             <p className="text-red-500">Vehicle details not available.</p>
//           )}
//         </div>

//         {/* Personal Details */}
//         <div className="border-b pb-4 mb-4">
//           <h4 className="font-semibold text-xl text-insurance-primary mb-3">Personal Details</h4>
//           <p><span className="font-medium">Full Name:</span> {personalFormData.firstName || 'N/A'} {personalFormData.lastName || 'N/A'}</p>
//           <p><span className="font-medium">Email:</span> {personalFormData.email || 'N/A'}</p>
//           <p><span className="font-medium">Phone Number:</span> {personalFormData.phoneNumber || 'N/A'}</p>
//           <p><span className="font-medium">Date of Birth:</span> {personalFormData.dateOfBirth || 'N/A'}</p>
//           <p><span className="font-medium">Gender:</span> {personalFormData.gender || 'N/A'}</p>
//         </div>
//         <div className="border-b pb-4 mb-4">
//           <h4 className="font-semibold text-xl text-insurance-primary mb-3">Address Information</h4>
//           <p><span className="font-medium">Address:</span> {personalFormData.address || 'N/A'}</p>
//           <p><span className="font-medium">City:</span> {personalFormData.city || 'N/A'}</p>
//           <p><span className="font-medium">Pin Code:</span> {personalFormData.pinCode || 'N/A'}</p>
//         </div>
//         {/* Removed "Coverage Preferences" as per request */}
//       </CardContent>
//       <CardFooter className="flex justify-between items-center px-0 pb-0 pt-6">
//         <Button
//           onClick={prevStep}
//           className="bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-md py-2 px-6 transition duration-300"
//         >
//           Back to Personal Info
//         </Button>
//         <Button
//           onClick={handleConfirmAndPay} // Connect to the new handler
//           className="bg-insurance-primary hover:bg-insurance-dark text-white rounded-md py-2 px-6 transition duration-300"
//         >
//           Confirm & Pay
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default MotorReviewStep;


// // // src/components/MotorReviewStep.tsx
// // import React from 'react';
// // import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import axios from 'axios'; // Import axios for API calls

// // // Define an interface for the comprehensive personal and vehicle details
// // interface MotorPersonalDetails {
// //   registrationNumber: string;
// //   model: string;
// //   firstName: string;
// //   lastName: string;
// //   email: string;
// //   phoneNumber: string;
// //   dateOfBirth: string;
// //   gender: string;
// //   address: string;
// //   city: string;
// //   pinCode: string;
// //   familyMembers: string;
// //   sumInsured: string;
// // }

// // // Define the DTO format expected by your backend for personal details
// // interface PersonalDetailsDTO {
// //     userId: number; // Assuming userId is a number (Long in Java)
// //     firstName: string;
// //     lastName: string;
// //     email: string;
// //     phoneNumber: string;
// //     dateOfBirth: string; // Backend expects LocalDate, send as "YYYY-MM-DD" string
// //     gender: string;
// //     address: string;
// //     city: string;
// //     pinCode: string;
// //     // Add other fields if your DTO has them and you need to send them
// // }

// // // Define the DTO format expected by your backend for policy details (from your Java code)
// // interface PolicyDTO {
// //     policyId: number | null; // Null for auto-generated
// //     policyEndDate: string; // ISO 8601 string
// //     policyStartDate: string; // ISO 8601 string
// //     policyStatus: string;
// //     premiumAmount: number;
// //     planId: number;
// //     userId: number;
// //     // vehicleId: number; // Motor policies need a vehicleId
// // }


// // interface MotorReviewStepProps {
// //   formData: MotorPersonalDetails;
// //   nextStep: () => void;
// //   prevStep: () => void;
// // }

// // const MotorReviewStep: React.FC<MotorReviewStepProps> = ({ formData, nextStep, prevStep }) => {

// //   const handleConfirmAndPay = async () => {
// //     let userId: number | null = null;
// //     const userStr = localStorage.getItem("userWithId"); // Prioritize userWithId
// //     if (userStr) {
// //       try {
// //         const user = JSON.parse(userStr);
// //         userId = user.userId;
// //       } catch (error) {
// //         console.error("Failed to parse user from localStorage (userWithId):", error);
// //         // Fallback to "user" if "userWithId" parsing fails
// //         const fallbackUserStr = localStorage.getItem("user");
// //         if (fallbackUserStr) {
// //           try {
// //             userId = JSON.parse(fallbackUserStr).userId;
// //           } catch (fallbackError) {
// //             console.error("Failed to parse user from localStorage (user fallback):", fallbackError);
// //           }
// //         }
// //       }
// //     } else {
// //       // If userWithId is not found, try "user" directly
// //       const fallbackUserStr = localStorage.getItem("user");
// //       if (fallbackUserStr) {
// //         try {
// //           userId = JSON.parse(fallbackUserStr).userId;
// //         } catch (fallbackError) {
// //           console.error("Failed to parse user from localStorage (user direct):", fallbackError);
// //         }
// //       }
// //     }

// //     if (userId === null) {
// //       alert("User ID is missing. Cannot submit application. Please ensure you are logged in.");
// //       return;
// //     }

// //     // 1. Submit personal details
// //     const personalDetailsToSend: PersonalDetailsDTO = {
// //         userId: userId,
// //         firstName: formData.firstName,
// //         lastName: formData.lastName,
// //         email: formData.email,
// //         phoneNumber: formData.phoneNumber,
// //         dateOfBirth: formData.dateOfBirth, // "YYYY-MM-DD" format
// //         gender: formData.gender,
// //         address: formData.address,
// //         city: formData.city,
// //         pinCode: formData.pinCode,
// //         // familyMembers and sumInsured are not directly in PersonalDetailsDTO backend
// //         // If your backend PersonalDetails model includes them, add them here
// //     };

// //     try {
// //         console.log("Submitting personal details:", personalDetailsToSend);
// //         await axios.post("http://localhost:8093/api/personal-details/save", personalDetailsToSend);
// //     } catch (error) {
// //         if (axios.isAxiosError(error)) {
// //             alert(`Failed to submit personal details: ${error.response?.data?.message || "Please try again."}`);
// //         } else {
// //             alert("An unexpected error occurred while submitting personal details. Please try again.");
// //         }
// //         return;
// //     }

// //     // 2. Submit policy details
// //     // For motor insurance, let's assume a dummy planId and vehicleId for now.
// //     // In a real application, planId would be selected or derived, and vehicleId
// //     // would come from a vehicle registration process or existing vehicle data.
// //     const now = new Date();
// //     const policyStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString(); // Tomorrow's date
// //     const policyEndDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate() + 1).toISOString(); // One year from tomorrow

// //     const policyData: PolicyDTO = {
// //         policyId: null, // Let backend generate
// //         policyStartDate,
// //         policyEndDate,
// //         policyStatus: "PENDING", // Initial status
// //         premiumAmount: 15000, // Dummy premium, replace with actual calculation or user selection
// //         planId: 2, // Dummy plan ID for Motor Insurance (e.g., plan with ID 2 for motor)
// //         userId: userId,
// //         // vehicleId: 1, // Dummy vehicle ID, replace with actual from backend/DB if available or generated
// //     };

// //     try {
// //         console.log("Submitting motor policy data:", policyData);
// //         const response = await axios.post("http://localhost:8093/api/policies/addPolicy", policyData);
// //         console.log("Motor Policy created successfully:", response.data);
// //         alert("Your motor insurance application and policy have been submitted successfully!");
// //         nextStep(); // Move to confirmation step
// //     } catch (error) {
// //         if (axios.isAxiosError(error)) {
// //             alert(`Failed to create motor policy: ${error.response?.data?.message || "Please try again."}`);
// //         } else {
// //             alert("An unexpected error occurred while creating motor policy.");
// //         }
// //     }
// //   };


// //   return (
// //     <Card className="max-w-3xl mx-auto p-6 rounded-lg shadow-xl bg-white">
// //       <CardHeader className="pb-4">
// //         <CardTitle className="text-3xl font-bold text-center text-insurance-primary">Review Your Motor Insurance Details</CardTitle>
// //       </CardHeader>
// //       <CardContent className="space-y-6 text-lg text-gray-800">
// //         <div className="border-b pb-4 mb-4">
// //           <h4 className="font-semibold text-xl text-insurance-primary mb-3">Vehicle Details</h4>
// //           <p><span className="font-medium">Registration Number:</span> {formData.registrationNumber || 'N/A'}</p>
// //           <p><span className="font-medium">Model:</span> {formData.model || 'N/A'}</p>
// //         </div>
// //         <div className="border-b pb-4 mb-4">
// //           <h4 className="font-semibold text-xl text-insurance-primary mb-3">Personal Details</h4>
// //           <p><span className="font-medium">Full Name:</span> {formData.firstName || 'N/A'} {formData.lastName || 'N/A'}</p>
// //           <p><span className="font-medium">Email:</span> {formData.email || 'N/A'}</p>
// //           <p><span className="font-medium">Phone Number:</span> {formData.phoneNumber || 'N/A'}</p>
// //           <p><span className="font-medium">Date of Birth:</span> {formData.dateOfBirth || 'N/A'}</p>
// //           <p><span className="font-medium">Gender:</span> {formData.gender || 'N/A'}</p>
// //         </div>
// //         <div className="border-b pb-4 mb-4">
// //           <h4 className="font-semibold text-xl text-insurance-primary mb-3">Address Information</h4>
// //           <p><span className="font-medium">Address:</span> {formData.address || 'N/A'}</p>
// //           <p><span className="font-medium">City:</span> {formData.city || 'N/A'}</p>
// //           <p><span className="font-medium">Pin Code:</span> {formData.pinCode || 'N/A'}</p>
// //         </div>
// //         <div>
// //           <h4 className="font-semibold text-xl text-insurance-primary mb-3">Coverage Preferences</h4>
// //           <p><span className="font-medium">Family Members:</span> {formData.familyMembers || 'N/A'}</p>
// //           <p><span className="font-medium">Sum Insured:</span> {formData.sumInsured ? `₹${parseInt(formData.sumInsured).toLocaleString('en-IN')}` : 'N/A'}</p>
// //         </div>
// //       </CardContent>
// //       <CardFooter className="flex justify-between items-center px-0 pb-0 pt-6">
// //         <Button
// //           onClick={prevStep}
// //           className="bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-md py-2 px-6 transition duration-300"
// //         >
// //           Back to Personal Info
// //         </Button>
// //         <Button
// //           onClick={handleConfirmAndPay} // Connect to the new handler
// //           className="bg-insurance-primary hover:bg-insurance-dark text-white rounded-md py-2 px-6 transition duration-300"
// //         >
// //           Confirm & Pay
// //         </Button>
// //       </CardFooter>
// //     </Card>
// //   );
// // };

// // export default MotorReviewStep;

// src/components/MotorReviewStep.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from 'axios'; // Import axios for API calls

// Define an interface for personal details only
interface PersonalDetailsOnly {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  pinCode: string;
}

// Define the interface for fetched vehicle details (matches VehicleDTO from backend)
interface FetchedVehicleDetails {
  vehicleId: number;
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
  fuelType: string;
  chassisNumber: string;
  engineNumber: string;
}

// Define the interface for a motor plan (copied from MotorInsuranceContent for consistency)
interface MotorPlan {
  id: string; // Unique string ID for frontend display/selection
  planId: number; // Backend plan_id (matches insurance_plans.plan_id)
  name: string;
  price: string; // Formatted string, e.g., "₹5,000"
  coverage: string; // Formatted string, e.g., "₹10,00,000"
  features: string[];
  popular: boolean;
}

// Define the DTO format expected by your backend for personal details
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
}

// Define the DTO format expected by your backend for policy details
interface PolicyDTO {
    policyId: number | null; // Null for auto-generated
    policyEndDate: string; // ISO 8601 string
    policyStartDate: string; // ISO 8601 string
    policyStatus: string;
    premiumAmount: number;
    planId: number;
    userId: number;
    vehicleId: number; // Motor policies need a vehicleId
}


interface MotorReviewStepProps {
  personalFormData: PersonalDetailsOnly;
  fetchedVehicle: FetchedVehicleDetails | undefined; // Now explicitly passed
  selectedPlan: MotorPlan | undefined; // Now explicitly passed
  nextStep: () => void;
  prevStep: () => void;
}

const MotorReviewStep: React.FC<MotorReviewStepProps> = ({ personalFormData, fetchedVehicle, selectedPlan, nextStep, prevStep }) => {

  const handleConfirmAndPay = async () => {
    if (!fetchedVehicle) {
        alert("Vehicle details are missing. Please go back and fetch your vehicle.");
        return;
    }
    if (!selectedPlan) {
        alert("No motor plan selected. Please go back and select a plan.");
        return;
    }

    let userId: number | null = null;
    const userStr = localStorage.getItem("userWithId"); // Prioritize userWithId
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        userId = user.userId;
      } catch (error) {
        console.error("Failed to parse user from localStorage (userWithId):", error);
        const fallbackUserStr = localStorage.getItem("user");
        if (fallbackUserStr) {
          try {
            userId = JSON.parse(fallbackUserStr).userId;
          } catch (fallbackError) {
            console.error("Failed to parse user from localStorage (user fallback):", fallbackError);
          }
        }
      }
    } else {
      const fallbackUserStr = localStorage.getItem("user");
      if (fallbackUserStr) {
        try {
          userId = JSON.parse(fallbackUserStr).userId;
        } catch (fallbackError) {
          console.error("Failed to parse user from localStorage (user direct):", fallbackError);
        }
      }
    }

    if (userId === null) {
      alert("User ID is missing. Cannot submit application. Please ensure you are logged in.");
      return;
    }

    // 1. Submit personal details
    const personalDetailsToSend: PersonalDetailsDTO = {
        userId: userId,
        firstName: personalFormData.firstName,
        lastName: personalFormData.lastName,
        email: personalFormData.email,
        phoneNumber: personalFormData.phoneNumber,
        dateOfBirth: personalFormData.dateOfBirth, // "YYYY-MM-DD" format
        gender: personalFormData.gender,
        address: personalFormData.address,
        city: personalFormData.city,
        pinCode: personalFormData.pinCode,
    };

    try {
        console.log("Submitting personal details:", personalDetailsToSend);
        await axios.post("http://localhost:8093/api/personal-details/save", personalDetailsToSend);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert(`Failed to submit personal details: ${error.response?.data?.message || "Please try again."}`);
        } else {
            alert("An unexpected error occurred while submitting personal details. Please try again.");
        }
        return;
    }

    // 2. Submit policy details
    // const now = new Date();
    // const policyStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString(); // Tomorrow's date
    // const policyEndDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate() ).toISOString(); // One year from tomorrow
    // console.log(policyStartDate,policyEndDate,"...............")
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
    // Extract numerical premium from the formatted string, e.g., "₹7,800" -> 7800
    const premiumAmountNumber = parseFloat(selectedPlan.price.replace(/[₹,]/g, ''));

    const policyData: PolicyDTO = {
        policyId: null, // Let backend generate
        policyStartDate,
        policyEndDate,
        policyStatus: "PENDING", // Initial status
        premiumAmount: premiumAmountNumber, // Use premium from selected plan
        planId: selectedPlan.planId, // Use planId from selected plan
        userId: userId,
        vehicleId: fetchedVehicle.vehicleId, // Use fetched vehicleId
    };

    try {
        console.log("Submitting motor policy data:", policyData);
        // Assuming the policy endpoint is correct and can handle vehicleId
        const response = await axios.post("http://localhost:8093/api/policies/addPolicy", policyData);
        console.log("Motor Policy created successfully:", response.data);
        alert("Your motor insurance application and policy have been submitted successfully!");
        nextStep(); // Move to confirmation step
    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert(`Failed to create motor policy: ${error.response?.data?.message || "Please try again."}`);
        } else {
            alert("An unexpected error occurred while creating motor policy.");
        }
    }
  };


  return (
    <Card className="max-w-3xl mx-auto p-6 rounded-lg shadow-xl bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-bold text-center text-insurance-primary">Review Your Motor Insurance Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-lg text-gray-800">
        {/* Selected Plan Details */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-xl text-insurance-primary mb-3">Selected Plan</h4>
            {selectedPlan ? (
                <div className="space-y-1">
                    <p><span className="font-medium">Plan Name:</span> {selectedPlan.name}</p>
                    <p><span className="font-medium">Price:</span> {selectedPlan.price} / year</p>
                    <p><span className="font-medium">Coverage:</span> {selectedPlan.coverage}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Features: {selectedPlan.features.join(", ")}
                    </p>
                </div>
            ) : (
                <p className="text-red-500">No plan selected.</p>
            )}
        </div>

        {/* Vehicle Details */}
        <div className="border-b pb-4 mb-4">
          <h4 className="font-semibold text-xl text-insurance-primary mb-3">Vehicle Details</h4>
          {fetchedVehicle ? (
            <div className="space-y-1">
              <p><span className="font-medium">Registration Number:</span> {fetchedVehicle.registrationNumber}</p>
              <p><span className="font-medium">Make:</span> {fetchedVehicle.make}</p>
              <p><span className="font-medium">Model:</span> {fetchedVehicle.model}</p>
              <p><span className="font-medium">Year:</span> {fetchedVehicle.year}</p>
              <p><span className="font-medium">Fuel Type:</span> {fetchedVehicle.fuelType}</p>
            </div>
          ) : (
            <p className="text-red-500">Vehicle details not available.</p>
          )}
        </div>

        {/* Personal Details */}
        <div className="border-b pb-4 mb-4">
          <h4 className="font-semibold text-xl text-insurance-primary mb-3">Personal Details</h4>
          <p><span className="font-medium">Full Name:</span> {personalFormData.firstName || 'N/A'} {personalFormData.lastName || 'N/A'}</p>
          <p><span className="font-medium">Email:</span> {personalFormData.email || 'N/A'}</p>
          <p><span className="font-medium">Phone Number:</span> {personalFormData.phoneNumber || 'N/A'}</p>
          <p><span className="font-medium">Date of Birth:</span> {personalFormData.dateOfBirth || 'N/A'}</p>
          <p><span className="font-medium">Gender:</span> {personalFormData.gender || 'N/A'}</p>
        </div>
        <div className="border-b pb-4 mb-4">
          <h4 className="font-semibold text-xl text-insurance-primary mb-3">Address Information</h4>
          <p><span className="font-medium">Address:</span> {personalFormData.address || 'N/A'}</p>
          <p><span className="font-medium">City:</span> {personalFormData.city || 'N/A'}</p>
          <p><span className="font-medium">Pin Code:</span> {personalFormData.pinCode || 'N/A'}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center px-0 pb-0 pt-6">
        <Button
          onClick={prevStep}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-md py-2 px-6 transition duration-300"
        >
          Back to Personal Info
        </Button>
        <Button
          onClick={handleConfirmAndPay}
          className="bg-insurance-primary hover:bg-insurance-dark text-white rounded-md py-2 px-6 transition duration-300"
        >
          Confirm & Pay
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MotorReviewStep;
