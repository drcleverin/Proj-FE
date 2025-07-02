
; // Assuming you have a customer layout
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a textarea component
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast"; // Assuming you have a toast notification system
// import Header from "@/components/Header";
import { CustomerLayout } from "./CustomerLayout";
import Header from "@/components/Header";

interface UserProfile {
  userId: number | null;
  username: string;
  email: string;
}

interface PersonalDetails {
  personalDetailsId?: number; // Optional, for existing records
  userId: number | null; // Link to UserProfile
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string; //YYYY-MM-DD format for input type="date"
  gender: string;
  address: string;
  city: string;
  pinCode: string;
  familyMembers: string; // Placeholder for additional details
  sumInsured: string; // Placeholder for additional details
}

// Helper function to safely get userId from localStorage
const getUserIdFromLocalStorage = (): number | null => {
  try {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const parsedUser = JSON.parse(storedUserData);
      // Ensure parsedUser and parsedUser.userId exist and are valid numbers
      if (parsedUser && typeof parsedUser.userId === 'number') {
        return parsedUser.userId;
      }
    }
  } catch (e) {
    console.error("Error parsing user data from localStorage:", e);
  }
  return null;
};

export default function Profile() {
  const { toast } = useToast();

  // Initialize userId safely at the top
  const initialUserId = getUserIdFromLocalStorage();

  const [userProfile, setUserProfile] = useState<UserProfile>({
    userId: initialUserId, // Use the safely retrieved userId
    username: "",
    email: "",
  });

  const defaultPersonalDetails: PersonalDetails = {
    userId: initialUserId, // Use the safely retrieved userId
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    pinCode: "",
    familyMembers: "",
    sumInsured: "",
  };

  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(defaultPersonalDetails);
  const [isEditing, setIsEditing] = useState(false); // To toggle edit mode

  // API Endpoints (Adjust based on your actual backend routes)
  const API_USER_PROFILE_BASE_URL = "http://localhost:8093/admin/users"; // Base URL for user profiles
  const API_PERSONAL_DETAILS_BASE_URL = "http://localhost:8093/api/personal-details"; // Base URL for personal details

  useEffect(() => {
    // This useEffect block will now primarily handle fetching data
    // based on the userId that was (hopefully) set during initial render.
    // If initialUserId was null, the toast will still trigger.
    if (userProfile.userId) { // Use userProfile.userId directly as it's the state
      fetchUserProfile(userProfile.userId);
      fetchPersonalDetails(userProfile.userId);
    } else {
      toast({
        title: "Error",
        description: "User not logged in or user ID not found. Please log in to view your profile.",
        variant: "destructive",
      });
    }
  }, [userProfile.userId]); // Depend on userProfile.userId to re-fetch if it changes

  /**
   * Fetches the user's basic profile details (username, email) from the backend.
   * @param userId The ID of the current user.
   */
  const fetchUserProfile = async (userId: number) => {
    try {
      const response = await axios.get(`${API_USER_PROFILE_BASE_URL}/${userId}`);
      const userData = response.data;
      setUserProfile(prev => ({
        ...prev, // Keep existing userId if it's already set
        username: userData.username,
        email: userData.email,
        userId: userData.id || prev.userId // Ensure userId is correctly updated from backend or kept
      }));
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast({
        title: "Error",
        description: "Failed to load user profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  /**
   * Fetches the user's personal details from the backend.
   * @param userId The ID of the current user.
   */
  const fetchPersonalDetails = async (userId: number) => {
    try {
      const response = await axios.get(`${API_PERSONAL_DETAILS_BASE_URL}/user/${userId}`);
      const data = response.data;
      if (data) {
        setPersonalDetails({
          ...defaultPersonalDetails, // Start with defaults to ensure all fields are present
          ...data, // Overlay with fetched data
          phoneNumber: data.phoneNumber ? String(data.phoneNumber) : "",
          dateOfBirth: data.dateOfBirth ? String(data.dateOfBirth).substring(0, 10) : "",
          pinCode: data.pinCode ? String(data.pinCode) : "",
          userId: userId, // Ensure userId is correctly linked
        });
        console.log("Fetched Personal Details:", data);
      } else {
        // If no personal details are found, initialize with defaults and the current userId.
        setPersonalDetails({ ...defaultPersonalDetails, userId: userId });
        console.log("No personal details found, using default personal details.");
      }
    } catch (error) {
      console.error("Error fetching personal details:", error);
      // Reset to default on error to prevent displaying stale/incorrect data.
      setPersonalDetails({ ...defaultPersonalDetails, userId: userId });
      toast({
        title: "Error",
        description: "Failed to load personal details. Please try again.",
        variant: "destructive",
      });
    }
  };

  /**
   * Handles changes to the UserProfile input fields (username, email).
   * @param e The change event from the input element.
   */
  const handleUserProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  /**
   * Handles changes to the PersonalDetails input fields.
   * @param e The change event from the input, textarea, or select element.
   */
  const handlePersonalDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setPersonalDetails(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  /**
   * Handles changes for the Select component (gender).
   * @param value The selected value from the Select component.
   */
  const handleGenderChange = (value: string) => {
    setPersonalDetails(prev => ({
      ...prev,
      gender: value,
    }));
  };

  /**
   * Handles the saving of both user profile and personal details.
   * Performs PUT requests to update existing data or POST for new personal details.
   */
  const handleSaveProfile = async () => {
    console.log(userProfile, " is prrr..........")
    if (!userProfile.userId) {
      toast({
        title: "Error",
        description: "User ID is missing. Cannot save profile. Please log in again.",
        variant: "destructive",
      });
      return;
    }

    try {
      // 1. Update User Profile (username, email)
      await axios.put(`${API_USER_PROFILE_BASE_URL}/${userProfile.userId}`, {
        username: userProfile.username,
        email: userProfile.email,
      });

      // 2. Update/Create Personal Details
      if (personalDetails.personalDetailsId) {
        // If personalDetailsId exists, it's an update to an existing record.
        await axios.put(`${API_PERSONAL_DETAILS_BASE_URL}/${personalDetails.personalDetailsId}`, {
          ...personalDetails,
          userId: userProfile.userId,
        });
      } else {
        // Otherwise, it's a new personal details record being created for the user.
        await axios.post(API_PERSONAL_DETAILS_BASE_URL, {
          ...personalDetails,
          userId: userProfile.userId,
        });
      }

      toast({
        title: "Success",
        description: "Your profile has been updated successfully!",
        variant: "default",
      });
      setIsEditing(false);
      // Re-fetch data to ensure the UI is completely up-to-date.
      fetchUserProfile(userProfile.userId);
      fetchPersonalDetails(userProfile.userId);
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please check your input and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    // If you have a CustomerLayout component, uncomment the lines below and adjust the import path.
    <>
        <Header/>

    <CustomerLayout>
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Profile</h1>
          <p className="text-muted-foreground text-gray-600">Manage your account and personal information</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className="w-full sm:w-auto bg-orange-400 hover:bg-orange-500 text-white rounded-md shadow-sm transition-colors duration-200"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <Card className="rounded-lg shadow-sm border border-gray-200">
        <CardHeader className="bg-gray-50 p-4 rounded-t-lg border-b border-gray-200">
          <CardTitle className="text-xl font-semibold text-gray-800">Account Details</CardTitle>
          <CardDescription className="text-gray-600">Update your username and email address.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
              <Label htmlFor="username" className="md:text-right text-gray-700 font-medium">Username</Label>
              <Input
                id="username"
                value={userProfile.username}
                onChange={handleUserProfileChange}
                className="col-span-3 border-gray-300 rounded-md focus:ring-orange-400 focus:border-orange-400"
                disabled={!isEditing}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
              <Label htmlFor="email" className="md:text-right text-gray-700 font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={userProfile.email}
                onChange={handleUserProfileChange}
                className="col-span-3 border-gray-300 rounded-md focus:ring-orange-400 focus:border-orange-400"
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg shadow-sm border border-gray-200">
        <CardHeader className="bg-gray-50 p-4 rounded-t-lg border-b border-gray-200">
          <CardTitle className="text-xl font-semibold text-gray-800">Personal Information</CardTitle>
          <CardDescription className="text-gray-600">Update your personal details for accurate records.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
              <Label htmlFor="firstName" className="md:text-right text-gray-700 font-medium">First Name</Label>
              <Input
                id="firstName"
                value={personalDetails.firstName}
                onChange={handlePersonalDetailsChange}
                className="col-span-3 border-gray-300 rounded-md focus:ring-orange-400 focus:border-orange-400"
                disabled={!isEditing}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
              <Label htmlFor="lastName" className="md:text-right text-gray-700 font-medium">Last Name</Label>
              <Input
                id="lastName"
                value={personalDetails.lastName}
                onChange={handlePersonalDetailsChange}
                className="col-span-3 border-gray-300 rounded-md focus:ring-orange-400 focus:border-orange-400"
                disabled={!isEditing}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
              <Label htmlFor="phoneNumber" className="md:text-right text-gray-700 font-medium">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={personalDetails.phoneNumber}
                onChange={handlePersonalDetailsChange}
                className="col-span-3 border-gray-300 rounded-md focus:ring-orange-400 focus:border-orange-400"
                disabled={!isEditing}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
              <Label htmlFor="dateOfBirth" className="md:text-right text-gray-700 font-medium">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={personalDetails.dateOfBirth}
                onChange={handlePersonalDetailsChange}
                className="col-span-3 border-gray-300 rounded-md focus:ring-orange-400 focus:border-orange-400"
                disabled={!isEditing}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
              <Label htmlFor="gender" className="md:text-right text-gray-700 font-medium">Gender</Label>
              <Select
                value={personalDetails.gender}
                onValueChange={handleGenderChange} // Use the dedicated handler for Select
                disabled={!isEditing}
              >
                <SelectTrigger className="col-span-3 border-gray-300 rounded-md focus:ring-orange-400 focus:border-orange-400">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
              <Label htmlFor="address" className="md:text-right text-gray-700 font-medium">Address</Label>
              <Textarea
                id="address"
                value={personalDetails.address}
                onChange={handlePersonalDetailsChange}
                className="col-span-3 border-gray-300 rounded-md focus:ring-orange-400 focus:border-orange-400"
                disabled={!isEditing}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
              <Label htmlFor="city" className="md:text-right text-gray-700 font-medium">City</Label>
              <Input
                id="city"
                value={personalDetails.city}
                onChange={handlePersonalDetailsChange}
                className="col-span-3 border-gray-300 rounded-md focus:ring-orange-400 focus:border-orange-400"
                disabled={!isEditing}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
              <Label htmlFor="pinCode" className="md:text-right text-gray-700 font-medium">Pin Code</Label>
              <Input
                id="pinCode"
                value={personalDetails.pinCode}
                onChange={handlePersonalDetailsChange}
                className="col-span-3 border-gray-300 rounded-md focus:ring-orange-400 focus:border-orange-400"
                disabled={!isEditing}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
              <Label htmlFor="familyMembers" className="md:text-right text-gray-700 font-medium">Family Members</Label>
              <Input
                id="familyMembers"
                value={personalDetails.familyMembers}
                onChange={handlePersonalDetailsChange}
                className="col-span-3 border-gray-300 rounded-md focus:ring-orange-400 focus:border-orange-400"
                disabled={!isEditing}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
              <Label htmlFor="sumInsured" className="md:text-right text-gray-700 font-medium">Sum Insured</Label>
              <Input
                id="sumInsured"
                value={personalDetails.sumInsured}
                onChange={handlePersonalDetailsChange}
                className="col-span-3 border-gray-300 rounded-md focus:ring-orange-400 focus:border-orange-400"
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {isEditing && (
        <div className="flex justify-end gap-2 pt-4">
          <Button
            onClick={handleSaveProfile}
            className="bg-orange-400 hover:bg-orange-500 text-white rounded-md shadow-sm transition-colors duration-200"
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
    </CustomerLayout>

    </>
  );
}