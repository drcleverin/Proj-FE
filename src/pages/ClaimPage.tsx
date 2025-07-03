// import React, { useState } from 'react';
// import axios from 'axios';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea'; // Assuming you have a Textarea component
// import { Loader2 } from 'lucide-react'; // For loading indicator
// import Header from '@/components/Header';

// // Define the shape of the form data for frontend state
// interface ClaimFormData {
//     claimReason: string;
//     claimStatus: string;
//     dateOfClaim: string; // YYYY-MM-DD
//     dateOfIncident: string; // YYYY-MM-DD
//     description: string;
//     location: string;
//     sumInsured: string; // Stored as string initially for input field
//     timeOfIncident: string; // HH:MM:SS
//     policyId: string; // Stored as string for input field
// }

// // Define the shape of the DTO to send to the backend
// interface ClaimDTO {
//     claimReason: string;
//     claimStatus: string;
//     dateOfClaim: string; // YYYY-MM-DD
//     dateOfIncident: string; // YYYY-MM-DD
//     description: string;
//     location: string;
//     sumInsured: number; // Converted to number for backend
//     timeOfIncident: string; // HH:MM:SS
//     policyId: number; // Converted to number for backend
// }

// const ClaimApplicationForm: React.FC = () => {
//         // Extract policyId from the URL path (e.g., /claim/9)
//         const pathSegments = window.location.pathname.split('/');
//         const policyId = pathSegments[pathSegments.length - 1];
//         console.log('Policy ID from URL path:', policyId);

//     const [formData, setFormData] = useState<ClaimFormData>({
//         claimReason: '',
//         claimStatus: 'pending', // Default status
//         dateOfClaim: new Date().toISOString().split('T')[0], // Default to today
//         dateOfIncident: '',
//         description: '',
//         location: '',
//         sumInsured: '',
//         timeOfIncident: '',
//         policyId: policyId,
//     });

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [success, setSuccess] = useState<string | null>(null);
//     const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { id, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [id]: value,
//         }));
//         // Clear error for this field when user starts typing
//         if (formErrors[id]) {
//             setFormErrors((prevErrors) => {
//                 const newErrors = { ...prevErrors };
//                 delete newErrors[id];
//                 return newErrors;
//             });
//         }
//     };

//     const handleSelectChange = (id: keyof ClaimFormData, value: string) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             [id]: value,
//         }));
//         // Clear error for this field
//         if (formErrors[id]) {
//             setFormErrors((prevErrors) => {
//                 const newErrors = { ...prevErrors };
//                 delete newErrors[id];
//                 return newErrors;
//             });
//         }
//     };

//     const validateForm = () => {
//         const errors: { [key: string]: string } = {};
//         if (!formData.claimReason) errors.claimReason = 'Claim reason is required.';
//         if (!formData.claimStatus) errors.claimStatus = 'Claim status is required.';
//         if (!formData.dateOfClaim) errors.dateOfClaim = 'Date of claim is required.';
//         if (!formData.dateOfIncident) errors.dateOfIncident = 'Date of incident is required.';
//         if (!formData.location) errors.location = 'Location is required.';
//         if (!formData.sumInsured || isNaN(parseFloat(formData.sumInsured))) errors.sumInsured = 'Valid sum insured is required.';
//         if (parseFloat(formData.sumInsured) <= 0) errors.sumInsured = 'Sum insured must be greater than zero.';
//         if (!formData.timeOfIncident) errors.timeOfIncident = 'Time of incident is required.';
//         if (!formData.policyId || isNaN(parseInt(formData.policyId))) errors.policyId = 'Valid Policy ID is required.';

//         // Date of Incident should not be in the future (compared to current date)
//         const today = new Date();
//         today.setHours(0, 0, 0, 0); // Normalize to start of day
//         const incidentDate = new Date(formData.dateOfIncident);
//         incidentDate.setHours(0, 0, 0, 0); // Normalize to start of day

//         if (formData.dateOfIncident && incidentDate > today) {
//                 errors.dateOfIncident = 'Date of incident cannot be in the future.';
//         }

//         setFormErrors(errors);
//         return Object.keys(errors).length === 0;
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError(null);
//         setSuccess(null);

//         if (!validateForm()) {
//             return;
//         }

//         setLoading(true);
//         try {
//             const claimDTO: ClaimDTO = {
//                 claimReason: formData.claimReason,
//                 claimStatus: formData.claimStatus,
//                 dateOfClaim: formData.dateOfClaim,
//                 dateOfIncident: formData.dateOfIncident,
//                 description: formData.description,
//                 location: formData.location,
//                 sumInsured: parseFloat(formData.sumInsured),
//                 timeOfIncident: formData.timeOfIncident,
//                 policyId: parseInt(formData.policyId),
//             };

//             const response = await axios.post('http://localhost:8093/api/claims/addClaim', claimDTO);
//             console.log('Claim submission response:', response.data);
//             setSuccess('Claim submitted successfully! Claim ID: ' + response.data.claimId);
//             setFormData({ // Reset form
//                 claimReason: '',
//                 claimStatus: 'pending',
//                 dateOfClaim: new Date().toISOString().split('T')[0],
//                 dateOfIncident: '',
//                 description: '',
//                 location: '',
//                 sumInsured: '',
//                 timeOfIncident: '',
//                 policyId: '',
//             });
//             setFormErrors({}); // Clear any lingering form errors

//         } catch (err) {
//             if (axios.isAxiosError(err) && err.response) {
//                 // Backend validation errors (MethodArgumentNotValidException)
//                 if (err.response.status === 400 && err.response.data && err.response.data.errors) {
//                         const backendErrors: { [key: string]: string } = {};
//                         err.response.data.errors.forEach((fieldError: any) => {
//                                 // Map backend field names to frontend form field names if they differ
//                                 backendErrors[fieldError.field] = fieldError.defaultMessage;
//                         });
//                         setFormErrors(backendErrors);
//                         setError('Please correct the highlighted errors.');
//                 } else if (err.response.data && err.response.data.message) {
//                         // Other backend errors (e.g., IllegalArgumentException from service)
//                         setError(err.response.data.message);
//                 } else {
//                         setError('An unexpected error occurred: ' + err.message);
//                 }
//             } else {
//                 setError('Network error or unexpected issue. Please try again.');
//             }
//             console.error('Claim submission error:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Handler for back to dashboard
//     const handleBackToDashboard = () => {
//         window.location.href = '/dashboard';
//     };

//     return (
        
//         <div className="min-h-screen bg-gray-50 flex flex-col">
//             <Header />
//             {/* Assuming Header, Footer, Chatbot are available globally or imported into a wrapper */}
//             {/* <Header /> */}
//             {/* <Header /> */}

//             <div className="container mx-auto max-w-2xl">
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-bold text-foreground mb-2">File a New Claim</h1>
//                     <p className="text-muted-foreground">Provide details for your insurance claim.</p>
//                 </div>

//                 <Card className="w-full shadow-lg rounded-xl">
//                     <CardHeader>
//                         <CardTitle>Claim Details</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             {/* Claim Reason */}
//                             <div>
//                                 <Label htmlFor="claimReason">Claim Reason</Label>
//                                 <Input
//                                     id="claimReason"
//                                     placeholder="e.g., Vehicle Accident, Medical Expense"
//                                     value={formData.claimReason}
//                                     onChange={handleChange}
//                                     className={formErrors.claimReason ? 'border-red-500' : ''}
//                                 />
//                                 {formErrors.claimReason && <p className="text-red-500 text-sm mt-1">{formErrors.claimReason}</p>}
//                             </div>

//                             {/* Claim Status (Dropdown) */}
//                             {/* <div>
//                                 <Label htmlFor="claimStatus">Claim Status</Label>
//                                 <Select
//                                     onValueChange={(value) => handleSelectChange('claimStatus', value)}
//                                     value={formData.claimStatus}
//                                 >
//                                     <SelectTrigger id="claimStatus" className={formErrors.claimStatus ? 'border-red-500' : ''}>
//                                         <SelectValue placeholder="Select status" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="pending">Pending</SelectItem>
//                                         <SelectItem value="approved">Approved</SelectItem>
//                                         <SelectItem value="rejected">Rejected</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                                 {formErrors.claimStatus && <p className="text-red-500 text-sm mt-1">{formErrors.claimStatus}</p>}
//                             </div> */}

//                             {/* Date of Claim */}
//                             <div>
//                                 <Label htmlFor="dateOfClaim">Date of Claim</Label>
//                                 <Input
//                                     id="dateOfClaim"
//                                     type="date"
//                                     value={formData.dateOfClaim}
//                                     onChange={handleChange}
//                                     className={formErrors.dateOfClaim ? 'border-red-500' : ''}
//                                 />
//                                 {formErrors.dateOfClaim && <p className="text-red-500 text-sm mt-1">{formErrors.dateOfClaim}</p>}
//                             </div>

//                             {/* Date of Incident */}
//                             <div>
//                                 <Label htmlFor="dateOfIncident">Date of Incident</Label>
//                                 <Input
//                                     id="dateOfIncident"
//                                     type="date"
//                                     value={formData.dateOfIncident}
//                                     onChange={handleChange}
//                                     className={formErrors.dateOfIncident ? 'border-red-500' : ''}
//                                 />
//                                 {formErrors.dateOfIncident && <p className="text-red-500 text-sm mt-1">{formErrors.dateOfIncident}</p>}
//                             </div>

//                             {/* Time of Incident */}
//                             <div>
//                                 <Label htmlFor="timeOfIncident">Time of Incident</Label>
//                                 <Input
//                                     id="timeOfIncident"
//                                     type="time"
//                                     step="1" // Allows seconds, if desired by backend LocalTime
//                                     value={formData.timeOfIncident}
//                                     onChange={handleChange}
//                                     className={formErrors.timeOfIncident ? 'border-red-500' : ''}
//                                 />
//                                 {formErrors.timeOfIncident && <p className="text-red-500 text-sm mt-1">{formErrors.timeOfIncident}</p>}
//                             </div>

//                             {/* Location */}
//                             <div>
//                                 <Label htmlFor="location">Location of Incident</Label>
//                                 <Input
//                                     id="location"
//                                     placeholder="e.g., 123 Main St, Anytown"
//                                     value={formData.location}
//                                     onChange={handleChange}
//                                     className={formErrors.location ? 'border-red-500' : ''}
//                                 />
//                                 {formErrors.location && <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>}
//                             </div>

//                             {/* Sum Insured */}
//                             <div>
//                                 <Label htmlFor="sumInsured">Claimed Amount (₹)</Label>
//                                 <Input
//                                     id="sumInsured"
//                                     type="number"
//                                     step="0.01"
//                                     placeholder="e.g., 5500.00"
//                                     value={formData.sumInsured}
//                                     onChange={handleChange}
//                                     className={formErrors.sumInsured ? 'border-red-500' : ''}
//                                 />
//                                 {formErrors.sumInsured && <p className="text-red-500 text-sm mt-1">{formErrors.sumInsured}</p>}
//                             </div>

//                             {/* Policy ID */}
//                             {/* <div>
//                                 <Label htmlFor="policyId">Policy ID</Label>
//                                 <Input
//                                     id="policyId"
//                                     type="number"
//                                     placeholder="e.g., 1"
//                                     value={formData.policyId}
//                                     onChange={handleChange}
//                                     className={formErrors.policyId ? 'border-red-500' : ''}
//                                 />
//                                 {formErrors.policyId && <p className="text-red-500 text-sm mt-1">{formErrors.policyId}</p>}
//                             </div> */}

//                             {/* Description (Optional) */}
//                             <div>
//                                 <Label htmlFor="description">Description (Optional)</Label>
//                                 <Textarea
//                                     id="description"
//                                     placeholder="Provide a detailed description of the incident."
//                                     value={formData.description}
//                                     onChange={handleChange}
//                                     rows={4}
//                                 />
//                             </div>

//                             {/* Submission Status */}
//                             {loading && (
//                                 <div className="flex items-center justify-center text-primary">
//                                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                     Submitting Claim...
//                                 </div>
//                             )}
//                             {error && <p className="text-red-500 text-center">{error}</p>}
//                             {success && <p className="text-green-600 text-center">{success}</p>}

//                             <Button
//                                 type="submit"
//                                 className="w-full bg-insurance-primary hover:bg-insurance-dark shadow-md"
//                                 disabled={loading}
//                             >
//                                 {loading ? 'Submitting...' : 'Submit Claim'}
//                             </Button>
//                             <Button
//                                 type="button"
//                                 variant="outline"
//                                 className="w-full mt-2"
//                                 onClick={handleBackToDashboard}
//                                 disabled={loading}
//                             >
//                                 Back to Dashboard
//                             </Button>
//                         </form>
//                     </CardContent>
//                 </Card>
//             </div>
//             {/* <Footer />
//             <Chatbot /> */}
//         </div>
//     );
// };

// export default ClaimApplicationForm;








import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import AuthContext from '@/context/AuthContext'; // Import your AuthContext

// --- Interfaces for Form Data and DTO ---

// Define the shape of the form data for frontend state
interface ClaimFormData {
    claimReason: string;
    claimStatus: string;
    dateOfClaim: string; // YYYY-MM-DD
    dateOfIncident: string; // YYYY-MM-DD
    description: string;
    location: string;
    sumInsured: string; // Stored as string initially for input field
    timeOfIncident: string; // HH:MM:SS
    policyId: string; // Stored as string for input field
    userId: string; // ADDED: Stored as string for frontend state
}

// Define the shape of the DTO to send to the backend
interface ClaimDTO {
    claimReason: string;
    claimStatus: string;
    dateOfClaim: string; // YYYY-MM-DD
    dateOfIncident: string; // YYYY-MM-DD
    description: string;
    location: string;
    sumInsured: number; // Converted to number for backend
    timeOfIncident: string; // HH:MM:SS
    policyId: number; // Converted to number for backend
    userId: number; // ADDED: Converted to number for backend
}

const ClaimApplicationForm: React.FC = () => {
    // Extract policyId from the URL path (e.g., /claim/9)
    const pathSegments = window.location.pathname.split('/');
    const policyIdFromUrl = pathSegments[pathSegments.length - 1];

    // Use useContext to get user information from AuthContext
    const { user, isAuthenticated } = useContext(AuthContext);

    // --- State Management ---
    const [formData, setFormData] = useState<ClaimFormData>({
        claimReason: '',
        claimStatus: 'PENDING', // Default status
        dateOfClaim: new Date().toISOString().split('T')[0], // Default to today
        dateOfIncident: '',
        description: '',
        location: '',
        sumInsured: '',
        timeOfIncident: '',
        policyId: policyIdFromUrl,
        userId: '', // Initialized to empty, will be set by useEffect from context
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    // --- Effect Hook to Set userId from AuthContext ---
    useEffect(() => {
        if (user && user.userId) {
            setFormData(prevData => ({
                ...prevData,
                userId: String(user.userId) // Ensure userId is a string for the form state
            }));
            setError(null); // Clear any previous 'not logged in' error
        } else if (!isAuthenticated) {
            // If user context is not available and not authenticated
            setError('User is not logged in. Please log in to file a claim.');
            // Optionally redirect to login page if user is not authenticated:
            // window.location.href = '/login';
        }
    }, [user, isAuthenticated]); // Re-run when 'user' or 'isAuthenticated' from context changes

    // --- Handlers ---
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
        // Clear error for this field when user starts typing
        if (formErrors[id]) {
            setFormErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[id];
                return newErrors;
            });
        }
    };

    const handleSelectChange = (id: keyof ClaimFormData, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
        // Clear error for this field
        if (formErrors[id]) {
            setFormErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[id];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to start of day for accurate date comparison

        if (!formData.claimReason) errors.claimReason = 'Claim reason is required.';

        // Validate Date of Claim (must be present or future)
        if (!formData.dateOfClaim) {
            errors.dateOfClaim = 'Date of claim is required.';
        } else {
            const dateOfClaim = new Date(formData.dateOfClaim);
            dateOfClaim.setHours(0, 0, 0, 0); // Normalize to start of day
            if (dateOfClaim < today) {
                errors.dateOfClaim = 'Date of claim cannot be in the past.';
            }
        }

        // Validate Date of Incident (cannot be in the future)
        if (!formData.dateOfIncident) {
            errors.dateOfIncident = 'Date of incident is required.';
        } else {
            const incidentDate = new Date(formData.dateOfIncident);
            incidentDate.setHours(0, 0, 0, 0); // Normalize to start of day
            if (incidentDate > today) {
                errors.dateOfIncident = 'Date of incident cannot be in the future.';
            }
        }

        if (!formData.location) errors.location = 'Location is required.';
        if (!formData.sumInsured || isNaN(parseFloat(formData.sumInsured))) {
            errors.sumInsured = 'Valid claimed amount is required.';
        } else if (parseFloat(formData.sumInsured) <= 0) {
            errors.sumInsured = 'Claimed amount must be greater than zero.';
        }
        if (!formData.timeOfIncident) errors.timeOfIncident = 'Time of incident is required.';
        if (!formData.policyId || isNaN(parseInt(formData.policyId))) errors.policyId = 'Valid Policy ID is required.';

        // --- VALIDATION FOR userId from context ---
        console.log(formData.userId);
        if (!formData.userId || isNaN(parseInt(formData.userId))) {
            errors.userId = 'User ID is missing. Please ensure you are logged in.';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!validateForm()) {
            // If userId is missing and not already an error, set a specific error message
            if (!formData.userId && !error) {
                setError('Cannot submit claim: User ID is missing. Please log in.');
            }
            return;
        }

        setLoading(true);
        try {
            const claimDTO: ClaimDTO = {
                claimReason: formData.claimReason,
                claimStatus: formData.claimStatus,
                dateOfClaim: formData.dateOfClaim,
                dateOfIncident: formData.dateOfIncident,
                description: formData.description,
                location: formData.location,
                sumInsured: parseFloat(formData.sumInsured),
                timeOfIncident: formData.timeOfIncident,
                policyId: parseInt(formData.policyId),
                userId: parseInt(formData.userId), // Sending userId to backend
            };

            const response = await axios.post('http://localhost:8093/api/claims/addClaim', claimDTO);
            console.log('Claim submission response:', response.data);
            setSuccess('Claim submitted successfully! Claim ID: ' + response.data.claimId);
            setFormData({ // Reset form to initial state after successful submission
                claimReason: '',
                claimStatus: 'PENDING',
                dateOfClaim: new Date().toISOString().split('T')[0],
                dateOfIncident: '',
                description: '',
                location: '',
                sumInsured: '',
                timeOfIncident: '',
                policyId: policyIdFromUrl, // Keep policyId if coming from URL
                userId: user ? String(user.userId) : '', // Keep userId from current user or empty if somehow unavailable
            });
            setFormErrors({}); // Clear any lingering form errors

        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                // Backend validation errors (MethodArgumentNotValidException)
                if (err.response.status === 400 && err.response.data && err.response.data.errors) {
                    const backendErrors: { [key: string]: string } = {};
                    err.response.data.errors.forEach((fieldError: any) => {
                        backendErrors[fieldError.field] = fieldError.defaultMessage;
                    });
                    setFormErrors(backendErrors);
                    setError('Please correct the highlighted errors.');
                } else if (err.response.data && err.response.data.message) {
                    // Other backend errors (e.g., IllegalArgumentException from service)
                    setError(err.response.data.message);
                } else {
                    setError('An unexpected error occurred from the server: ' + err.message);
                }
            } else {
                setError('Network error or unexpected issue. Please check your connection.');
            }
            console.error('Claim submission error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Handler for back to dashboard
    const handleBackToDashboard = () => {
        window.location.href = '/dashboard';
    };

    // Get today's date in YYYY-MM-DD format for min/max attributes on date inputs
    const todayString = new Date().toISOString().split('T')[0];

    // --- Conditional Rendering for Authentication State ---
    // If user is not authenticated or userId is missing from context, show a login prompt
    if (!isAuthenticated || !user || !user.userId) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <Card className="p-8 text-center shadow-lg rounded-xl max-w-md">
                        <CardTitle className="text-xl font-bold text-red-600 mb-4">Access Denied</CardTitle>
                        <p className="text-lg text-foreground mb-6">
                            You must be logged in to file a claim.
                        </p>
                        <Button onClick={() => window.location.href = '/login'} className="w-full bg-insurance-primary hover:bg-insurance-dark">
                            Go to Login
                        </Button>
                    </Card>
                </div>
            </div>
        );
    }

    // --- Main Form Rendering ---
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <div className="container mx-auto max-w-2xl mt-10 mb-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">File a New Claim</h1>
                    <p className="text-muted-foreground">Provide details for your insurance claim for Policy ID: <span className="font-semibold text-primary">{formData.policyId}</span></p>
                    {/* Display User ID from context for confirmation */}
                    {user && user.userId && (
                        <p className="text-sm text-muted-foreground">Logged in as User ID: <span className="font-semibold text-primary">{user.userId}</span></p>
                    )}
                </div>

                <Card className="w-full shadow-lg rounded-xl">
                    <CardHeader>
                        <CardTitle>Claim Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Policy ID (Display only, derived from URL) */}
                            <div>
                                <Label htmlFor="policyId">Policy ID</Label>
                                <Input
                                    id="policyId"
                                    type="text"
                                    value={formData.policyId}
                                    disabled // Disable editing
                                    className="bg-gray-100 cursor-not-allowed" // Style to indicate disabled
                                />
                                {formErrors.policyId && <p className="text-red-500 text-sm mt-1">{formErrors.policyId}</p>}
                            </div>

                            {/* User ID (Display Only, derived from AuthContext) */}
                            <div>
                                <Label htmlFor="userId">Your User ID</Label>
                                <Input
                                    id="userId"
                                    type="text"
                                    value={formData.userId}
                                    disabled // User should not manually change this
                                    className="bg-gray-100 cursor-not-allowed"
                                />
                                {formErrors.userId && <p className="text-red-500 text-sm mt-1">{formErrors.userId}</p>}
                            </div>

                            {/* Claim Reason */}
                            <div>
                                <Label htmlFor="claimReason">Claim Reason</Label>
                                <Input
                                    id="claimReason"
                                    placeholder="e.g., Vehicle Accident, Medical Expense"
                                    value={formData.claimReason}
                                    onChange={handleChange}
                                    className={formErrors.claimReason ? 'border-red-500' : ''}
                                />
                                {formErrors.claimReason && <p className="text-red-500 text-sm mt-1">{formErrors.claimReason}</p>}
                            </div>

                            {/* Date of Claim */}
                            <div>
                                <Label htmlFor="dateOfClaim">Date of Claim</Label>
                                <Input
                                    id="dateOfClaim"
                                    type="date"
                                    value={formData.dateOfClaim}
                                    onChange={handleChange}
                                    min={todayString} // Prevents selecting past dates in UI
                                    className={formErrors.dateOfClaim ? 'border-red-500' : ''}
                                />
                                {formErrors.dateOfClaim && <p className="text-red-500 text-sm mt-1">{formErrors.dateOfClaim}</p>}
                            </div>

                            {/* Date of Incident */}
                            <div>
                                <Label htmlFor="dateOfIncident">Date of Incident</Label>
                                <Input
                                    id="dateOfIncident"
                                    type="date"
                                    value={formData.dateOfIncident}
                                    onChange={handleChange}
                                    max={todayString} // Prevents selecting future dates in UI
                                    className={formErrors.dateOfIncident ? 'border-red-500' : ''}
                                />
                                {formErrors.dateOfIncident && <p className="text-red-500 text-sm mt-1">{formErrors.dateOfIncident}</p>}
                            </div>

                            {/* Time of Incident */}
                            <div>
                                <Label htmlFor="timeOfIncident">Time of Incident</Label>
                                <Input
                                    id="timeOfIncident"
                                    type="time"
                                    step="1" // Allows seconds, if desired by backend LocalTime
                                    value={formData.timeOfIncident}
                                    onChange={handleChange}
                                    className={formErrors.timeOfIncident ? 'border-red-500' : ''}
                                />
                                {formErrors.timeOfIncident && <p className="text-red-500 text-sm mt-1">{formErrors.timeOfIncident}</p>}
                            </div>

                            {/* Location */}
                            <div>
                                <Label htmlFor="location">Location of Incident</Label>
                                <Input
                                    id="location"
                                    placeholder="e.g., 123 Main St, Anytown"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className={formErrors.location ? 'border-red-500' : ''}
                                />
                                {formErrors.location && <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>}
                            </div>

                            {/* Sum Insured */}
                            <div>
                                <Label htmlFor="sumInsured">Claimed Amount (₹)</Label>
                                <Input
                                    id="sumInsured"
                                    type="number"
                                    step="0.01"
                                    placeholder="e.g., 5500.00"
                                    value={formData.sumInsured}
                                    onChange={handleChange}
                                    className={formErrors.sumInsured ? 'border-red-500' : ''}
                                />
                                {formErrors.sumInsured && <p className="text-red-500 text-sm mt-1">{formErrors.sumInsured}</p>}
                            </div>

                            {/* Description (Optional) */}
                            <div>
                                <Label htmlFor="description">Description (Optional)</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Provide a detailed description of the incident."
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                />
                            </div>

                            {/* Submission Status & Buttons */}
                            {loading && (
                                <div className="flex items-center justify-center text-primary">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting Claim...
                                </div>
                            )}
                            {error && <p className="text-red-500 text-center">{error}</p>}
                            {success && <p className="text-green-600 text-center">{success}</p>}

                            <Button
                                type="submit"
                                className="w-full bg-insurance-primary hover:bg-insurance-dark shadow-md"
                                disabled={loading || !user || !user.userId} // Disable if loading or user/userId not available
                            >
                                {loading ? 'Submitting...' : 'Submit Claim'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full mt-2"
                                onClick={handleBackToDashboard}
                                disabled={loading}
                            >
                                Back to Dashboard
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ClaimApplicationForm;