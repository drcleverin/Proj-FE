import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Header from '@/components/Header';

const LiveChatPage = () => {
    const navigate = useNavigate(); // Initialize the navigate hook

    const handleStartChat = () => {
        // Navigate to the /live-chat route with query parameters
        // The Chatbot component (which is rendered on /live-chat) will then
        // read these parameters and open itself in full screen.
        navigate('/live-chat?openChat=true&fullScreen=true');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
        <div className="container mx-auto py-12 px-4 min-h-[70vh] flex flex-col items-center justify-center">
            {/* <Header /> */}
            <Card className="max-w-2xl w-full text-center shadow-lg rounded-xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-insurance-primary mb-2">Live Chat Support</CardTitle>
                    <CardDescription className="text-lg text-gray-700">
                        Need immediate assistance? Our customer support team is ready to help you in real-time.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pb-6">
                    <p className="text-gray-800 text-md">
                        Our live chat agents are available during business hours to answer your questions, help with policy inquiries, and guide you through our services.
                    </p>
                    <div className="flex justify-center items-center gap-4">
                        {/* Call the new handleStartChat function */}
                        <Button
                            className="bg-insurance-primary hover:bg-insurance-secondary text-white text-lg px-8 py-3 rounded-full transition-colors duration-300 shadow-md"
                            onClick={handleStartChat} // Use the new handler here
                        >
                            Start Chat Now
                        </Button>
                        <a href="/support" className="text-insurance-primary hover:text-insurance-secondary font-semibold text-lg transition-colors duration-300">
                            Explore Other Support Options
                        </a>
                    </div>
                    <p className="text-sm text-gray-500 mt-6">
                        Typical response time: within 2 minutes during operational hours.
                        <br />
                        Availability: Monday - Friday, 9:00 AM - 6:00 PM (Local Time)
                    </p>
                </CardContent>
            </Card>
        </div>
        </div>
    );
};

export default LiveChatPage;
