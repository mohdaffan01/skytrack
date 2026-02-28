import React from 'react';

const Flights = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-gray-900 mb-4">Flight Explorer</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Search and track thousands of flights worldwide with real-time updates.
                    </p>
                    <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mt-6"></div>
                </div>

                {/* Placeholder for Search Functionality */}
                <div className="bg-gray-50 rounded-3xl p-8 lg:p-12 border border-gray-100 shadow-xl max-w-4xl mx-auto">

                    <div className="flex flex-wrap items-center justify-between gap-6 mb-10 pb-8 border-b border-gray-200/60">
                        <div className="flex items-center space-x-8">
                            <label className="inline-flex items-center cursor-pointer group">
                                <input type="radio" name="trip_type" className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 transition-all" defaultChecked />
                                <span className="ml-3 text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">Return</span>
                            </label>
                            <label className="inline-flex items-center cursor-pointer group">
                                <input type="radio" name="trip_type" className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 transition-all" />
                                <span className="ml-3 text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">One-way</span>
                            </label>
                        </div>

                        <div className="flex items-center space-x-8">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Travellers</span>
                                <input type="number" min="1" defaultValue="1" className="w-10 bg-transparent border-none text-base font-bold text-blue-600 focus:ring-0 p-0" />
                            </div>
                            <div className="w-px h-8 bg-gray-200"></div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Age</span>
                                <select className="bg-transparent border-none text-base font-bold text-blue-600 focus:ring-0 p-0 cursor-pointer">
                                    <option>Adult (12+)</option>
                                    <option>Child (2-11)</option>
                                    <option>Infant (0-2)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">From</label>
                            <input type="text" className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-semibold" placeholder="Departure City" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">To</label>
                            <input type="text" className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-semibold" placeholder="Arrival City" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Date</label>
                            <input type="date" className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-semibold" />
                        </div>
                    </div>
                    <button className="w-full py-4 bg-blue-600 text-gray-200 rounded-2xl font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Search Flights
                    </button>
                </div>

                {/* Placeholder for Featured Destinations */}
                <div className="mt-20">
                    <h3 className="text-2xl font-bold text-gray-800 mb-8">Popular Destinations</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { city: 'Paris', country: 'France', price: '$499' },
                            { city: 'Tokyo', country: 'Japan', price: '$850' },
                            { city: 'New York', country: 'USA', price: '$320' },
                        ].map((dest) => (
                            <div key={dest.city} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer group">
                                <div className="h-48 bg-blue-50 flex items-center justify-center text-4xl group-hover:bg-blue-100 transition-colors italic font-black text-blue-200">
                                    {dest.city}
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-bold text-gray-800">{dest.city}</h4>
                                            <p className="text-gray-500 text-sm">{dest.country}</p>
                                        </div>
                                        <div className="text-blue-600 font-black">{dest.price}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            
            
        </section>
    );
};

export default Flights;
