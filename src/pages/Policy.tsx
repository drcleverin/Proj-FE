
// // src/components/Policy.tsx
// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Chatbot from "@/components/Chatbot";
// import ProcessFlow from "@/components/ProcessFlow";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import {
//   Car,
//   Shield,
//   Wrench,
//   Users,
//   Smartphone,
//   Laptop,
//   Home,
//   Camera,
//   Check,
//   Star,
// } from "lucide-react";

// const Policy = () => {
//   const [searchParams] = useSearchParams();
//   const initialType = searchParams.get("type") || "";
//   const [selectedPolicy, setSelectedPolicy] = useState<string>(initialType);

//   const [userId,setUserId] = useState<string | null>(null);
//   // Removed showHealthApplication, as HealthInsuranceContent will manage its own visibility of internal steps
//   const [currentOverallStep, setCurrentOverallStep] = useState(1); // Renamed for clarity to avoid confusion with internal steps
//   const navigate = useNavigate();

//   useEffect(() => {
//     const typeParam = searchParams.get("type");
//     if (typeParam && typeParam !== selectedPolicy) {
//       setSelectedPolicy(typeParam);
//       // When policy type changes, reset overall step to 1 (Select Policy Type) or 2 (Premium/Application start)
//       // Depending on if "Premium" is considered the first step of a chosen policy's flow.
//       // For now, let's assume selecting a policy type immediately moves to its "Premium/Application" phase (overall step 2).
//       setCurrentOverallStep(2);
//     } else if (!typeParam && selectedPolicy) {
//       // If no type param, but a policy is selected (e.g., initial load without type), assume step 2
//       setCurrentOverallStep(2);
//     } else if (!typeParam && !selectedPolicy) {
//       // If no type param and no policy selected, stay at step 1
//       setCurrentOverallStep(1);
//     }
//   }, [searchParams, selectedPolicy]);

//   const policyTypes = [
//     {
//       id: "motor",
//       title: "Motor Insurance",
//       description:
//         "Complete protection for your car and bike. Get comprehensive coverage for vehicle damage, third-party liability, and personal accident benefits.",
//       features: [
//         "Comprehensive Coverage",
//         "Third-Party Liability",
//         "Personal Accident Cover",
//         "24/7 Roadside Assistance",
//       ],
//       icon: "🚗",
//     },
//     {
//       id: "health",
//       title: "Health Insurance",
//       description:
//         "Comprehensive health coverage for individuals and families. Protect yourself and your loved ones against unexpected medical expenses.",
//       features: [
//         "Cashless Treatment",
//         "Family Floater Options",
//         "Pre & Post Hospitalization",
//         "Critical Illness Cover",
//       ],
//       icon: "💊",
//     },
//     {
//       id: "product",
//       title: "Product Insurance",
//       description:
//         "Extended warranty for electronics and appliances. Protect your valuable gadgets against damage, theft, or technical failures.",
//       features: [
//         "Extended Warranty",
//         "Accidental Damage",
//         "Theft Protection",
//         "Technical Support",
//       ],
//       icon: "📺",
//     },
//   ];

//   // The overall steps for the entire policy purchase process
//   const overallProcessSteps = [
//     "Select Policy Type",
//     "Application Details",
//     "Review & Payment",
//     "Confirmation",
//   ];

//   const handlePolicySelect = (policyId: string) => {
//     setSelectedPolicy(policyId);
//     // When a policy is selected, move to the "Application Details" step (overall step 2)
//     setCurrentOverallStep(2);
//     const newUrl = new URL(window.location.href);
//     newUrl.searchParams.set("type", policyId);
//     window.history.pushState({}, "", newUrl);
//   };

 

//   // MotorInsuranceContent remains as is (or with its own internal steps as implemented)
//   const MotorInsuranceContent = () => {
//     const [formData, setFormData] = useState({
//       registrationNumber: "",
//       model: "",
//       typeOfVehicle: "", // New: type of vehicle
//       chassisNumber: "", // New: chassis number
//       engineNumber: "", // New: engine number
//       makeYear: "", // New: manufacturing year
//       fuelType: "", // New: fuel type
//       ownerFirstName: "", // New: owner's first name
//       ownerLastName: "", // New: owner's last name
//       ownerEmail: "", // New: owner's email
//     });
//     const [showMotorPlans, setShowMotorPlans] = useState(false);
//     const [selectedPlanLocal, setSelectedPlanLocal] = useState<string | null>(
//       null
//     );
//     const [internalMotorStep, setInternalMotorStep] = useState(1); // 1: Quote form, 2: Plans, 3: Personal Info, 4: Review, 5: Confirmation

//     const motorPlans = [
//       {
//         id: "third-party",
//         name: "Third Party Liability",
//         price: "₹2,500",
//         coverage: "As per IRDAI",
//         features: [
//           "Mandatory as per Indian law",
//           "Covers damages to third-party property",
//           "Covers bodily injury/death to third-party",
//           "Legal liabilities covered",
//         ],
//         popular: false,
//       },
//       {
//         id: "comprehensive",
//         name: "Comprehensive Motor Plan",
//         price: "₹8,000",
//         coverage: "IDV based",
//         features: [
//           "Own damage cover",
//           "Third-party liability",
//           "Theft protection",
//           "Natural disaster protection (flood, earthquake etc.)",
//           "Man-made disaster protection (riot, strike etc.)",
//           "Fire and explosion cover",
//         ],
//         popular: true,
//       },
//       {
//         id: "zero-depreciation",
//         name: "Zero Depreciation Add-on",
//         price: "₹10,500",
//         coverage: "Full Claim Value",
//         features: [
//           "No depreciation deduction on parts during claim",
//           "Higher claim settlement amount",
//           "Ideal for new cars",
//           "Covers plastic, fiber, and metal parts",
//           "Usually an add-on to comprehensive plan",
//         ],
//         popular: false,
//       },
//     ];

//     const fetchDetails = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:8093/admin/policies/list"
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log("Fetched policies (no JWT needed):", data);

//         const dummyVehicleDetails = {
//           typeOfVehicle: "4 Wheeler",
//           chassisNumber: "CHASABC123DEF456",
//           engineNumber: "ENGXYZ789UVW012",
//           makeYear: "2022",
//           fuelType: "Petrol",
//           ownerFirstName: "Jane",
//           ownerLastName: "Doe",
//           ownerEmail: "jane.doe@example.com",
//         };

//         setFormData((prev) => ({
//           ...prev,
//           ...dummyVehicleDetails,
//         }));

//         alert(
//           "Policies fetched successfully from backend! Displaying example plans."
//         );
//         setShowMotorPlans(true);
//         setInternalMotorStep(2); // Move to plans step
//       } catch (error) {
//         console.error("Error fetching details:", error);
//         alert(
//           "Error fetching policies. Is backend running? Displaying example plans anyway."
//         );
//         setShowMotorPlans(true);
//         setInternalMotorStep(2); // Move to plans step even on error for demo
//       }
//     };

//     const handleInputChange = (
//       e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//     ) => {
//       const { id, value } = e.target;
//       setFormData((prev) => ({ ...prev, [id]: value }));
//     };

//     const handleSelectChange = (value: string, id: string) => {
//       setFormData((prev) => ({ ...prev, [id]: value }));
//     };

//     const handleChoosePlan = (planId: string) => {
//       setSelectedPlanLocal(planId);
//       setInternalMotorStep(3); // Move to personal information step
//     };

//     const handleNextInternalStep = () => {
//       setInternalMotorStep((prevStep) => prevStep + 1);
//       if (internalMotorStep === 5) {
//         // If moving from Review to Confirmation
//         setCurrentOverallStep(4); // Update overall step to Confirmation
//       }
//     };

//     const handlePreviousInternalStep = () => {
//       setInternalMotorStep((prevStep) => prevStep - 1);
//       if (internalMotorStep === 2) {
//         // If going back from Plans to Quote
//         setShowMotorPlans(false);
//       }
//     };

//     const features = [
//       {
//         icon: <Shield className="h-8 w-8 text-insurance-primary" />,
//         title: "Comprehensive Coverage",
//         description:
//           "Protection against accidents, theft, and natural disasters",
//       },
//       {
//         icon: <Wrench className="h-8 w-8 text-insurance-primary" />,
//         title: "Cashless Repairs",
//         description: "Network of 4000+ authorized garages across India",
//       },
//       {
//         icon: <Users className="h-8 w-8 text-insurance-primary" />,
//         title: "24/7 Roadside Assistance",
//         description: "Emergency support wherever you are",
//       },
//       {
//         icon: <Car className="h-8 w-8 text-insurance-primary" />,
//         title: "Zero Depreciation",
//         description: "Get full claim amount without depreciation",
//       },
//     ];

//     if (showMotorPlans && internalMotorStep >= 2) {
//       return (
//         <div className="space-y-8">
//           {/* Step 2: Display Motor Insurance Plans */}
//           {internalMotorStep === 2 && (
//             <>
//               <h3 className="text-2xl font-bold text-center">
//                 Choose Your Motor Insurance Plan
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {motorPlans.map((plan) => (
//                   <Card
//                     key={plan.id}
//                     className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
//                       selectedPlanLocal === plan.id
//                         ? "ring-2 ring-insurance-primary shadow-lg"
//                         : ""
//                     }`}
//                     onClick={() => setSelectedPlanLocal(plan.id)}
//                   >
//                     {plan.popular && (
//                       <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//                         <Badge className="bg-insurance-primary text-white px-4 py-1 shadow-lg">
//                           <Star className="h-3 w-3 mr-1" />
//                           Most Popular
//                         </Badge>
//                       </div>
//                     )}

//                     <CardHeader className="text-center">
//                       <CardTitle className="text-xl">{plan.name}</CardTitle>
//                       <div className="text-3xl font-bold text-insurance-primary">
//                         {plan.price}
//                       </div>
//                       <p className="text-muted-foreground">
//                         per year (approx.)
//                       </p>
//                       <div className="text-lg font-semibold">
//                         Coverage: {plan.coverage}
//                       </div>
//                     </CardHeader>

//                     <CardContent>
//                       <ul className="space-y-3 mb-6">
//                         {plan.features.map((feature, index) => (
//                           <li key={index} className="flex items-center">
//                             <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
//                             <span className="text-sm">{feature}</span>
//                           </li>
//                         ))}
//                       </ul>

//                       <Button
//                         className={`w-full transition-all duration-300 ${
//                           plan.popular
//                             ? "bg-insurance-primary hover:bg-insurance-dark shadow-lg hover:shadow-xl"
//                             : "bg-gray-700 hover:bg-gray-800"
//                         }`}
//                         onClick={() => handleChoosePlan(plan.id)}
//                       >
//                         Choose Plan
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* Step 3: Personal Information - Updated with more vehicle details */}
//           {internalMotorStep === 3 && (
//             <Card className="shadow-lg">
//               <CardHeader>
//                 <CardTitle>Your Vehicle & Personal Details</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="registrationNumber">
//                       Registration Number
//                     </Label>
//                     <Input
//                       id="registrationNumber"
//                       placeholder="e.g., KA01AB1234"
//                       value={formData.registrationNumber}
//                       onChange={handleInputChange}
//                       readOnly // Often read-only if fetched
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="model">Vehicle Model</Label>
//                     <Input
//                       id="model"
//                       placeholder="e.g., Maruti Swift"
//                       value={formData.model}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>

//                 {/* New Vehicle Details: Type, Chassis, Engine */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="typeOfVehicle">Type of Vehicle</Label>
//                     <Select
//                       onValueChange={(value) =>
//                         handleSelectChange(value, "typeOfVehicle")
//                       }
//                       value={formData.typeOfVehicle}
//                     >
//                       <SelectTrigger id="typeOfVehicle">
//                         <SelectValue placeholder="Select vehicle type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="2 wheeler">2 Wheeler</SelectItem>
//                         <SelectItem value="4 wheeler">4 Wheeler</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <Label htmlFor="chassisNumber">Chassis Number</Label>
//                     <Input
//                       id="chassisNumber"
//                       placeholder="Enter chassis number"
//                       value={formData.chassisNumber}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="engineNumber">Engine Number</Label>
//                     <Input
//                       id="engineNumber"
//                       placeholder="Enter engine number"
//                       value={formData.engineNumber}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="makeYear">Manufacturing Year</Label>
//                     <Input
//                       id="makeYear"
//                       type="number"
//                       placeholder="e.g., 2020"
//                       value={formData.makeYear}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <Label htmlFor="fuelType">Fuel Type</Label>
//                   <Select
//                     onValueChange={(value) =>
//                       handleSelectChange(value, "fuelType")
//                     }
//                     value={formData.fuelType}
//                   >
//                     <SelectTrigger id="fuelType">
//                       <SelectValue placeholder="Select fuel type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="petrol">Petrol</SelectItem>
//                       <SelectItem value="diesel">Diesel</SelectItem>
//                       <SelectItem value="electric">Electric</SelectItem>
//                       <SelectItem value="cng">CNG/LPG</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 {/* Personal Details */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="ownerFirstName">Owner's First Name</Label>
//                     <Input
//                       id="ownerFirstName"
//                       placeholder="Enter owner's first name"
//                       value={formData.ownerFirstName}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="ownerLastName">Owner's Last Name</Label>
//                     <Input
//                       id="ownerLastName"
//                       placeholder="Enter owner's last name"
//                       value={formData.ownerLastName}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <Label htmlFor="ownerEmail">Email</Label>
//                   <Input
//                     id="ownerEmail"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={formData.ownerEmail}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="flex space-x-4 pt-4">
//                   <Button
//                     variant="outline"
//                     className="flex-1"
//                     onClick={handlePreviousInternalStep}
//                   >
//                     Back to Plans
//                   </Button>
//                   <Button
//                     className="flex-1 bg-insurance-primary hover:bg-insurance-dark"
//                     onClick={handleNextInternalStep}
//                   >
//                     Continue to Review
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Step 4: Review Your Application */}
//           {internalMotorStep === 4 && (
//             <Card className="shadow-lg">
//               <CardHeader>
//                 <CardTitle>Review Your Motor Insurance Application</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="bg-muted/50 p-4 rounded-lg">
//                   <h3 className="font-semibold mb-2">Selected Plan</h3>
//                   {selectedPlanLocal && (
//                     <p className="text-insurance-primary font-bold">
//                       {motorPlans.find((p) => p.id === selectedPlanLocal)?.name}{" "}
//                       -{" "}
//                       {
//                         motorPlans.find((p) => p.id === selectedPlanLocal)
//                           ?.price
//                       }
//                       /year
//                     </p>
//                   )}
//                   <p className="text-sm text-muted-foreground">
//                     Coverage:{" "}
//                     {
//                       motorPlans.find((p) => p.id === selectedPlanLocal)
//                         ?.coverage
//                     }
//                   </p>
//                 </div>

//                 <div className="space-y-4">
//                   <h3 className="font-semibold">Vehicle Details</h3>
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <span className="text-muted-foreground">
//                         Registration Number:
//                       </span>
//                       <p>{formData.registrationNumber}</p>
//                     </div>
//                     <div>
//                       <span className="text-muted-foreground">
//                         Vehicle Model:
//                       </span>
//                       <p>{formData.model}</p>
//                     </div>
//                     <div>
//                       <span className="text-muted-foreground">
//                         Type of Vehicle:
//                       </span>
//                       <p>{formData.typeOfVehicle}</p>
//                     </div>
//                     <div>
//                       <span className="text-muted-foreground">
//                         Chassis Number:
//                       </span>
//                       <p>{formData.chassisNumber}</p>
//                     </div>
//                     <div>
//                       <span className="text-muted-foreground">
//                         Engine Number:
//                       </span>
//                       <p>{formData.engineNumber}</p>
//                     </div>
//                     <div>
//                       <span className="text-muted-foreground">
//                         Manufacturing Year:
//                       </span>
//                       <p>{formData.makeYear}</p>
//                     </div>
//                     <div>
//                       <span className="text-muted-foreground">Fuel Type:</span>
//                       <p>{formData.fuelType}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <h3 className="font-semibold">Owner's Details</h3>
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <span className="text-muted-foreground">Name:</span>
//                       <p>
//                         {formData.ownerFirstName} {formData.ownerLastName}
//                       </p>
//                     </div>
//                     <div>
//                       <span className="text-muted-foreground">Email:</span>
//                       <p>{formData.ownerEmail}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex space-x-4 pt-4">
//                   <Button
//                     variant="outline"
//                     className="flex-1"
//                     onClick={handlePreviousInternalStep}
//                   >
//                     Back to Edit
//                   </Button>
//                   <Button
//                     className="flex-1 bg-insurance-primary hover:bg-insurance-dark"
//                     onClick={handleNextInternalStep} // This will move to Step 5 (Confirmation)
//                   >
//                     Confirm & Pay
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Step 5: Application Submitted Confirmation */}
//           {internalMotorStep === 5 && (
//             <Card className="shadow-lg">
//               <CardContent className="text-center py-12">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Check className="h-8 w-8 text-green-600" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-foreground mb-2">
//                   Application Submitted!
//                 </h2>
//                 <p className="text-muted-foreground mb-6">
//                   Your motor insurance policy application has been received and
//                   is being processed.
//                 </p>
//                 <Button className="bg-insurance-primary hover:bg-insurance-dark">
//                   Go to Dashboard
//                 </Button>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       );
//     }

//     // Initial state: Show "Get Instant Quote" form and features
//     return (
//       <div className="space-y-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <Card>
//             <CardHeader>
//               <CardTitle>Get Instant Quote</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Registration Number
//                 </label>
//                 <Input
//                   placeholder="e.g., KA01AB1234"
//                   value={formData.registrationNumber}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       registrationNumber: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Vehicle Model (Optional)
//                 </label>
//                 <Input
//                   placeholder="e.g., Maruti Swift, Honda City"
//                   value={formData.model}
//                   onChange={(e) =>
//                     setFormData({ ...formData, model: e.target.value })
//                   }
//                 />
//               </div>

//               <Button
//                 className="w-full bg-insurance-primary hover:bg-insurance-dark"
//                 onClick={fetchDetails}
//               >
//                 Get Quote
//               </Button>
//             </CardContent>
//           </Card>

//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold">
//               Why Choose Our Motor Insurance?
//             </h3>
//             {features.map((feature, index) => (
//               <div key={index} className="flex items-start space-x-4">
//                 <div className="flex-shrink-0">{feature.icon}</div>
//                 <div>
//                   <h4 className="font-semibold mb-1">{feature.title}</h4>
//                   <p className="text-muted-foreground">{feature.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <Card>
//           <CardContent className="p-8">
//             <h3 className="text-2xl font-bold text-center mb-8">
//               Coverage Options
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Third Party</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-muted-foreground mb-4">
//                     Basic coverage as per law
//                   </p>
//                   <ul className="space-y-2 text-sm">
//                     <li>• Third party liability</li>
//                     <li>• Personal accident cover</li>
//                     <li>• Legal compliance</li>
//                   </ul>
//                 </CardContent>
//               </Card>

//               <Card className="ring-2 ring-insurance-primary">
//                 <CardHeader>
//                   <CardTitle>Comprehensive</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-muted-foreground mb-4">
//                     Complete protection
//                   </p>
//                   <ul className="space-y-2 text-sm">
//                     <li>• Own damage cover</li>
//                     <li>• Third party liability</li>
//                     <li>• Theft protection</li>
//                     <li>• Natural disasters</li>
//                   </ul>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Zero Depreciation</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-muted-foreground mb-4">
//                     Maximum claim amount
//                   </p>
//                   <ul className="space-y-2 text-sm">
//                     <li>• No depreciation on parts</li>
//                     <li>• Full claim settlement</li>
//                     <li>• Premium coverage</li>
//                   </ul>
//                 </CardContent>
//               </Card>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   };

//   interface HealthInsuranceContentProps {
//     onApplicationComplete: () => void;
//     // Add a prop for the progress bar if the parent controls it,
//     // or remove it if HealthInsuranceContent manages its own progress display.
//     // For now, assuming internal management for simplicity as per your current structure.
//     currentOverallStep?: number; // Optional: If parent needs to influence internal display
//     totalOverallSteps?: number; // Optional: For a global progress bar
//   }

//   // const HealthInsuranceContent = ({
//   //   onApplicationComplete,
//   // }: HealthInsuranceContentProps) => {
//   //   // Internal state for health application steps (1: Plans, 2: Personal Info, 3: Review, 4: Confirmation)
//   //   const [internalHealthStep, setInternalHealthStep] = useState(1);
//   //   console.log("Internal Health Step:", internalHealthStep);
//   //   // State for health plan selection
//   //   const location = useLocation();
    



//   //   useEffect(() => {
//   //     const params = new URLSearchParams(location.search);
//   //     const type = params.get("type");
//   //     setSelectedPolicyType(type);
//   //     console.log("Selected Policy Type:", type);
    
//   //     // const x = localStorage.getItem("user");
//   //     // console.log("Fetching user ID for:",x)

//   //     const userString = localStorage.getItem("user");
//   //     let username;
//   //     if (userString) {
//   //       try {
//   //         const user = JSON.parse(userString);
//   //         username = user.username;
//   //         console.log("Username is:", username);
//   //       } catch (error) {
//   //         console.error("Error parsing user object from localStorage:", error);
//   //       }
//   //     } else {
//   //       console.warn("No user found in localStorage.");
//   //     }


//   //     fetch(`http://localhost:8093/api/user-role/id-by-username/${username}`)
//   //       .then((res) => {
//   //         if (!res.ok) throw new Error("Failed to fetch user details");
//   //         return res.json();
//   //       })
//   //       .then((data) => {
//   //         console.log("Fetched user ID:", data);
//   //         setUserId(data.userId); // assuming you have setUserId in your state
//   //       })
//   //       .catch((err) => console.error("Error fetching user ID:", err));
//   //   }, []);

//   //   fetch(`http://localhost:8093/api/personal-details/user/${userId}`)
//   //       .then((res) => {
//   //         if (!res.ok) throw new Error("Failed to fetch user details");
//   //         return res.json();
//   //       })
//   //       .then((data) => {
//   //         console.log("Fetched user ID:", data);
//   //         // setUserId(data.userId); // assuming you have setUserId in your state
          
//   //       })
//   //       .catch((err) => console.error("Error fetching user ID:", err));
//   //   }, []);
    

  
//   interface HealthInsuranceContentProps {
//     onApplicationComplete: () => void;
//     currentOverallStep?: number;
//     totalOverallSteps?: number;
//   }
  
//   const HealthInsuranceContent = ({
//     onApplicationComplete,
//     currentOverallStep,
//     totalOverallSteps,
//   }: HealthInsuranceContentProps) => {
//     // Internal state for health application steps (1: Policy Type, 2: Plans, 3: Personal Info, 4: Review, 5: Confirmation)
//     const [internalHealthStep, setInternalHealthStep] = useState(1);
  
//     // State for policy type selection
//     const [selectedPolicyType, setSelectedPolicyType] = useState<string | null>(null);
  
//     // State for selected health plan
//     const [selectedHealthPlan, setSelectedHealthPlan] = useState<any | null>(null); // Replace 'any' with actual plan interface
  
//     // State for user ID
//     const [userId, setUserId] = useState<string | null>(null);
  
//     // State variables for personal details
//     const [firstName, setFirstName] = useState<string>("");
//     const [lastName, setLastName] = useState<string>("");
//     const [email, setEmail] = useState<string>("");
//     const [phone, setPhone] = useState<string>("");
//     const [dob, setDob] = useState<string>(""); // Date in "YYYY-MM-DD" format
//     const [gender, setGender] = useState<string>("");
//     const [address, setAddress] = useState<string>("");
//     const [city, setCity] = useState<string>("");
//     const [pincode, setPincode] = useState<string>("");
  
//     const location = useLocation();
  
//     // Effect to parse URL params and fetch user ID
//     useEffect(() => {
//       const params = new URLSearchParams(location.search);
//       const type = params.get("type");
//       setSelectedPolicyType(type);
//       console.log("Selected Policy Type from URL:", type);
  
//       const userString = localStorage.getItem("user");
//       let username: string | undefined;
  
//       if (userString) {
//         try {
//           const user = JSON.parse(userString);
//           username = user.username;
//           console.log("Username from localStorage:", username);
//         } catch (error) {
//           console.error("Error parsing user object from localStorage:", error);
//         }
//       } else {
//         console.warn("No user found in localStorage.");
//       }
  
//       if (username) {
//         fetch(`http://localhost:8093/api/user-role/id-by-username/${username}`)
//           .then((res) => {
//             if (!res.ok) {
//               throw new Error(`Failed to fetch user ID: ${res.statusText}`);
//             }
//             return res.json();
//           })
//           .then((data) => {
//             console.log("Fetched user ID:", data.userId);
//             setUserId(data.userId);
//           })
//           .catch((err) => console.error("Error fetching user ID:", err));
//       }
//     }, [location.search]);
  
//     // Effect to fetch personal details once userId is available
//     useEffect(() => {
//       if (userId) {
//         fetch(`http://localhost:8093/api/personal-details/user/${userId}`)
//           .then((res) => {
//             if (!res.ok) {
//               if (res.status === 404) {
//                 console.log("No personal details found for this user. Will use form data.");
//                 return null; // Return null to indicate no data found
//               }
//               throw new Error(`Failed to fetch personal details: ${res.statusText}`);
//             }
//             return res.json();
//           })
//           .then((data) => {
//             if (data) {
//               console.log("Fetched personal details:", data);
//               setFirstName(data.firstName || "");
//               setLastName(data.lastName || "");
//               setEmail(data.email || "");
//               setPhone(data.phone || "");
//               setDob(data.dob || "");
//               setGender(data.gender || "");
//               setAddress(data.address || "");
//               setCity(data.city || "");
//               setPincode(data.pincode || "");
//             }
//           })
//           .catch((err) => console.error("Error fetching personal details:", err));
//       }
//     }, [userId]); // Re-run when userId changes
  
//     // Handlers for navigation
//     const goToNextStep = () => {
//       setInternalHealthStep((prev) => prev + 1);
//     };
  
//     const goToPreviousStep = () => {
//       setInternalHealthStep((prev) => prev - 1);
//     };
  
//     const handlePersonalInfoSubmit = (details: {
//       firstName: string;
//       lastName: string;
//       email: string;
//       phone: string;
//       dob: string;
//       gender: string;
//       address: string;
//       city: string;
//       pincode: string;
//     }) => {
//       setFirstName(details.firstName);
//       setLastName(details.lastName);
//       setEmail(details.email);
//       setPhone(details.phone);
//       setDob(details.dob);
//       setGender(details.gender);
//       setAddress(details.address);
//       setCity(details.city);
//       setPincode(details.pincode);
//       goToNextStep();
//     };
  
//     const handleApplicationSubmission = () => {
//       // Here you would typically send all collected data to your backend
//       // For demonstration, we'll just complete the application
//       console.log("Submitting application with the following data:");
//       console.log("Policy Type:", selectedPolicyType);
//       console.log("Selected Health Plan:", selectedHealthPlan);
//       console.log("Personal Details:", {
//         firstName,
//         lastName,
//         email,
//         phone,
//         dob,
//         gender,
//         address,
//         city,
//         pincode,
//       });
//       // Call the parent's onApplicationComplete to signal completion
//       onApplicationComplete();
//       goToNextStep(); // Move to the confirmation step
//     };
  
//     const currentStepProgress = internalHealthStep;
//     const totalSteps = 5; // Policy Type, Plans, Personal Info, Review, Confirmation
  
//     return (
//       <div className="health-insurance-content">
//         <ProgressBar currentStep={currentStepProgress} totalSteps={totalSteps} />
  
//         {internalHealthStep === 1 && (
//           <PolicyTypeSelection
//             onSelectPolicyType={(type) => {
//               setSelectedPolicyType(type);
//               goToNextStep();
//             }}
//             initialPolicyType={selectedPolicyType} // Pass initial value from URL if available
//           />
//         )}
  
//         {internalHealthStep === 2 && (
//           <HealthPlanSelection
//             selectedPolicyType={selectedPolicyType}
//             onSelectPlan={(plan) => {
//               setSelectedHealthPlan(plan);
//               goToNextStep();
//             }}
//             onBack={goToPreviousStep}
//           />
//         )}
  
//         {internalHealthStep === 3 && (
//           <PersonalInfoForm
//             initialData={{
//               firstName,
//               lastName,
//               email,
//               phone,
//               dob,
//               gender,
//               address,
//               city,
//               pincode,
//             }}
//             onSubmit={handlePersonalInfoSubmit}
//             onBack={goToPreviousStep}
//           />
//         )}
  
//         {internalHealthStep === 4 && (
//           <ReviewApplication
//             policyType={selectedPolicyType}
//             healthPlan={selectedHealthPlan}
//             personalDetails={{
//               firstName,
//               lastName,
//               email,
//               phone,
//               dob,
//               gender,
//               address,
//               city,
//               pincode,
//             }}
//             onSubmit={handleApplicationSubmission}
//             onBack={goToPreviousStep}
//           />
//         )}
  
//         {internalHealthStep === 5 && (
//           <Confirmation
//             onNavigateHome={onApplicationComplete} // Assuming this navigates to a home or dashboard
//           />
//         )}
//       </div>
//     );
//   };
  

//     const [selectedPlanLocal, setSelectedPlanLocal] = useState<string | null>(
//       null
//     );

//     const [selectedPolicyType, setSelectedPolicyType] = useState<string | null>(
//       null
//     );

//     // --- State variables for all form inputs ---
//     const [firstName, setFirstName] = useState<string>("");
//     const [lastName, setLastName] = useState<string>("");
//     const [email, setEmail] = useState<string>("");
//     const [phone, setPhone] = useState<string>("");
//     const [dob, setDob] = useState<string>(""); // Date in "YYYY-MM-DD" format
//     const [gender, setGender] = useState<string>("");
//     const [address, setAddress] = useState<string>("");
//     const [city, setCity] = useState<string>("");
//     const [pincode, setPincode] = useState<string>("");

//     const [detailsExists, setDetailsExists] = useState<boolean>(false);

//     // --- State for optional fields if you decide to use them ---
//     const [familyMembers, setFamilyMembers] = useState<string>("");
//     const [sumInsured, setSumInsured] = useState<string>("");

//     const healthPlans = [
//       {
//         id: "individual",
//         name: "Individual Health Plan",
//         price: "₹3,500",
//         coverage: "₹5,00,000",
//         features: [
//           "Individual coverage",
//           "Pre & Post hospitalization",
//           "Day care procedures",
//           "Ambulance charges",
//           "Annual health check-up",
//         ],
//         popular: false,
//       },
//       {
//         id: "family",
//         name: "Family Floater Plan",
//         price: "₹8,500",
//         coverage: "₹10,00,000",
//         features: [
//           "Covers entire family",
//           "Shared sum insured",
//           "Maternity coverage",
//           "Child vaccination",
//           "Critical illness cover",
//           "Worldwide emergency",
//         ],
//         popular: true,
//       },
//       {
//         id: "senior",
//         name: "Senior Citizen Plan",
//         price: "₹12,000",
//         coverage: "₹7,00,000",
//         features: [
//           "Age up to 80 years",
//           "No medical check-up",
//           "Pre-existing diseases covered",
//           "Home nursing",
//           "Ayurveda treatment",
//         ],
//         popular: false,
//       },
//     ];

//     // Function to find the selected plan details
//     const getSelectedPlanDetails = () => {
//       return healthPlans.find((plan) => plan.id === selectedPlanLocal);
//     };

//     // Combined data object for review or submission
//     const formData = {
//       selectedPlan: getSelectedPlanDetails(),
//       firstName,
//       lastName,
//       email,
//       phone,
//       dob,
//       gender,
//       address,
//       city,
//       pincode,
//       familyMembers,
//       sumInsured,
//     };

//     console.log(userId);
    

//     // Internal step navigation for Health Insurance
//     // const handleNextInternalHealthStep = () => {

//     //   setInternalHealthStep((prevStep) => {
//     //     const nextStep = prevStep + 1;
//     //     // If we've reached the final confirmation step within Health (step 4),
//     //     // notify the parent Policy component.
//     //     if (nextStep === 5) {
//     //       onApplicationComplete();
//     //     }
        
//     //     return nextStep;
//     //   });
//     // };

//     // const handlePreviousInternalHealthStep = () => {
//     //   setInternalHealthStep((prevStep) => prevStep - 1);
//     // };
    
    

//     const SubmitForm = async () => {
//       const data = {
//         userId: userId,
//         // policyType: selectedPolicyType,
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         phoneNumber: phone,
//         dateOfBirth: dob,
//       }
//       // Replace with your backend API URL
//       console.log("Submitting data before api:", data);
//       const apiUrl = 'http://localhost:8093/api/personal-details/save';
  
//       try {
//           const response = await fetch(apiUrl, {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//                   // Add any authentication headers if required, e.g., 'Authorization': 'Bearer YOUR_TOKEN'
//               },
//               body: JSON.stringify(data)
//           });
  
//           if (!response.ok) {
//               const errorText = await response.text();
//               console.error('Failed to save personal details:', response.status, errorText);
//               alert(`Error: ${response.status} - ${errorText}`);
//               return null;
//           }
  
//           const responseData = await response.json();
//           console.log('Personal details saved successfully:', responseData);
//           alert('Personal details saved successfully!');
//           setDetailsExists(true); // Set this to true to indicate details are saved
//           return responseData;
  
//       } catch (error) {
//           console.error('Error sending personal details............:', error);
//           alert('An unexpected error occurred while sending data.');
//           return null;
//       }
//   };

//     // Helper to calculate progress for an internal progress bar
//     // If you have a separate ProgressBar component, you can pass this value to it.
//     const calculateProgress = () => {
//       const totalSteps = 4; // Plans, Personal Info, Review, Confirmation
//       return (internalHealthStep / totalSteps) * 100;
//     };

//     return (
//       <div className="space-y-8">
//         {/* Optional: Internal Progress Bar for Health Insurance */}
//         {/* You'll need to define or import a ProgressBar component */}
//         {/* Example: <ProgressBar progress={calculateProgress()} /> */}

//         {/* Step 1: Health Plan Selection */}
//         {internalHealthStep === 1 && (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {healthPlans.map((plan) => (
//                 <Card
//                   key={plan.id}
//                   className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
//                     selectedPlanLocal === plan.id
//                       ? "ring-2 ring-insurance-primary shadow-lg"
//                       : ""
//                   }`}
//                   onClick={() => setSelectedPlanLocal(plan.id)}
//                 >
//                   {plan.popular && (
//                     <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//                       <Badge className="bg-insurance-primary text-white px-4 py-1 shadow-lg">
//                         <Star className="h-3 w-3 mr-1" />
//                         Most Popular
//                       </Badge>
//                     </div>
//                   )}

//                   <CardHeader className="text-center">
//                     <CardTitle className="text-xl">{plan.name}</CardTitle>
//                     <div className="text-3xl font-bold text-insurance-primary">
//                       {plan.price}
//                     </div>
//                     <p className="text-muted-foreground">per year</p>
//                     <div className="text-lg font-semibold">
//                       Coverage: {plan.coverage}
//                     </div>
//                   </CardHeader>

//                   <CardContent>
//                     <ul className="space-y-3 mb-6">
//                       {plan.features.map((feature, index) => (
//                         <li key={index} className="flex items-center">
//                           <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
//                           <span className="text-sm">{feature}</span>
//                         </li>
//                       ))}
//                     </ul>

//                     <Button
//                       className={`w-full transition-all duration-300 ${
//                         plan.popular
//                           ? "bg-insurance-primary hover:bg-insurance-dark shadow-lg hover:shadow-xl"
//                           : "bg-gray-700 hover:bg-gray-800"
//                       }`}
//                       onClick={() => {
//                         setSelectedPlanLocal(plan.id);
//                         handleNextInternalHealthStep(); // Move to the next step (Personal Information)
//                       }}
//                     >
//                       Choose Plan
//                     </Button>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>

//             <Card>
//               <CardContent className="p-8">
//                 <h3 className="text-2xl font-bold text-center mb-8">
//                   Why Choose Our Health Insurance?
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                   <div className="text-center">
//                     <div className="text-4xl mb-4">🏥</div>
//                     <h4 className="font-semibold mb-2">5000+ Hospitals</h4>
//                     <p className="text-muted-foreground">
//                       Cashless treatment across India
//                     </p>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-4xl mb-4">⚡</div>
//                     <h4 className="font-semibold mb-2">Quick Claims</h4>
//                     <p className="text-muted-foreground">
//                       Hassle-free claim settlement
//                     </p>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-4xl mb-4">📞</div>
//                     <h4 className="font-semibold mb-2">24/7 Support</h4>
//                     <p className="text-muted-foreground">
//                       Round the clock assistance
//                     </p>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-4xl mb-4">💰</div>
//                     <h4 className="font-semibold mb-2">No Hidden Costs</h4>
//                     <p className="text-muted-foreground">Transparent pricing</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </>
//         )}

//         {/* Step 2: Personal Information Form */}
//         {/* {internalHealthStep === 2 && ({ setDetailsExists ? (<div>Details already taken</div>) : ()}
//           <Card className="shadow-lg">
//             <CardHeader>
//               <CardTitle>Personal Information</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="firstName">First Name</Label>
//                   <Input
//                     id="firstName"
//                     placeholder="Enter your first name"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="lastName">Last Name</Label>
//                   <Input
//                     id="lastName"
//                     placeholder="Enter your last name"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="phone">Phone Number</Label>
//                   <Input
//                     id="phone"
//                     placeholder="Enter your phone number"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="dob">Date of Birth</Label>
//                   <Input
//                     id="dob"
//                     type="date"
//                     value={dob}
//                     onChange={(e) => setDob(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="gender">Gender</Label>
//                   <Select value={gender} onValueChange={setGender}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select gender" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="male">Male</SelectItem>
//                       <SelectItem value="female">Female</SelectItem>
//                       <SelectItem value="other">Other</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="address">Address</Label>
//                 <Input
//                   id="address"
//                   placeholder="Enter your complete address"
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="city">City</Label>
//                   <Input
//                     id="city"
//                     placeholder="Enter your city"
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="pincode">Pin Code</Label>
//                   <Input
//                     id="pincode"
//                     placeholder="Enter pin code"
//                     value={pincode}
//                     onChange={(e) => setPincode(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="familyMembers">Number of Family Members</Label>
//                 <Select value={familyMembers} onValueChange={setFamilyMembers}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select number of members" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="1">1 (Self)</SelectItem>
//                     <SelectItem value="2">2 (Self + Spouse)</SelectItem>
//                     <SelectItem value="3">
//                       3 (Self + Spouse + 1 Child)
//                     </SelectItem>
//                     <SelectItem value="4">
//                       4 (Self + Spouse + 2 Children)
//                     </SelectItem>
//                     <SelectItem value="5+">5 or more</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <Label htmlFor="sumInsured">Preferred Sum Insured</Label>
//                 <Select value={sumInsured} onValueChange={setSumInsured}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select coverage amount" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="300000">₹3,00,000</SelectItem>
//                     <SelectItem value="500000">₹5,00,000</SelectItem>
//                     <SelectItem value="1000000">₹10,00,000</SelectItem>
//                     <SelectItem value="1500000">₹15,00,000</SelectItem>
//                     <SelectItem value="2000000">₹20,00,000</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="flex space-x-4 pt-4">
//                 <Button
//                   variant="outline"
//                   className="flex-1"
//                   onClick={handlePreviousInternalHealthStep}
//                 >
//                   Back to Plans
//                 </Button>
//                 <Button
//                   className="flex-1 bg-insurance-primary hover:bg-insurance-dark"
//                   onClick={handleNextInternalHealthStep} // This will move to Step 3 (Review)
//                 >
//                   Continue to Preview
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         )} */}


//       {internalHealthStep === 2 && (
//         setDetailsExists ? (
//           <div><h1>Details already taken</h1>
//           <Button
//                   className="flex-1 bg-blue-600 hover:bg-blue-700" // Tailwind classes for your button color
//                   onClick={handleNextInternalHealthStep}
//                 >
//                   Continue to Preview
//                 </Button>
//             </div>
//         ) : (
//           <Card className="shadow-lg rounded-xl"> {/* Added rounded-xl for consistency */}
//             <CardHeader>
//               <CardTitle>Personal Information</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="firstName">First Name</Label>
//                   <Input
//                     id="firstName"
//                     placeholder="Enter your first name"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="lastName">Last Name</Label>
//                   <Input
//                     id="lastName"
//                     placeholder="Enter your last name"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="phone">Phone Number</Label>
//                   <Input
//                     id="phone"
//                     placeholder="Enter your phone number (e.g., 9876543210)"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="dob">Date of Birth</Label>
//                   <Input
//                     id="dob"
//                     type="date"
//                     value={dob}
//                     onChange={(e) => setDob(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="gender">Gender</Label>
//                   <Select value={gender} onValueChange={setGender}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select gender" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="male">Male</SelectItem>
//                       <SelectItem value="female">Female</SelectItem>
//                       <SelectItem value="other">Other</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="address">Address</Label>
//                 <Input
//                   id="address"
//                   placeholder="Enter your complete address"
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="city">City</Label>
//                   <Input
//                     id="city"
//                     placeholder="Enter your city"
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="pincode">Pin Code</Label>
//                   <Input
//                     id="pincode"
//                     placeholder="Enter pin code (e.g., 400001)"
//                     value={pincode}
//                     onChange={(e) => setPincode(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="familyMembers">Number of Family Members</Label>
//                 <Select value={familyMembers} onValueChange={setFamilyMembers}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select number of members" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="1">1 (Self)</SelectItem>
//                     <SelectItem value="2">2 (Self + Spouse)</SelectItem>
//                     <SelectItem value="3">
//                       3 (Self + Spouse + 1 Child)
//                     </SelectItem>
//                     <SelectItem value="4">
//                       4 (Self + Spouse + 2 Children)
//                     </SelectItem>
//                     <SelectItem value="5+">5 or more</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <Label htmlFor="sumInsured">Preferred Sum Insured</Label>
//                 <Select value={sumInsured} onValueChange={setSumInsured}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select coverage amount" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="300000">₹3,00,000</SelectItem>
//                     <SelectItem value="500000">₹5,00,000</SelectItem>
//                     <SelectItem value="1000000">₹10,00,000</SelectItem>
//                     <SelectItem value="1500000">₹15,00,000</SelectItem>
//                     <SelectItem value="2000000">₹20,00,000</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="flex space-x-4 pt-4">
//                 <Button
//                   variant="outline"
//                   className="flex-1"
//                   onClick={handlePreviousInternalHealthStep}
//                 >
//                   Back to Plans
//                 </Button>
//                 <Button
//                   className="flex-1 bg-blue-600 hover:bg-blue-700" // Tailwind classes for your button color
//                   onClick={handleNextInternalHealthStep}
//                 >
//                   Continue to Preview
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         )
//       )}

//         {/* Step 3: Review Your Application */}
//         {internalHealthStep === 3 && (
//           <Card className="shadow-lg">
//             <CardHeader>
//               <CardTitle>Review Your Application</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="bg-muted/50 p-4 rounded-lg">
//                 <h3 className="font-semibold mb-2">Selected Plan</h3>
//                 {formData.selectedPlan ? (
//                   <>
//                     <p className="text-insurance-primary font-bold">
//                       {formData.selectedPlan.name} -{" "}
//                       {formData.selectedPlan.price}/year
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       Coverage: {formData.selectedPlan.coverage}
//                     </p>
//                   </>
//                 ) : (
//                   <p className="text-muted-foreground">No plan selected.</p>
//                 )}
//               </div>

//               <div className="space-y-4">
//                 <h3 className="font-semibold">Personal Details</h3>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <span className="text-muted-foreground">Name:</span>
//                     <p>
//                       {formData.firstName} {formData.lastName}
//                     </p>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground">Email:</span>
//                     <p>{formData.email}</p>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground">Phone:</span>
//                     <p>{formData.phone}</p>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground">
//                       Date of Birth:
//                     </span>
//                     <p>{formData.dob}</p>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground">Gender:</span>
//                     <p>{formData.gender}</p>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground">Address:</span>
//                     <p>{formData.address}</p>
//                     <p>
//                       {formData.city}, {formData.pincode}
//                     </p>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground">
//                       Family Members:
//                     </span>
//                     <p>{formData.familyMembers || "N/A"}</p>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground">
//                       Preferred Sum Insured:
//                     </span>
//                     <p>{formData.sumInsured || "N/A"}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex space-x-4 pt-4">
//                 <Button
//                   variant="outline"
//                   className="flex-1"
//                   onClick={handlePreviousInternalHealthStep}
                  
//                 >
//                   Back to Edit
//                 </Button>
//                 <Button
//                   className="flex-1 bg-insurance-primary hover:bg-insurance-dark"
//                   onClick={() => {
//                     SubmitForm();
//                     console.log("Final Application Data:", formData);
//                     // In a real application, you would send `formData` to your backend here.
//                     // Example: await submitApplication(formData);
//                     handleNextInternalHealthStep(); // Move to the confirmation/payment step (step 4)
//                   }}
//                 >
//                   Confirm & Pay
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Step 4: Application Submitted Confirmation */}
//         {internalHealthStep === 4 && (
//           <Card className="shadow-lg">
//             <CardContent className="text-center py-12">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Check className="h-8 w-8 text-green-600" />
//               </div>
//               <h2 className="text-2xl font-bold text-foreground mb-2">
//                 Application Submitted!
//               </h2>
//               <p className="text-muted-foreground mb-6">
//                 Your policy application has been received and is being
//                 processed.
//               </p>
//               <Button className="bg-insurance-primary hover:bg-insurance-dark">
//                 Go to Dashboard
//               </Button>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     );
//   };

 
//   // Props for the ProductInsuranceContent component
//   interface ProductInsuranceContentProps {
//     onApplicationComplete: () => void; // Callback to notify the parent when this application is complete
//   }

//   const ProductInsuranceContent = ({
//     onApplicationComplete,
//   }: ProductInsuranceContentProps) => {
//     // internalProductStep manages the sub-flow within ProductInsuranceContent:
//     // 1: Product Selection & Form Input
//     // 2: Review Quote / Premium Display
//     // 3: Confirmation (Application Submitted)
//     const [internalProductStep, setInternalProductStep] = useState(1);

//     // State for all form inputs
//     const [productFormData, setProductFormData] = useState({
//       productCategory: "",
//       brand: "",
//       purchaseDate: "",
//       productValue: "",
//       coveragePeriod: "",
//     });

//     // Data for product categories displayed on Step 1
//     const productCategories = [
//       {
//         icon: <Smartphone className="h-12 w-12 text-insurance-primary" />,
//         title: "Mobile & Electronics",
//         description: "Smartphones, tablets, earphones",
//         coverage: "Accidental damage, liquid damage, theft",
//       },
//       {
//         icon: <Laptop className="h-12 w-12 text-insurance-primary" />,
//         title: "Laptops & Computers",
//         description: "Laptops, desktops, accessories",
//         coverage: "Hardware failure, accidental damage",
//       },
//       {
//         icon: <Home className="h-12 w-12 text-insurance-primary" />,
//         title: "Home Appliances",
//         description: "TV, refrigerator, washing machine",
//         coverage: "Breakdown, electrical surge, repair",
//       },
//       {
//         icon: <Camera className="h-12 w-12 text-insurance-primary" />,
//         title: "Photography Equipment",
//         description: "Cameras, lenses, drones",
//         coverage: "Accidental damage, theft, breakdown",
//       },
//     ];

//     // Handler for generic text input changes
//     const handleProductInputChange = (
//       e: React.ChangeEvent<HTMLInputElement>
//     ) => {
//       const { id, value } = e.target;
//       setProductFormData((prev) => ({ ...prev, [id]: value }));
//     };

//     // Handler for select input changes (dropdowns)
//     const handleProductSelectChange = (value: string, id: string) => {
//       setProductFormData((prev) => ({ ...prev, [id]: value }));
//     };

//     // Function to transition to the Review Quote step (internal step 2)
//     const handleCalculatePremium = () => {
//       // In a real application, you'd send productFormData to your backend to calculate the premium.
//       console.log("Calculating premium for:", productFormData);
//       setInternalProductStep(2); // Move to the "Review/Premium Display" step
//     };

//     // Function to confirm the policy and notify the parent of completion
//     const handleConfirmProductPolicy = () => {
//       console.log("Confirming Product Policy:", productFormData);
//       // 1. First, update the internal step to show the final confirmation screen (Step 3).
//       setInternalProductStep(3);
//       // 2. Then, after the internal state has updated, notify the parent component
//       //    that this specific application flow is complete.
//       //    The parent can then decide to advance its overall application step.
//       onApplicationComplete();
//     };

//     // Helper to get the display title for the product category in the review step
//     const getProductCategoryTitle = (categoryValue: string) => {
//       const foundCategory = productCategories.find(
//         (cat) => cat.title === categoryValue
//       );
//       return foundCategory ? foundCategory.title : categoryValue;
//     };

//     // --- Conditional Rendering based on internalProductStep ---

//     // Render Step 2: Review Your Product Insurance Quote
//     if (internalProductStep === 2) {
//       return (
//         <Card className="shadow-lg">
//           <CardHeader>
//             <CardTitle>Review Your Product Insurance Quote</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="bg-muted/50 p-4 rounded-lg">
//               <h3 className="font-semibold mb-2">Quote Details</h3>
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <span className="text-muted-foreground">
//                     Product Category:
//                   </span>
//                   <p>
//                     {getProductCategoryTitle(productFormData.productCategory)}
//                   </p>
//                 </div>
//                 <div>
//                   <span className="text-muted-foreground">Brand:</span>
//                   <p>{productFormData.brand}</p>
//                 </div>
//                 <div>
//                   <span className="text-muted-foreground">Purchase Date:</span>
//                   <p>{productFormData.purchaseDate}</p>
//                 </div>
//                 <div>
//                   <span className="text-muted-foreground">Product Value:</span>
//                   <p>{productFormData.productValue}</p>
//                 </div>
//                 <div>
//                   <span className="text-muted-foreground">
//                     Coverage Period:
//                   </span>
//                   <p>{productFormData.coveragePeriod}</p>
//                 </div>
//               </div>
//               <div className="mt-4 text-xl font-bold text-insurance-primary">
//                 Estimated Premium: ₹1,200/year{" "}
//                 {/* Placeholder for calculated premium */}
//               </div>
//             </div>
//             <div className="flex space-x-4 pt-4">
//               <Button
//                 variant="outline"
//                 className="flex-1"
//                 onClick={() => setInternalProductStep(1)} // Go back to the form
//               >
//                 Edit Details
//               </Button>
//               <Button
//                 className="flex-1 bg-insurance-primary hover:bg-insurance-dark"
//                 onClick={handleConfirmProductPolicy}
//               >
//                 Confirm & Pay
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       );
//     }

//     // Render Step 3: Application Submitted Confirmation
//     if (internalProductStep === 3) {
//       return (
//         <Card className="shadow-lg">
//           <CardContent className="text-center py-12">
//             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Check className="h-8 w-8 text-green-600" />
//             </div>
//             <h2 className="text-2xl font-bold text-foreground mb-2">
//               Application Submitted!
//             </h2>
//             <p className="text-muted-foreground mb-6">
//               Your product insurance policy application has been received and is
//               being processed.
//             </p>
//             <Button className="bg-insurance-primary hover:bg-insurance-dark">
//               Go to Dashboard
//             </Button>
//           </CardContent>
//         </Card>
//       );
//     }

//     // Default Render: Step 1 (Product Selection and Form Input)
//     return (
//       <div className="space-y-8">
//         {/* Product Categories Display Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {productCategories.map((category, index) => (
//             <Card
//               key={index}
//               className="hover:shadow-lg transition-shadow cursor-pointer"
//             >
//               <CardHeader className="text-center">
//                 <div className="flex justify-center mb-4">{category.icon}</div>
//                 <CardTitle className="text-lg">{category.title}</CardTitle>
//               </CardHeader>
//               <CardContent className="text-center">
//                 <p className="text-muted-foreground mb-3">
//                   {category.description}
//                 </p>
//                 <p className="text-sm text-insurance-primary font-semibold">
//                   {category.coverage}
//                 </p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Product Insurance Quote Form Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <Card>
//             <CardHeader>
//               <CardTitle>Get Product Insurance Quote</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Product Category
//                 </label>
//                 <Select
//                   onValueChange={(value) =>
//                     handleProductSelectChange(value, "productCategory")
//                   }
//                   value={productFormData.productCategory}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select product category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {productCategories.map((cat) => (
//                       <SelectItem key={cat.title} value={cat.title}>
//                         {cat.title}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Brand</label>
//                 <Input
//                   placeholder="e.g., Apple, Samsung, Sony"
//                   id="brand"
//                   value={productFormData.brand}
//                   onChange={handleProductInputChange}
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="purchaseDate">Purchase Date</Label>
//                   <Input
//                     type="date"
//                     id="purchaseDate"
//                     value={productFormData.purchaseDate}
//                     onChange={handleProductInputChange}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="productValue">Product Value</Label>
//                   <Input
//                     placeholder="₹50,000"
//                     id="productValue"
//                     value={productFormData.productValue}
//                     onChange={handleProductInputChange}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="coveragePeriod">Coverage Period</Label>
//                 <Select
//                   onValueChange={(value) =>
//                     handleProductSelectChange(value, "coveragePeriod")
//                   }
//                   value={productFormData.coveragePeriod}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select coverage period" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="1 Year">1 Year</SelectItem>
//                     <SelectItem value="2 Years">2 Years</SelectItem>
//                     <SelectItem value="3 Years">3 Years</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <Button
//                 className="w-full bg-insurance-primary hover:bg-insurance-dark"
//                 onClick={handleCalculatePremium}
//               >
//                 Calculate Premium
//               </Button>
//             </CardContent>
//           </Card>

//           {/* What's Covered & Not Covered Sections */}
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold">What's Covered?</h3>
//             <Card>
//               <CardContent className="p-6">
//                 <h4 className="font-semibold text-green-700 mb-3">✓ Covered</h4>
//                 <ul className="space-y-2 text-sm">
//                   <li>• Accidental damage including drops and spills</li>
//                   <li>• Liquid damage and water exposure</li>
//                   <li>• Electrical and mechanical breakdown</li>
//                   <li>• Theft and burglary</li>
//                   <li>• Screen damage and internal component failure</li>
//                   <li>• Power surge damage</li>
//                 </ul>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardContent className="p-6">
//                 <h4 className="font-semibold text-red-700 mb-3">
//                   ✗ Not Covered
//                 </h4>
//                 <ul className="space-y-2 text-sm">
//                   <li>• Intentional damage</li>
//                   <li>• War, nuclear risks</li>
//                   <li>• Normal wear and tear</li>
//                   <li>• Cosmetic damage not affecting functionality</li>
//                   <li>• Damage due to software issues</li>
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Simple Claim Process Section */}
//         <Card>
//           <CardContent className="p-8">
//             <h3 className="text-2xl font-bold text-center mb-8">
//               Simple Claim Process
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               <div className="text-center">
//                 <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                   <span className="text-2xl font-bold text-insurance-primary">
//                     1
//                   </span>
//                 </div>
//                 <h4 className="font-semibold mb-2">Report Damage</h4>
//                 <p className="text-muted-foreground">
//                   Call our helpline or file claim online
//                 </p>
//               </div>
//               <div className="text-center">
//                 <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                   <span className="text-2xl font-bold text-insurance-primary">
//                     2
//                   </span>
//                 </div>
//                 <h4 className="font-semibold mb-2">Assessment</h4>
//                 <p className="text-muted-foreground">
//                   Our expert will assess the damage
//                 </p>
//               </div>
//               <div className="text-center">
//                 <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                   <span className="text-2xl font-bold text-insurance-primary">
//                     3
//                   </span>
//                 </div>
//                 <h4 className="font-semibold mb-2">Approval</h4>
//                 <p className="text-muted-foreground">
//                   Quick claim approval process
//                 </p>
//               </div>
//               <div className="text-center">
//                 <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                   <span className="text-2xl font-bold text-insurance-primary">
//                     4
//                   </span>
//                 </div>
//                 <h4 className="font-semibold mb-2">Repair/Replace</h4>
//                 <p className="text-muted-foreground">
//                   Get your product repaired or replaced
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   };

//   const renderPolicyContent = () => {
//     switch (selectedPolicy) {
//       case "motor":
//         return <MotorInsuranceContent />;
//       case "health":
//         // Pass a callback to update the overall step when Health application is complete
//         return (
//           <HealthInsuranceContent
//             onApplicationComplete={() => setCurrentOverallStep(4)}
//           />
//         );
//       case "product":
//         return <ProductInsuranceContent />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       {/* Use the new overallProcessSteps for ProcessFlow */}
//       <ProcessFlow
//         currentStep={currentOverallStep}
//         steps={overallProcessSteps}
//       />

//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold mb-4">Buy New Policy</h1>
//           <p className="text-muted-foreground">
//             Start by choosing the type of insurance you need.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6 mb-8">
//           {policyTypes.map((policy) => (
//             <Card
//               key={policy.id}
//               className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
//                 selectedPolicy === policy.id
//                   ? "ring-2 ring-insurance-primary bg-insurance-light/10"
//                   : "hover:shadow-md"
//               }`}
//               onClick={() => handlePolicySelect(policy.id)}
//             >
//               <CardContent className="p-6 text-center">
//                 <div className="text-4xl mb-4">{policy.icon}</div>
//                 <h3 className="text-xl font-semibold mb-3">{policy.title}</h3>
//                 <p className="text-muted-foreground mb-4 text-sm">
//                   {policy.description}
//                 </p>
//                 <Button
//                   className={`w-full ${
//                     selectedPolicy === policy.id
//                       ? "bg-insurance-primary"
//                       : "bg-insurance-secondary hover:bg-insurance-primary"
//                   }`}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handlePolicySelect(policy.id);
//                   }}
//                 >
//                   Get Quote
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {selectedPolicy && (
//           <div className="space-y-8">
//             <div className="text-center">
//               <h2 className="text-3xl font-bold mb-4">
//                 {policyTypes.find((p) => p.id === selectedPolicy)?.title}
//               </h2>
//               <p className="text-muted-foreground text-lg">
//                 {policyTypes.find((p) => p.id === selectedPolicy)?.description}
//               </p>
//             </div>

//             {renderPolicyContent()}
//           </div>
//         )}
//       </div>

//       <Footer />
//       <Chatbot />
//     </div>
//   );
// };

// export default Policy;

// src/components/Policy.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ProcessFlow from "@/components/ProcessFlow";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  Car,
  Shield,
  Wrench,
  Users,
  Smartphone,
  Laptop,
  Home,
  Camera,
  Check,
  Star,
} from "lucide-react";

const Policy = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") || "";
  const [selectedPolicy, setSelectedPolicy] = useState<string>(initialType);
  // Removed showHealthApplication, as HealthInsuranceContent will manage its own visibility of internal steps
  const [currentOverallStep, setCurrentOverallStep] = useState(1); // Renamed for clarity to avoid confusion with internal steps
  const navigate = useNavigate();

  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam && typeParam !== selectedPolicy) {
      setSelectedPolicy(typeParam);
      // When policy type changes, reset overall step to 1 (Select Policy Type) or 2 (Premium/Application start)
      // Depending on if "Premium" is considered the first step of a chosen policy's flow.
      // For now, let's assume selecting a policy type immediately moves to its "Premium/Application" phase (overall step 2).
      setCurrentOverallStep(2);
    } else if (!typeParam && selectedPolicy) {
      // If no type param, but a policy is selected (e.g., initial load without type), assume step 2
      setCurrentOverallStep(2);
    } else if (!typeParam && !selectedPolicy) {
      // If no type param and no policy selected, stay at step 1
      setCurrentOverallStep(1);
    }
  }, [searchParams, selectedPolicy]);

  const policyTypes = [
    {
      id: "motor",
      title: "Motor Insurance",
      description:
        "Complete protection for your car and bike. Get comprehensive coverage for vehicle damage, third-party liability, and personal accident benefits.",
      features: [
        "Comprehensive Coverage",
        "Third-Party Liability",
        "Personal Accident Cover",
        "24/7 Roadside Assistance",
      ],
      icon: "🚗",
    },
    {
      id: "health",
      title: "Health Insurance",
      description:
        "Comprehensive health coverage for individuals and families. Protect yourself and your loved ones against unexpected medical expenses.",
      features: [
        "Cashless Treatment",
        "Family Floater Options",
        "Pre & Post Hospitalization",
        "Critical Illness Cover",
      ],
      icon: "💊",
    },
    {
      id: "product",
      title: "Product Insurance",
      description:
        "Extended warranty for electronics and appliances. Protect your valuable gadgets against damage, theft, or technical failures.",
      features: [
        "Extended Warranty",
        "Accidental Damage",
        "Theft Protection",
        "Technical Support",
      ],
      icon: "📺",
    },
  ];

  // The overall steps for the entire policy purchase process
  const overallProcessSteps = [
    "Select Policy Type",
    "Application Details",
    "Review & Payment",
    "Confirmation",
  ];

  const handlePolicySelect = (policyId: string) => {
    setSelectedPolicy(policyId);
    // When a policy is selected, move to the "Application Details" step (overall step 2)
    setCurrentOverallStep(2);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("type", policyId);
    window.history.pushState({}, "", newUrl);
  };

 

  // MotorInsuranceContent remains as is (or with its own internal steps as implemented)
  const MotorInsuranceContent = () => {
    const [formData, setFormData] = useState({
      registrationNumber: "",
      model: "",
      typeOfVehicle: "", // New: type of vehicle
      chassisNumber: "", // New: chassis number
      engineNumber: "", // New: engine number
      makeYear: "", // New: manufacturing year
      fuelType: "", // New: fuel type
      ownerFirstName: "", // New: owner's first name
      ownerLastName: "", // New: owner's last name
      ownerEmail: "", // New: owner's email
    });
    const [showMotorPlans, setShowMotorPlans] = useState(false);
    const [selectedPlanLocal, setSelectedPlanLocal] = useState<string | null>(
      null
    );
    const [internalMotorStep, setInternalMotorStep] = useState(1); // 1: Quote form, 2: Plans, 3: Personal Info, 4: Review, 5: Confirmation

    const motorPlans = [
      {
        id: "third-party",
        name: "Third Party Liability",
        price: "₹2,500",
        coverage: "As per IRDAI",
        features: [
          "Mandatory as per Indian law",
          "Covers damages to third-party property",
          "Covers bodily injury/death to third-party",
          "Legal liabilities covered",
        ],
        popular: false,
      },
      {
        id: "comprehensive",
        name: "Comprehensive Motor Plan",
        price: "₹8,000",
        coverage: "IDV based",
        features: [
          "Own damage cover",
          "Third-party liability",
          "Theft protection",
          "Natural disaster protection (flood, earthquake etc.)",
          "Man-made disaster protection (riot, strike etc.)",
          "Fire and explosion cover",
        ],
        popular: true,
      },
      {
        id: "zero-depreciation",
        name: "Zero Depreciation Add-on",
        price: "₹10,500",
        coverage: "Full Claim Value",
        features: [
          "No depreciation deduction on parts during claim",
          "Higher claim settlement amount",
          "Ideal for new cars",
          "Covers plastic, fiber, and metal parts",
          "Usually an add-on to comprehensive plan",
        ],
        popular: false,
      },
    ];

    const fetchDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:8093/admin/policies/list"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched policies (no JWT needed):", data);

        const dummyVehicleDetails = {
          typeOfVehicle: "4 Wheeler",
          chassisNumber: "CHASABC123DEF456",
          engineNumber: "ENGXYZ789UVW012",
          makeYear: "2022",
          fuelType: "Petrol",
          ownerFirstName: "Jane",
          ownerLastName: "Doe",
          ownerEmail: "jane.doe@example.com",
        };

        setFormData((prev) => ({
          ...prev,
          ...dummyVehicleDetails,
        }));

        alert(
          "Policies fetched successfully from backend! Displaying example plans."
        );
        setShowMotorPlans(true);
        setInternalMotorStep(2); // Move to plans step
      } catch (error) {
        console.error("Error fetching details:", error);
        alert(
          "Error fetching policies. Is backend running? Displaying example plans anyway."
        );
        setShowMotorPlans(true);
        setInternalMotorStep(2); // Move to plans step even on error for demo
      }
    };

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (value: string, id: string) => {
      setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleChoosePlan = (planId: string) => {
      setSelectedPlanLocal(planId);
      setInternalMotorStep(3); // Move to personal information step
    };

    const handleNextInternalStep = () => {
      setInternalMotorStep((prevStep) => prevStep + 1);
      if (internalMotorStep === 5) {
        // If moving from Review to Confirmation
        setCurrentOverallStep(4); // Update overall step to Confirmation
      }
    };

    const handlePreviousInternalStep = () => {
      setInternalMotorStep((prevStep) => prevStep - 1);
      if (internalMotorStep === 2) {
        // If going back from Plans to Quote
        setShowMotorPlans(false);
      }
    };

    const features = [
      {
        icon: <Shield className="h-8 w-8 text-insurance-primary" />,
        title: "Comprehensive Coverage",
        description:
          "Protection against accidents, theft, and natural disasters",
      },
      {
        icon: <Wrench className="h-8 w-8 text-insurance-primary" />,
        title: "Cashless Repairs",
        description: "Network of 4000+ authorized garages across India",
      },
      {
        icon: <Users className="h-8 w-8 text-insurance-primary" />,
        title: "24/7 Roadside Assistance",
        description: "Emergency support wherever you are",
      },
      {
        icon: <Car className="h-8 w-8 text-insurance-primary" />,
        title: "Zero Depreciation",
        description: "Get full claim amount without depreciation",
      },
    ];

    if (showMotorPlans && internalMotorStep >= 2) {
      return (
        <div className="space-y-8">
          {/* Step 2: Display Motor Insurance Plans */}
          {internalMotorStep === 2 && (
            <>
              <h3 className="text-2xl font-bold text-center">
                Choose Your Motor Insurance Plan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {motorPlans.map((plan) => (
                  <Card
                    key={plan.id}
                    className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                      selectedPlanLocal === plan.id
                        ? "ring-2 ring-insurance-primary shadow-lg"
                        : ""
                    }`}
                    onClick={() => setSelectedPlanLocal(plan.id)}
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
                      <div className="text-3xl font-bold text-insurance-primary">
                        {plan.price}
                      </div>
                      <p className="text-muted-foreground">
                        per year (approx.)
                      </p>
                      <div className="text-lg font-semibold">
                        Coverage: {plan.coverage}
                      </div>
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
                            ? "bg-insurance-primary hover:bg-insurance-dark shadow-lg hover:shadow-xl"
                            : "bg-gray-700 hover:bg-gray-800"
                        }`}
                        onClick={() => handleChoosePlan(plan.id)}
                      >
                        Choose Plan
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Step 3: Personal Information - Updated with more vehicle details */}
          {internalMotorStep === 3 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Your Vehicle & Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="registrationNumber">
                      Registration Number
                    </Label>
                    <Input
                      id="registrationNumber"
                      placeholder="e.g., KA01AB1234"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      readOnly // Often read-only if fetched
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Vehicle Model</Label>
                    <Input
                      id="model"
                      placeholder="e.g., Maruti Swift"
                      value={formData.model}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* New Vehicle Details: Type, Chassis, Engine */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="typeOfVehicle">Type of Vehicle</Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange(value, "typeOfVehicle")
                      }
                      value={formData.typeOfVehicle}
                    >
                      <SelectTrigger id="typeOfVehicle">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2 wheeler">2 Wheeler</SelectItem>
                        <SelectItem value="4 wheeler">4 Wheeler</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="chassisNumber">Chassis Number</Label>
                    <Input
                      id="chassisNumber"
                      placeholder="Enter chassis number"
                      value={formData.chassisNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="engineNumber">Engine Number</Label>
                    <Input
                      id="engineNumber"
                      placeholder="Enter engine number"
                      value={formData.engineNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="makeYear">Manufacturing Year</Label>
                    <Input
                      id="makeYear"
                      type="number"
                      placeholder="e.g., 2020"
                      value={formData.makeYear}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange(value, "fuelType")
                    }
                    value={formData.fuelType}
                  >
                    <SelectTrigger id="fuelType">
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="petrol">Petrol</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="cng">CNG/LPG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ownerFirstName">Owner's First Name</Label>
                    <Input
                      id="ownerFirstName"
                      placeholder="Enter owner's first name"
                      value={formData.ownerFirstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownerLastName">Owner's Last Name</Label>
                    <Input
                      id="ownerLastName"
                      placeholder="Enter owner's last name"
                      value={formData.ownerLastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="ownerEmail">Email</Label>
                  <Input
                    id="ownerEmail"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.ownerEmail}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex space-x-4 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handlePreviousInternalStep}
                  >
                    Back to Plans
                  </Button>
                  <Button
                    className="flex-1 bg-insurance-primary hover:bg-insurance-dark"
                    onClick={handleNextInternalStep}
                  >
                    Continue to Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review Your Application */}
          {internalMotorStep === 4 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Review Your Motor Insurance Application</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Selected Plan</h3>
                  {selectedPlanLocal && (
                    <p className="text-insurance-primary font-bold">
                      {motorPlans.find((p) => p.id === selectedPlanLocal)?.name}{" "}
                      -{" "}
                      {
                        motorPlans.find((p) => p.id === selectedPlanLocal)
                          ?.price
                      }
                      /year
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Coverage:{" "}
                    {
                      motorPlans.find((p) => p.id === selectedPlanLocal)
                        ?.coverage
                    }
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Vehicle Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">
                        Registration Number:
                      </span>
                      <p>{formData.registrationNumber}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Vehicle Model:
                      </span>
                      <p>{formData.model}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Type of Vehicle:
                      </span>
                      <p>{formData.typeOfVehicle}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Chassis Number:
                      </span>
                      <p>{formData.chassisNumber}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Engine Number:
                      </span>
                      <p>{formData.engineNumber}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Manufacturing Year:
                      </span>
                      <p>{formData.makeYear}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fuel Type:</span>
                      <p>{formData.fuelType}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Owner's Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <p>
                        {formData.ownerFirstName} {formData.ownerLastName}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <p>{formData.ownerEmail}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handlePreviousInternalStep}
                  >
                    Back to Edit
                  </Button>
                  <Button
                    className="flex-1 bg-insurance-primary hover:bg-insurance-dark"
                    onClick={handleNextInternalStep} // This will move to Step 5 (Confirmation)
                  >
                    Confirm & Pay
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 5: Application Submitted Confirmation */}
          {internalMotorStep === 5 && (
            <Card className="shadow-lg">
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Application Submitted!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Your motor insurance policy application has been received and
                  is being processed.
                </p>
                <Button className="bg-insurance-primary hover:bg-insurance-dark">
                  Go to Dashboard
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      );
    }

    // Initial state: Show "Get Instant Quote" form and features
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Get Instant Quote</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Registration Number
                </label>
                <Input
                  placeholder="e.g., KA01AB1234"
                  value={formData.registrationNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      registrationNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Vehicle Model (Optional)
                </label>
                <Input
                  placeholder="e.g., Maruti Swift, Honda City"
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                />
              </div>

              <Button
                className="w-full bg-insurance-primary hover:bg-insurance-dark"
                onClick={fetchDetails}
              >
                Get Quote
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">
              Why Choose Our Motor Insurance?
            </h3>
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">{feature.icon}</div>
                <div>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-8">
              Coverage Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Third Party</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Basic coverage as per law
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Third party liability</li>
                    <li>• Personal accident cover</li>
                    <li>• Legal compliance</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="ring-2 ring-insurance-primary">
                <CardHeader>
                  <CardTitle>Comprehensive</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Complete protection
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Own damage cover</li>
                    <li>• Third party liability</li>
                    <li>• Theft protection</li>
                    <li>• Natural disasters</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Zero Depreciation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Maximum claim amount
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• No depreciation on parts</li>
                    <li>• Full claim settlement</li>
                    <li>• Premium coverage</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  interface HealthInsuranceContentProps {
    onApplicationComplete: () => void;
    // Add a prop for the progress bar if the parent controls it,
    // or remove it if HealthInsuranceContent manages its own progress display.
    // For now, assuming internal management for simplicity as per your current structure.
    currentOverallStep?: number; // Optional: If parent needs to influence internal display
    totalOverallSteps?: number; // Optional: For a global progress bar
  }

  const HealthInsuranceContent = ({
    onApplicationComplete,
  }: HealthInsuranceContentProps) => {
    // Internal state for health application steps (1: Plans, 2: Personal Info, 3: Review, 4: Confirmation)
    const [internalHealthStep, setInternalHealthStep] = useState(1);
    console.log("Internal Health Step:", internalHealthStep);
    // State for health plan selection
    const location = useLocation();
    const [userId,setUserId] = useState<string | null>(null);

    const [selectedPlanLocal, setSelectedPlanLocal] = useState<string | null>(
      null
    );

    const [selectedPolicyType, setSelectedPolicyType] = useState<string | null>(
      null
    );

    // --- State variables for all form inputs ---
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [dob, setDob] = useState<string>(""); // Date in "YYYY-MM-DD" format
    const [gender, setGender] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [pincode, setPincode] = useState<string>("");

    const [detailsExists, setDetailsExists] = useState<boolean>(false);
    const [fetchedUserDetails, setFetchedUserDetails] = useState<any>(null); // State to store fetched user details

    // --- State for optional fields if you decide to use them ---
    const [familyMembers, setFamilyMembers] = useState<string>("");
    const [sumInsured, setSumInsured] = useState<string>("");

    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const type = params.get("type");
      setSelectedPolicyType(type);
      console.log("Selected Policy Type:", type);
    
      const userString = localStorage.getItem("user");
      let username: string | undefined;
      if (userString) {
        try {
          const user = JSON.parse(userString);
          username = user.username;
          console.log("Username is:", username);
        } catch (error) {
          console.error("Error parsing user object from localStorage:", error);
        }
      } else {
        console.warn("No user found in localStorage.");
      }

      const fetchUserIdAndDetails = async () => {
        if (!username) {
          console.error("Username not found in localStorage.");
          setInternalHealthStep(2); // If no user, go to form
          return;
        }

        try {
          // Fetch userId
          const userRes = await fetch(`http://localhost:8093/api/user-role/id-by-username/${username}`);
          if (!userRes.ok) throw new Error("Failed to fetch user ID");
          const userData = await userRes.json();
          console.log("Fetched user ID:", userData);
          const currentUserId = userData.userId;
          setUserId(currentUserId);

          // Now fetch personal details using the userId
          const detailsRes = await fetch(`http://localhost:8093/api/personal-details/get-by-user-id/${currentUserId}`);
          if (!detailsRes.ok && detailsRes.status !== 404) { // 404 means no details found, which is expected
            throw new Error(`Failed to fetch personal details: ${detailsRes.status}`);
          }

          if (detailsRes.status === 404) {
            console.log("No personal details found for this user. Showing form.");
            setDetailsExists(false);
            setInternalHealthStep(2); // Show the form
          } else {
            const fetchedData = await detailsRes.json();
            console.log("Fetched personal details:", fetchedData);
            setFetchedUserDetails(fetchedData); // Store fetched data
            setDetailsExists(true); // Indicate that details exist

            // Pre-fill form states with fetched data
            setFirstName(fetchedData.firstName || "");
            setLastName(fetchedData.lastName || "");
            setEmail(fetchedData.email || "");
            setPhone(fetchedData.phoneNumber || "");
            setDob(fetchedData.dateOfBirth || "");
            setGender(fetchedData.gender || "");
            setAddress(fetchedData.address || "");
            setCity(fetchedData.city || "");
            setPincode(fetchedData.pincode || "");

            // Skip to review if details exist and user is starting health policy flow
            // Only if selectedPolicyType is 'health' and we are at step 2 (Application Details)
            if (type === 'health' && internalHealthStep === 2) {
                 setInternalHealthStep(3); // Go directly to review
            } else {
                setInternalHealthStep(2); // Stay at plans if not health or not at step 2
            }
          }
        } catch (err) {
          console.error("Error in fetching user ID or details:", err);
          alert("Error fetching user data. Please try again.");
          setDetailsExists(false);
          setInternalHealthStep(2); // On error, show the form
        }
      };

      // Only run this effect when selectedPolicyType is 'health' and userId is null (initial load)
      // or when the component mounts and we need to check for existing details.
      if (selectedPolicy === 'health' && !userId && internalHealthStep === 1) { // Ensure we only try to fetch if userId is not yet set and at the first step
          fetchUserIdAndDetails();
      } else if (selectedPolicy === 'health' && detailsExists) { // If details were already fetched and we are on health policy, go to step 3
          setInternalHealthStep(3);
      }
    }, [location.search, selectedPolicyType, userId, selectedPolicy]); // Added selectedPolicy to dependencies

    const healthPlans = [
      {
        id: "individual",
        name: "Individual Health Plan",
        price: "₹3,500",
        coverage: "₹5,00,000",
        features: [
          "Individual coverage",
          "Pre & Post hospitalization",
          "Day care procedures",
          "Ambulance charges",
          "Annual health check-up",
        ],
        popular: false,
      },
      {
        id: "family",
        name: "Family Floater Plan",
        price: "₹8,500",
        coverage: "₹10,00,000",
        features: [
          "Covers entire family",
          "Shared sum insured",
          "Maternity coverage",
          "Child vaccination",
          "Critical illness cover",
          "Worldwide emergency",
        ],
        popular: true,
      },
      {
        id: "senior",
        name: "Senior Citizen Plan",
        price: "₹12,000",
        coverage: "₹7,00,000",
        features: [
          "Age up to 80 years",
          "No medical check-up",
          "Pre-existing diseases covered",
          "Home nursing",
          "Ayurveda treatment",
        ],
        popular: false,
      },
    ];

    // Function to find the selected plan details
    const getSelectedPlanDetails = () => {
      return healthPlans.find((plan) => plan.id === selectedPlanLocal);
    };

    // Combined data object for review or submission
    const formData = fetchedUserDetails && detailsExists ? { // Use fetched details if available
      selectedPlan: getSelectedPlanDetails(),
      firstName: fetchedUserDetails.firstName,
      lastName: fetchedUserDetails.lastName,
      email: fetchedUserDetails.email,
      phone: fetchedUserDetails.phoneNumber,
      dob: fetchedUserDetails.dateOfBirth,
      gender: fetchedUserDetails.gender,
      address: fetchedUserDetails.address,
      city: fetchedUserDetails.city,
      pincode: fetchedUserDetails.pincode,
      familyMembers: fetchedUserDetails.familyMembers || "", // Assuming these might not always be in backend
      sumInsured: fetchedUserDetails.sumInsured || "",
    } : { // Otherwise use current form states
      selectedPlan: getSelectedPlanDetails(),
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      address,
      city,
      pincode,
      familyMembers,
      sumInsured,
    };

    console.log(userId);
    

    // Internal step navigation for Health Insurance
    const handleNextInternalHealthStep = async () => {
      if (internalHealthStep === 2 && !detailsExists) { // Only submit form if details were NOT pre-fetched
        await SubmitForm(); // Wait for form submission before proceeding
      }
      setInternalHealthStep((prevStep) => {
        const nextStep = prevStep + 1;
        // If we've reached the final confirmation step within Health (step 4),
        // notify the parent Policy component.
        if (nextStep === 5) {
          onApplicationComplete();
        }
        
        return nextStep;
      });
    };

    const handlePreviousInternalHealthStep = () => {
      setInternalHealthStep((prevStep) => prevStep - 1);
    };
    
    

    const SubmitForm = async () => {
      const data = {
        userId: userId,
        // policyType: selectedPolicyType, // Policy type might be handled separately or added here
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phone,
        dateOfBirth: dob,
        gender: gender,
        address: address,
        city: city,
        pincode: pincode,
        familyMembers: familyMembers,
        sumInsured: sumInsured,
      }
      // Replace with your backend API URL
      console.log("Submitting data before api:", data);
      const apiUrl = 'http://localhost:8093/api/personal-details/save';
  
      try {
          const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  // Add any authentication headers if required, e.g., 'Authorization': 'Bearer YOUR_TOKEN'
              },
              body: JSON.stringify(data)
          });
  
          if (!response.ok) {
              const errorText = await response.text();
              console.error('Failed to save personal details:', response.status, errorText);
              alert(`Error: ${response.status} - ${errorText}`);
              return null;
          }
  
          const responseData = await response.json();
          console.log('Personal details saved successfully:', responseData);
          alert('Personal details saved successfully!');
          setDetailsExists(true); // Set this to true to indicate details are saved
          setFetchedUserDetails(responseData); // Update fetched details with the newly saved data
          return responseData;
  
      } catch (error) {
          console.error('Error sending personal details............:', error);
          alert('An unexpected error occurred while sending data.');
          return null;
      }
    };

    // Helper to calculate progress for an internal progress bar
    // If you have a separate ProgressBar component, you can pass this value to it.
    const calculateProgress = () => {
      const totalSteps = 4; // Plans, Personal Info, Review, Confirmation
      return (internalHealthStep / totalSteps) * 100;
    };

    return (
      <div className="space-y-8">
        {/* Optional: Internal Progress Bar for Health Insurance */}
        {/* You'll need to define or import aProgressBar component */}
        {/* Example: <ProgressBar progress={calculateProgress()} /> */}

        {/* Step 1: Health Plan Selection */}
        {internalHealthStep === 1 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {healthPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                    selectedPlanLocal === plan.id
                      ? "ring-2 ring-insurance-primary shadow-lg"
                      : ""
                  }`}
                  onClick={() => setSelectedPlanLocal(plan.id)}
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
                      <div className="text-3xl font-bold text-insurance-primary">
                        {plan.price}
                      </div>
                      <p className="text-muted-foreground">per year</p>
                      <div className="text-lg font-semibold">
                        Coverage: {plan.coverage}
                      </div>
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
                            ? "bg-insurance-primary hover:bg-insurance-dark shadow-lg hover:shadow-xl"
                            : "bg-gray-700 hover:bg-gray-800"
                        }`}
                        onClick={() => {
                          setSelectedPlanLocal(plan.id);
                          handleNextInternalHealthStep(); // Move to the next step (Personal Information)
                        }}
                      >
                        Choose Plan
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-center mb-8">
                    Why Choose Our Health Insurance?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-4xl mb-4">🏥</div>
                      <h4 className="font-semibold mb-2">5000+ Hospitals</h4>
                      <p className="text-muted-foreground">
                        Cashless treatment across India
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-4">⚡</div>
                      <h4 className="font-semibold mb-2">Quick Claims</h4>
                      <p className="text-muted-foreground">
                        Hassle-free claim settlement
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-4">📞</div>
                      <h4 className="font-semibold mb-2">24/7 Support</h4>
                      <p className="text-muted-foreground">
                        Round the clock assistance
                      </p>
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


        {internalHealthStep === 2 && (
            detailsExists ? (
                <Card className="shadow-lg rounded-xl">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center py-8">
                            <h2 className="text-xl font-bold text-foreground mb-4">
                                Your details are already on file!
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                We've pre-filled your application with your existing information.
                            </p>
                            <Button
                                className="bg-insurance-primary hover:bg-insurance-dark"
                                onClick={() => setInternalHealthStep(3)} // Directly move to review step
                            >
                                Continue to Review
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card className="shadow-lg rounded-xl"> {/* Added rounded-xl for consistency */}
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    placeholder="Enter your first name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Enter your last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    placeholder="Enter your phone number (e.g., 9876543210)"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="dob">Date of Birth</Label>
                                <Input
                                    id="dob"
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="gender">Gender</Label>
                                <Select value={gender} onValueChange={setGender}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                placeholder="Enter your complete address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    placeholder="Enter your city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="pincode">Pin Code</Label>
                                <Input
                                    id="pincode"
                                    placeholder="Enter pin code (e.g., 400001)"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="familyMembers">Number of Family Members</Label>
                            <Select value={familyMembers} onValueChange={setFamilyMembers}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select number of members" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 (Self)</SelectItem>
                                    <SelectItem value="2">2 (Self + Spouse)</SelectItem>
                                    <SelectItem value="3">
                                        3 (Self + Spouse + 1 Child)
                                    </SelectItem>
                                    <SelectItem value="4">
                                        4 (Self + Spouse + 2 Children)
                                    </SelectItem>
                                    <SelectItem value="5+">5 or more</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="sumInsured">Preferred Sum Insured</Label>
                            <Select value={sumInsured} onValueChange={setSumInsured}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select coverage amount" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="300000">₹3,00,000</SelectItem>
                                    <SelectItem value="500000">₹5,00,000</SelectItem>
                                    <SelectItem value="1000000">₹10,00,000</SelectItem>
                                    <SelectItem value="1500000">₹15,00,000</SelectItem>
                                    <SelectItem value="2000000">₹20,00,000</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex space-x-4 pt-4">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={handlePreviousInternalHealthStep}
                            >
                                Back to Plans
                            </Button>
                            <Button
                                className="flex-1 bg-insurance-primary hover:bg-insurance-dark" // Tailwind classes for your button color
                                onClick={handleNextInternalHealthStep}
                            >
                                Continue to Preview
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )
        )}

        {/* Step 3: Review Your Application */}
        {internalHealthStep === 3 && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Review Your Application</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Selected Plan</h3>
                {formData.selectedPlan ? (
                  <>
                    <p className="text-insurance-primary font-bold">
                      {formData.selectedPlan.name} -{" "}
                      {formData.selectedPlan.price}/year
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Coverage: {formData.selectedPlan.coverage}
                    </p>
                  </>
                ) : (
                  <p className="text-muted-foreground">No plan selected.</p>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Personal Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <p>
                      {formData.firstName} {formData.lastName}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p>{formData.email}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone:</span>
                    <p>{formData.phone}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Date of Birth:
                    </span>
                    <p>{formData.dob}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Gender:</span>
                    <p>{formData.gender}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Address:</span>
                    <p>{formData.address}</p>
                    <p>
                      {formData.city}, {formData.pincode}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Family Members:
                    </span>
                    <p>{formData.familyMembers || "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Preferred Sum Insured:
                    </span>
                    <p>{formData.sumInsured || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handlePreviousInternalHealthStep}
                  
                >
                  Back to Edit
                </Button>
                <Button
                  className="flex-1 bg-insurance-primary hover:bg-insurance-dark"
                  onClick={() => {
                    if (!detailsExists) { // Only submit form if details were NOT pre-fetched
                        SubmitForm(); 
                    }
                    console.log("Final Application Data:", formData);
                    handleNextInternalHealthStep(); // Move to the confirmation/payment step (step 4)
                  }}
                >
                  Confirm & Pay
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Application Submitted Confirmation */}
        {internalHealthStep === 4 && (
          <Card className="shadow-lg">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Application Submitted!
              </h2>
              <p className="text-muted-foreground mb-6">
                Your policy application has been received and is being
                processed.
              </p>
              <Button className="bg-insurance-primary hover:bg-insurance-dark">
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

 
  // Props for the ProductInsuranceContent component
  interface ProductInsuranceContentProps {
    onApplicationComplete: () => void; // Callback to notify the parent when this application is complete
  }

  const ProductInsuranceContent = ({
    onApplicationComplete,
  }: ProductInsuranceContentProps) => {
    // internalProductStep manages the sub-flow within ProductInsuranceContent:
    // 1: Product Selection & Form Input
    // 2: Review Quote / Premium Display
    // 3: Confirmation (Application Submitted)
    const [internalProductStep, setInternalProductStep] = useState(1);

    // State for all form inputs
    const [productFormData, setProductFormData] = useState({
      productCategory: "",
      brand: "",
      purchaseDate: "",
      productValue: "",
      coveragePeriod: "",
    });

    // Data for product categories displayed on Step 1
    const productCategories = [
      {
        icon: <Smartphone className="h-12 w-12 text-insurance-primary" />,
        title: "Mobile & Electronics",
        description: "Smartphones, tablets, earphones",
        coverage: "Accidental damage, liquid damage, theft",
      },
      {
        icon: <Laptop className="h-12 w-12 text-insurance-primary" />,
        title: "Laptops & Computers",
        description: "Laptops, desktops, accessories",
        coverage: "Hardware failure, accidental damage",
      },
      {
        icon: <Home className="h-12 w-12 text-insurance-primary" />,
        title: "Home Appliances",
        description: "TV, refrigerator, washing machine",
        coverage: "Breakdown, electrical surge, repair",
      },
      {
        icon: <Camera className="h-12 w-12 text-insurance-primary" />,
        title: "Photography Equipment",
        description: "Cameras, lenses, drones",
        coverage: "Accidental damage, theft, breakdown",
      },
    ];

    // Handler for generic text input changes
    const handleProductInputChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const { id, value } = e.target;
      setProductFormData((prev) => ({ ...prev, [id]: value }));
    };

    // Handler for select input changes (dropdowns)
    const handleProductSelectChange = (value: string, id: string) => {
      setProductFormData((prev) => ({ ...prev, [id]: value }));
    };

    // Function to transition to the Review Quote step (internal step 2)
    const handleCalculatePremium = () => {
      // In a real application, you'd send productFormData to your backend to calculate the premium.
      console.log("Calculating premium for:", productFormData);
      setInternalProductStep(2); // Move to the "Review/Premium Display" step
    };

    // Function to confirm the policy and notify the parent of completion
    const handleConfirmProductPolicy = () => {
      console.log("Confirming Product Policy:", productFormData);
      // 1. First, update the internal step to show the final confirmation screen (Step 3).
      setInternalProductStep(3);
      // 2. Then, after the internal state has updated, notify the parent component
      //    that this specific application flow is complete.
      //    The parent can then decide to advance its overall application step.
      onApplicationComplete();
    };

    // Helper to get the display title for the product category in the review step
    const getProductCategoryTitle = (categoryValue: string) => {
      const foundCategory = productCategories.find(
        (cat) => cat.title === categoryValue
      );
      return foundCategory ? foundCategory.title : categoryValue;
    };

    // --- Conditional Rendering based on internalProductStep ---

    // Render Step 2: Review Your Product Insurance Quote
    if (internalProductStep === 2) {
      return (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Review Your Product Insurance Quote</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Quote Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">
                    Product Category:
                  </span>
                  <p>
                    {getProductCategoryTitle(productFormData.productCategory)}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Brand:</span>
                  <p>{productFormData.brand}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Purchase Date:</span>
                  <p>{productFormData.purchaseDate}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Product Value:</span>
                  <p>{productFormData.productValue}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Coverage Period:
                  </span>
                  <p>{productFormData.coveragePeriod}</p>
                </div>
              </div>
              <div className="mt-4 text-xl font-bold text-insurance-primary">
                Estimated Premium: ₹1,200/year{" "}
                {/* Placeholder for calculated premium */}
              </div>
            </div>
            <div className="flex space-x-4 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setInternalProductStep(1)} // Go back to the form
              >
                Edit Details
              </Button>
              <Button
                className="flex-1 bg-insurance-primary hover:bg-insurance-dark"
                onClick={handleConfirmProductPolicy}
              >
                Confirm & Pay
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Render Step 3: Application Submitted Confirmation
    if (internalProductStep === 3) {
      return (
        <Card className="shadow-lg">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Application Submitted!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your product insurance policy application has been received and is
              being processed.
            </p>
            <Button className="bg-insurance-primary hover:bg-insurance-dark">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      );
    }

    // Default Render: Step 1 (Product Selection and Form Input)
    return (
      <div className="space-y-8">
        {/* Product Categories Display Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productCategories.map((category, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">{category.icon}</div>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-3">
                  {category.description}
                </p>
                <p className="text-sm text-insurance-primary font-semibold">
                  {category.coverage}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Product Insurance Quote Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Get Product Insurance Quote</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Category
                </label>
                <Select
                  onValueChange={(value) =>
                    handleProductSelectChange(value, "productCategory")
                  }
                  value={productFormData.productCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product category" />
                  </SelectTrigger>
                  <SelectContent>
                    {productCategories.map((cat) => (
                      <SelectItem key={cat.title} value={cat.title}>
                        {cat.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Brand</label>
                <Input
                  placeholder="e.g., Apple, Samsung, Sony"
                  id="brand"
                  value={productFormData.brand}
                  onChange={handleProductInputChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    type="date"
                    id="purchaseDate"
                    value={productFormData.purchaseDate}
                    onChange={handleProductInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="productValue">Product Value</Label>
                  <Input
                    placeholder="₹50,000"
                    id="productValue"
                    value={productFormData.productValue}
                    onChange={handleProductInputChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="coveragePeriod">Coverage Period</Label>
                <Select
                  onValueChange={(value) =>
                    handleProductSelectChange(value, "coveragePeriod")
                  }
                  value={productFormData.coveragePeriod}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select coverage period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 Year">1 Year</SelectItem>
                    <SelectItem value="2 Years">2 Years</SelectItem>
                    <SelectItem value="3 Years">3 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full bg-insurance-primary hover:bg-insurance-dark"
                onClick={handleCalculatePremium}
              >
                Calculate Premium
              </Button>
            </CardContent>
          </Card>

          {/* What's Covered & Not Covered Sections */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">What's Covered?</h3>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-green-700 mb-3">✓ Covered</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Accidental damage including drops and spills</li>
                  <li>• Liquid damage and water exposure</li>
                  <li>• Electrical and mechanical breakdown</li>
                  <li>• Theft and burglary</li>
                  <li>• Screen damage and internal component failure</li>
                  <li>• Power surge damage</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-red-700 mb-3">
                  ✗ Not Covered
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>• Intentional damage</li>
                  <li>• War, nuclear risks</li>
                  <li>• Normal wear and tear</li>
                  <li>• Cosmetic damage not affecting functionality</li>
                  <li>• Damage due to software issues</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Simple Claim Process Section */}
        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-8">
              Simple Claim Process
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-insurance-primary">
                    1
                  </span>
                </div>
                <h4 className="font-semibold mb-2">Report Damage</h4>
                <p className="text-muted-foreground">
                  Call our helpline or file claim online
                </p>
              </div>
              <div className="text-center">
                <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-insurance-primary">
                    2
                  </span>
                </div>
                <h4 className="font-semibold mb-2">Assessment</h4>
                <p className="text-muted-foreground">
                  Our expert will assess the damage
                </p>
              </div>
              <div className="text-center">
                <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-insurance-primary">
                    3
                  </span>
                </div>
                <h4 className="font-semibold mb-2">Approval</h4>
                <p className="text-muted-foreground">
                  Quick claim approval process
                </p>
              </div>
              <div className="text-center">
                <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-insurance-primary">
                    4
                  </span>
                </div>
                <h4 className="font-semibold mb-2">Repair/Replace</h4>
                <p className="text-muted-foreground">
                  Get your product repaired or replaced
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderPolicyContent = () => {
    switch (selectedPolicy) {
      case "motor":
        return <MotorInsuranceContent />;
      case "health":
        // Pass a callback to update the overall step when Health application is complete
        return (
          <HealthInsuranceContent
            onApplicationComplete={() => setCurrentOverallStep(4)}
          />
        );
      case "product":
        return <ProductInsuranceContent />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Use the new overallProcessSteps for ProcessFlow */}
      <ProcessFlow
        currentStep={currentOverallStep}
        steps={overallProcessSteps}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Buy New Policy</h1>
          <p className="text-muted-foreground">
            Start by choosing the type of insurance you need.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {policyTypes.map((policy) => (
            <Card
              key={policy.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedPolicy === policy.id
                  ? "ring-2 ring-insurance-primary bg-insurance-light/10"
                  : "hover:shadow-md"
              }`}
              onClick={() => handlePolicySelect(policy.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{policy.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{policy.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {policy.description}
                </p>
                <Button
                  className={`w-full ${
                    selectedPolicy === policy.id
                      ? "bg-insurance-primary"
                      : "bg-insurance-secondary hover:bg-insurance-primary"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePolicySelect(policy.id);
                  }}
                >
                  Get Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedPolicy && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                {policyTypes.find((p) => p.id === selectedPolicy)?.title}
              </h2>
              <p className="text-muted-foreground text-lg">
                {policyTypes.find((p) => p.id === selectedPolicy)?.description}
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
