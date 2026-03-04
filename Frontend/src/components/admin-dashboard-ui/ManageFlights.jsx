import { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';

const ManageFlights = ({ currentUser }) => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        try {
            const response = await api.get('/flights');
            const data = response.data;
            setFlights(data.flights || []);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to fetch flights');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (flightId) => {
        if (!window.confirm('Are you sure you want to delete this flight?')) return;

        try {
            await api.delete(`/flights/${flightId}`, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                },
            });

            setFlights(flights.filter(f => f._id !== flightId));
        } catch (err) {
            alert(err.response?.data?.message || err.message || 'Failed to delete flight');
        }
    };

    if (loading) return <div className="p-4 text-center">Loading flights...</div>;
    if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Flights</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {flights.map((flight) => (
                            <tr key={flight._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium text-gray-900">{flight.flightNumber}</div>
                                    <div className="text-sm text-gray-500">{flight.airline}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{flight.origin}</div>
                                    <div className="text-sm text-gray-500">to {flight.destination}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div>Dep: {new Date(flight.departureTime).toLocaleString()}</div>
                                    <div>Arr: {new Date(flight.arrivalTime).toLocaleString()}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Rs.{flight.price}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {flight.status || 'Active'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleDelete(flight._id)}
                                        className="text-red-600 hover:text-red-900 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {flights.length === 0 && (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                    No flights found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageFlights;
