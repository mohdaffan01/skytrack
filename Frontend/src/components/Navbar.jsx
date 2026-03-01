import React, { useState } from 'react';

const Navbar = ({ onNavClick, currentUser, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Flights', id: 'flights' },
        { name: 'About Us', id: 'about' },
        { name: 'Customer Service', id: 'service' },
        { name: 'Contact', id: 'contact' },
    ];

    const handleNavClick = (id) => {
        onNavClick(id);
        setIsOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
                        <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                            SkyTrack
                        </span>
                    </div>

                    {/* Nav Links - Desktop */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => handleNavClick(link.id)}
                                className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors cursor-pointer bg-transparent border-none"
                            >
                                {link.name}
                            </button>
                        ))}
                        {currentUser ? (
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-gray-700">Hi, {currentUser.name.split(' ')[0]}</span>
                                <button
                                    onClick={onLogout}
                                    className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-200 transition-all active:scale-95 cursor-pointer border border-gray-200"
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => handleNavClick('login')}
                                className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:scale-105 active:scale-95 cursor-pointer"
                            >
                                Log In / Sign Up
                            </button>
                        )}
                    </div>

                    {/* Mobile menu button (Simplified) */}
                    <div className="md:hidden flex items-center">
                        <button
                            className="text-gray-600 p-2 focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 shadow-xl absolute w-full left-0 top-20 animate-fadeIn">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => handleNavClick(link.id)}
                                className="block w-full text-left px-4 py-3 rounded-xl text-base font-black text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                                {link.name}
                            </button>
                        ))}
                        <div className="pt-2">
                            {currentUser ? (
                                <div className="space-y-2">
                                    <div className="px-4 py-2 text-sm font-bold text-gray-500 bg-gray-50 rounded-lg text-center mx-2 border border-gray-100">
                                        Logged in as <span className="text-gray-900">{currentUser.name}</span>
                                    </div>
                                    <button
                                        onClick={() => { onLogout(); setIsOpen(false); }}
                                        className="w-full text-center bg-gray-100 text-gray-800 px-6 py-4 rounded-xl text-base font-black hover:bg-gray-200 transition-colors border border-gray-200"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleNavClick('login')}
                                    className="w-full text-center bg-blue-600 text-white px-6 py-4 rounded-xl text-base font-black hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                                >
                                    Log In / Sign Up
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
