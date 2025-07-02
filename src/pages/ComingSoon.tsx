import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
    return (
        <div className="min-h-screen 
                bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center">
            <div className="text-center max-w-2xl mx-auto px-6">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                        <Shield className="w-12 h-12 text-white" />
                    </div>
                </div>

                {/* Coming Soon Caption */}
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    Product Insurance
                </h1>
                <p className="text-2xl md:text-3xl text-gray-600 mb-8 font-light">
                    Coming Soon
                </p>

                {/* Back to Home Link */}
                <Link
                    to="/"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-lg"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ComingSoon;
