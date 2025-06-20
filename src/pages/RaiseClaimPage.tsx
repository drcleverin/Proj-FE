

// src/components/RaiseClaimPage.tsx
import React, { useState } from 'react'; // Removed useContext and AuthContext
// No AuthContext import needed

// Define the styles directly within the component or as a separate style object
const pageStyles: React.CSSProperties = {
    fontFamily: 'sans-serif',
    backgroundColor: '#f4f7f6',
    margin: 0,
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '100vh',
};

const containerStyles: React.CSSProperties = {
    backgroundColor: '#ffffff',
    padding: '30px 40px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '700px',
};

const h1Styles: React.CSSProperties = {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '28px',
};

const sectionTitleStyles: React.CSSProperties = {
    color: '#34495e',
    borderBottom: '2px solid #e0e0e0',
    paddingBottom: '10px',
    marginTop: '25px',
    marginBottom: '20px',
    fontSize: '22px',
};

const formGroupStyles: React.CSSProperties = {
    marginBottom: '18px',
};

const labelStyles: React.CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
    fontWeight: 'bold',
};

const inputFieldStyles: React.CSSProperties = {
    width: 'calc(100% - 22px)',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    boxSizing: 'border-box',
};

const textareaStyles: React.CSSProperties = {
    ...inputFieldStyles, // Inherit common styles
    resize: 'vertical',
    minHeight: '90px',
};

const fileInputStyles: React.CSSProperties = {
    display: 'block',
    marginTop: '8px',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
};

const fileUploadInfoStyles: React.CSSProperties = {
    fontSize: '14px',
    color: '#777',
    marginTop: '5px',
};

const buttonContainerStyles: React.CSSProperties = {
    textAlign: 'center',
    marginTop: '30px',
};

const submitButtonStyles: React.CSSProperties = {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '14px 25px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 0.3s ease',
};

const infoFieldStyles: React.CSSProperties = {
    padding: '10px',
    backgroundColor: '#e9ecef',
    borderRadius: '5px',
    marginBottom: '15px',
    color: '#333',
    fontSize: '16px',
    border: '1px solid #dee2e6',
};

const infoFieldStrongStyles: React.CSSProperties = {
    color: '#000',
};

// Define an interface for the file state to ensure type safety
interface SelectedFilesState {
    documentUpload1: File | null;
    documentUpload2: File | null;
    documentUpload3: File | null;
}

const RaiseClaimPage: React.FC = () => {
    // Initial state for claim data, populated with the provided read-only values
    const [claimData] = useState({ // Made read-only, no setClaimData needed if static
        claimId: 'CLM-2025-06-001',
        policyNumberOverview: 'P123456789',
        claimType: 'Vehicle Damage',
        dateOfIncident: '2024-05-28',
        dateOfClaim: '2024-06-01',
        description: 'Vehicle collision at traffic intersection',
        location: 'MG Road, Bangalore',
        timeOfIncident: '10:30',
        policyNumberDetails: 'P123456789',
        policyType: 'Motor Insurance',
        coverage: 'Comprehensive',
        sumInsured: '₹8,00,000',
        premium: '₹12,500',
    });

    // Removed: const { user, logout } = useContext(AuthContext); // Removed AuthContext

    // State to hold the selected files, mapping input IDs to File objects
    const [selectedFiles, setSelectedFiles] = useState<SelectedFilesState>({
        documentUpload1: null,
        documentUpload2: null,
        documentUpload3: null,
    });

    // Handle file input changes, storing each file by its input ID
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, files } = e.target;
        if (files && files.length > 0) {
            setSelectedFiles(prevFiles => ({
                ...prevFiles,
                [id as keyof SelectedFilesState]: files[0], // Type assertion
            }));
            console.log(`File selected for ${id}:`, files[0].name);
        } else {
            // If file is unselected
            setSelectedFiles(prevFiles => ({
                ...prevFiles,
                [id as keyof SelectedFilesState]: null, // Type assertion
            }));
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();

        // Convert claimData object to a JSON string and append it
        formData.append('claimData', JSON.stringify(claimData));


        // Append files from selectedFiles state
        if (selectedFiles.documentUpload1) formData.append('files', selectedFiles.documentUpload1);
        if (selectedFiles.documentUpload2) formData.append('files', selectedFiles.documentUpload2);
        if (selectedFiles.documentUpload3) formData.append('files', selectedFiles.documentUpload3);


        // Log FormData contents for debugging
        console.log('--- Submitting FormData Contents (to be sent to Spring Boot) ---');
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}: File (Name: ${value.name}, Size: ${value.size} bytes, Type: ${value.type})`);
            } else {
                console.log(`${key}: ${value}`);
            }
        }
        console.log('--------------------------------------------------------------');

        // Removed userToken and Authorization header entirely as security is removed
        // const userToken = localStorage.getItem('userToken');
        // console.log(userToken, " is from local storage");

        // ACTUAL FETCH CALL TO SPRING BOOT BACKEND (now unsecured)
        try {
            const response = await fetch('http://localhost:8093/api/claims/submit', {
                method: 'POST',
                body: formData,
                // No 'Content-Type': 'multipart/form-data' explicitly set here;
                // browser handles it automatically with FormData.
                // No Authorization header needed for unsecured API.
            });

            console.log('Response status:', response);
            if (response.ok) {
                const result = await response.text(); // Use .text() as your backend returns String, not JSON
                console.log('Claim and documents sent to admin successfully via Spring Boot!', result);
                alert('Claim submitted successfully! Documents sent to admin.');
            } else {
                const contentType = response.headers.get('content-type');
                let errorMessage = 'An error occurred';
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    errorMessage = errorData.message || JSON.stringify(errorData);
                } else {
                    errorMessage = await response.text();
                }
                console.error('Failed to send claim and documents. Server response:', errorMessage);
                alert('Claim submission failed: ' + errorMessage);
            }
        } catch (error) {
            console.error('Network error or unexpected issue during claim submission:', error);
            alert('A network error occurred. Please ensure your Spring Boot backend is running and accessible.');
        }
    };

    return (
        <div style={pageStyles}>
            <div style={containerStyles}>
                <h1 style={h1Styles}>Raise a Claim</h1>

                {/* Overview Section */}
                <div style={sectionTitleStyles}>Overview</div>
                <div style={formGroupStyles}>
                    <label htmlFor="claimId" style={labelStyles}>Claim ID</label>
                    <div style={infoFieldStyles}>
                        <strong style={infoFieldStrongStyles}>{claimData.claimId}</strong> (Auto-generated)
                    </div>
                </div>
                <div style={formGroupStyles}>
                    <label htmlFor="policyNumberOverview" style={labelStyles}>Policy Number</label>
                    <div style={infoFieldStyles}>
                        <strong style={infoFieldStrongStyles}>{claimData.policyNumberOverview}</strong>
                    </div>
                </div>
                <div style={formGroupStyles}>
                    <label htmlFor="claimType" style={labelStyles}>Claim Type</label>
                    <input
                        type="text"
                        id="claimType"
                        value={claimData.claimType}
                        readOnly
                        style={inputFieldStyles}
                    />
                </div>
                <div style={formGroupStyles}>
                    <label htmlFor="dateOfIncident" style={labelStyles}>Date of Incident</label>
                    <input
                        type="date"
                        id="dateOfIncident"
                        value={claimData.dateOfIncident}
                        readOnly
                        style={inputFieldStyles}
                    />
                </div>
                <div style={formGroupStyles}>
                    <label htmlFor="dateOfClaim" style={labelStyles}>Date of Claim</label>
                    <input
                        type="date"
                        id="dateOfClaim"
                        value={claimData.dateOfClaim}
                        readOnly
                        style={inputFieldStyles}
                    />
                </div>

                {/* Incident Details Section */}
                <div style={sectionTitleStyles}>Incident Details</div>
                <div style={formGroupStyles}>
                    <label htmlFor="description" style={labelStyles}>Description</label>
                    <textarea
                        id="description"
                        readOnly
                        value={claimData.description}
                        style={textareaStyles}
                    ></textarea>
                </div>
                <div style={formGroupStyles}>
                    <label htmlFor="location" style={labelStyles}>Location</label>
                    <input
                        type="text"
                        id="location"
                        value={claimData.location}
                        readOnly
                        style={inputFieldStyles}
                    />
                </div>
                <div style={formGroupStyles}>
                    <label htmlFor="timeOfIncident" style={labelStyles}>Time of Incident</label>
                    <input
                        type="time"
                        id="timeOfIncident"
                        value={claimData.timeOfIncident}
                        readOnly
                        style={inputFieldStyles}
                    />
                </div>

                {/* Policy Details Section */}
                <div style={sectionTitleStyles}>Policy Details</div>
                <div style={formGroupStyles}>
                    <label htmlFor="policyNumberDetails" style={labelStyles}>Policy Number</label>
                    <input
                        type="text"
                        id="policyNumberDetails"
                        value={claimData.policyNumberDetails}
                        readOnly
                        style={inputFieldStyles}
                    />
                </div>
                <div style={formGroupStyles}>
                    <label htmlFor="policyType" style={labelStyles}>Policy Type</label>
                    <input
                        type="text"
                        id="policyType"
                        value={claimData.policyType}
                        readOnly
                        style={inputFieldStyles}
                    />
                </div>
                <div style={formGroupStyles}>
                    <label htmlFor="coverage" style={labelStyles}>Coverage</label>
                    <input
                        type="text"
                        id="coverage"
                        value={claimData.coverage}
                        readOnly
                        style={inputFieldStyles}
                    />
                </div>
                <div style={formGroupStyles}>
                    <label htmlFor="sumInsured" style={labelStyles}>Sum Insured</label>
                    <input
                        type="text"
                        id="sumInsured"
                        value={claimData.sumInsured}
                        readOnly
                        style={inputFieldStyles}
                    />
                </div>
                <div style={formGroupStyles}>
                    <label htmlFor="premium" style={labelStyles}>Premium</label>
                    <input
                        type="text"
                        id="premium"
                        value={claimData.premium}
                        readOnly
                        style={inputFieldStyles}
                    />
                </div>

                {/* Documents Section */}
                <div style={sectionTitleStyles}>Documents</div>
                <div style={formGroupStyles}>
                    <label htmlFor="documentUpload1" style={labelStyles}>Upload Document 1</label>
                    <input
                        type="file"
                        id="documentUpload1"
                        accept=".pdf, .jpg, .png"
                        style={fileInputStyles}
                        onChange={handleFileChange}
                    />
                    <div className="file-upload-info">Max 3 documents. Allowed formats: PDF, JPG, PNG.</div>
                </div>
                <div style={formGroupStyles}>
                    <label htmlFor="documentUpload2" style={labelStyles}>Upload Document 2</label>
                    <input
                        type="file"
                        id="documentUpload2"
                        accept=".pdf, .jpg, .png"
                        style={fileInputStyles}
                        onChange={handleFileChange}
                    />
                </div>
                <div style={formGroupStyles}>
                    <label htmlFor="documentUpload3" style={labelStyles}>Upload Document 3</label>
                    <input
                        type="file"
                        id="documentUpload3"
                        accept=".pdf, .jpg, .png"
                        style={fileInputStyles}
                        onChange={handleFileChange}
                    />
                </div>

                {/* Submit Button */}
                <div style={buttonContainerStyles}>
                    <button
                        type="submit"
                        style={submitButtonStyles}
                        onClick={handleSubmit}
                    >
                        Submit Claim
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RaiseClaimPage;



// import React, { useContext, useState } from 'react';
// import AuthContext from '../context/AuthContext'; // Import only AuthContext

// // Define the styles directly within the component or as a separate style object
// const pageStyles: React.CSSProperties = {
//     fontFamily: 'sans-serif',
//     backgroundColor: '#f4f7f6',
//     margin: 0,
//     padding: '20px',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     minHeight: '100vh',
// };

// const containerStyles: React.CSSProperties = {
//     backgroundColor: '#ffffff',
//     padding: '30px 40px',
//     borderRadius: '8px',
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//     width: '100%',
//     maxWidth: '700px',
// };

// const h1Styles: React.CSSProperties = {
//     color: '#2c3e50',
//     textAlign: 'center',
//     marginBottom: '30px',
//     fontSize: '28px',
// };

// const sectionTitleStyles: React.CSSProperties = {
//     color: '#34495e',
//     borderBottom: '2px solid #e0e0e0',
//     paddingBottom: '10px',
//     marginTop: '25px',
//     marginBottom: '20px',
//     fontSize: '22px',
// };

// const formGroupStyles: React.CSSProperties = {
//     marginBottom: '18px',
// };

// const labelStyles: React.CSSProperties = {
//     display: 'block',
//     marginBottom: '8px',
//     color: '#555',
//     fontWeight: 'bold',
// };

// const inputFieldStyles: React.CSSProperties = {
//     width: 'calc(100% - 22px)',
//     padding: '12px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     fontSize: '16px',
//     boxSizing: 'border-box',
// };

// const textareaStyles: React.CSSProperties = {
//     ...inputFieldStyles, // Inherit common styles
//     resize: 'vertical',
//     minHeight: '90px',
// };

// const fileInputStyles: React.CSSProperties = {
//     display: 'block',
//     marginTop: '8px',
//     padding: '5px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     backgroundColor: '#f9f9f9',
// };

// const fileUploadInfoStyles: React.CSSProperties = {
//     fontSize: '14px',
//     color: '#777',
//     marginTop: '5px',
// };

// const buttonContainerStyles: React.CSSProperties = {
//     textAlign: 'center',
//     marginTop: '30px',
// };

// const submitButtonStyles: React.CSSProperties = {
//     backgroundColor: '#28a745',
//     color: 'white',
//     padding: '14px 25px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '18px',
//     transition: 'background-color 0.3s ease',
// };

// const infoFieldStyles: React.CSSProperties = {
//     padding: '10px',
//     backgroundColor: '#e9ecef',
//     borderRadius: '5px',
//     marginBottom: '15px',
//     color: '#333',
//     fontSize: '16px',
//     border: '1px solid #dee2e6',
// };

// const infoFieldStrongStyles: React.CSSProperties = {
//     color: '#000',
// };

// // Define an interface for the file state to ensure type safety
// interface SelectedFilesState {
//     documentUpload1: File | null;
//     documentUpload2: File | null;
//     documentUpload3: File | null;
// }

// const RaiseClaimPage: React.FC = () => {
//     // Initial state for claim data, populated with the provided read-only values
//     const [claimData, setClaimData] = useState({
//         claimId: 'CLM-2025-06-001',
//         policyNumberOverview: 'P123456789',
//         claimType: 'Vehicle Damage',
//         dateOfIncident: '2024-05-28',
//         dateOfClaim: '2024-06-01',
//         description: 'Vehicle collision at traffic intersection',
//         location: 'MG Road, Bangalore',
//         timeOfIncident: '10:30',
//         policyNumberDetails: 'P123456789',
//         policyType: 'Motor Insurance',
//         coverage: 'Comprehensive',
//         sumInsured: '₹8,00,000',
//         premium: '₹12,500',
//     });

//     const { user, logout } = useContext(AuthContext); // Used `user` and `logout` from context

//     // State to hold the selected files, mapping input IDs to File objects
//     const [selectedFiles, setSelectedFiles] = useState<SelectedFilesState>({
//         documentUpload1: null,
//         documentUpload2: null,
//         documentUpload3: null,
//     });

//     // Handle changes for input fields (currently only theoretical for read-only fields)
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { id, value } = e.target;
//         setClaimData(prevData => ({
//             ...prevData,
//             [id]: value,
//         }));
//     };

//     // Handle file input changes, storing each file by its input ID
//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { id, files } = e.target;
//         if (files && files.length > 0) {
//             setSelectedFiles(prevFiles => ({
//                 ...prevFiles,
//                 [id]: files[0], // Store the first selected file for this input
//             }));
//             console.log(`File selected for ${id}:`, files[0].name);
//         } else {
//             // If file is unselected
//             setSelectedFiles(prevFiles => ({
//                 ...prevFiles,
//                 [id]: null,
//             }));
//         }
//     };

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();

//         const formData = new FormData();

//         // Convert claimData object to a JSON string and append it
//         formData.append('claimData', JSON.stringify(claimData));


//         // Append files from selectedFiles state
//         // IMPORTANT: The name 'files' here MUST match the @RequestParam name in your Spring Boot controller
//         if (selectedFiles.documentUpload1) formData.append('files', selectedFiles.documentUpload1);
//         if (selectedFiles.documentUpload2) formData.append('files', selectedFiles.documentUpload2);
//         if (selectedFiles.documentUpload3) formData.append('files', selectedFiles.documentUpload3);


//         // Log FormData contents for debugging
//         console.log('--- Submitting FormData Contents (to be sent to Spring Boot) ---');
//         for (const [key, value] of formData.entries()) {
//             if (value instanceof File) {
//                 console.log(`${key}: File (Name: ${value.name}, Size: ${value.size} bytes, Type: ${value.type})`);
//             } else {
//                 console.log(`${key}: ${value}`);
//             }
//         }
//         console.log('--------------------------------------------------------------');

//         // *** FIX IS HERE: Get the raw string directly, do NOT JSON.parse() it ***
//         const userToken = localStorage.getItem('userToken'); // Get the raw string
//         console.log(userToken, " is from local storage"); // This will now log the actual JWT string

//         // ACTUAL FETCH CALL TO SPRING BOOT BACKEND
//         try {
//             const response = await fetch('http://localhost:8093/api/claims/submit', {
//                 method: 'POST',
//                 body: formData,
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // Do NOT set 'Content-Type': 'multipart/form-data' explicitly with FormData,
//                     // the browser handles it automatically.
//                     // If you have a token, include the Authorization header.
                    
//                         ...(userToken && { 'Authorization': `Bearer ${userToken}` }),
//                    // Conditionally add Authorization header
//                 },
//             });

//             console.log('Response status:', response);
//             if (response.ok) {
//                 const result = await response.text(); // Use .text() as your backend returns String, not JSON
//                 console.log('Claim and documents sent to admin successfully via Spring Boot!', result);
//                 alert('Claim submitted successfully! Documents sent to admin.');
//             } else {
//                 const contentType = response.headers.get('content-type');
//                 let errorMessage = 'An error occurred';
//                 if (contentType && contentType.includes('application/json')) {
//                     const errorData = await response.json();
//                     errorMessage = errorData.message || JSON.stringify(errorData);
//                 } else {
//                     errorMessage = await response.text();
//                 }
//                 console.error('Failed to send claim and documents. Server response:', errorMessage);
//                 alert('Claim submission failed: ' + errorMessage);
//             }
//         } catch (error) {
//             console.error('Network error or unexpected issue during claim submission:', error);
//             alert('A network error occurred. Please ensure your Spring Boot backend is running and accessible.');
//         }
//     };

//     return (
//         <div style={pageStyles}>
//             <div style={containerStyles}>
//                 <h1 style={h1Styles}>Raise a Claim</h1>

//                 {/* Overview Section */}
//                 <div style={sectionTitleStyles}>Overview</div>
//                 <div style={formGroupStyles}>
//                     <label htmlFor="claimId" style={labelStyles}>Claim ID</label>
//                     <div style={infoFieldStyles}>
//                         <strong style={infoFieldStrongStyles}>{claimData.claimId}</strong> (Auto-generated)
//                     </div>
//                 </div>
//                 <div style={formGroupStyles}>
//                     <label htmlFor="policyNumberOverview" style={labelStyles}>Policy Number</label>
//                     <div style={infoFieldStyles}>
//                         <strong style={infoFieldStrongStyles}>{claimData.policyNumberOverview}</strong>
//                     </div>
//                 </div>
//                 <div style={formGroupStyles}>
//                     <label htmlFor="claimType" style={labelStyles}>Claim Type</label>
//                     <input
//                         type="text"
//                         id="claimType"
//                         value={claimData.claimType}
//                         readOnly
//                         style={inputFieldStyles}
//                         // Removed onChange={handleChange} as input is readOnly
//                     />
//                 </div>
//                 <div style={formGroupStyles}>
//                     <label htmlFor="dateOfIncident" style={labelStyles}>Date of Incident</label>
//                     <input
//                         type="date"
//                         id="dateOfIncident"
//                         value={claimData.dateOfIncident}
//                         readOnly
//                         style={inputFieldStyles}
//                         // Removed onChange={handleChange} as input is readOnly
//                     />
//                 </div>
//                 <div style={formGroupStyles}>
//                     <label htmlFor="dateOfClaim" style={labelStyles}>Date of Claim</label>
//                     <input
//                         type="date"
//                         id="dateOfClaim"
//                         value={claimData.dateOfClaim}
//                         readOnly
//                         style={inputFieldStyles}
//                         // Removed onChange={handleChange} as input is readOnly
//                     />
//                 </div>

//                 {/* Incident Details Section */}
//                 <div style={sectionTitleStyles}>Incident Details</div>
//                 <div style={formGroupStyles}>
//                     <label htmlFor="description" style={labelStyles}>Description</label>
//                     <textarea
//                         id="description"
//                         readOnly
//                         value={claimData.description}
//                         style={textareaStyles}
//                         // Removed onChange={handleChange} as textarea is readOnly
//                     ></textarea>
//                 </div>
//                 <div style={formGroupStyles}>
//                     <label htmlFor="location" style={labelStyles}>Location</label>
//                     <input
//                         type="text"
//                         id="location"
//                         value={claimData.location}
//                         readOnly
//                         style={inputFieldStyles}
//                         // Removed onChange={handleChange} as input is readOnly
//                     />
//                 </div>
//                 <div style={formGroupStyles}>
//                     <label htmlFor="timeOfIncident" style={labelStyles}>Time of Incident</label>
//                     <input
//                         type="time"
//                         id="timeOfIncident"
//                         value={claimData.timeOfIncident}
//                         readOnly
//                         style={inputFieldStyles}
//                         // Removed onChange={handleChange} as input is readOnly
//                     />
//                 </div>

//                 {/* Policy Details Section */}
//                 <div style={sectionTitleStyles}>Policy Details</div>
//                 <div style={formGroupStyles}>
//                     <label htmlFor="policyNumberDetails" style={labelStyles}>Policy Number</label>
//                     <input
//                         type="text"
//                         id="policyNumberDetails"
//                         value={claimData.policyNumberDetails}
//                         readOnly
//                         style={inputFieldStyles}
//                         // Removed onChange={handleChange} as input is readOnly
//                     />
//                 </div>
//                 <div style={formGroupStyles}>
//                     <label htmlFor="policyType" style={labelStyles}>Policy Type</label>
//                     <input
//                         type="text"
//                         id="policyType"
//                         value={claimData.policyType}
//                         readOnly
//                         style={inputFieldStyles}
//                         // Removed onChange={handleChange} as input is readOnly
//                     />
//                 </div>
//                 <div style={formGroupStyles}>
//                     <label htmlFor="coverage" style={labelStyles}>Coverage</label>
//                     <input
//                         type="text"
//                         id="coverage"
//                         value={claimData.coverage}
//                         readOnly
//                         style={inputFieldStyles}
//                         // Removed onChange={handleChange} as input is readOnly
//                     />
//                 </div>
//                 <div style={formGroupStyles}>
//                     <label htmlFor="sumInsured" style={labelStyles}>Sum Insured</label>
//                     <input
//                         type="text"
//                         id="sumInsured"
//                         value={claimData.sumInsured}
//                         readOnly
//                         style={inputFieldStyles}
//                         // Removed onChange={handleChange} as input is readOnly
//                     />
//                 </div>
//                 <div style={formGroupStyles}>
//                     <label htmlFor="premium" style={labelStyles}>Premium</label>
//                     <input
//                         type="text"
//                         id="premium"
//                         value={claimData.premium}
//                         readOnly
//                         style={inputFieldStyles}
//                         // Removed onChange={handleChange} as input is readOnly
//                     />
//                 </div>

//                 {/* Documents Section */}
//                 <div style={sectionTitleStyles}>Documents</div>
//                 <div style={formGroupStyles}>
//                     <label htmlFor="documentUpload1" style={labelStyles}>Upload Document 1</label>
//                     <input
//                         type="file"
//                         id="documentUpload1"
//                         accept=".pdf, .jpg, .png"
//                         style={fileInputStyles}
//                         onChange={handleFileChange}
//                     />
//                     <div className="file-upload-info">Max 3 documents. Allowed formats: PDF, JPG, PNG.</div>
//                 </div>
//                 <div style={formGroupStyles}>
//                     <label htmlFor="documentUpload2" style={labelStyles}>Upload Document 2</label>
//                     <input
//                         type="file"
//                         id="documentUpload2"
//                         accept=".pdf, .jpg, .png"
//                         style={fileInputStyles}
//                         onChange={handleFileChange}
//                     />
//                 </div>
//                 <div style={formGroupStyles}>
//                     <label htmlFor="documentUpload3" style={labelStyles}>Upload Document 3</label>
//                     <input
//                         type="file"
//                         id="documentUpload3"
//                         accept=".pdf, .jpg, .png"
//                         style={fileInputStyles}
//                         onChange={handleFileChange}
//                     />
//                 </div>

//                 {/* Submit Button */}
//                 <div style={buttonContainerStyles}>
//                     <button
//                         type="submit"
//                         style={submitButtonStyles}
//                         onClick={handleSubmit}
//                     >
//                         Submit Claim
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RaiseClaimPage;