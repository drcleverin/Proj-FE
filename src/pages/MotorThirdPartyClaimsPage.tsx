import { Button } from '@/components/ui/button';
import React from 'react';

const MotorThirdPartyClaimsPage = () => {
    return (
        <div className="container mx-auto py-12 px-4 max-w-3xl min-h-[70vh]">
            <h1 className="text-4xl font-extrabold text-insurance-primary mb-8 text-center">Motor Third Party Claims</h1>
            <p className="text-gray-700 mb-6 leading-relaxed">
                Understanding the process for motor third-party claims can be complex. This section provides a comprehensive guide to help you navigate through the steps involved in filing and processing a third-party claim with Buddies Insurance.
            </p>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-insurance-primary mb-4">What is a Third-Party Claim?</h2>
                <p className="text-gray-700 leading-relaxed">
                    A motor third-party claim arises when your vehicle causes damage or injury to a third party (another person, their vehicle, or their property). Your third-party liability insurance policy covers the financial liabilities arising from such incidents. It does not cover damages to your own vehicle or injuries to yourself.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-insurance-primary mb-4">Steps to File a Third-Party Claim</h2>
                <ol className="list-decimal list-inside text-gray-700 space-y-3 ml-4">
                    <li>
                        <strong>Immediate Action at Accident Site:</strong>
                        <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                            <li>Ensure safety first. Move to a safe location if possible.</li>
                            <li>Exchange information with the third party: names, contact numbers, vehicle registration numbers, and insurance details.</li>
                            <li>Do NOT admit fault or offer compensation at the scene.</li>
                            <li>Collect evidence: take photos/videos of the accident scene, vehicle damage, road conditions, and any injuries. Note down eyewitness contact details.</li>
                            <li>If there are injuries or significant damage, report to the police immediately. Obtain a police report (FIR) if required.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Notify Buddies Insurance Promptly:</strong>
                        <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                            <li>Report the incident to us as soon as possible, ideally within 24-48 hours. You can do this through our website, mobile app, or by calling our claims helpline.</li>
                            <li>Provide all details collected at the accident site.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Document Submission:</strong>
                        <p className="mt-1">You will be required to submit necessary documents. Common documents include:</p>
                        <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                            <li>Copy of your Driving License.</li>
                            <li>Copy of your Vehicle Registration Certificate (RC).</li>
                            <li>Copy of your Insurance Policy document.</li>
                            <li>FIR copy (if applicable).</li>
                            <li>Claim form (filled and signed).</li>
                            <li>Any other relevant documents requested by the surveyor/investigator.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Survey and Investigation:</strong>
                        <p className="mt-1">We will appoint a surveyor/investigator to assess the damages/injuries sustained by the third party and determine the liability. Cooperate fully with the surveyor and provide all requested information.</p>
                    </li>
                    <li>
                        <strong>Legal Process (if applicable):</strong>
                        <p className="mt-1">For bodily injury claims, the third party might file a case with the Motor Accident Claims Tribunal (MACT). Our legal team will handle the proceedings, but your cooperation will be required for statements or attendance if necessary.</p>
                    </li>
                    <li>
                        <strong>Settlement:</strong>
                        <p className="mt-1">Once liability is established and the quantum of loss/injury is determined (either through mutual agreement or MACT award), the claim will be settled directly with the third party by Buddies Insurance.</p>
                    </li>
                </ol>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-insurance-primary mb-4">Important Considerations</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li><strong>Never Admit Guilt:</strong> Admitting fault can jeopardize your claim. Let the investigation determine liability.</li>
                    <li><strong>Timely Reporting:</strong> Delays in reporting can affect your claim.</li>
                    <li><strong>Cooperation:</strong> Provide all information and cooperate with our team and appointed surveyors/investigators.</li>
                    <li><strong>Keep Records:</strong> Maintain copies of all documents submitted and correspondence.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-insurance-primary mb-4">Need Assistance?</h2>
                <p className="text-gray-700">
                    If you have any questions or require further assistance with your third-party claim, please do not hesitate to contact our claims department.
                </p>
                <Button className="mt-4 bg-insurance-primary hover:bg-insurance-secondary text-white py-2 px-6 rounded-md transition-colors duration-300">
                    Contact Claims Department
                </Button>
            </section>

            <p className="text-gray-500 text-sm mt-8 text-center">
                This information is for general guidance only. Refer to your policy document for specific terms and conditions.
            </p>
        </div>
    );
};

export default MotorThirdPartyClaimsPage;
