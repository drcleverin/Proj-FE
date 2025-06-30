import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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

interface HealthPersonalInfoStepProps {
    onNext: (data: PersonalDetails) => void;
    onPrevious: () => void;
    initialData?: PersonalDetails;
}

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
    familyMembers: "",
    sumInsured: "",
};

const HealthPersonalInfoStep: React.FC<HealthPersonalInfoStepProps> = ({ onNext, onPrevious, initialData }) => {
    const [formData, setFormData] = useState<PersonalDetails>(initialData || defaultFormData);

    // useEffect(() => {
    //     const userStr = localStorage.getItem("user");
    //     console.log("User String from Local Storage:", userStr);
    //     if (userStr) {
    //         const user = JSON.parse(localStorage.getItem("user"));
    //         const userId = user.userId;
    //         console.log("User ID:", userId);
    //         axios.get(`http://localhost:8093/api/personal-details/user/${userId}`)
    //             .then(res => {
    //                 if (res.data) {
    //                     const updatedFormData = {
    //                         ...defaultFormData,
    //                         ...res.data,
    //                         phoneNumber: res.data.phoneNumber ?? "",
    //                         dateOfBirth: res.data.dateOfBirth ? res.data.dateOfBirth.substring(0, 10) : "",
    //                         pinCode: res.data.pinCode ?? "",
    //                     };
    //                     setFormData(updatedFormData);
                        
    //                 } else {
    //                     setFormData(defaultFormData);
    //                     console.log("Fetched Personal Details: No data, using defaultFormData");
    //                 }
    //             })
    //             .catch(() => {
    //                 setFormData(defaultFormData);
    //                 console.log("Fetched Personal Details: Error, using defaultFormData");
    //             });
    //     }
    // }, []);
const userStr = localStorage.getItem("user");
  useEffect(() => {
    

    if (!userStr) return;

    try {
        // First parse
        let userParsed = JSON.parse(userStr);

        // If the result is STILL a string, parse again
        if (typeof userParsed === "string") {
            userParsed = JSON.parse(userParsed);
        }

        const userId = userParsed.userId +0;

        if (userId) {
            axios.get(`http://localhost:8093/api/personal-details/user/${userId}`)
                .then(res => {
                    const data = res.data;
                    if (data) {
                        const updatedFormData = {
                            ...defaultFormData,
                            ...data,
                            phoneNumber: data.phoneNumber ?? "",
                            dateOfBirth: data.dateOfBirth?.substring(0, 10) ?? "",
                            pinCode: data.pinCode ?? ""
                        };
                        setFormData(updatedFormData);
                    }
                })
                .catch(() => {
                    console.log("Error fetching personal details. Using default.");
                    setFormData(defaultFormData);
                });
        }
    } catch (e) {
        console.error("Error parsing user data from localStorage", e);
    }
}, []);




    console.log("Fetched Personal Details:", formData);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSelectChange = (field: keyof PersonalDetails, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input id="phoneNumber" placeholder="Enter your phone number" value={formData.phoneNumber} onChange={handleChange} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor="gender">Gender</Label>
                        <select
                            id="gender"
                            className="w-full border rounded px-3 py-2"
                            value={formData.gender}
                            onChange={e => handleSelectChange("gender", e.target.value)}
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="Unknown">Unknown</option>
                        </select>
                    </div>
                </div>

                <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Enter your complete address" value={formData.address} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Enter your city" value={formData.city} onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor="pinCode">Pin Code</Label>
                        <Input id="pinCode" placeholder="Enter pin code" value={formData.pinCode} onChange={handleChange} />
                    </div>
                </div>

                {/* <div>
                    <Label htmlFor="familyMembers">Number of Family Members</Label>
                    <select
                        id="familyMembers"
                        className="w-full border rounded px-3 py-2"
                        value={formData.familyMembers}
                        onChange={(e) => handleSelectChange("familyMembers", e.target.value)}
                    >
                        <option value="">Select number of members</option>
                        <option value="1">1 (Self)</option>
                        <option value="2">2 (Self + Spouse)</option>
                        <option value="3">3 (Self + Spouse + 1 Child)</option>
                        <option value="4">4 (Self + Spouse + 2 Children)</option>
                        <option value="5+">5 or more</option>
                    </select>
                </div>

                <div>
                    <Label htmlFor="sumInsured">Preferred Sum Insured</Label>
                    <select
                        id="sumInsured"
                        className="w-full border rounded px-3 py-2"
                        value={formData.sumInsured}
                        onChange={(e) => handleSelectChange("sumInsured", e.target.value)}
                    >
                        <option value="">Select coverage amount</option>
                        <option value="300000">₹3,00,000</option>
                        <option value="500000">₹5,00,000</option>
                        <option value="1000000">₹10,00,000</option>
                        <option value="1500000">₹15,00,000</option>
                        <option value="2000000">₹20,00,000</option>
                    </select>
                </div> */}

                <div className="flex space-x-4 pt-4">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={onPrevious}
                    >
                        Back to Plans
                    </Button>
                    <Button
                        className="flex-1 bg-insurance-primary hover:bg-insurance-dark"
                        onClick={() => onNext(formData)}
                    >
                        Continue to Preview
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default HealthPersonalInfoStep;
