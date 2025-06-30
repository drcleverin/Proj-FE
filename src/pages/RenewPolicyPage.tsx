import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Header from '@/components/Header';

const RenewPolicyPage = () => {
    const [policyNumber, setPolicyNumber] = useState('');
    const [email, setEmail] = useState('');
    const [policyDetails, setPolicyDetails] = useState(null); // To store policy details for renewal
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [renewalConfirmed, setRenewalConfirmed] = useState(false);

    const handleFetchPolicy = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setPolicyDetails(null);
        setLoading(true);
        setRenewalConfirmed(false);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock policy data
            if (policyNumber === 'POL123456789' && email === 'user@example.com') {
                setPolicyDetails({
                    number: 'POL123456789',
                    type: 'Motor Insurance',
                    currentPremium: '$500.00',
                    expiryDate: '2025-07-31',
                    renewalPremium: '$525.00',
                    benefits: ['Third-party liability', 'Own damage cover', 'Roadside assistance']
                });
            } else {
                setError('Policy not found or details do not match. Please verify.');
            }
        } catch (err) {
            setError('Failed to fetch policy details. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRenew = async () => {
        setLoading(true);
        setError('');
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setRenewalConfirmed(true);
            // In a real app, you would process payment and update policy status in backend
        } catch (err) {
            setError('Failed to process renewal. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-12 px-4 min-h-[70vh]">
            <Header />
            <h1 className="text-4xl font-extrabold text-center mb-8 text-insurance-primary">Renew Your Policy</h1>
            <p className="text-center text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
                Renew your insurance policy quickly and easily online. Enter your policy details to get started.
            </p>

            <Card className="max-w-xl mx-auto shadow-lg rounded-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-gray-800">Find Your Policy for Renewal</CardTitle>
                    <CardDescription className="text-gray-600">Enter your policy number and associated email address.</CardDescription>
                </CardHeader>
                <CardContent>
                    {!renewalConfirmed ? (
                        <form onSubmit={handleFetchPolicy} className="space-y-6">
                            <div>
                                <Label htmlFor="policyNumber" className="text-sm font-medium text-gray-700">Policy Number</Label>
                                <Input
                                    id="policyNumber"
                                    type="text"
                                    placeholder="e.g., POL123456789"
                                    value={policyNumber}
                                    onChange={(e) => setPolicyNumber(e.target.value.toUpperCase())}
                                    required
                                    className="mt-1 rounded-md"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="e.g., yourname@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 rounded-md"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-insurance-primary hover:bg-insurance-secondary text-white py-2 rounded-md transition-colors duration-300"
                                disabled={loading}
                            >
                                {loading ? 'Fetching Policy...' : 'Find Policy'}
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center py-8">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-2xl font-bold text-green-700 mb-2">Policy Renewed Successfully!</h3>
                            <p className="text-gray-700">Your policy <strong>{policyDetails?.number}</strong> has been successfully renewed. A confirmation email with updated policy documents has been sent to your registered email address.</p>
                            <Button onClick={() => window.location.reload()} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors duration-300">
                                Renew Another Policy
                            </Button>
                        </div>
                    )}

                    {error && <p className="text-red-500 mt-4 text-center text-sm">{error}</p>}
                </CardContent>

                {policyDetails && !renewalConfirmed && (
                    <CardFooter className="flex flex-col items-start pt-4 border-t border-gray-200 bg-gray-50 rounded-b-xl px-6 py-4">
                        <h5 className="text-lg font-semibold text-insurance-primary mb-3">Policy Details for Renewal:</h5>
                        <div className="space-y-2 text-gray-800 w-full">
                            <p className="text-sm"><strong>Policy Number:</strong> {policyDetails.number}</p>
                            <p className="text-sm"><strong>Policy Type:</strong> {policyDetails.type}</p>
                            <p className="text-sm"><strong>Current Premium:</strong> {policyDetails.currentPremium}</p>
                            <p className="text-sm"><strong>Expiry Date:</strong> <span className="text-red-500 font-semibold">{policyDetails.expiryDate}</span></p>
                            <p className="text-base font-bold text-green-700 mt-2">Renewal Premium: {policyDetails.renewalPremium}</p>
                            <p className="text-sm"><strong>Benefits:</strong> {policyDetails.benefits.join(', ')}</p>
                        </div>
                        <Button
                            onClick={handleRenew}
                            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-colors duration-300"
                            disabled={loading}
                        >
                            {loading ? 'Processing Renewal...' : 'Confirm Renewal & Pay'}
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
};

export default RenewPolicyPage;
