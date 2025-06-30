import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

const promoters = [
    {
        name: "Dr. Anya Sharma",
        title: "Founder & CEO",
        bio: "Dr. Anya Sharma is a visionary leader with over 20 years of experience in the insurance and financial services industry. Her dedication to customer-centric innovation led to the founding of Buddies Insurance, aiming to simplify insurance for everyone.",
        imageUrl: "https://placehold.co/150x150/004d40/b2dfdb?text=A.S." // Placeholder image
    },
    {
        name: "Mr. Rohan Gupta",
        title: "Chief Operating Officer",
        bio: "Rohan brings extensive operational expertise from leading large-scale tech and financial ventures. He is instrumental in building Buddies Insurance's robust and efficient service delivery mechanisms.",
        imageUrl: "https://placehold.co/150x150/00796b/b2dfdb?text=R.G." // Placeholder image
    },
    {
        name: "Ms. Lena Chen",
        title: "Chief Technology Officer",
        bio: "Lena is the driving force behind Buddies Insurance's advanced digital platform. Her passion for cutting-edge technology ensures a seamless and secure experience for all our policyholders.",
        imageUrl: "https://placehold.co/150x150/004d40/b2dfdb?text=L.C." // Placeholder image
    },
    {
        name: "Mr. David Lee",
        title: "Chief Financial Officer",
        bio: "With a background in corporate finance and risk management, David ensures the financial stability and sustainable growth of Buddies Insurance, safeguarding the interests of both customers and stakeholders.",
        imageUrl: "https://placehold.co/150x150/00796b/b2dfdb?text=D.L." // Placeholder image
    },
];

const AboutPromotersPage = () => {
    return (
        <div className="container mx-auto py-12 px-4 min-h-[70vh]">
            <Header />
            <h1 className="text-4xl font-extrabold text-center mb-8 text-insurance-primary">Our Promoters</h1>
            <p className="text-center text-lg text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
                Meet the dedicated individuals who lead Buddies Insurance with a shared vision of trust, innovation, and customer well-being.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {promoters.map((promoter, index) => (
                    <Card key={index} className="flex flex-col md:flex-row items-center md:items-start p-6 shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
                        <img
                            src={promoter.imageUrl}
                            alt={promoter.name}
                            className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6 border-4 border-insurance-primary shadow-md"
                            onError={(e) => { e.currentTarget.src = `https://placehold.co/150x150/cccccc/000000?text=${promoter.name.split(' ').map(n => n[0]).join('.')}`; }} // Fallback image
                        />
                        <CardContent className="flex-grow p-0 text-center md:text-left">
                            <h3 className="text-2xl font-bold text-gray-800 mb-1">{promoter.name}</h3>
                            <p className="text-insurance-primary font-semibold mb-3">{promoter.title}</p>
                            <p className="text-gray-700 leading-relaxed text-sm">{promoter.bio}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="text-center mt-12">
                <p className="text-lg text-gray-800 font-semibold mb-4">Learn more about our leadership principles.</p>
                <Link to="/about/overview" className="inline-block bg-blue-600 text-white text-lg px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg transform hover:scale-105">
                    Back to About Us
                </Link>
            </div>
        </div>
    );
};

export default AboutPromotersPage;
