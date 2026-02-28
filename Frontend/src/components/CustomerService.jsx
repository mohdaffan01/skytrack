import React from 'react';

const CustomerService = () => {
    const faqs = [
        {
            question: "How do I change my flight?",
            answer: "You can change your flight through our 'Manage Booking' portal or by contacting our 24/7 support team."
        },
        {
            question: "What is your refund policy?",
            answer: "Refunds depend on the ticket type. Fully flexible tickets are refundable, while basic economy may only offer travel credits."
        },
        {
            question: "How can I track my baggage?",
            answer: "Use our real-time baggage tracker in the 'Flights' section by entering your tag number."
        },
        {
            question: "Do you offer travel insurance?",
            answer: "Yes, we partner with top insurers to provide comprehensive coverage for your trips."
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-gray-900 mb-4">How can we help?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Our dedicated support team is here to ensure your journey is smooth and stress-free.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {[
                        { title: 'Knowledge Base', icon: '📚', desc: 'Browse articles and guides for quick answers.' },
                        { title: 'Live Chat', icon: '💬', desc: 'Chat with our agents in real-time 24/7.' },
                        { title: 'Submit a Ticket', icon: '🎫', desc: 'Send us a detailed request and we will get back to you.' },
                    ].map((item) => (
                        <div key={item.title} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-100 shadow-xl">
                    <h3 className="text-2xl font-black text-gray-900 mb-8 text-center">Frequently Asked Questions</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        {faqs.map((faq) => (
                            <div key={faq.question} className="space-y-2">
                                <h4 className="text-lg font-bold text-blue-600">{faq.question}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerService;
