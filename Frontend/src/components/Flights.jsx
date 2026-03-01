import React, { useState, useEffect } from 'react';
import bgflightimage from '../assets/bgflightimage.jpg';

const Flights = ({ onBookFlight }) => {
    const [searchData, setSearchData] = useState({
        origin: '',
        destination: '',
        date: '',
        tripType: 'Return',
        travellers: 1,
        age: 'Adult (12+)'
    });

    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [popularDestinations, setPopularDestinations] = useState([]);
    const [expandedFlightId, setExpandedFlightId] = useState(null);
    const [availableLocations, setAvailableLocations] = useState([]);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleFlightDetails = (id) => {
        if (expandedFlightId === id) {
            setExpandedFlightId(null);
        } else {
            setExpandedFlightId(id);
        }
    };

    useEffect(() => {
        const fetchPopularDestinations = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/flights');
                if (response.ok) {
                    const data = await response.json();
                    const allFlights = data.data || data.flights || [];

                    const uniqueDests = [];
                    const seen = new Set();
                    const allLocationsMap = new Map(); // Store as map to keep unique by code or string

                    const parseLocationString = (locString) => {
                        // Assuming format like "USA(US)" or "Hyderabad, India(HYD)"
                        // or just simple strings like "Delhi".
                        if (!locString) return null;

                        const match = locString.match(/(.*?)\((.*?)\)/);
                        if (match) {
                            return {
                                raw: locString,
                                code: match[2].trim(),
                                primary: match[1].trim(),
                                secondary: `${match[1].trim()} Airport` // Mock secondary if not provided
                            };
                        } else {
                            // Fallback if no parentheses code is present
                            // Try splitting by comma for City, Country if possible
                            const parts = locString.split(',');
                            let code = locString.substring(0, 3).toUpperCase();
                            return {
                                raw: locString,
                                code: code,
                                primary: locString.trim(),
                                secondary: `${parts[0].trim()} International Airport`
                            };
                        }
                    };

                    for (let flight of allFlights) {
                        if (flight.origin) {
                            const parsed = parseLocationString(flight.origin);
                            if (parsed && !allLocationsMap.has(parsed.raw)) {
                                allLocationsMap.set(parsed.raw, parsed);
                            }
                        }
                        if (flight.destination) {
                            const parsed = parseLocationString(flight.destination);
                            if (parsed && !allLocationsMap.has(parsed.raw)) {
                                allLocationsMap.set(parsed.raw, parsed);
                            }
                        }
                        const destName = flight.destination;
                        if (!seen.has(destName) && uniqueDests.length < 3) {
                            seen.add(destName);
                            uniqueDests.push({
                                city: destName,
                                country: flight.airline, // Using airline as secondary info
                                price: `$${flight.price}`
                            });
                        }
                    }

                    if (uniqueDests.length > 0) {
                        setPopularDestinations(uniqueDests);
                    }
                    if (allLocationsMap.size > 0) {
                        // Sort by primary name
                        const sortedLocations = Array.from(allLocationsMap.values()).sort((a, b) => a.primary.localeCompare(b.primary));
                        setAvailableLocations(sortedLocations);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch popular destinations", err);
            }
        };

        // Fetch to populate the popular destinations before any search
        fetchPopularDestinations();
    }, []);

    const handleInputChange = (e) => {
        setSearchData({ ...searchData, [e.target.name]: e.target.value });
    };

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        setHasSearched(true);

        try {
            // Build query params based on provided inputs
            const params = new URLSearchParams();
            if (searchData.origin) params.append('origin', searchData.origin);
            if (searchData.destination) params.append('destination', searchData.destination);

            // Note: Date filtering usually requires custom backend logic, skipping exact date match for simplicity
            // if (searchData.date) params.append('date', searchData.date);

            const queryString = params.toString();
            const url = `http://localhost:5000/api/flights${queryString ? `?${queryString}` : ''}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch flights');
            }

            const data = await response.json();
            setFlights(data.data || data.flights || []); // Adjust based on your API response structure

        } catch (err) {
            setError(err.message || 'An error occurred while searching for flights');
        } finally {
            setLoading(false);
        }
    };

    const handleShowAllFlights = async () => {
        setLoading(true);
        setError('');
        setHasSearched(true);

        try {
            const response = await fetch('http://localhost:5000/api/flights');

            if (!response.ok) {
                throw new Error('Failed to fetch flights');
            }

            const data = await response.json();
            setFlights(data.data || data.flights || []);

        } catch (err) {
            setError(err.message || 'An error occurred while fetching all flights');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-gray-100 min-h-screen">
            {/* Top Background Hero Section */}
            <div
                className="pt-24 pb-32 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${bgflightimage})` }}
            >
                <div className="absolute inset-0 bg-black/30 z-0 mix-blend-multiply"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
                    <h2 className="text-5xl font-black text-white mb-6 drop-shadow-md">Flight Explorer</h2>
                    <p className="text-white/90 text-xl font-medium max-w-2xl mx-auto drop-shadow-md">
                        Search and track thousands of flights worldwide with real-time updates.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">

                {/* Search Functionality */}
                <div className="bg-gray-50 rounded-3xl p-8 lg:p-12 border border-gray-100 shadow-xl max-w-4xl mx-auto">
                    {/* Top Options */}
                    <div className="flex flex-wrap items-center justify-between gap-6 mb-10 pb-8 border-b border-gray-200/60">
                        <div className="flex items-center space-x-8">
                            <label className="inline-flex items-center cursor-pointer group">
                                <input type="radio" name="tripType" value="Return" checked={searchData.tripType === 'Return'} onChange={handleInputChange} className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 transition-all" />
                                <span className="ml-3 text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">Return</span>
                            </label>
                            <label className="inline-flex items-center cursor-pointer group">
                                <input type="radio" name="tripType" value="One-way" checked={searchData.tripType === 'One-way'} onChange={handleInputChange} className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 transition-all" />
                                <span className="ml-3 text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">One-way</span>
                            </label>
                        </div>

                        <div className="flex items-center space-x-8">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Travellers</span>
                                <input type="number" name="travellers" min="1" value={searchData.travellers} onChange={handleInputChange} className="w-10 bg-transparent border-none text-base font-bold text-blue-800 focus:ring-0 p-0" />
                            </div>
                            <div className="w-px h-8 bg-gray-200"></div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Age</span>
                                <select name="age" value={searchData.age} onChange={handleInputChange} className="bg-transparent border-none text-base font-bold text-blue-800 focus:ring-0 p-0 cursor-pointer">
                                    <option value="Adult (12+)">Adult (12+)</option>
                                    <option value="Child (2-11)">Child (2-11)</option>
                                    <option value="Infant (0-2)">Infant (0-2)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Search Inputs */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="space-y-2 relative">
                            <label className="text-sm font-bold text-gray-700 ml-1">From</label>
                            <input
                                type="text"
                                name="origin"
                                value={searchData.origin}
                                onChange={(e) => {
                                    handleInputChange(e);
                                    setActiveDropdown('origin');
                                }}
                                onFocus={() => setActiveDropdown('origin')}
                                onBlur={() => setTimeout(() => setActiveDropdown(null), 200)}
                                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-semibold"
                                placeholder="Departure City"
                            />
                            {activeDropdown === 'origin' && searchData.origin && (
                                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-h-[300px] overflow-y-auto">
                                    <div className="px-4 py-3 bg-gray-50/80 border-b border-gray-100 sticky top-0 backdrop-blur-sm z-10">
                                        <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Suggestions</span>
                                    </div>
                                    <div className="py-2">
                                        {availableLocations
                                            .filter(loc => loc.raw.toLowerCase().includes(searchData.origin.toLowerCase()) || loc.code.toLowerCase().includes(searchData.origin.toLowerCase()))
                                            .map((loc, idx) => (
                                                <div
                                                    key={idx}
                                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-4 transition-colors"
                                                    onClick={() => {
                                                        setSearchData({ ...searchData, origin: loc.raw });
                                                        setActiveDropdown(null);
                                                    }}
                                                >
                                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200/60 shrink-0">
                                                        <span className="text-sm font-black text-gray-700 tracking-wide">{loc.code}</span>
                                                    </div>
                                                    <div className="flex flex-col justify-center overflow-hidden">
                                                        <span className="text-[15px] font-semibold text-gray-900 truncate">{loc.primary}</span>
                                                        <span className="text-[13px] text-gray-500 truncate mt-0.5">{loc.secondary}</span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        {availableLocations.filter(loc => loc.raw.toLowerCase().includes(searchData.origin.toLowerCase()) || loc.code.toLowerCase().includes(searchData.origin.toLowerCase())).length === 0 && (
                                            <div className="px-6 py-8 text-center text-sm font-semibold text-gray-400">No airports found</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="space-y-2 relative">
                            <label className="text-sm font-bold text-gray-700 ml-1">To</label>
                            <input
                                type="text"
                                name="destination"
                                value={searchData.destination}
                                onChange={(e) => {
                                    handleInputChange(e);
                                    setActiveDropdown('destination');
                                }}
                                onFocus={() => setActiveDropdown('destination')}
                                onBlur={() => setTimeout(() => setActiveDropdown(null), 200)}
                                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-semibold"
                                placeholder="Arrival City"
                            />
                            {activeDropdown === 'destination' && searchData.destination && (
                                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-h-[300px] overflow-y-auto">
                                    <div className="px-4 py-3 bg-gray-50/80 border-b border-gray-100 sticky top-0 backdrop-blur-sm z-10">
                                        <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Suggestions</span>
                                    </div>
                                    <div className="py-2">
                                        {availableLocations
                                            .filter(loc => loc.raw.toLowerCase().includes(searchData.destination.toLowerCase()) || loc.code.toLowerCase().includes(searchData.destination.toLowerCase()))
                                            .map((loc, idx) => (
                                                <div
                                                    key={idx}
                                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-4 transition-colors"
                                                    onClick={() => {
                                                        setSearchData({ ...searchData, destination: loc.raw });
                                                        setActiveDropdown(null);
                                                    }}
                                                >
                                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200/60 shrink-0">
                                                        <span className="text-sm font-black text-gray-700 tracking-wide">{loc.code}</span>
                                                    </div>
                                                    <div className="flex flex-col justify-center overflow-hidden">
                                                        <span className="text-[15px] font-semibold text-gray-900 truncate">{loc.primary}</span>
                                                        <span className="text-[13px] text-gray-500 truncate mt-0.5">{loc.secondary}</span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        {availableLocations.filter(loc => loc.raw.toLowerCase().includes(searchData.destination.toLowerCase()) || loc.code.toLowerCase().includes(searchData.destination.toLowerCase())).length === 0 && (
                                            <div className="px-6 py-8 text-center text-sm font-semibold text-gray-400">No airports found</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={searchData.date}
                                onChange={handleInputChange}
                                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-semibold"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 font-semibold mb-4 text-center">{error}</p>}

                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className={`flex-1 py-4 cursor-pointer text-gray-200 rounded-lg font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${loading ? 'bg-blue-600 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-900 hover:scale-[1.01] active:scale-95'}`}
                        >
                            {loading ? 'Searching...' : (
                                <>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="square" strokeLinejoin="square" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Search Flights
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleShowAllFlights}
                            disabled={loading}
                            className={`flex-1 py-4 text-blue-800 cursor-pointer bg-blue-50 border-2 border-blue-100 rounded-lg font-black text-lg transition-all flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-100 hover:border-blue-200 hover:scale-[1.01] active:scale-95'}`}
                        >
                            Show Available Flights
                        </button>
                    </div>
                </div>

                {/* Display Flight Results */}
                {hasSearched && flights.length > 0 && (
                    <div className="mt-16 max-w-4xl mx-auto">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                            <h3 className="text-2xl font-bold text-gray-800">Search Results</h3>
                            <button
                                onClick={handleShowAllFlights}
                                className="px-5 py-2 text-sm text-blue-600 bg-blue-50 border border-blue-100 rounded-xl font-bold transition-all hover:bg-blue-100"
                            >
                                Show All Available Flights
                            </button>
                        </div>
                        <div className="space-y-4">
                            {flights.map((flight) => (
                                <div
                                    key={flight._id}
                                    className={`bg-white rounded-2xl shadow-sm border ${expandedFlightId === flight._id ? 'border-blue-400 ring-4 ring-blue-50' : 'border-gray-100 text-left hover:shadow-md hover:border-gray-300'} transition-all cursor-pointer overflow-hidden`}
                                    onClick={() => toggleFlightDetails(flight._id)}
                                >
                                    <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div className="flex-1 w-full">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                                    Flight {flight.flightNumber}
                                                </span>
                                                <span className="text-gray-500 text-sm font-semibold">{flight.airline}</span>
                                            </div>
                                            <div className="flex items-center gap-4 mt-4">
                                                <div className="text-center w-24">
                                                    <div className="text-2xl font-black text-gray-700">{flight.origin?.split('(')[0] || flight.origin}</div>
                                                    <div className="text-xs text-gray-500 mt-1 font-bold">{new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                </div>
                                                <div className="flex-1 px-4 flex flex-col items-center justify-center text-gray-300">
                                                    <div className="text-xs text-gray-400 font-bold mb-2">Direct</div>
                                                    <div className="w-full h-px bg-gray-300 relative flex items-center justify-center">
                                                        <div className="absolute w-2 h-2 rounded-full bg-blue-400 left-0"></div>
                                                        <svg className="absolute w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                                        </svg>
                                                        <div className="absolute w-2 h-2 rounded-full bg-blue-400 right-0"></div>
                                                    </div>
                                                </div>
                                                <div className="text-center w-24">
                                                    <div className="text-2xl font-black text-gray-700">{flight.destination?.split('(')[0] || flight.destination}</div>
                                                    <div className="text-xs text-gray-500 mt-1 font-bold">{new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8 text-center md:text-right w-full md:w-auto flex flex-row md:flex-col justify-between items-center md:items-end gap-3">
                                            <div>
                                                <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Price</div>
                                                <div className="text-3xl font-black text-blue-900">${flight.price}</div>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent card expansion when clicking book
                                                    if (onBookFlight) onBookFlight(flight, searchData);
                                                }}
                                                className="px-8 py-3 bg-gray-800 cursor-pointer text-white font-bold rounded-xl hover:bg-blue-800 transition-colors shadow-lg"
                                            >
                                                Book
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expandable Details Section */}
                                    {expandedFlightId === flight._id && (
                                        <div className="bg-gray-50 px-6 py-5 border-t border-gray-100 animate-fadeIn">
                                            <h4 className="text-sm font-black text-gray-900 mb-3 uppercase tracking-widest text-blue-600">Flight Details</h4>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <p className="text-gray-700 text-sm mb-4 leading-relaxed font-medium">
                                                        {flight.description || "No description provided for this specific flight yet. Enjoy standard amenities."}
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-gray-400 uppercase">Status: </span>
                                                        <span className={`text-xs font-black uppercase tracking-wide px-2 py-1 rounded ${flight.status === 'Scheduled' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                            {flight.status || 'Scheduled'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="bg-white p-4 rounded-xl border border-gray-200">
                                                    <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100 text-sm">
                                                        <span className="text-gray-500 font-semibold">Full Origin:</span>
                                                        <span className="font-bold text-gray-900">{flight.origin}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100 text-sm">
                                                        <span className="text-gray-500 font-semibold">Full Dest:</span>
                                                        <span className="font-bold text-gray-900">{flight.destination}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100 text-sm">
                                                        <span className="text-gray-500 font-semibold">Date:</span>
                                                        <span className="font-bold text-gray-900">{new Date(flight.departureTime).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100 text-sm">
                                                        <span className="text-gray-500 font-semibold">Fees/Taxes:</span>
                                                        <span className="font-bold text-gray-900">{flight.fees ? `$${flight.fees}` : 'Included'}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-sm">
                                                        <span className="text-gray-500 font-semibold">Visa Type:</span>
                                                        <span className="font-bold text-gray-900">{flight.visaType || 'Tourist (Default)'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {hasSearched && !loading && flights.length === 0 && (
                    <div className="mt-16 text-center text-gray-500 font-bold text-lg">
                        No flights found matching your search.
                    </div>
                )}

                {/* Popular Destinations (Dynamic from Database) */}
                {!hasSearched && popularDestinations.length > 0 && (
                    <div className="mt-20">
                        <h3 className="text-2xl font-bold text-gray-800 mb-8">Popular Destinations</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            {popularDestinations.map((dest, index) => (
                                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer group">
                                    <div className="h-48 bg-blue-50 flex items-center justify-center text-4xl group-hover:bg-blue-100 transition-colors italic font-black text-blue-200 text-center px-4">
                                        {dest.city}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-center gap-2">
                                            <div className="truncate flex-1">
                                                <h4 className="font-bold text-gray-800 truncate">{dest.city}</h4>
                                                <p className="text-gray-500 text-sm truncate">{dest.country}</p>
                                            </div>
                                            <div className="text-blue-600 font-black">{dest.price}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Flights;
