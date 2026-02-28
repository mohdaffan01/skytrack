import React from 'react';

const About = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-gray-900 mb-4">About SkyTrack</h2>
                    <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-800">Your Ultimate Travel Companion</h3>
                        <p className="text-gray-600 leading-relaxed">
                            At SkyTrack, we believe that travel should be seamless, inspiring, and accessible to everyone.
                            Our platform is designed to provide you with real-time flight tracking, personalized travel
                            insights, and the best deals across the globe.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Founded in 2026, we have quickly become the go-to resource for millions of travelers
                            who value precision and ease of use. Whether you're a frequent flyer or planning
                            your first adventure, SkyTrack is here to guide you every step of the way.
                        </p>
                        <div className="pt-4">
                            <button className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-2 transition-colors">
                                Learn more about our mission
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 shadow-inner">
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { label: 'Flights Tracked', value: '10M+' },
                                { label: 'Happy Travelers', value: '5M+' },
                                { label: 'Countries Covered', value: '190+' },
                                { label: 'Real-time Updates', value: '24/7' },
                            ].map((stat) => (
                                <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100/50">
                                    <div className="text-2xl font-black text-blue-600 mb-1">{stat.value}</div>
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
