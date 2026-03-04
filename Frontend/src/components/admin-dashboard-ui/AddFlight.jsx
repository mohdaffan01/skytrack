import { useState } from 'react';
import api from '../../api/axiosConfig';

const AddFlight = ({ currentUser }) => {
    const [formData, setFormData] = useState({
        flightNumber: '',
        airline: '',
        origin: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        price: '',
        description: '',
        fees: 0,
        visaType: 'Tourist'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await api.post('/flights', formData, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                },
            });

            setSuccess('Flight added successfully!');
            // Reset form
            setFormData({
                flightNumber: '',
                airline: '',
                origin: '',
                destination: '',
                departureTime: '',
                arrivalTime: '',
                price: '',
                description: '',
                fees: 0,
                visaType: 'Tourist'
            });
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to add flight');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Flight</h2>

            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
            {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Flight Number</label>
                        <input
                            type="text"
                            name="flightNumber"
                            value={formData.flightNumber}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. SKY101"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Airline</label>
                        <input
                            type="text"
                            name="airline"
                            value={formData.airline}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Sky Airlines"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
                        <input
                            type="text"
                            name="origin"
                            value={formData.origin}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. New York (JFK)"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                        <input
                            type="text"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. London (LHR)"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
                        <input
                            type="datetime-local"
                            name="departureTime"
                            value={formData.departureTime}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Time</label>
                        <input
                            type="datetime-local"
                            name="arrivalTime"
                            value={formData.arrivalTime}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. 500"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            name="fees"
                            value={formData.fees}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. 50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Visa Type</label>
                        <input
                            type="text"
                            name="visaType"
                            value={formData.visaType}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Tourist, Business, None"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Flight details..."
                        rows="3"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                >
                    {loading ? 'Adding Flight...' : 'Add Flight'}
                </button>
            </form>
        </div>
    );
};

export default AddFlight;
