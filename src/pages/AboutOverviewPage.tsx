import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';

const AboutOverviewPage = () => {
    return (
        <div className="container mx-auto py-12 px-4 min-h-[70vh]">
            <Header />
            <h1 className="text-4xl font-extrabold text-center mb-8 text-insurance-primary">About Buddies Insurance</h1>
            <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
                At **Buddies Insurance**, we're more than just an insurance provider; we're your reliable partner in safeguarding what matters most. Established with a vision to simplify insurance and make it accessible to everyone, we are committed to providing transparent, comprehensive, and compassionate coverage. We believe in building lasting relationships based on trust and reliability, ensuring peace of mind for all our clients.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* Mission Card */}
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                    <CardContent className="p-6">
                        <h3 className="text-2xl font-bold text-insurance-primary mb-3">Our Mission</h3>
                        <p className="text-gray-700 leading-relaxed">
                            To empower individuals and businesses with unparalleled peace of mind through innovative, tailored, and easily understandable insurance solutions. We strive to be the most trusted name in insurance, prioritizing customer well-being and financial security above all else.
                        </p>
                    </CardContent>
                </Card>
                {/* Vision Card */}
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                    <CardContent className="p-6">
                        <h3 className="text-2xl font-bold text-insurance-primary mb-3">Our Vision</h3>
                        <p className="text-gray-700 leading-relaxed">
                            To redefine the insurance experience by leveraging cutting-edge technology and human touch, setting new benchmarks for service excellence, and fostering a secure, resilient future for our policyholders in an ever-changing world.
                        </p>
                    </CardContent>
                </Card>
                {/* Values Card */}
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                    <CardContent className="p-6">
                        <h3 className="text-2xl font-bold text-insurance-primary mb-3">Our Values</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>**Integrity:** Upholding the highest ethical standards in all our dealings.</li>
                            <li>**Customer-Centricity:** Putting our customers at the heart of everything we do, listening to their needs.</li>
                            <li>**Innovation:** Continuously evolving our products and processes to meet changing market needs.</li>
                            <li>**Empathy:** Understanding and responding to our customers' unique situations with care and compassion.</li>
                            <li>**Excellence:** Striving for superior performance and quality in every aspect of our operations.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <section className="text-center mb-12">
                <h2 className="text-3xl font-bold text-insurance-primary mb-6">Why Choose Buddies Insurance?</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">Comprehensive Coverage</h4>
                        <p className="text-gray-700">A wide range of meticulously designed policies to protect you from various risks, tailored precisely to your specific needs and circumstances.</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">Simplified Process</h4>
                        <p className="text-gray-700">Experience effortless online application, intuitive policy management, and streamlined claim processing, all designed to save you precious time and unnecessary hassle.</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">Expert Support</h4>
                        <p className="text-gray-700">Our dedicated team of seasoned insurance professionals is always ready to assist you with unparalleled expert advice and prompt, friendly support whenever you need it.</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">Competitive Rates</h4>
                        <p className="text-gray-700">Get the absolute best value for your money with our highly affordable premiums and a commitment to transparent, straightforward pricing, ensuring no hidden surprises.</p>
                    </div>
                </div>
            </section>

            <div className="text-center">
                <p className="text-lg text-gray-800 font-semibold mb-4">Ready to secure your future with a trusted partner?</p>
                <Link to="/policy" className="inline-block bg-insurance-primary text-white text-lg px-8 py-3 rounded-full hover:bg-insurance-secondary transition-colors duration-300 shadow-lg transform hover:scale-105">
                    Explore Our Policies
                </Link>
            </div>
        </div>
    );
};

export default AboutOverviewPage;
