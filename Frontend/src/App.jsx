import { useState } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import CustomerService from './components/CustomerService';
import Contact from './components/Contact';
import Flights from './components/Flights';
import BookFlight from './components/BookFlight';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedFlightData, setSelectedFlightData] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState(null);

  const handleBookFlight = (flight, searchData) => {
    setSelectedFlightData(flight);
    setSearchCriteria(searchData);
    setActiveSection('bookFlight');
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 flex flex-col">
      <div className="flex-grow">
        <Navbar onNavClick={setActiveSection} />

        {activeSection === 'home' && (
          <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
            <div className="text-center p-8 bg-white rounded-xl shadow-2xl transition-transform hover:scale-105">
              <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                SkyTrack
              </h1>
              <p className="text-gray-600 text-lg font-medium">
                Frontend initialized with Vite & Tailwind CSS v4
              </p>
              <div className="mt-8 flex gap-4 justify-center">
                <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-100">
                  React 19
                </div>
                <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold border border-indigo-100">
                  Vite 7
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'about' && <About />}
        {activeSection === 'service' && <CustomerService />}
        {activeSection === 'contact' && <Contact />}
        {activeSection === 'flights' && <Flights onBookFlight={handleBookFlight} />}
        {activeSection === 'bookFlight' && <BookFlight flight={selectedFlightData} search={searchCriteria} onNavClick={setActiveSection} />}
      </div>
      <Footer onNavClick={setActiveSection} />
    </div>
  );
}

export default App
