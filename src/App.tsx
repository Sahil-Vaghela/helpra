import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Booking from './pages/Booking';
import Mechanics from './pages/Mechanics';
import Success from './pages/Success';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import HowItWorks from './pages/HowItWorks';
import { UserProvider } from './context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-[72px]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/mechanics" element={<Mechanics />} />
              <Route path="/success" element={<Success />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}
