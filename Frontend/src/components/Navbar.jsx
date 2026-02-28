import React from 'react';

const Navbar = ({ onNavClick }) => {
    const navLinks = [
        { name: 'Flights', id: 'flights' },
        { name: 'About Us', id: 'about' },
        { name: 'Customer Service', id: 'service' },
        { name: 'Contact', id: 'contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onNavClick('home')}>
                        <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                            SkyTrack
                        </span>
                    </div>

                    {/* Nav Links - Desktop */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => onNavClick(link.id)}
                                className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors cursor-pointer bg-transparent border-none"
                            >
                                {link.name}
                            </button>
                        ))}
                        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:scale-105 active:scale-95">
                            Log In / Sign Up
                        </button>
                    </div>

                    {/* Mobile menu button (Simplified) */}
                    <div className="md:hidden flex items-center">
                        <button className="text-gray-600 p-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
