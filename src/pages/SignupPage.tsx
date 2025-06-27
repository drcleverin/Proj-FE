// src/pages/SignupPage.tsx (or a component like src/components/SignupForm.tsx)

import React, { useState } from 'react';

const SignupPage: React.FC = () => {
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<string>(''); // Default role
    const [dateOfBirth, setDateOfBirth] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [contactInformation, setContactInformation] = useState<string>(''); // Keep as string for input, convert to long for API
    const [message, setMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages
        setIsError(false);

        // Basic validation (you'd want more robust validation)
        if (!userName || !email || !password || !role || !contactInformation) {
            setMessage('Please fill in all required fields.');
            setIsError(true);
            return;
        }

        const numericContactInfo = parseInt(contactInformation, 10);
        if (isNaN(numericContactInfo)) {
            setMessage('Contact information must be a valid number.');
            setIsError(true);
            return;
        }

        const newUser = {
            userName,
            email,
            password,
            roleType:role,
            dateOfBirth, // Can be empty if not required by backend validation
            address,     // Can be empty if not required by backend validation
            contactInformation: numericContactInfo
        };

        try {
            const response = await fetch('http://localhost:8093/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            
            const data = await response.text(); // Read as text as your backend returns "New user created successfully!" + createdUser

            if (response.ok) {
                setMessage('Signup successful: ' + data);
                setIsError(false);
                // Optionally clear form or redirect
                setUserName('');
                setEmail('');
                setPassword('');
                setRole('');
                setDateOfBirth('');
                setAddress('');
                setContactInformation('');
            } else {
                // If backend returns a specific error message, use that
                const errorData = response.status === 409 ? data : 'An unexpected error occurred.';
                setMessage('Signup failed: ' + errorData);
                setIsError(true);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setMessage('Network error. Please try again.');
            setIsError(true);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label htmlFor="userName" style={{ display: 'block', marginBottom: '5px' }}>User Name:</label>
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>
                <div>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>
                <div>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>
                <div>
                    <label htmlFor="role" style={{ display: 'block', marginBottom: '5px' }}>Role:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    >
                        <option value="CUSTOMER">CUSTOMER</option>
                        <option value="ADMIN">ADMIN</option> {/* If you have an ADMIN role */}
                    </select>
                </div>
                <div>
                    <label htmlFor="dateOfBirth" style={{ display: 'block', marginBottom: '5px' }}>Date of Birth (YYYY-MM-DD):</label>
                    <input
                        type="date" // Use type="date" for date picker
                        id="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>
                <div>
                    <label htmlFor="address" style={{ display: 'block', marginBottom: '5px' }}>Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>
                <div>
                    <label htmlFor="contactInformation" style={{ display: 'block', marginBottom: '5px' }}>Contact Information:</label>
                    <input
                        type="text" // Use text to allow various inputs, then parse to number
                        id="contactInformation"
                        value={contactInformation}
                        onChange={(e) => setContactInformation(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '10px 15px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Register
                </button>
            </form>

            {message && (
                <p style={{ marginTop: '20px', color: isError ? 'red' : 'green', textAlign: 'center' }}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default SignupPage;