import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginStep, setLoginStep] = useState(1);
    const [error, setError] = useState('');

    // Validate email format
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Handle moving to the next step (email -> password)
    const handleNextStep = () => {
        setError(''); // Clear any previous errors
        if (!email || !validateEmail(email)) {
            setError('Please enter a valid email address');
        } else {
            setLoginStep(2);
        }
    };

    // Handle moving back to the email step
    const handleBackStep = () => {
        setError(''); // Clear any previous errors
        setLoginStep(1);
    };

    // Handle login submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Send a POST request to the /get/user endpoint
            const response = await axios.post('/api/get/user', { email, password });

            // Store the JWT token in localStorage
            localStorage.setItem('token', response.data.token);

            // Show success state
            setLoginStep(3);

            // Redirect to the dashboard after a short delay
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000); // 2-second delay

        } catch (err) {
            setError(
                err.response?.data?.error ||
                'Something went wrong. Please try again.'
            );
            setLoginStep(1); // Reset to step 1 on error
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
                    <h1 className="text-3xl font-bold text-blue-600">Welcome Friend!</h1>
                    <p className="text-center text-lg text-gray-600">
                        {loginStep === 1 && "Let's log in together!"}
                        {loginStep === 2 && "Just one more step!"}
                        {loginStep === 3 && "You did it! Great job!"}
                    </p>
                </div>

                {/* Progress indicator */}
                {loginStep < 3 && (
                    <div className="mb-6">
                        <ul className="steps steps-horizontal w-full">
                            <li className={`step ${loginStep >= 1 ? "step-primary" : ""}`}>Email</li>
                            <li className={`step ${loginStep >= 2 ? "step-primary" : ""}`}>Password</li>
                            <li className={`step ${loginStep >= 3 ? "step-primary" : ""}`}>Success</li>
                        </ul>
                    </div>
                )}

                {/* Success message */}
                {loginStep === 3 ? (
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 rounded-full bg-green-100 p-4">
                            <svg className="h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h2 className="mb-2 text-2xl font-bold text-green-600">Login Successful!</h2>
                        <p className="mb-6 text-gray-600">You'll be redirected in a moment...</p>
                        <button
                            className="btn btn-primary w-full"
                            onClick={() => window.location.href = '/dashboard'}
                        >
                            Continue to Website
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleLogin}>
                        {/* Error message */}
                        {error && (
                            <div className="mb-4 rounded-lg bg-red-50 p-4 text-center">
                                <p className="text-red-600">{error}</p>
                            </div>
                        )}

                        {/* Email input - shown in step 1 */}
                        {loginStep === 1 && (
                            <div className="mb-6">
                                <label className="mb-2 block text-lg font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="input input-bordered w-full bg-blue-50 px-4 py-3 text-lg"
                                    placeholder="Type your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleNextStep}
                                    >
                                        Next Step
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Password input - shown in step 2 */}
                        {loginStep === 2 && (
                            <div className="mb-6">
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="block text-lg font-medium text-gray-700">
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        className="btn btn-ghost btn-sm"
                                        onClick={handleBackStep}
                                    >
                                        Back
                                    </button>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="input input-bordered w-full bg-blue-50 px-4 py-3 text-lg"
                                        placeholder="Type your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="loading loading-spinner"></span>
                                                Logging in...
                                            </>
                                        ) : (
                                            "Login"
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;