import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Header from '@/components/Header';

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
}
// ---

const TrackClaimPage = () => {
    const [claimNumber, setClaimNumber] = useState('');
    const [claimData, setClaimData] = useState<ClaimData | null>(null); // Changed to claimData
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrackClaim = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setClaimData(null); // Reset claimData
        setLoading(true);

        try {
            // Ensure claimNumber is treated as a number if your backend @PathVariable Long id expects it.
            // If your claim IDs are truly strings like "C123456789", then the backend @PathVariable should be String.
            // For now, assuming claimNumber will be a numerical ID based on your provided JSON.
            const response = await fetch(`http://localhost:8093/api/claims/${claimNumber}`);

            if (!response.ok) {
                if (response.status === 404) {
                    setError('Claim not found. Please verify the claim number and try again.');
                } else {
                    // Attempt to parse error message from backend if available
                    const errorText = await response.text();
                    console.error(`Backend error: ${errorText}`);
                    setError(`An error occurred while tracking your claim. Status: ${response.status}`);
                }
            } else {
                const data: ClaimData = await response.json();
                setClaimData(data); // Set the fetched data
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
            default: return 'text-gray-800'; // Default for any unhandled status
        }
    };

    // Helper function to determine progress based on status
    const getClaimProgress = (status: string): number => {
        switch (status) {
            case 'PENDING': return 25;
            case 'IN_REVIEW': return 50;
            case 'APPROVED': return 100;
            case 'REJECTED': return 100; // Declined claims are also "complete" in terms of process
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
                            <Label htmlFor="claimNumber" className="text-sm font-medium text-gray-700">Claim ID</Label> {/* Changed label */}
                            <Input
                                id="claimNumber"
                                type="text" // Changed type to number, assuming ID is numeric
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
                            disabled={loading}
                        >
                            {loading ? 'Tracking...' : 'Track Claim'}
                        </Button>
                    </form>
                    {error && <p className="text-red-500 mt-4 text-center text-sm">{error}</p>}
                </CardContent>

                {claimData && ( // Use claimData here
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
                            <p className="text-sm"><strong>Description:</strong> {claimData.description || 'N/A'}</p> {/* Handle empty description */}
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
                        {/* <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm">
                            Contact Claim Department
                        </Button> */}
                    </CardFooter>
                )}
            </Card>
        </div>
    );
};

export default TrackClaimPage;