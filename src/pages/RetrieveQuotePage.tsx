import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Header from '@/components/Header';

const RetrieveQuotePage = () => {
    const [policyNumber, setPolicyNumber] = useState('');
    const [policyType, setPolicyType] = useState('');
    const [quoteData, setQuoteData] = useState(null); // State to store retrieved quote details
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Function to handle the form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior
        setError('');       // Clear previous errors
        setQuoteData(null); // Clear previous quote data
        setLoading(true);   // Set loading state to true

        try {
            // Simulate an API call or data retrieval delay
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

            // Mock data for demonstration purposes
            if (policyNumber === 'ABC12345' && policyType === 'motor') {
                setQuoteData({
                    policyNumber: 'ABC12345',
                    type: 'Motor Insurance',
                    premium: '$500.00',
                    renewalDate: '2026-03-15',
                    status: 'Active',
                    details: 'Comprehensive motor insurance for a 2023 sedan.'
                });
            } else if (policyNumber === 'XYZ98765' && policyType === 'health') {
                setQuoteData({
                    policyNumber: 'XYZ98765',
                    type: 'Health Insurance',
                    premium: '$1200.00',
                    renewalDate: '2026-06-01',
                    status: 'Active',
                    details: 'Family floater health insurance covering 3 members.'
                });
            } else {
                // If no match, set an error message
                setError('No quote found for the provided details. Please double-check and try again.');
            }
        } catch (err) {
            // Catch and display any errors during the retrieval process
            setError('Failed to retrieve quote due to a technical issue. Please try again later.');
            console.error("Error retrieving quote:", err);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="container mx-auto py-12 px-4 min-h-[70vh]">
            <Header />
            <h1 className="text-4xl font-extrabold text-center mb-8 text-insurance-primary">Retrieve Your Insurance Quote</h1>
            <p className="text-center text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
                Easily find details of your existing insurance quote by entering your policy number and selecting the policy type.
            </p>

            {/* Main card for the retrieval form */}
            <Card className="max-w-xl mx-auto shadow-lg rounded-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-gray-800">Find Your Quote</CardTitle>
                    <CardDescription className="text-gray-600">Enter your policy details below to view your quote information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="policyNumber" className="text-sm font-medium text-gray-700">Policy Number</Label>
                            <Input
                                id="policyNumber"
                                type="text"
                                placeholder="e.g., ABC12345"
                                value={policyNumber}
                                onChange={(e) => setPolicyNumber(e.target.value.toUpperCase())} // Convert to uppercase for consistency
                                required
                                className="mt-1 rounded-md"
                            />
                        </div>
                        <div>
                            <Label htmlFor="policyType" className="text-sm font-medium text-gray-700">Policy Type</Label>
                            <Select onValueChange={setPolicyType} required>
                                <SelectTrigger className="mt-1 rounded-md">
                                    <SelectValue placeholder="Select Policy Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="motor">Motor Insurance</SelectItem>
                                    <SelectItem value="health">Health Insurance</SelectItem>
                                    <SelectItem value="product">Product Insurance</SelectItem>
                                    <SelectItem value="travel">Travel Insurance</SelectItem>
                                    <SelectItem value="home">Home Insurance</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-insurance-primary hover:bg-insurance-secondary text-white py-2 rounded-md transition-colors duration-300"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Searching...' : 'Retrieve Quote'}
                        </Button>
                    </form>
                    {/* Display error message if any */}
                    {error && <p className="text-red-500 mt-4 text-center text-sm">{error}</p>}
                </CardContent>

                {/* Display retrieved quote data */}
                {quoteData && (
                    <CardFooter className="flex flex-col items-start pt-4 border-t border-gray-200 bg-gray-50 rounded-b-xl px-6 py-4">
                        <h5 className="text-lg font-semibold text-insurance-primary mb-3">Your Quote Details:</h5>
                        <div className="space-y-2 text-gray-800">
                            <p className="text-sm"><strong>Policy Number:</strong> {quoteData.policyNumber}</p>
                            <p className="text-sm"><strong>Policy Type:</strong> {quoteData.type}</p>
                            <p className="text-sm"><strong>Estimated Premium:</strong> {quoteData.premium}</p>
                            <p className="text-sm"><strong>Next Renewal Date:</strong> {quoteData.renewalDate}</p>
                            <p className="text-sm"><strong>Status:</strong> <span className="font-semibold text-green-600">{quoteData.status}</span></p>
                            <p className="text-sm"><strong>Description:</strong> {quoteData.details}</p>
                        </div>
                        <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm">
                            Proceed to Purchase
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
};

export default RetrieveQuotePage;
