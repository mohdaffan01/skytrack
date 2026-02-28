import React from 'react';

const Contact = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-gray-900 mb-4">Contact SkyTrack</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Have a question or feedback? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h3>
                            <p className="text-gray-600 leading-relaxed mb-8">
                                Whether you need assistance with a booking or have a partnership inquiry,
                                our team is ready to help.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { label: 'Email', value: 'support@skytrack.com', icon: '✉️' },
                                    { label: 'Phone', value: '+1 (888) SKY-TRAK', icon: '📞' },
                                    { label: 'Headquarters', value: '123 Aviation Way, Sky City, SC 90210', icon: '🏢' },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-start gap-4">
                                        <div className="bg-blue-50 p-3 rounded-xl text-xl text-blue-600">{item.icon}</div>
                                        <div>
                                            <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">{item.label}</div>
                                            <div className="text-gray-800 font-semibold">{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                            <h4 className="font-bold text-gray-800 mb-2">Follow Us</h4>
                            <div className="flex gap-4">
                                {['Twitter', 'Instagram', 'LinkedIn', 'Facebook'].map((social) => (
                                    <button key={social} className="px-4 py-2 bg-white rounded-xl text-sm font-bold text-gray-600 hover:text-blue-600 shadow-sm border border-gray-100 transition-all">
                                        {social}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16"></div>
                        <form className="space-y-6 relative z-10">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">First Name</label>
                                    <input type="text" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Last Name</label>
                                    <input type="text" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                                <input type="email" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                                <textarea rows="4" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all resize-none" placeholder="How can we help you?"></textarea>
                            </div>
                            <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all hover:scale-[1.02] active:scale-95">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
