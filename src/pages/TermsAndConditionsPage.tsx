import Header from '@/components/Header';
import React from 'react';

const TermsAndConditionsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
        <div className="container mx-auto py-12 px-4 max-w-3xl min-h-[70vh]">
            
            <h1 className="text-4xl font-extrabold text-insurance-primary mb-8 text-center">General Terms & Conditions</h1>
            <p className="text-gray-700 mb-6 leading-relaxed">
                Welcome to Buddies Insurance. These terms and conditions outline the rules and regulations for the use of Buddies Insurance's Website, located at [Your Website URL]. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Buddies Insurance if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-insurance-primary mb-4">1. Definitions</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>"Service" refers to the website and all related products and services provided by Buddies Insurance.</li>
                    <li>"User," "You," and "Your" refers to the individual accessing or using the Service.</li>
                    <li>"Company," "We," "Us," and "Our" refers to Buddies Insurance.</li>
                    <li>"Terms" refers to these General Terms and Conditions.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-insurance-primary mb-4">2. Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                    By accessing or using our Service, you agree to be bound by these Terms and Conditions and all policies referenced herein. If you disagree with any part of the terms, then you may not access the Service.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-insurance-primary mb-4">3. Intellectual Property Rights</h2>
                <p className="text-gray-700 leading-relaxed">
                    Unless otherwise stated, Buddies Insurance and/or its licensors own the intellectual property rights for all material on Buddies Insurance. All intellectual property rights are reserved. You may access this from Buddies Insurance for your own personal use subjected to restrictions set in these terms and conditions.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-2">
                    <li>You must not republish material from Buddies Insurance.</li>
                    <li>You must not sell, rent or sub-license material from Buddies Insurance.</li>
                    <li>You must not reproduce, duplicate or copy material from Buddies Insurance.</li>
                    <li>You must not redistribute content from Buddies Insurance.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-insurance-primary mb-4">4. User Accounts</h2>
                <p className="text-gray-700 leading-relaxed">
                    When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-insurance-primary mb-4">5. Insurance Products and Services</h2>
                <p className="text-gray-700 leading-relaxed">
                    The insurance products and services described on this website are subject to the terms and conditions of the applicable policy. Please refer to the specific policy documents for complete details of coverage, exclusions, and limitations. Nothing on this website constitutes an offer to sell or a solicitation to buy any insurance product or service.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-insurance-primary mb-4">6. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed">
                    In no event shall Buddies Insurance, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-insurance-primary mb-4">7. Governing Law</h2>
                <p className="text-gray-700 leading-relaxed">
                    These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-insurance-primary mb-4">8. Changes to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
            </section>

            <p className="text-gray-500 text-sm mt-8 text-center">
                Last updated: June 27, 2025
            </p>
        </div>
        </div>
    );
};

export default TermsAndConditionsPage;
