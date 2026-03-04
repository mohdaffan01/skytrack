import { useState } from 'react';
import Navbar from './components/user-ui/Navbar';
import About from './components/user-ui/About';
import CustomerService from './components/user-ui/CustomerService';
import Contact from './components/user-ui/Contact';
import Flights from './components/user-ui/Flights';
import BookFlight from './components/user-ui/BookFlight';
import Footer from './components/user-ui/Footer';
import Login from './components/user-ui/Login';
import Signup from './components/user-ui/Signup';
import AdminDashboard from './components/admin-dashboard-ui/AdminDashboard';

function App() {
  const [activeSection, setActiveSection] = useState('flights');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedFlightData, setSelectedFlightData] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState(null);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setActiveSection('flights');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveSection('flights');
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



        {activeSection === 'about' && <About />}
        {activeSection === 'service' && <CustomerService />}
        {activeSection === 'contact' && <Contact />}
        {activeSection === 'flights' && <Flights onBookFlight={handleBookFlight} />}
        {activeSection === 'bookFlight' && <BookFlight flight={selectedFlightData} search={searchCriteria} onNavClick={setActiveSection} currentUser={currentUser} />}
        {activeSection === 'login' && <Login onNavClick={setActiveSection} onLogin={handleLogin} />}
        {activeSection === 'signup' && <Signup onNavClick={setActiveSection} onLogin={handleLogin} />}
        {activeSection === 'admin' && <AdminDashboard currentUser={currentUser} />}
      </div>
      <Footer onNavClick={setActiveSection} />
    </div>
  );
}

export default App
