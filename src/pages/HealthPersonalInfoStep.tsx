// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";

// interface PersonalDetails {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phoneNumber: string;
//     dateOfBirth: string;
//     gender: string;
//     address: string;
//     city: string;
//     pinCode: string;
//     familyMembers: string;
//     sumInsured: string;
// }

// interface HealthPersonalInfoStepProps {
//     onNext: (data: PersonalDetails) => void;
//     onPrevious: () => void;
//     initialData?: PersonalDetails;
// }

// const defaultFormData: PersonalDetails = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     dateOfBirth: "",
//     gender: "",
//     address: "",
//     city: "",
//     pinCode: "",
//     familyMembers: "",
//     sumInsured: "",
// };

// const HealthPersonalInfoStep: React.FC<HealthPersonalInfoStepProps> = ({ onNext, onPrevious, initialData }) => {
//     const [formData, setFormData] = useState<PersonalDetails>(initialData || defaultFormData);

//     // useEffect(() => {
//     //     const userStr = localStorage.getItem("user");
//     //     console.log("User String from Local Storage:", userStr);
//     //     if (userStr) {
//     //         const user = JSON.parse(localStorage.getItem("user"));
//     //         const userId = user.userId;
//     //         console.log("User ID:", userId);
//     //         axios.get(`http://localhost:8093/api/personal-details/user/${userId}`)
//     //             .then(res => {
//     //                 if (res.data) {
//     //                     const updatedFormData = {
//     //                         ...defaultFormData,
//     //                         ...res.data,
//     //                         phoneNumber: res.data.phoneNumber ?? "",
//     //                         dateOfBirth: res.data.dateOfBirth ? res.data.dateOfBirth.substring(0, 10) : "",
//     //                         pinCode: res.data.pinCode ?? "",
//     //                     };
//     //                     setFormData(updatedFormData);
                        
//     //                 } else {
//     //                     setFormData(defaultFormData);
//     //                     console.log("Fetched Personal Details: No data, using defaultFormData");
//     //                 }
//     //             })
//     //             .catch(() => {
//     //                 setFormData(defaultFormData);
//     //                 console.log("Fetched Personal Details: Error, using defaultFormData");
//     //             });
//     //     }
//     // }, []);
// const userStr = localStorage.getItem("user");
//   useEffect(() => {
    

//     if (!userStr) return;

//     try {
//         // First parse
//         let userParsed = JSON.parse(userStr);

//         // If the result is STILL a string, parse again
//         if (typeof userParsed === "string") {
//             userParsed = JSON.parse(userParsed);
//         }

//         const userId = userParsed.userId +0;

//         if (userId) {
//             axios.get(`http://localhost:8093/api/personal-details/user/${userId}`)
//                 .then(res => {
//                     const data = res.data;
//                     if (data) {
//                         const updatedFormData = {
//                             ...defaultFormData,
//                             ...data,
//                             phoneNumber: data.phoneNumber ?? "",
//                             dateOfBirth: data.dateOfBirth?.substring(0, 10) ?? "",
//                             pinCode: data.pinCode ?? ""
//                         };
//                         setFormData(updatedFormData);
//                     }
//                 })
//                 .catch(() => {
//                     console.log("Error fetching personal details. Using default.");
//                     setFormData(defaultFormData);
//                 });
//         }
//     } catch (e) {
//         console.error("Error parsing user data from localStorage", e);
//     }
// }, []);




//     console.log("Fetched Personal Details:", formData);
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData(prev => ({
//             ...prev,
//             [e.target.id]: e.target.value,
//         }));
//     };

//     const handleSelectChange = (field: keyof PersonalDetails, value: string) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: value,
//         }));
//     };

//     return (
//         <Card className="shadow-lg">
//             <CardHeader>
//                 <CardTitle>Personal Information</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <Label htmlFor="firstName">First Name</Label>
//                         <Input id="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} />
//                     </div>
//                     <div>
//                         <Label htmlFor="lastName">Last Name</Label>
//                         <Input id="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} />
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <Label htmlFor="email">Email</Label>
//                         <Input id="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
//                     </div>
//                     <div>
//                         <Label htmlFor="phoneNumber">Phone Number</Label>
//                         <Input id="phoneNumber" placeholder="Enter your phone number" value={formData.phoneNumber} onChange={handleChange} />
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <Label htmlFor="dateOfBirth">Date of Birth</Label>
//                         <Input id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
//                     </div>
//                     <div>
//                         <Label htmlFor="gender">Gender</Label>
//                         <select
//                             id="gender"
//                             className="w-full border rounded px-3 py-2"
//                             value={formData.gender}
//                             onChange={e => handleSelectChange("gender", e.target.value)}
//                         >
//                             <option value="">Select gender</option>
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>
//                             <option value="other">Other</option>
//                             <option value="Unknown">Unknown</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div>
//                     <Label htmlFor="address">Address</Label>
//                     <Input id="address" placeholder="Enter your complete address" value={formData.address} onChange={handleChange} />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <Label htmlFor="city">City</Label>
//                         <Input id="city" placeholder="Enter your city" value={formData.city} onChange={handleChange} />
//                     </div>
//                     <div>
//                         <Label htmlFor="pinCode">Pin Code</Label>
//                         <Input id="pinCode" placeholder="Enter pin code" value={formData.pinCode} onChange={handleChange} />
//                     </div>
//                 </div>

                

//                 <div className="flex space-x-4 pt-4">
//                     <Button
//                         variant="outline"
//                         className="flex-1"
//                         onClick={onPrevious}
//                     >
//                         Back to Plans
//                     </Button>
//                     <Button
//                         className="flex-1 bg-insurance-primary hover:bg-insurance-dark"
//                         onClick={() => onNext(formData)}
//                     >
//                         Continue to Preview
//                     </Button>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };

// export default HealthPersonalInfoStep;




import { useEffect, useState } from "react";
import axios from "axios"; // Assuming axios is available or will be provided by the environment
import { Label } from "@/components/ui/label";

// Placeholder components for demonstration if shadcn/ui is not linked
// In a real app, you would use the actual shadcn/ui components.
const Card = ({ children, className }) => (
  <div className={`bg-white shadow-lg rounded-lg ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`p-6 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h2 className={`text-xl font-bold ${className}`}>
    {children}
  </h2>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Input = ({ className, ...props }) => (
  <input className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} {...props} />
);

const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded-md font-semibold text-white ${className}`} {...props}>
    {children}
  </button>
);

// const Label = ({ children, htmlFor, className }) => (
//   <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>
//     {children}
//   </label>
// );

// Interface for personal details data
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
  familyMembers: string; // Not in UI, but in interface
  sumInsured: string; // Not in UI, but in interface
}

// Props interface for the component
interface HealthPersonalInfoStepProps {
  onNext: (data: PersonalDetails) => void;
  onPrevious: () => void;
  initialData?: PersonalDetails;
}

// Default form data to initialize state
const defaultFormData: PersonalDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  city: "",
  pinCode: "",
  familyMembers: "", // Default for non-UI fields
  sumInsured: "", // Default for non-UI fields
};

const HealthPersonalInfoStep: React.FC<HealthPersonalInfoStepProps> = ({ onNext, onPrevious, initialData }) => {
  // State to manage form data
  const [formData, setFormData] = useState<PersonalDetails>(initialData || defaultFormData);
  // State to manage validation errors for each field
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof PersonalDetails, string>>>({});

  // Effect to fetch user data from local storage and API on component mount
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      console.log("No user found in localStorage.");
      return;
    }

    try {
      // Attempt to parse the user string. It might be double-stringified.
      let userParsed;
      try {
        userParsed = JSON.parse(userStr);
      } catch (e) {
        // If first parse fails, try parsing the raw string directly
        userParsed = userStr;
      }

      // If the result is still a string, parse again (handles double stringification)
      if (typeof userParsed === "string") {
        userParsed = JSON.parse(userParsed);
      }

      const userId = userParsed?.userId; // Use optional chaining for safety

      if (userId) {
        axios.get(`http://localhost:8093/api/personal-details/user/${userId}`)
          .then(res => {
            const data = res.data;
            if (data) {
              // Merge fetched data with default form data, ensuring all fields are present
              const updatedFormData = {
                ...defaultFormData, // Start with defaults
                ...data, // Overlay with fetched data
                // Ensure specific fields are strings and correctly formatted
                phoneNumber: data.phoneNumber ? String(data.phoneNumber) : "",
                dateOfBirth: data.dateOfBirth ? String(data.dateOfBirth).substring(0, 10) : "", // Format date for input type="date"
                pinCode: data.pinCode ? String(data.pinCode) : "",
              };
              setFormData(updatedFormData);
              console.log("Fetched Personal Details:", updatedFormData);
            } else {
              setFormData(defaultFormData);
              console.log("Fetched Personal Details: No data, using defaultFormData");
            }
          })
          .catch(error => {
            console.error("Error fetching personal details:", error);
            setFormData(defaultFormData);
            console.log("Fetched Personal Details: Error, using defaultFormData");
          });
      } else {
        console.log("User ID not found in parsed user data.");
      }
    } catch (e) {
      console.error("Error parsing user data from localStorage", e);
    }
  }, []); // Empty dependency array means this effect runs once on mount

  /**
   * Handles changes to input fields and updates the form data state.
   * Clears the validation error for the changed field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
    // Clear validation error for this field as user types
    setValidationErrors(prev => ({
      ...prev,
      [id]: undefined,
    }));
  };

  /**
   * Handles changes to select elements and updates the form data state.
   * Clears the validation error for the changed field.
   * @param {keyof PersonalDetails} field - The name of the field being updated.
   * @param {string} value - The new value for the field.
   */
  const handleSelectChange = (field: keyof PersonalDetails, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear validation error for this field as user types
    setValidationErrors(prev => ({
      ...prev,
      [field]: undefined,
    }));
  };

  /**
   * Validates all form fields and sets appropriate error messages.
   * @returns {boolean} True if all fields are valid, false otherwise.
   */
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof PersonalDetails, string>> = {};
    let isValid = true;

    // First Name validation
    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required.";
      isValid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required.";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format.";
      isValid = false;
    }

    // Phone Number validation
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required.";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone Number must be 10 digits.";
      isValid = false;
    }

    // Date of Birth validation
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Date of Birth is required.";
      isValid = false;
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      if (age < 18) {
        errors.dateOfBirth = "You must be at least 18 years old.";
        isValid = false;
      }
    }

    // Gender validation
    if (!formData.gender) {
      errors.gender = "Gender is required.";
      isValid = false;
    }

    // Address validation
    if (!formData.address.trim()) {
      errors.address = "Address is required.";
      isValid = false;
    }

    // City validation
    if (!formData.city.trim()) {
      errors.city = "City is required.";
      isValid = false;
    }

    // Pin Code validation
    if (!formData.pinCode.trim()) {
      errors.pinCode = "Pin Code is required.";
      isValid = false;
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      errors.pinCode = "Pin Code must be 6 digits.";
      isValid = false;
    }

    setValidationErrors(errors); // Update the state with all validation errors
    return isValid;
  };

  /**
   * Handles the click event for the "Continue to Preview" button.
   * Performs validation before calling the onNext prop.
   */
  const handleNextClick = () => {
    if (validateForm()) {
      onNext(formData); // Only proceed if form is valid
    } else {
      console.log("Form validation failed. Please check the errors.");
    }
  };

  return (
    <Card className="shadow-lg rounded-lg p-6 max-w-4xl mx-auto my-8">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name <span className="text-red-600">*</span></Label>
            <Input
              id="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              className={`border ${validationErrors.firstName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {validationErrors.firstName && <p className="text-red-500 text-xs mt-1">{validationErrors.firstName}</p>}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label> <span className="text-red-600">*</span>
            <Input
              id="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              className={`border ${validationErrors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {validationErrors.lastName && <p className="text-red-500 text-xs mt-1">{validationErrors.lastName}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label><span className="text-red-600">*</span>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`border ${validationErrors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label><span className="text-red-600">*</span>
            <Input
              id="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`border ${validationErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
            />
            {validationErrors.phoneNumber && <p className="text-red-500 text-xs mt-1">{validationErrors.phoneNumber}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label><span className="text-red-600">*</span>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`border ${validationErrors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
            />
            {validationErrors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{validationErrors.dateOfBirth}</p>}
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label><span className="text-red-600">*</span>
            <select
              id="gender"
              className={`w-full border rounded px-3 py-2 ${validationErrors.gender ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.gender}
              onChange={e => handleSelectChange("gender", e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="Unknown">Unknown</option>
            </select>
            {validationErrors.gender && <p className="text-red-500 text-xs mt-1">{validationErrors.gender}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="address">Address</Label><span className="text-red-600">*</span>
          <Input
            id="address"
            placeholder="Enter your complete address"
            value={formData.address}
            onChange={handleChange}
            className={`border ${validationErrors.address ? 'border-red-500' : 'border-gray-300'}`}
          />
          {validationErrors.address && <p className="text-red-500 text-xs mt-1">{validationErrors.address}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label><span className="text-red-600">*</span>
            <Input
              id="city"
              placeholder="Enter your city"
              value={formData.city}
              onChange={handleChange}
              className={`border ${validationErrors.city ? 'border-red-500' : 'border-gray-300'}`}
            />
            {validationErrors.city && <p className="text-red-500 text-xs mt-1">{validationErrors.city}</p>}
          </div>
          <div>
            <Label htmlFor="pinCode">Pin Code</Label><span className="text-red-600">*</span>
            <Input
              id="pinCode"
              placeholder="Enter pin code"
              value={formData.pinCode}
              onChange={handleChange}
              className={`border ${validationErrors.pinCode ? 'border-red-500' : 'border-gray-300'}`}
            />
            {validationErrors.pinCode && <p className="text-red-500 text-xs mt-1">{validationErrors.pinCode}</p>}
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <Button
            variant="outline"
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition duration-300 ease-in-out"
            onClick={onPrevious}
          >
            Back to Plans
          </Button>
          <Button
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleNextClick} // Call the new handler
          >
            Continue to Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthPersonalInfoStep;
