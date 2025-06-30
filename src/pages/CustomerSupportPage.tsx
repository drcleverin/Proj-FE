import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';

const supportChannels = [
    {
        title: "Live Chat",
        description: "Get instant help from our agents during business hours. Ideal for quick questions and real-time assistance.",
        path: "/live-chat",
        buttonText: "Start Live Chat",
        icon: "💬" // Speech bubble emoji
    },
    {
        title: "Email Support",
        description: "Send us your detailed queries or documents, and we'll respond within 24-48 hours.",
        path: "mailto:support@buddiesinsurance.com",
        buttonText: "Send Email",
        icon: "📧" // Email emoji
    },
    {
        title: "Call Us",
        description: "Speak directly with a friendly support representative for personalized assistance.",
        path: "tel:+18001234567",
        buttonText: "Call Now",
        icon: "📞" // Phone emoji
    },
    {
        title: "FAQs & Knowledge Base",
        description: "Find immediate answers to common questions and browse self-help articles at your convenience.",
        path: "/faqs", // You'd need to create this page route and component
        buttonText: "Browse FAQs",
        icon: "📚" // Books emoji
    },
];

const CustomerSupportPage = () => {
    return (
        <div className="container mx-auto py-12 px-4 min-h-[70vh]">
            <Header />
            <h1 className="text-4xl font-extrabold text-center mb-8 text-insurance-primary">Customer Support</h1>
            <p className="text-center text-lg text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
                We're here to help! Choose the most convenient way to get in touch with **Buddies Insurance** for all your questions, claims, and policy needs. Our dedicated team is committed to providing you with excellent service.
            </p>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {supportChannels.map((channel, index) => (
                    <Card key={index} className="text-center p-6 shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-between">
                        <CardHeader className="p-0 mb-4 flex flex-col items-center">
                            <div className="text-5xl mb-2 p-3 bg-gray-100 rounded-full">{channel.icon}</div>
                            <CardTitle className="text-2xl font-bold text-gray-800">{channel.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 flex-grow flex flex-col justify-between items-center space-y-4">
                            <CardDescription className="text-gray-700 mb-4 flex-grow">{channel.description}</CardDescription>
                            {/* Conditional rendering for external links vs. internal React Router links */}
                            {channel.path.startsWith('http') || channel.path.startsWith('mailto') || channel.path.startsWith('tel') ? (
                                <a href={channel.path} className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 mt-auto">
                                    {channel.buttonText}
                                </a>
                            ) : (
                                <Link to={channel.path} className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 mt-auto">
                                    {channel.buttonText}
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <section className="text-center mt-12 mb-8">
                <h2 className="text-3xl font-bold text-insurance-primary mb-6">Quick Links & Resources</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/track-claim" className="inline-block text-insurance-primary hover:text-insurance-secondary font-semibold px-4 py-2 border border-insurance-primary rounded-md transition-colors duration-300">
                        Track My Claim
                    </Link>
                    <Link to="/renew-policy" className="inline-block text-insurance-primary hover:text-insurance-secondary font-semibold px-4 py-2 border border-insurance-primary rounded-md transition-colors duration-300">
                        Renew My Policy
                    </Link>
                    <Link to="/policy" className="inline-block text-insurance-primary hover:text-insurance-secondary font-semibold px-4 py-2 border border-insurance-primary rounded-md transition-colors duration-300">
                        View All Policies
                    </Link>
                    <Link to="/customer-feedback" className="inline-block text-insurance-primary hover:text-insurance-secondary font-semibold px-4 py-2 border border-insurance-primary rounded-md transition-colors duration-300">
                        Provide Feedback
                    </Link>
                    {/* Add a generic contact us page link if you have one */}
                    <Link to="/contact" className="inline-block text-insurance-primary hover:text-insurance-secondary font-semibold px-4 py-2 border border-insurance-primary rounded-md transition-colors duration-300">
                        General Contact
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default CustomerSupportPage;
