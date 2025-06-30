import Header from '@/components/Header';
import React from 'react';

const PrivacyPolicyPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
        <div className="container mx-auto py-12 px-4 max-w-3xl min-h-[70vh]">
            <h1 className="text-4xl font-extrabold text-insurance-primary mb-8 text-center">Privacy Policy</h1>
            <p className="text-gray-700 mb-6 leading-relaxed">
                This Privacy Policy describes how Buddies Insurance ("we," "us," or "our") collects, uses, and discloses your personal information when you visit, use our services, or interact with our website. We are committed to protecting your privacy and ensuring the security of your personal data.
            </p>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-insurance-primary mb-4">1. Information We Collect</h2>
                <p className="text-gray-700 mb-2">We collect various types of information in connection with the services we provide, including:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li><strong>Personal Identifiable Information (PII):</strong> Such as your name, address, email, phone number, date of birth, national identification numbers, financial information (e.g., bank account details, credit card information), and sensitive health information (for health insurance products).</li>
                    <li><strong>Usage Data:</strong> Information on how the website is accessed and used (e.g., IP address, browser type and version, pages visited, time spent on pages, unique device identifiers, and other diagnostic data).</li>
                    <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-insurance-primary mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700 mb-2">We use the collected data for various purposes, primarily to provide and improve our services to you:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>To provide and maintain our Service, including to monitor the usage of our Service.</li>
                    <li>To manage your Account: to manage your registration as a user of the Service. The Personal Data you provide can give you access to different functionalities of the Service that are available to you as a registered user.</li>
                    <li>To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</li>
                    <li>To process your insurance applications, policies, and claims effectively and efficiently.</li>
                    <li>To enforce our terms and conditions.</li>
                    <li>For business transfers: We may use your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-insurance-primary mb-4">3. Disclosure Of Data</h2>
                <p className="text-gray-700 mb-2">We may share your personal information in the following situations:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li><strong>With Service Providers:</strong> We may share your personal information with third-party service providers to monitor and analyze the use of our Service, to contact You.</li>
                    <li><strong>For Business Transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
                    <li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
                    <li><strong>With Business Partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
                    <li><strong>With Other Users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</li>
                    <li><strong>Law enforcement:</strong> Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</li>
                    <li><strong>Other legal requirements:</strong> The Company may disclose Your Personal Data in the good faith belief that such action is necessary to: comply with a legal obligation, protect and defend the rights or property of the Company, prevent or investigate possible wrongdoing in connection with the Service, protect the personal safety of Users of the Service or the public, protect against legal liability.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-insurance-primary mb-4">4. Security Of Data</h2>
                <p className="text-gray-700 leading-relaxed">
                    The security of your data is paramount to us. We implement a variety of security measures to maintain the safety of your personal information. However, please remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-insurance-primary mb-4">5. Your Data Protection Rights</h2>
                <p className="text-gray-700 leading-relaxed">
                    Depending on your jurisdiction, you may have the following data protection rights:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>The right to access, update or delete the information we have on you.</li>
                    <li>The right of rectification, to have your information corrected if that information is inaccurate or incomplete.</li>
                    <li>The right to object to our processing of your Personal Data.</li>
                    <li>The right of restriction, to request that we restrict the processing of your personal information.</li>
                    <li>The right to data portability, to be provided with a copy of the Personal Data we have on you in a structured, machine-readable and commonly used format.</li>
                    <li>The right to withdraw consent, at any time where Buddies Insurance relied on your consent to process your personal information.</li>
                </ul>
                <p className="text-gray-700 mt-4">
                    Please note that we may ask you to verify your identity before responding to such requests.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-insurance-primary mb-4">6. Contact Us</h2>
                <p className="text-gray-700 mb-2">
                    If you have any questions about this Privacy Policy, or if you wish to exercise any of your data protection rights, please contact us:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>By email: <a href="mailto:privacy@buddiesinsurance.com" className="text-blue-600 hover:underline">privacy@buddiesinsurance.com</a></li>
                    <li>By visiting this page on our website: <a href="/support" className="text-blue-600 hover:underline">www.buddiesinsurance.com/support</a></li>
                    <li>By mail: Buddies Insurance Legal Department, [Your Company Address Here], [City, Postal Code, Country]</li>
                </ul>
            </section>

            <p className="text-gray-500 text-sm mt-8 text-center">
                Last updated: June 27, 2025
            </p>
        </div>
        </div>
    );
};

export default PrivacyPolicyPage;
