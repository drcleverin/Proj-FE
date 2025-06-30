import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Assuming shadcn/ui Textarea
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast"; // Assuming shadcn/ui Toast
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import Header from '@/components/Header';

const CustomerFeedbackPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedbackType, setFeedbackType] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast(); // Initialize toast

    const handleSubmitFeedback = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate API call to submit feedback
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log('Feedback Submitted:', { name, email, feedbackType, message });

            // Show success toast
            toast({
                title: "Feedback Submitted!",
                description: "Thank you for your valuable feedback. We appreciate your input!",
                variant: "default",
                duration: 3000,
            });

            // Clear the form
            setName('');
            setEmail('');
            setFeedbackType('');
            setMessage('');

        } catch (err) {
            console.error("Error submitting feedback:", err);
            // Show error toast
            toast({
                title: "Submission Failed",
                description: "There was an error submitting your feedback. Please try again.",
                variant: "destructive",
                duration: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-12 px-4 min-h-[70vh]">
            <Header />
            <h1 className="text-4xl font-extrabold text-center mb-8 text-insurance-primary">Share Your Feedback</h1>
            <p className="text-center text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
                Your opinion matters! Please help us improve our services by providing your valuable feedback.
            </p>

            <Card className="max-w-xl mx-auto shadow-lg rounded-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-gray-800">Submit Your Feedback</CardTitle>
                    <CardDescription className="text-gray-600">Fill out the form below to share your thoughts.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmitFeedback} className="space-y-6">
                        <div>
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Your Name (Optional)</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 rounded-md"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Your Email (Optional)</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 rounded-md"
                            />
                        </div>
                        <div>
                            <Label htmlFor="feedbackType" className="text-sm font-medium text-gray-700">Type of Feedback</Label>
                            <Select onValueChange={setFeedbackType} value={feedbackType}>
                                <SelectTrigger className="mt-1 rounded-md">
                                    <SelectValue placeholder="Select feedback type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="suggestion">Suggestion</SelectItem>
                                    <SelectItem value="complaint">Complaint</SelectItem>
                                    <SelectItem value="compliment">Compliment</SelectItem>
                                    <SelectItem value="inquiry">General Inquiry</SelectItem>
                                    <SelectItem value="bug_report">Bug Report</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="message" className="text-sm font-medium text-gray-700">Your Message</Label>
                            <Textarea
                                id="message"
                                placeholder="Tell us what's on your mind..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                rows={5}
                                className="mt-1 rounded-md"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-insurance-primary hover:bg-insurance-secondary text-white py-2 rounded-md transition-colors duration-300"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit Feedback'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CustomerFeedbackPage;
