import React, { useState, useContext, useEffect } from 'react'; // Import useContext and useEffect
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Header from '@/components/Header';
import AuthContext from '@/context/AuthContext'; // <--- Import your AuthContext here. Adjust the path!

// ---
// Define the structure of the ClaimDTO based on your backend response
interface ClaimData {
    claimId: number;
    claimReason: string;
    claimStatus: string;
    dateOfClaim: string;
    dateOfIncident: string;
    description: string;
    location: string;
    sumInsured: number;
    timeOfIncident: string;
    policyId: number;
    userId: number; // Ensure userId is included in your backend response and this interface
}
// ---

const TrackClaimPage = () => {
    const [claimNumber, setClaimNumber] = useState('');
    const [claimData, setClaimData] = useState<ClaimData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Consume the AuthContext to get the logged-in user's information
    const { user, isAuthenticated } = useContext(AuthContext);

    // Optional: Clear claim data and error message if the user logs out
    useEffect(() => {
        if (!isAuthenticated) {
            setClaimData(null);
            setError('');
        }
    }, [isAuthenticated]);

    const handleTrackClaim = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setClaimData(null); // Reset claimData before a new search
        setLoading(true);

        // --- Step 1: Check if the user is authenticated and has a userId ---
        if (!isAuthenticated || !user || user.userId === undefined || user.userId === null) {
            setError('You must be logged in to track claims. Please log in.');
            setLoading(false);
            return;
        }

        try {
            // Your existing fetch call to the backend for claim details
            const response = await fetch(`http://localhost:8093/api/claims/${claimNumber}`);

            if (!response.ok) {
                if (response.status === 404) {
                    setError('Claim not found. Please verify the claim number and try again.');
                } else {
                    const errorText = await response.text();
                    console.error(`Backend error: ${errorText}`);
                    setError(`Not a valid Claim ID`);
                }
            } else {
                const data: ClaimData = await response.json();

                // --- Step 2: Perform the authorization check ---
                // Compare the userId from the fetched claim with the logged-in user's ID
                if (data.userId !== user.userId) {
                    setError('Invalid claim ID. This claim does not belong to your account.');
                    setClaimData(null); // Crucial: Do not display unauthorized claim data
                } else {
                    // If the user IDs match, set the claim data
                    setClaimData(data);
                }
            }
        } catch (err) {
            console.error("Error tracking claim:", err);
            setError('An error occurred while tracking your claim. Please check your network connection.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'text-yellow-600';
            case 'APPROVED': return 'text-green-600';
            case 'REJECTED': return 'text-red-600';
            case 'IN_REVIEW': return 'text-blue-600';
            default: return 'text-gray-800';
        }
    };

    const getClaimProgress = (status: string): number => {
        switch (status) {
            case 'PENDING': return 25;
            case 'IN_REVIEW': return 50;
            case 'APPROVED': return 100;
            case 'REJECTED': return 100;
            default: return 0;
        }
    };

    return (
        <div className="container mx-auto py-12 px-4 min-h-[70vh]">
            <Header />
            <h1 className="text-4xl font-extrabold text-center mb-8 text-insurance-primary">Track Your Claim Status</h1>
            <p className="text-center text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
                Enter your claim number below to get the latest updates on your claim processing.
            </p>

            <Card className="max-w-xl mx-auto shadow-lg rounded-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-gray-800">Find Your Claim</CardTitle>
                    <CardDescription className="text-gray-600">Please enter the claim number provided to you.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleTrackClaim} className="space-y-6">
                        <div>
                            <Label htmlFor="claimNumber" className="text-sm font-medium text-gray-700">Claim ID</Label>
                            <Input
                                id="claimNumber"
                                type="text"
                                placeholder="Claim123"
                                value={claimNumber}
                                onChange={(e) => setClaimNumber(e.target.value)}
                                required
                                className="mt-1 rounded-md"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-insurance-primary hover:bg-insurance-secondary text-white py-2 rounded-md transition-colors duration-300"
                            // Disable the button if loading or if the user is not authenticated
                            disabled={loading || !isAuthenticated}
                        >
                            {loading ? 'Tracking...' : 'Track Claim'}
                        </Button>
                    </form>
                    {/* Display error messages */}
                    {error && <p className="text-red-500 mt-4 text-center text-sm">{error}</p>}
                    {/* Inform user if not logged in */}
                    {!isAuthenticated && (
                        <p className="text-blue-500 mt-4 text-center text-sm">Please log in to track your claims.</p>
                    )}
                </CardContent>

                {/* Display claim data only if available */}
                {claimData && (
                    <CardFooter className="flex flex-col items-start pt-4 border-t border-gray-200 bg-gray-50 rounded-b-xl px-6 py-4">
                        <h5 className="text-lg font-semibold text-insurance-primary mb-3">Claim Details:</h5>
                        <div className="space-y-2 text-gray-800 w-full">
                            <p className="text-sm"><strong>Claim ID:</strong> {claimData.claimId}</p>
                            <p className="text-sm"><strong>Policy ID:</strong> {claimData.policyId}</p>
                            <p className="text-sm"><strong>Claim Reason:</strong> {claimData.claimReason}</p>
                            <p className="text-sm"><strong>Date of Incident:</strong> {claimData.dateOfIncident}</p>
                            <p className="text-sm"><strong>Time of Incident:</strong> {claimData.timeOfIncident}</p>
                            <p className="text-sm"><strong>Location:</strong> {claimData.location}</p>
                            <p className="text-sm"><strong>Sum Insured:</strong> ₹{claimData.sumInsured.toLocaleString()}</p>
                            <p className="text-sm"><strong>Description:</strong> {claimData.description || 'N/A'}</p>
                            <p className="text-sm">
                                <strong>Current Status:</strong> <span className={`font-semibold ${getStatusColor(claimData.claimStatus)}`}>{claimData.claimStatus}</span>
                            </p>
                            <p className="text-sm"><strong>Date of Claim:</strong> {claimData.dateOfClaim}</p>

                            <div className="mt-4">
                                <Label htmlFor="claim-progress" className="text-sm font-medium text-gray-700">
                                    Claim Progress ({getClaimProgress(claimData.claimStatus)}%)
                                </Label>
                                <Progress value={getClaimProgress(claimData.claimStatus)} className="mt-2 h-2 bg-gray-200 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-insurance-primary" />
                            </div>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
};

export default TrackClaimPage;  