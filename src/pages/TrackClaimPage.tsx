import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // Assuming shadcn/ui Progress component
import Header from '@/components/Header';

const TrackClaimPage = () => {
    const [claimNumber, setClaimNumber] = useState('');
    const [claimStatus, setClaimStatus] = useState(null); // State to store claim status details
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Function to simulate fetching claim status
    const handleTrackClaim = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setClaimStatus(null);
        setLoading(true);

        try {
            // Simulate an API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock claim data based on claim number
            if (claimNumber === 'C123456789') {
                setClaimStatus({
                    number: 'C123456789',
                    policy: 'MTR987654321',
                    type: 'Motor Accident',
                    status: 'Under Review',
                    progress: 50, // Percentage
                    lastUpdate: '2025-06-25',
                    notes: 'Documents submitted and currently being verified by adjusters.'
                });
            } else if (claimNumber === 'H987654321') {
                setClaimStatus({
                    number: 'H987654321',
                    policy: 'HLT112233445',
                    type: 'Health Reimbursement',
                    status: 'Approved',
                    progress: 100,
                    lastUpdate: '2025-06-20',
                    notes: 'Claim approved. Payment initiated. Funds expected within 3-5 business days.'
                });
            } else if (claimNumber === 'P543210987') {
                setClaimStatus({
                    number: 'P543210987',
                    policy: 'PRD678901234',
                    type: 'Product Damage',
                    status: 'Declined',
                    progress: 100,
                    lastUpdate: '2025-06-22',
                    notes: 'Claim declined: Damage not covered under policy terms. Please review your policy document or contact support.'
                });
            }
            else {
                setError('Claim number not found. Please verify the claim number and try again.');
            }
        } catch (err) {
            setError('An error occurred while tracking your claim. Please try again.');
            console.error("Error tracking claim:", err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Under Review': return 'text-blue-600';
            case 'Approved': return 'text-green-600';
            case 'Declined': return 'text-red-600';
            case 'Pending Documents': return 'text-yellow-600';
            default: return 'text-gray-800';
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
                            <Label htmlFor="claimNumber" className="text-sm font-medium text-gray-700">Claim Number</Label>
                            <Input
                                id="claimNumber"
                                type="text"
                                placeholder="e.g., C123456789"
                                value={claimNumber}
                                onChange={(e) => setClaimNumber(e.target.value.toUpperCase())}
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

                {claimStatus && (
                    <CardFooter className="flex flex-col items-start pt-4 border-t border-gray-200 bg-gray-50 rounded-b-xl px-6 py-4">
                        <h5 className="text-lg font-semibold text-insurance-primary mb-3">Claim Details:</h5>
                        <div className="space-y-2 text-gray-800 w-full">
                            <p className="text-sm"><strong>Claim Number:</strong> {claimStatus.number}</p>
                            <p className="text-sm"><strong>Policy Number:</strong> {claimStatus.policy}</p>
                            <p className="text-sm"><strong>Claim Type:</strong> {claimStatus.type}</p>
                            <p className="text-sm">
                                <strong>Current Status:</strong> <span className={`font-semibold ${getStatusColor(claimStatus.status)}`}>{claimStatus.status}</span>
                            </p>
                            <p className="text-sm"><strong>Last Updated:</strong> {claimStatus.lastUpdate}</p>
                            <p className="text-sm"><strong>Notes:</strong> {claimStatus.notes}</p>

                            <div className="mt-4">
                                <Label htmlFor="claim-progress" className="text-sm font-medium text-gray-700">Claim Progress ({claimStatus.progress}%)</Label>
                                <Progress value={claimStatus.progress} className="mt-2 h-2 bg-gray-200 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-insurance-primary" />
                            </div>
                        </div>
                        <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm">
                            Contact Claim Department
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
};

export default TrackClaimPage;
