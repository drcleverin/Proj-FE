
// src/components/MotorPersonalInfo.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios"; // Import axios

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


// Default initial state for personal details
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

// Define props for the component
interface MotorPersonalInfoProps {
  personalFormData: PersonalDetailsOnly;
  setPersonalFormData: (data: PersonalDetailsOnly) => void;
  fetchedVehicle: FetchedVehicleDetails | undefined; // Now explicitly passed
  nextStep: () => void;
  prevStep: () => void;
}

const MotorPersonalInfo: React.FC<MotorPersonalInfoProps> = ({ personalFormData, setPersonalFormData, fetchedVehicle, nextStep, prevStep }) => {
  // Use local state initially and then sync with parent personalFormData
  const [localPersonalFormData, setLocalPersonalFormData] = useState<PersonalDetailsOnly>(personalFormData);

  // Effect to load user data (personal details part) from local storage and API
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return;

    try {
      let userParsed = JSON.parse(userStr);
      if (typeof userParsed === "string") {
        userParsed = JSON.parse(userParsed);
      }

      const userId = userParsed.userId; // Ensure userId is correctly parsed

      if (userId) {
        axios.get(`http://localhost:8093/api/personal-details/user/${userId}`)
          .then(res => {
            const data = res.data;
            if (data) {
              const updatedFormData: PersonalDetailsOnly = {
                firstName: data.firstName ?? "",
                lastName: data.lastName ?? "",
                email: data.email ?? "",
                phoneNumber: data.phoneNumber ?? "",
                dateOfBirth: data.dateOfBirth ? data.dateOfBirth.substring(0, 10) : "", // Ensure format
                gender: data.gender ?? "",
                address: data.address ?? "",
                city: data.city ?? "",
                pinCode: data.pinCode ?? "",
              };
              setLocalPersonalFormData(updatedFormData);
            }
          })
          .catch(error => {
            console.error("Error fetching personal details:", error);
            // If error, proceed with existing localFormData or default
            setLocalPersonalFormData(localPersonalFormData);
          });
      }
    } catch (e) {
      console.error("Error parsing user data from localStorage", e);
    }
  }, []); // Empty dependency array means this runs once on mount

  // Sync localPersonalFormData with parent personalFormData when localPersonalFormData changes
  useEffect(() => {
    setPersonalFormData(localPersonalFormData);
  }, [localPersonalFormData, setPersonalFormData]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLocalPersonalFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: keyof PersonalDetailsOnly, value: string) => {
    setLocalPersonalFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation for required personal fields before proceeding
    if (localPersonalFormData.firstName && localPersonalFormData.email && localPersonalFormData.phoneNumber &&
        localPersonalFormData.dateOfBirth && localPersonalFormData.gender && localPersonalFormData.address &&
        localPersonalFormData.city && localPersonalFormData.pinCode) {
      nextStep();
    } else {
      alert("Please fill in all required personal details."); // Use custom modal in production
    }
  };

  return (
    <Card className="max-w-3xl mx-auto p-6 rounded-lg shadow-xl bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-bold text-center text-insurance-primary">Your Personal Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Display Fetched Vehicle Details (Read-only) */}
        {fetchedVehicle && (
          <div className="mb-6 p-4 border border-blue-200 bg-blue-50 rounded-md">
            <h4 className="text-lg font-semibold text-blue-700 mb-2">Confirmed Vehicle Details:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                <p><strong>Registration No:</strong> {fetchedVehicle.registrationNumber}</p>
                <p><strong>Make:</strong> {fetchedVehicle.make}</p>
                <p><strong>Model:</strong> {fetchedVehicle.model}</p>
                <p><strong>Year:</strong> {fetchedVehicle.year}</p>
                <p><strong>Fuel Type:</strong> {fetchedVehicle.fuelType}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="firstName" className="text-md font-medium text-gray-700">First Name</Label>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                value={localPersonalFormData.firstName}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-insurance-primary focus:border-insurance-primary"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-md font-medium text-gray-700">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Enter your last name"
                value={localPersonalFormData.lastName}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-insurance-primary focus:border-insurance-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="email" className="text-md font-medium text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={localPersonalFormData.email}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-insurance-primary focus:border-insurance-primary"
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber" className="text-md font-medium text-gray-700">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={localPersonalFormData.phoneNumber}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-insurance-primary focus:border-insurance-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="dateOfBirth" className="text-md font-medium text-gray-700">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={localPersonalFormData.dateOfBirth}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-insurance-primary focus:border-insurance-primary"
              />
            </div>
            <div>
              <Label htmlFor="gender" className="text-md font-medium text-gray-700">Gender</Label>
              <select
                id="gender"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-insurance-primary focus:border-insurance-primary bg-white"
                value={localPersonalFormData.gender}
                onChange={e => handleSelectChange("gender", e.target.value)}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="Unknown">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="address" className="text-md font-medium text-gray-700">Address</Label>
            <Input
              id="address"
              placeholder="Enter your complete address"
              value={localPersonalFormData.address}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-insurance-primary focus:border-insurance-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="city" className="text-md font-medium text-gray-700">City</Label>
              <Input
                id="city"
                placeholder="Enter your city"
                value={localPersonalFormData.city}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-insurance-primary focus:border-insurance-primary"
              />
            </div>
            <div>
              <Label htmlFor="pinCode" className="text-md font-medium text-gray-700">Pin Code</Label>
              <Input
                id="pinCode"
                placeholder="Enter pin code"
                value={localPersonalFormData.pinCode}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-insurance-primary focus:border-insurance-primary"
              />
            </div>
          </div>

          <CardFooter className="flex justify-between items-center px-0 pb-0 pt-4">
            <Button
              type="button"
              onClick={prevStep}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-md py-2 px-6 transition duration-300"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="bg-insurance-primary hover:bg-insurance-dark text-white rounded-md py-2 px-6 transition duration-300"
            >
              Next: Review
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default MotorPersonalInfo;

