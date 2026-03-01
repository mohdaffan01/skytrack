import { useState } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import CustomerService from './components/CustomerService';
import Contact from './components/Contact';
import Flights from './components/Flights';
import BookFlight from './components/BookFlight';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedFlightData, setSelectedFlightData] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState(null);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setActiveSection('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveSection('home');
  };

  const handleBookFlight = (flight, searchData) => {
    if (!currentUser) {
      alert("Please log in or sign up to book a flight.");
      setActiveSection('login');
      return;
    }
    setSelectedFlightData(flight);
    setSearchCriteria(searchData);
    setActiveSection('bookFlight');
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 flex flex-col">
      <div className="flex-grow">
        <Navbar onNavClick={setActiveSection} currentUser={currentUser} onLogout={handleLogout} />

        {activeSection === 'home' && (
          <div className="flex items-center justify-center p-8" style={{ minHeight: 'calc(100vh - 80px)' }}>
            <div className="text-center p-12 bg-white rounded-3xl shadow-2xl transition-transform hover:scale-105 max-w-2xl mx-4">
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 drop-shadow-sm">
                SkyTrack
              </h1>
              <p className="text-gray-700 text-lg md:text-xl font-bold mb-8">
                Your gateway to the world. Book flights, manage itineraries, and explore top destinations.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => setActiveSection('flights')}
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-black shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  Find Flights
                </button>
                <div className="px-6 py-4 bg-gray-50 text-blue-700 rounded-xl text-sm font-bold border border-blue-100 flex items-center shadow-sm">
                  Powered by React & Tailwind
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'about' && <About />}
        {activeSection === 'service' && <CustomerService />}
        {activeSection === 'contact' && <Contact />}
        {activeSection === 'flights' && <Flights onBookFlight={handleBookFlight} />}
        {activeSection === 'bookFlight' && <BookFlight flight={selectedFlightData} search={searchCriteria} onNavClick={setActiveSection} currentUser={currentUser} />}
        {activeSection === 'login' && <Login onNavClick={setActiveSection} onLogin={handleLogin} />}
        {activeSection === 'signup' && <Signup onNavClick={setActiveSection} onLogin={handleLogin} />}
      </div>
      <Footer onNavClick={setActiveSection} />
    </div>
  );
}

export default App
