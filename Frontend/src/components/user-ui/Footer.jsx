import React from 'react';

const Footer = ({ onNavClick }) => {
    const socialLinks = [
        { name: 'Twitter', icon: '🐦', href: '#' },
        { name: 'Instagram', icon: '📸', href: '#' },
        { name: 'Facebook', icon: '👥', href: '#' },
        { name: 'LinkedIn', icon: '💼', href: '#' },
    ];

    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight mb-4 block">
                            SkyTrack
                        </span>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Making global travel seamless, inspiring, and accessible. Track your journey with precision.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-xl hover:bg-blue-50 hover:text-blue-600 transition-all border border-gray-100 hover:border-blue-100"
                                    title={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-6">Explore</h4>
                        <ul className="space-y-4">
                            {['home', 'flights', 'about'].map((id) => (
                                <li key={id}>
                                    <button
                                        onClick={() => onNavClick(id)}
                                        className="text-gray-600 hover:text-blue-600 text-sm font-semibold transition-colors capitalize"
                                    >
                                        {id === 'home' ? 'Home' : id}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-6">Support</h4>
                        <ul className="space-y-4">
                            {['service', 'contact'].map((id) => (
                                <li key={id}>
                                    <button
                                        onClick={() => onNavClick(id)}
                                        className="text-gray-600 hover:text-blue-600 text-sm font-semibold transition-colors"
                                    >
                                        {id === 'service' ? 'Customer Service' : 'Contact Us'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter/Contact Static */}
                    <div>
                        <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-6">Newsletter</h4>
                        <p className="text-gray-500 text-xs mb-4">Get the latest travel updates and offers directly in your inbox.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 w-full"
                            />
                            <button className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors">
                                ➡️
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-xs font-medium">
                        © 2026 SkyTrack Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
