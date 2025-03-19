import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [signupStep, setSignupStep] = useState(1);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const moveToNextStep = () => {
        // Validate current step
        if (signupStep === 1) {
            if (!formData.name.trim()) {
                setError('Please enter your name');
                return;
            }
        } else if (signupStep === 2) {
            if (!formData.email.trim()) {
                setError('Please enter your email');
                return;
            }
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                setError('Please enter a valid email address');
                return;
            }
        } else if (signupStep === 3) {
            if (!formData.password) {
                setError('Please create a password');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }
        }

        setError('');
        setSignupStep(prev => prev + 1);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Hash password before sending (usually done on server side)
            // For this example, we'll send plaintext to your createUser endpoint
            const response = await axios.post('/api/create/user', {
                name: formData.name,
                email: formData.email,
                password: formData.password // Note: In a real app, hashing should be done server-side
            });

            // Show success state
            setSignupStep(5);

        } catch (err) {
            setError(
                err.response?.data?.error ||
                'Something went wrong. Please try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-50 p-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
                {/* Header with friendly mascot */}
                <div className="mb-6 flex flex-col items-center">
                    <div className="avatar mb-4">
                        <div className="w-20 rounded-full bg-blue-100 p-2">
                            <img
                                src="/api/placeholder/100/100"
                                alt="Friendly character"
                            />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-blue-600">Join Our Community!</h1>
                    <p className="text-center text-lg text-gray-600">
                        {signupStep === 1 && "Let's start with your name"}
                        {signupStep === 2 && "Now, let's add your email"}
                        {signupStep === 3 && "Create a secret password"}
                        {signupStep === 4 && "Let's confirm everything"}
                        {signupStep === 5 && "Great job! You're all signed up!"}
                    </p>
                </div>

                {/* Progress indicator */}
                {signupStep < 5 && (
                    <div className="mb-6">
                        <ul className="steps steps-horizontal w-full">
                            <li className={`step ${signupStep >= 1 ? "step-primary" : ""}`}>Name</li>
                            <li className={`step ${signupStep >= 2 ? "step-primary" : ""}`}>Email</li>
                            <li className={`step ${signupStep >= 3 ? "step-primary" : ""}`}>Password</li>
                            <li className={`step ${signupStep >= 4 ? "step-primary" : ""}`}>Confirm</li>
                        </ul>
                    </div>
                )}

                {/* Error message */}
                {error && (
                    <div className="mb-4 rounded-lg bg-red-50 p-4 text-center">
                        <p className="text-red-600">{error}</p>
                    </div>
                )}

                {/* Success message */}
                {signupStep === 5 ? (
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 rounded-full bg-green-100 p-4">
                            <svg className="h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h2 className="mb-2 text-2xl font-bold text-green-600">Success!</h2>
                        <p className="mb-6 text-gray-600">You've created your account!</p>
                        <button
                            className="btn btn-primary w-full"
                            onClick={() => window.location.href = '/login'}
                        >
                            Go to Login
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSignup}>
                        {/* Step 1: Name */}
                        {signupStep === 1 && (
                            <div className="mb-6">
                                <label className="mb-2 block text-lg font-medium text-gray-700">
                                    What's your name?
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input input-bordered w-full bg-blue-50 px-4 py-3 text-lg"
                                    placeholder="Type your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={moveToNextStep}
                                    >
                                        Next Step
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Email */}
                        {signupStep === 2 && (
                            <div className="mb-6">
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="block text-lg font-medium text-gray-700">
                                        What's your email?
                                    </label>
                                    <button
                                        type="button"
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => setSignupStep(1)}
                                    >
                                        Back
                                    </button>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    className="input input-bordered w-full bg-blue-50 px-4 py-3 text-lg"
                                    placeholder="Type your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={moveToNextStep}
                                    >
                                        Next Step
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Password */}
                        {signupStep === 3 && (
                            <div className="mb-6">
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="block text-lg font-medium text-gray-700">
                                        Create a password
                                    </label>
                                    <button
                                        type="button"
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => setSignupStep(2)}
                                    >
                                        Back
                                    </button>
                                </div>
                                <div className="relative mb-4">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="input input-bordered w-full bg-blue-50 px-4 py-3 text-lg"
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                                <div className="relative mb-4">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        className="input input-bordered w-full bg-blue-50 px-4 py-3 text-lg"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={moveToNextStep}
                                    >
                                        Next Step
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Review & Submit */}
                        {signupStep === 4 && (
                            <div className="mb-6">
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="block text-lg font-medium text-gray-700">
                                        Review your information
                                    </label>
                                    <button
                                        type="button"
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => setSignupStep(3)}
                                    >
                                        Back
                                    </button>
                                </div>
                                <div className="mb-4 rounded-lg bg-blue-50 p-4">
                                    <div className="mb-2">
                                        <span className="font-bold">Name:</span> {formData.name}
                                    </div>
                                    <div className="mb-2">
                                        <span className="font-bold">Email:</span> {formData.email}
                                    </div>
                                    <div>
                                        <span className="font-bold">Password:</span> ••••••••
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="loading loading-spinner"></span>
                                                Creating account...
                                            </>
                                        ) : (
                                            "Create My Account"
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                )}

                {/* Login link */}
                {signupStep < 5 && (
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <a href="/login" className="font-bold text-blue-600 hover:underline">
                                Log in
                            </a>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Signup;