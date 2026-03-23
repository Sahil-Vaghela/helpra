import { CheckCircle, MapPin, Phone, ArrowLeft, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useLocation, Navigate } from 'react-router-dom';

export default function Success() {
  const location = useLocation();
  const { mechanic } = location.state || {};

  if (!mechanic) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4 bg-background page-transition">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-soft border border-border p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200 }}
          className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={48} />
        </motion.div>

        <h1 className="text-3xl font-extrabold text-dark-text mb-2">Booking Confirmed!</h1>
        <p className="text-gray-500 mb-8">Your assistance is on the way.</p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left border border-border">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={mechanic.image} 
              alt={mechanic.name} 
              className="w-16 h-16 rounded-xl object-cover"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="font-bold text-lg">{mechanic.name}</h3>
              <p className="text-sm text-gray-500">Heading to your location</p>
            </div>
          </div>
          
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <MapPin size={18} className="text-primary" />
              <span>Estimated Arrival: <strong>12 mins</strong></span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Phone size={18} className="text-primary" />
              <span>Contact: <strong>{mechanic.phone}</strong></span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link to="/" className="btn-primary w-full flex items-center justify-center gap-2">
            <Home size={20} /> Back to Home
          </Link>
          <button className="w-full py-3 text-gray-500 font-bold flex items-center justify-center gap-2 hover:text-dark-text transition-colors">
            <ArrowLeft size={18} /> Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
}
