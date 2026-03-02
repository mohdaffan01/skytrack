import { useState } from 'react';
import AddFlight from './AddFlight';
import ManageFlights from './ManageFlights';
import ViewUsers from './ViewUsers';
import ViewBookings from './ViewBookings';

const AdminDashboard = ({ currentUser }) => {
    const [activeTab, setActiveTab] = useState('addFlight');

    if (!currentUser || currentUser.role !== 'admin') {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="bg-red-50 text-red-600 p-8 rounded-xl shadow-sm border border-red-100 text-center">
                    <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
                    <p>You must be an administrator to view this page.</p>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'addFlight', label: 'Add Flight', icon: '+' },
        { id: 'manageFlights', label: 'Manage Flights', icon: '✈️' },
        { id: 'viewUsers', label: 'Registered Users', icon: '👤' },
        { id: 'viewBookings', label: 'All Bookings', icon: '📋' },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-800 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Manage flights, users, and view platform activity.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <nav className="flex flex-col">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center px-6 py-4 text-left transition-colors border-l-4 ${activeTab === tab.id
                                            ? 'bg-blue-50 border-blue-600 text-blue-700 font-semibold'
                                            : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <span className="mr-3 text-lg">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-grow">
                    {activeTab === 'addFlight' && <AddFlight currentUser={currentUser} />}
                    {activeTab === 'manageFlights' && <ManageFlights currentUser={currentUser} />}
                    {activeTab === 'viewUsers' && <ViewUsers currentUser={currentUser} />}
                    {activeTab === 'viewBookings' && <ViewBookings currentUser={currentUser} />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
