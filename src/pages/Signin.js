import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState(null); // For displaying error messages
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://cost-catcher-react.vercel.app/api/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            // Log the response for debugging purposes
            console.log('API Response:', data);

            if (response.ok && data.token) {
                localStorage.setItem('token', data.token); // Store token in local storage
                navigate('/home'); // Redirect to the home page
            } else {
                setErrorMessage(data.message || 'Invalid credentials');
            }
        } catch (err) {
            console.error('Error during sign-in:', err);
            setErrorMessage('An error occurred during sign-in. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground transition-colors duration-300 font-inter">
            <div className="w-full max-w-md space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Sign In</h1>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                    <form onSubmit={handleSubmit}>
                        <div className="p-6 space-y-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium leading-none" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    id="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    type="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium leading-none" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                    value={formData.password}
                                />
                            </div>
                        </div>
                        <div className="flex items-center p-6">
                            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-black text-white h-10 px-4 py-2 w-full">
                                Sign In
                            </button>
                        </div>
                        {/* Display error message */}
                        {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
                    </form>
                    <div className='text-center py-4'>
                        <p className='text-sm'>Dont't have an account? <a href='/signup' className='underline'>Signup</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
