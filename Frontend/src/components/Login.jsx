import React, { useState } from 'react';

const Login = ({ onNavClick, onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            console.log('Login Successful', data);

            // In a real app, you would store data.user.token in localStorage here
            // localStorage.setItem('token', data.user.token);

            alert(`Welcome back, ${data.user.name}!`);
            onLogin(data.user);

        } catch (error) {
            console.error('Login Error:', error);
            alert("Error: " + error.message);
        }
    };

    return (
        <section className="py-20 bg-gray-100 min-h-[80vh] flex items-center justify-center">
            <div className="max-w-md w-full mx-auto px-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 animate-fadeIn">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex flex-col items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-black text-gray-900">Welcome Back</h2>
                        <p className="text-gray-500 mt-2 font-medium">Log in to view your flights and bookings</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-semibold"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-sm font-bold text-gray-700" htmlFor="password">Password</label>
                                <span className="text-xs font-bold text-indigo-600 cursor-pointer hover:underline">Forgot?</span>
                            </div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-semibold"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white rounded-xl px-4 py-4 font-black shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] transition-all active:scale-95 mt-4"
                        >
                            Log In Securely
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500 font-medium">
                            Don't have an account?{' '}
                            <button
                                onClick={() => onNavClick('signup')}
                                className="text-indigo-600 font-bold hover:underline transition-all"
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
