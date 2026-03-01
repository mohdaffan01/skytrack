import React, { useState } from 'react';

const BookFlight = ({ flight, search, onNavClick, currentUser }) => {
    const [bookingState, setBookingState] = useState('filling'); // filling, processing, confirmed
    const [bookingRef, setBookingRef] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        passportNumber: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    if (!flight || !search) {
        return (
            <div className="py-20 bg-gray-100 min-h-[80vh] flex flex-col items-center justify-center">
                <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full text-center">
                    <svg className="w-20 h-20 text-blue-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">No Flight Selected</h2>
                    <p className="text-gray-500 mb-8">Please return to the search page and select a flight to book.</p>
                    <button
                        onClick={() => onNavClick('flights')}
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                    >
                        Back to Search
                    </button>
                </div>
            </div>
        );
    }

    const handleConfirmBooking = async (e) => {
        e.preventDefault();
        setBookingState('processing');

        try {
            const bookingPayload = {
                flightId: flight._id,
                userId: currentUser._id, // Strongly associate with logged in user
                passengerDetails: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    passportNumber: formData.passportNumber,
                    visaType: flight.visaType || 'Tourist'
                },
                searchDetails: {
                    travellers: search.travellers,
                    age: search.age,
                    tripType: search.tripType
                },
                paymentDetails: {
                    basePrice: basePrice,
                    taxes: taxes,
                    totalAmount: total
                }
            };

            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingPayload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create booking');
            }

            const data = await response.json();
            setBookingRef(data.booking.bookingReference);
            setBookingState('confirmed');

        } catch (error) {
            console.error("Booking failed:", error);
            alert("There was an error processing your booking: " + error.message);
            setBookingState('filling');
        }
    };

    // Calculate total layout
    const basePrice = flight.price * search.travellers;
    const taxes = flight.fees ? flight.fees * search.travellers : 45 * search.travellers; // Use real fees or mock
    const total = basePrice + taxes;

    return (
        <section className="py-12 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Back Button */}
                <button
                    onClick={() => onNavClick('flights')}
                    className="flex items-center text-gray-500 hover:text-blue-600 font-bold mb-8 transition-colors"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Search Results
                </button>

                {bookingState === 'confirmed' ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-2xl max-w-2xl mx-auto border border-gray-100 animate-fadeIn">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h2 className="text-4xl font-black text-gray-900 mb-4">Booking Confirmed!</h2>
                        <p className="text-gray-600 font-medium mb-8 text-lg">Your itinerary {flight.origin.split('(')[0]} to {flight.destination.split('(')[0]} is secured.</p>

                        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">Booking Ref</span>
                                <span className="text-gray-900 font-black text-xl tracking-widest">{bookingRef}</span>
                            </div>
                            <div className="w-full h-px bg-gray-200 mb-4"></div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">Amount Paid</span>
                                <span className="text-blue-600 font-black text-xl">${total}</span>
                            </div>
                        </div>

                        <button onClick={() => onNavClick('home')} className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg">
                            Return Home
                        </button>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column: Booking Form */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-black text-gray-900 mb-6">Passenger Details</h2>

                                <div className="bg-blue-50/50 rounded-2xl p-4 mb-8 flex items-center gap-4 border border-blue-100/50">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <p className="text-sm font-semibold text-blue-900">
                                        You are booking for <span className="font-black">{search.travellers} {search.age}</span> traveler(s).
                                    </p>
                                </div>

                                <form id="booking-form" onSubmit={handleConfirmBooking} className="space-y-6">
                                    {/* Primary Passenger Contact */}
                                    <div>
                                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Primary Contact</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required placeholder="First Name" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-semibold" />
                                            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required placeholder="Last Name" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-semibold" />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Email Address" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-semibold" />
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="Phone Number" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-semibold" />
                                    </div>

                                    <div className="pt-6 border-t border-gray-100">
                                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Passport / Visa Information</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <input type="text" name="passportNumber" value={formData.passportNumber} onChange={handleInputChange} placeholder="Passport Number (Optional for domestic)" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-semibold" />
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                                    <span className="text-gray-400 font-semibold text-sm">Req. Visa:</span>
                                                </div>
                                                <input type="text" disabled value={flight.visaType || 'Tourist (Default)'} className="w-full pl-24 pr-5 py-3.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 font-bold cursor-not-allowed" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Right Column: Itinerary Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-28">
                                <h3 className="text-sm font-black text-gray-900 mb-6 uppercase tracking-widest">Selected Itinerary</h3>

                                {/* Flight Min-Card */}
                                <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="text-xs font-bold text-gray-500 uppercase">{search.tripType} Trip</div>
                                            <div className="font-black text-gray-900">{flight.airline}</div>
                                        </div>
                                        <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">
                                            {flight.flightNumber}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="text-left">
                                            <div className="text-xl font-black text-gray-900">{flight.origin?.split('(')[0] || flight.origin}</div>
                                            <div className="text-[11px] font-bold text-gray-500 mt-1">{new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        </div>
                                        <div className="flex-1 px-4 flex justify-center text-gray-300">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-black text-gray-900">{flight.destination?.split('(')[0] || flight.destination}</div>
                                            <div className="text-[11px] font-bold text-gray-500 mt-1">{new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-gray-200 my-4"></div>
                                    <div className="text-xs font-bold text-gray-500 text-center">
                                        {new Date(flight.departureTime).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 font-semibold max-w-[150px] truncate">Ticket x {search.travellers}</span>
                                        <span className="font-bold text-gray-900">${basePrice}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 font-semibold max-w-[150px] truncate">Taxes & Fees</span>
                                        <span className="font-bold text-gray-900">${taxes}</span>
                                    </div>
                                    <div className="w-full h-px bg-gray-100 my-2"></div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-gray-900 font-black uppercase tracking-widest text-sm">Total</span>
                                        <span className="text-3xl font-black text-blue-600">${total}</span>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    form="booking-form"
                                    disabled={bookingState === 'processing'}
                                    className={`w-full py-4 rounded-xl font-black text-lg transition-all flex items-center justify-center gap-2 ${bookingState === 'processing' ? 'bg-blue-400 text-white cursor-wait' : 'bg-gray-900 text-white hover:bg-blue-600 shadow-xl'}`}
                                >
                                    {bookingState === 'processing' ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            Confirming...
                                        </>
                                    ) : (
                                        'Confirm Booking'
                                    )}
                                </button>
                                <p className="text-[10px] text-center text-gray-400 font-semibold mt-4">By clicking Confirm Booking you agree to SkyTrack terms and conditions.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BookFlight;
