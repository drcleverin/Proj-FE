


// // src/components/MotorInsuranceContent.tsx
// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Car, Shield, Wrench, Users, CheckCircle, Star, Search } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import axios from 'axios'; // Import axios for API calls

// // Import components using relative paths assuming they are in the same directory
// import MotorPersonalInfo from './MotorPersonalInfo';
// import MotorReviewStep from './MotorReviewStep';
// import MotorConfirmationStep from './MotorConfirmationStep';

// // Define an interface for the comprehensive personal details (vehicle details will be separate)
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

// // Define the interface for a motor plan
// interface MotorPlan {
//   id: string; // Unique string ID for frontend display/selection
//   planId: number; // Backend plan_id (matches insurance_plans.plan_id)
//   name: string;
//   price: string; // Formatted string, e.g., "₹5,000"
//   coverage: string; // Formatted string, e.g., "₹10,00,000"
//   features: string[];
//   popular: boolean;
// }

// // Default initial state for personal details (vehicle details start empty)
// const defaultPersonalDetails: PersonalDetailsOnly = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   phoneNumber: "",
//   dateOfBirth: "",
//   gender: "",
//   address: "",
//   city: "",
//   pinCode: "",
// };

// // Define available motor plans
// const motorPlans: MotorPlan[] = [
//   {
//     id: "third-party",
//     planId: 4, // Example backend planId for Third Party
//     name: "Third Party Liability",
//     price: "₹2,500",
//     coverage: "Unlimited (Third Party Liability)",
//     features: [
//       "Mandatory legal coverage",
//       "Covers damage/injury to third party",
//       "No own damage cover"
//     ],
//     popular: false
//   },
//   {
//     id: "comprehensive",
//     planId: 5, // Example backend planId for Comprehensive
//     name: "Comprehensive Motor Plan",
//     price: "₹7,800",
//     coverage: "₹10,00,000 (IDV)",
//     features: [
//       "Own damage cover (accident, fire, theft)",
//       "Third party liability",
//       "Personal accident cover (owner-driver)",
//       "Add-on options available"
//     ],
//     popular: true
//   },
//   {
//     id: "zero-depreciation",
//     planId: 6, // Example backend planId for Zero Depreciation
//     name: "Zero Depreciation Add-on",
//     price: "₹9,500", // This would be combined with Comprehensive price in reality
//     coverage: "Full Claim (No Depreciation)",
//     features: [
//       "Full claim for parts without depreciation",
//       "Ideal for new vehicles",
//       "Available with Comprehensive policy only"
//     ],
//     popular: false
//   }
// ];

// const features = [
//   {
//     icon: <Shield className="h-8 w-8 text-insurance-primary" />,
//     title: "Comprehensive Coverage",
//     description: "Protection against accidents, theft, and natural disasters"
//   },
//   {
//     icon: <Wrench className="h-8 w-8 text-insurance-primary" />,
//     title: "Cashless Repairs",
//     description: "Network of 4000+ authorized garages across India"
//   },
//   {
//     icon: <Users className="h-8 w-8 text-insurance-primary" />,
//     title: "24/7 Roadside Assistance",
//     description: "Emergency support wherever you are"
//   },
//   {
//     icon: <Car className="h-8 w-8 text-insurance-primary" />,
//     title: "Zero Depreciation",
//     description: "Get full claim amount without depreciation"
//   }
// ];


// const MotorInsuranceContent: React.FC = () => {
//   const [step, setStep] = useState(1); // 1: Vehicle Lookup & Plan Selection, 2: Personal Info, 3: Review, 4: Confirmation
//   const [personalFormData, setPersonalFormData] = useState<PersonalDetailsOnly>(defaultPersonalDetails);
//   const [registrationInput, setRegistrationInput] = useState<string>("");
//   const [fetchedVehicleData, setFetchedVehicleData] = useState<FetchedVehicleDetails | undefined>(undefined);
//   const [selectedPlan, setSelectedPlan] = useState<MotorPlan | undefined>(undefined);
//   const [vehicleLookupError, setVehicleLookupError] = useState<string | null>(null);
//   const [isFetchingVehicle, setIsFetchingVehicle] = useState(false);

//   // Function to move to the next step
//   const nextStep = () => setStep((prev) => prev + 1);
//   // Function to move to the previous step
//   const prevStep = () => setStep((prev) => prev - 1);
//   // Function to reset the form and go back to the first step
//   const resetForm = () => {
//     setPersonalFormData(defaultPersonalDetails);
//     setRegistrationInput("");
//     setFetchedVehicleData(undefined);
//     setSelectedPlan(undefined);
//     setVehicleLookupError(null);
//     setStep(1);
//   };

//   const handleFetchVehicleDetails = async () => {
//     if (!registrationInput) {
//       alert("Please enter a vehicle registration number to fetch details.");
//       return;
//     }

//     setIsFetchingVehicle(true);
//     setVehicleLookupError(null);
//     setFetchedVehicleData(undefined); // Clear previous vehicle data

//     try {
//       console.log("Fetching vehicle details for registration:", registrationInput);
//       const response = await axios.get<FetchedVehicleDetails>(`http://localhost:8093/api/vehicles/${registrationInput}`);
//       setFetchedVehicleData(response.data);
//       console.log("Fetched Vehicle Data:", response.data);
//     } catch (error) {
//       console.error("Error fetching vehicle details:", error);
//       if (axios.isAxiosError(error) && error.response) {
//         if (error.response.status === 404) {
//           setVehicleLookupError("Vehicle not found. Please check the registration number or add new vehicle details.");
//         } else {
//           setVehicleLookupError(`Error: ${error.response.status} - ${error.response.statusText}`);
//         }
//       } else {
//         setVehicleLookupError("An unexpected error occurred while fetching vehicle details.");
//       }
//     } finally {
//       setIsFetchingVehicle(false);
//     }
//   };


//   return (
//     <div className="space-y-8 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
//       {step === 1 && (
//         <>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Vehicle Lookup & Plan Selection Card */}
//             <Card className="rounded-lg shadow-lg">
//               <CardHeader>
//                 <CardTitle className="text-3xl font-bold text-center text-insurance-primary">Find Your Vehicle & Choose Plan</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 {/* Vehicle Registration Input */}
//                 <div>
//                   <Label htmlFor="registrationNumber" className="text-lg font-medium">Vehicle Registration Number</Label>
//                   <div className="flex space-x-2 mt-2">
//                     <Input
//                       id="registrationNumber"
//                       placeholder="e.g., KA01AB1234"
//                       value={registrationInput}
//                       onChange={(e) => setRegistrationInput(e.target.value)}
//                       className="p-3 rounded-md border border-gray-300 focus:ring-insurance-primary focus:border-insurance-primary flex-grow"
//                     />
//                     <Button
//                       onClick={handleFetchVehicleDetails}
//                       disabled={isFetchingVehicle}
//                       className="bg-insurance-primary hover:bg-insurance-dark text-white text-lg font-semibold py-3 rounded-md transition duration-300"
//                     >
//                       {isFetchingVehicle ? "Searching..." : <Search className="h-5 w-5" />}
//                     </Button>
//                   </div>
//                   {vehicleLookupError && (
//                     <p className="text-red-500 text-sm mt-2">{vehicleLookupError}</p>
//                   )}
//                 </div>

//                 {/* Display Fetched Vehicle Details if available */}
//                 {fetchedVehicleData && (
//                   <div className="mt-6 p-4 border border-green-200 bg-green-50 rounded-md">
//                     <h4 className="text-lg font-semibold text-green-700 mb-2">Vehicle Details Found:</h4>
//                     <p><strong>RegistrationNumber:</strong> {fetchedVehicleData.registrationNumber}</p>
//                     <p><strong>Model:</strong> {fetchedVehicleData.model}</p>
//                     <p><strong>Year:</strong> {fetchedVehicleData.year}</p>
//                     <p><strong>Fuel Type:</strong> {fetchedVehicleData.fuelType}</p>
//                     <p><strong>Chassis Number:</strong> {fetchedVehicleData.chassisNumber}</p>
//                     <p><strong>Engine Number:</strong> {fetchedVehicleData.engineNumber}</p>
//                   </div>
//                 )}

//                 {/* Motor Plan Selection - Only show if vehicle details are fetched */}
//                 {fetchedVehicleData && (
//                   <div className="mt-8">
//                       <h3 className="text-2xl font-bold text-center text-insurance-dark mb-6">Choose Your Plan</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
//                           {motorPlans.map((plan) => (
//                               <Card
//                                   key={plan.id}
//                                   className={`rounded-lg p-6 cursor-pointer transition-all duration-300 ${
//                                       selectedPlan?.id === plan.id
//                                           ? "ring-4 ring-insurance-primary shadow-lg"
//                                           : "border border-gray-200 hover:shadow-md"
//                                   }`}
//                                   onClick={() => setSelectedPlan(plan)}
//                               >
//                                   <CardHeader className="p-0 pb-3 flex flex-row items-center justify-between">
//                                       <CardTitle className="text-2xl font-bold text-insurance-primary">
//                                           {plan.name}
//                                       </CardTitle>
//                                       {plan.popular && (
//                                           <Badge className="bg-green-500 text-white px-3 py-1 text-sm rounded-full">Popular</Badge>
//                                       )}
//                                       {selectedPlan?.id === plan.id && (
//                                         <CheckCircle className="h-6 w-6 text-green-500 ml-2" />
//                                       )}
//                                   </CardHeader>
//                                   <CardDescription className="text-lg text-muted-foreground mb-4">
//                                       {plan.coverage} Sum Insured
//                                   </CardDescription>
//                                   <CardContent className="p-0">
//                                       <p className="text-4xl font-extrabold text-gray-900 mb-4">{plan.price}<span className="text-base font-normal text-muted-foreground">/year</span></p>
//                                       <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
//                                           {plan.features.map((feature, idx) => (
//                                               <li key={idx}>{feature}</li>
//                                           ))}
//                                       </ul>
//                                   </CardContent>
//                               </Card>
//                           ))}
//                       </div>
//                   </div>
//                 )}

//                 <div className="text-center mt-4">
//                     {!fetchedVehicleData && (
//                         <p className="text-gray-600 text-sm mb-2">Please search for your vehicle details above.</p>
//                     )}
//                     {fetchedVehicleData && !selectedPlan && (
//                         <p className="text-gray-600 text-sm mb-2">Please select a motor insurance plan.</p>
//                     )}
//                 </div>

//                 <Button
//                   onClick={() => {
//                     if (!fetchedVehicleData) {
//                       alert("Please fetch your vehicle details first.");
//                       return;
//                     }
//                     if (!selectedPlan) {
//                       alert("Please select a motor insurance plan.");
//                       return;
//                     }
//                     setStep(2); // Move to Personal Info step
//                   }}
//                   disabled={!fetchedVehicleData || !selectedPlan} // Re-enabled the disabled prop
//                   className="w-full bg-insurance-primary hover:bg-insurance-dark text-white text-lg font-semibold py-3 rounded-md transition duration-300"
//                 >
//                   Proceed to Personal Details
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Why Choose Us Features */}
//             <div className="space-y-8 p-4">
//               <h3 className="text-4xl font-extrabold text-insurance-dark mb-6">Why Choose Our Motor Insurance?</h3>
//               {features.map((feature, index) => (
//                 <div key={index} className="flex items-start space-x-5 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
//                   <div className="flex-shrink-0 p-3 bg-insurance-light rounded-full">{feature.icon}</div>
//                   <div>
//                     <h4 className="font-bold text-xl text-gray-900 mb-1">{feature.title}</h4>
//                     <p className="text-gray-600 text-base">{feature.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </>
//       )}

//       {step === 2 && (
//         <MotorPersonalInfo
//           personalFormData={personalFormData} // Pass personal details separately
//           setPersonalFormData={setPersonalFormData}
//           fetchedVehicle={fetchedVehicleData} // Pass fetched vehicle details
//           nextStep={nextStep}
//           prevStep={prevStep}
//         />
//       )}

//       {step === 3 && (
//         <MotorReviewStep
//           personalFormData={personalFormData}
//           fetchedVehicle={fetchedVehicleData} // Pass fetched vehicle details to review
//           selectedPlan={selectedPlan}
//           nextStep={nextStep}
//           prevStep={prevStep}
//         />
//       )}

//       {step === 4 && (
//         <MotorConfirmationStep
//           resetForm={resetForm}
//         />
//       )}
//     </div>
//   );
// };

// export default MotorInsuranceContent;
// src/components/MotorInsuranceContent.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, Shield, Wrench, Users, CheckCircle, Star, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import axios from 'axios'; // Import axios for API calls

// Import components using relative paths assuming they are in the same directory
import MotorPersonalInfo from './MotorPersonalInfo';
import MotorReviewStep from './MotorReviewStep';
import MotorConfirmationStep from './MotorConfirmationStep';

// Define an interface for the comprehensive personal details (vehicle details will be separate)
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

// Define the interface for a motor plan
interface MotorPlan {
  id: string; // Unique string ID for frontend display/selection
  planId: number; // Backend plan_id (matches insurance_plans.plan_id)
  name: string;
  price: string; // Formatted string, e.g., "₹5,000"
  coverage: string; // Formatted string, e.g., "₹10,00,000"
  features: string[];
  popular: boolean;
}

// Default initial state for personal details (vehicle details start empty)
const defaultPersonalDetails: PersonalDetailsOnly = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  city: "",
  pinCode: "",
};

// Define available motor plans
const motorPlans: MotorPlan[] = [
  {
    id: "third-party",
    planId: 4, // Example backend planId for Third Party
    name: "Third Party Liability",
    price: "₹2,500",
    coverage: "Unlimited (Third Party Liability)",
    features: [
      "Mandatory legal coverage",
      "Covers damage/injury to third party",
      "No own damage cover"
    ],
    popular: false
  },
  {
    id: "comprehensive",
    planId: 5, // Example backend planId for Comprehensive
    name: "Comprehensive Motor Plan",
    price: "₹7,800",
    coverage: "₹10,00,000 (IDV)",
    features: [
      "Own damage cover (accident, fire, theft)",
      "Third party liability",
      "Personal accident cover (owner-driver)",
      "Add-on options available"
    ],
    popular: true
  },
  {
    id: "zero-depreciation",
    planId: 6, // Example backend planId for Zero Depreciation
    name: "Zero Depreciation Add-on",
    price: "₹9,500", // This would be combined with Comprehensive price in reality
    coverage: "Full Claim (No Depreciation)",
    features: [
      "Full claim for parts without depreciation",
      "Ideal for new vehicles",
      "Available with Comprehensive policy only"
    ],
    popular: false
  }
];

const features = [
  {
    icon: <Shield className="h-8 w-8 text-insurance-primary" />,
    title: "Comprehensive Coverage",
    description: "Protection against accidents, theft, and natural disasters"
  },
  {
    icon: <Wrench className="h-8 w-8 text-insurance-primary" />,
    title: "Cashless Repairs",
    description: "Network of 4000+ authorized garages across India"
  },
  {
    icon: <Users className="h-8 w-8 text-insurance-primary" />,
    title: "24/7 Roadside Assistance",
    description: "Emergency support wherever you are"
  },
  {
    icon: <Car className="h-8 w-8 text-insurance-primary" />,
    title: "Zero Depreciation",
    description: "Get full claim amount without depreciation"
  }
];


const MotorInsuranceContent: React.FC = () => {
  const [step, setStep] = useState(1); // 1: Vehicle Lookup & Plan Selection, 2: Personal Info, 3: Review, 4: Confirmation
  const [personalFormData, setPersonalFormData] = useState<PersonalDetailsOnly>(defaultPersonalDetails);
  const [registrationInput, setRegistrationInput] = useState<string>("");
  const [fetchedVehicleData, setFetchedVehicleData] = useState<FetchedVehicleDetails | undefined>(undefined);
  const [selectedPlan, setSelectedPlan] = useState<MotorPlan | undefined>(undefined);
  const [vehicleLookupError, setVehicleLookupError] = useState<string | null>(null);
  const [isFetchingVehicle, setIsFetchingVehicle] = useState(false);

  // Function to move to the next step
  const nextStep = () => setStep((prev) => prev + 1);
  // Function to move to the previous step
  const prevStep = () => setStep((prev) => prev - 1);
  // Function to reset the form and go back to the first step
  const resetForm = () => {
    setPersonalFormData(defaultPersonalDetails);
    setRegistrationInput("");
    setFetchedVehicleData(undefined);
    setSelectedPlan(undefined);
    setVehicleLookupError(null);
    setStep(1);
  };

  const handleFetchVehicleDetails = async () => {
    if (!registrationInput) {
      alert("Please enter a vehicle registration number to fetch details.");
      return;
    }

    setIsFetchingVehicle(true);
    setVehicleLookupError(null);
    setFetchedVehicleData(undefined); // Clear previous vehicle data

    try {
      console.log("Fetching vehicle details for registration:", registrationInput);
      const response = await axios.get<FetchedVehicleDetails>(`http://localhost:8093/api/vehicles/${registrationInput}`);
      setFetchedVehicleData(response.data);
      console.log("Fetched Vehicle Data:", response.data);
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 404) {
          setVehicleLookupError("Vehicle not found. Please check the registration number or add new vehicle details.");
        } else {
          setVehicleLookupError(`Error: ${error.response.status} - ${error.response.statusText}`);
        }
      } else {
        setVehicleLookupError("An unexpected error occurred while fetching vehicle details.");
      }
    } finally {
      setIsFetchingVehicle(false);
    }
  };


  return (
    <div className="space-y-8 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
      {step === 1 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vehicle Lookup & Plan Selection Card */}
            <Card className="rounded-lg shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center text-insurance-primary">Find Your Vehicle & Choose Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Vehicle Registration Input */}
                <div>
                  <Label htmlFor="registrationNumber" className="text-lg font-medium">Vehicle Registration Number</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      id="registrationNumber"
                      placeholder="e.g., KA01AB1234"
                      value={registrationInput}
                      onChange={(e) => setRegistrationInput(e.target.value)}
                      className="p-3 rounded-md border border-gray-300 focus:ring-insurance-primary focus:border-insurance-primary flex-grow"
                    />
                    <Button
                      onClick={handleFetchVehicleDetails}
                      disabled={isFetchingVehicle}
                      className="bg-insurance-primary hover:bg-insurance-dark text-white text-lg font-semibold py-3 rounded-md transition duration-300"
                    >
                      {isFetchingVehicle ? "Searching..." : <Search className="h-5 w-5" />}
                    </Button>
                  </div>
                  {vehicleLookupError && (
                    <p className="text-red-500 text-sm mt-2">{vehicleLookupError}</p>
                  )}
                </div>

                {/* Display Fetched Vehicle Details if available */}
                {fetchedVehicleData && (
                  <div className="mt-6 p-4 border border-green-200 bg-green-50 rounded-md">
                    <h4 className="text-lg font-semibold text-green-700 mb-2">Vehicle Details Found:</h4>
                    <p><strong>Registration Number:</strong> {fetchedVehicleData.registrationNumber}</p>
                    <p><strong>Make:</strong> {fetchedVehicleData.make}</p>
                    <p><strong>Model:</strong> {fetchedVehicleData.model}</p>
                    <p><strong>Year:</strong> {fetchedVehicleData.year}</p>
                    <p><strong>Fuel Type:</strong> {fetchedVehicleData.fuelType}</p>
                    <p><strong>Chassis Number:</strong> {fetchedVehicleData.chassisNumber}</p>
                    <p><strong>Engine Number:</strong> {fetchedVehicleData.engineNumber}</p>
                  </div>
                )}

                {/* Motor Plan Selection - Only show if vehicle details are fetched */}
                {fetchedVehicleData && (
                  <div className="mt-8">
                      <h3 className="text-2xl font-bold text-center text-insurance-dark mb-6">Choose Your Plan</h3>
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                          {motorPlans.map((plan) => (
                              <Card
                                  key={plan.id}
                                  className={`rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                                      selectedPlan?.id === plan.id
                                          ? "ring-4 ring-insurance-primary shadow-lg"
                                          : "border border-gray-200 hover:shadow-md"
                                  }`}
                                  onClick={() => setSelectedPlan(plan)}
                              >
                                  <CardHeader className="p-0 pb-3 flex flex-row items-center justify-between">
                                      <CardTitle className="text-2xl font-bold text-insurance-primary">
                                          {plan.name}
                                      </CardTitle>
                                      {plan.popular && (
                                          <Badge className="bg-green-500 text-white px-3 py-1 text-sm rounded-full">Popular</Badge>
                                      )}
                                      {selectedPlan?.id === plan.id && (
                                        <CheckCircle className="h-6 w-6 text-green-500 ml-2" />
                                      )}
                                  </CardHeader>
                                  <CardDescription className="text-lg text-muted-foreground mb-4">
                                      {plan.coverage} Sum Insured
                                  </CardDescription>
                                  <CardContent className="p-0">
                                      <p className="text-4xl font-extrabold text-gray-900 mb-4">{plan.price}<span className="text-base font-normal text-muted-foreground">/year</span></p>
                                      <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
                                          {plan.features.map((feature, idx) => (
                                              <li key={idx}>{feature}</li>
                                          ))}
                                      </ul>
                                  </CardContent>
                              </Card>
                          ))}
                      </div>
                  </div>
                )}

                <div className="text-center mt-4">
                    {!fetchedVehicleData && (
                        <p className="text-gray-600 text-sm mb-2">Please search for your vehicle details above.</p>
                    )}
                    {fetchedVehicleData && !selectedPlan && (
                        <p className="text-gray-600 text-sm mb-2">Please select a motor insurance plan.</p>
                    )}
                </div>

                <Button
                  onClick={() => {
                    if (!fetchedVehicleData) {
                      alert("Please fetch your vehicle details first.");
                      return;
                    }
                    if (!selectedPlan) {
                      alert("Please select a motor insurance plan.");
                      return;
                    }
                    setStep(2); // Move to Personal Info step
                  }}
                  disabled={!fetchedVehicleData || !selectedPlan}
                  className="w-full bg-insurance-primary hover:bg-insurance-dark text-white text-lg font-semibold py-3 rounded-md transition duration-300"
                >
                  Proceed to Personal Details
                </Button>
              </CardContent>
            </Card>

            {/* Why Choose Us Features */}
            <div className="space-y-8 p-4">
              <h3 className="text-4xl font-extrabold text-insurance-dark mb-6">Why Choose Our Motor Insurance?</h3>
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-5 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex-shrink-0 p-3 bg-insurance-light rounded-full">{feature.icon}</div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-base">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {step === 2 && (
        <MotorPersonalInfo
          personalFormData={personalFormData} // Pass personal details separately
          setPersonalFormData={setPersonalFormData}
          fetchedVehicle={fetchedVehicleData} // Pass fetched vehicle details
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {step === 3 && (
        <MotorReviewStep
          personalFormData={personalFormData}
          fetchedVehicle={fetchedVehicleData} // Pass fetched vehicle details to review
          selectedPlan={selectedPlan}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {step === 4 && (
        <MotorConfirmationStep
          resetForm={resetForm}
        />
      )}
    </div>
  );
};

export default MotorInsuranceContent;
