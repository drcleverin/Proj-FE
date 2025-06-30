import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';


const csrInitiatives = [
    {
        title: "Community Health & Wellness",
        description: "Supporting local health camps, sponsoring wellness programs, and promoting health education in underserved communities. Our initiatives aim to foster healthier lifestyles and improve access to basic healthcare.",
        icon: "💖" // Heart emoji as placeholder icon
    },
    {
        title: "Environmental Sustainability",
        description: "Implementing eco-friendly practices within our operations, reducing carbon footprint, and actively supporting reforestation projects and clean energy initiatives for a greener planet.",
        icon: "🌳" // Tree emoji
    },
    {
        title: "Financial Literacy Programs",
        description: "Empowering individuals and families by educating them on essential personal finance, insurance basics, investment strategies, and wealth management to foster economic stability and growth.",
        icon: "💰" // Money bag emoji
    },
    {
        title: "Youth Education & Empowerment",
        description: "Investing in the future by providing scholarships, comprehensive mentorship programs, and vocational training for underprivileged youth, equipping them with skills for a brighter tomorrow.",
        icon: "🎓" // Graduation cap emoji
    },
];

const AboutCSRPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
        {/* <div className="container mx-auto py-12 px-4 min-h-[70vh]"> */}
            <h1 className="text-4xl font-extrabold text-center mb-8 text-insurance-primary">Corporate Social Responsibility (CSR)</h1>
            <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
                At **Buddies Insurance**, we believe in giving back to the communities we serve. Our commitment extends beyond providing insurance; we strive to create a positive and sustainable impact on society and the environment through meaningful initiatives.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
                {csrInitiatives.map((initiative, index) => (
                    <Card key={index} className="p-6 text-center shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
                        <div className="text-5xl mb-4 p-3 bg-gray-100 rounded-full">{initiative.icon}</div> {/* Emoji as icon */}
                        <h3 className="text-2xl font-bold text-insurance-primary mb-3">{initiative.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{initiative.description}</p>
                    </Card>
                ))}
            </div>

            <section className="text-center mb-12">
                <h2 className="text-3xl font-bold text-insurance-primary mb-6">Our Impact in Numbers</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <p className="text-5xl font-bold text-insurance-primary mb-2">10K+</p>
                        <p className="text-gray-700 font-semibold">Lives Touched by Health Camps</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <p className="text-5xl font-bold text-insurance-primary mb-2">500+</p>
                        <p className="text-gray-700 font-semibold">Trees Planted Annually</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <p className="text-5xl font-bold text-insurance-primary mb-2">2K+</p>
                        <p className="text-gray-700 font-semibold">Individuals Financially Educated</p>
                    </div>
                </div>
            </section>

            <div className="text-center">
                <p className="text-lg text-gray-800 font-semibold mb-4">Want to know more or collaborate on a CSR initiative?</p>
                <Link to="/contact" className="inline-block bg-blue-600 text-white text-lg px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg transform hover:scale-105">
                    Contact Our CSR Team
                </Link>
            </div>
        </div>
        // </div>
    );
};

export default AboutCSRPage;
