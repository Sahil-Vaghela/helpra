import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, CheckCircle2, AlertCircle, Star, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ProgressStepper from '../components/ProgressStepper';
import MechanicCard from '../components/MechanicCard';
import Loader, { SkeletonCard } from '../components/Loader';
import Toast from '../components/Toast';
import LeafletMapComponent from '../components/LeafletMapComponent';
import mechanicsData from '../data/mechanics.json';
import { useUser } from '../context/UserContext';

type VehicleType = 'Bike' | 'Car' | 'Truck' | 'Cycle';

interface Mechanic {
  id: number;
  name: string;
  rating: number;
  distance: string;
  specialty: string;
  experience: string;
  image: string;
  phone: string;
}

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

export default function Booking() {
  const [step, setStep] = React.useState(1);
  const [problem, setProblem] = React.useState('');
  const [vehicle, setVehicle] = React.useState<VehicleType | null>(null);
  const [location, setLocation] = React.useState('');
  const [mapCenter, setMapCenter] = React.useState(defaultCenter);
  const [mechanics, setMechanics] = React.useState<Mechanic[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedMechanic, setSelectedMechanic] = React.useState<Mechanic | null>(null);
  const [recommendedMechanic, setRecommendedMechanic] = React.useState<Mechanic | null>(null);
  const [showToast, setShowToast] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showTracking, setShowTracking] = React.useState(false);
  const [activeTrackingId, setActiveTrackingId] = React.useState<string | null>(null);
  const [mechanicPos, setMechanicPos] = React.useState({ lat: defaultCenter.lat + 0.01, lng: defaultCenter.lng + 0.01 });

  const navigate = useNavigate();
  const { isAuthenticated, addBooking, bookings, removeBooking } = useUser();

  const currentBooking = React.useMemo(() => {
    const booking = bookings.find(b => b.id === activeTrackingId);
    if (booking && (!booking.lat || !booking.lng)) {
      return { ...booking, lat: defaultCenter.lat, lng: defaultCenter.lng };
    }
    return booking;
  }, [bookings, activeTrackingId]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/booking' } } });
    }
  }, [isAuthenticated, navigate]);

  // Reset mechanic position and map center when switching bookings
  useEffect(() => {
    if (activeTrackingId && currentBooking) {
      setMapCenter({ lat: currentBooking.lat, lng: currentBooking.lng });
      // Start mechanic from a random direction about 0.015 degrees away
      const angle = Math.random() * Math.PI * 2;
      const distance = 0.015;
      setMechanicPos({
        lat: currentBooking.lat + Math.cos(angle) * distance,
        lng: currentBooking.lng + Math.sin(angle) * distance,
      });
    }
  }, [activeTrackingId, currentBooking]);

  // Simulate mechanic movement
  useEffect(() => {
    if (showTracking && currentBooking) {
      const interval = setInterval(() => {
        setMechanicPos(prev => {
          const targetLat = currentBooking.lat;
          const targetLng = currentBooking.lng;
          
          // Move 5% closer each step for a smoother, longer animation
          const newLat = prev.lat - (prev.lat - targetLat) * 0.05;
          const newLng = prev.lng - (prev.lng - targetLng) * 0.05;
          
          return { lat: newLat, lng: newLng };
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [showTracking, currentBooking]);

  const steps = ['Problem', 'Location', 'Best Option', 'Solution'];

  const handleLocationSelect = (loc: { lat: number; lng: number; address?: string }) => {
    setMapCenter({ lat: loc.lat, lng: loc.lng });
    if (loc.address) {
      setLocation(loc.address);
    } else {
      setLocation(`${loc.lat.toFixed(6)}, ${loc.lng.toFixed(6)}`);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleLocationSelect({ lat: latitude, lng: longitude, address: 'Current GPS Location' });
        },
        () => {
          setLocation('Downtown Area'); // Fallback
        }
      );
    } else {
      setLocation('Downtown Area');
    }
  };

  const startAnalysis = async () => {
    if (!problem || !vehicle) return;
    setLoading(true);
    
    // Background analysis (brief delay for realism)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setStep(2); // Move to Location step
    handleCurrentLocation(); // Auto-detect location
    setLoading(false);
  };

  const findBestOption = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let filtered = (mechanicsData as Mechanic[]).filter((m: Mechanic) => m.specialty === vehicle);
      
      // Randomize distances to simulate location change (0.5 to 5.0 km)
      const withNewDistances = filtered.map(m => ({
        ...m,
        distance: `${(Math.random() * 4.5 + 0.5).toFixed(1)} km`
      }));
      
      // Shuffle the mechanics
      const shuffled = [...withNewDistances].sort(() => Math.random() - 0.5);
      
      // Find the best one without mutating the shuffled list
      const best = [...shuffled].sort((a, b) => b.rating - a.rating)[0] || shuffled[0];
      
      setMechanics(shuffled);
      setRecommendedMechanic(best);
      setSelectedMechanic(best);
      setStep(3); // Move to Best Option step
    } catch (err) {
      setError('Could not find mechanics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = () => {
    if (selectedMechanic) {
      const bookingId = Math.random().toString(36).substring(2, 9);
      addBooking({
        id: bookingId,
        mechanic: selectedMechanic,
        problem,
        location,
        lat: mapCenter.lat,
        lng: mapCenter.lng,
        timestamp: Date.now()
      });
      setActiveTrackingId(bookingId);
    }
    setStep(4);
    setShowToast(true);
    setTimeout(() => {
      navigate('/success', { state: { mechanic: selectedMechanic, problem } });
    }, 3000);
  };

  const renderTracking = () => {
    if (bookings.length === 0) {
      setShowTracking(false);
      return null;
    }

    if (!activeTrackingId) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 text-dark-text">Your Active Bookings</h2>
            <p className="text-secondary-text">Select a mechanic to track their progress</p>
          </div>

          <div className="space-y-4">
            {bookings.map((booking) => (
              <div 
                key={booking.id}
                onClick={() => setActiveTrackingId(booking.id)}
                className="p-4 bg-white rounded-2xl border border-border shadow-soft hover:border-primary transition-all cursor-pointer flex items-center gap-4"
              >
                <img src={booking.mechanic.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm">{booking.mechanic.name}</h4>
                  <p className="text-[10px] text-secondary-text line-clamp-1">{booking.problem}</p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full inline-block">
                    TRACKING
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">
                    {new Date(booking.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setShowTracking(false)}
            className="w-full py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl"
          >
            Back to Booking
          </button>
        </motion.div>
      );
    }

    if (!currentBooking) return null;

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-dark-text">Tracking Mechanic</h2>
          <p className="text-secondary-text">{currentBooking.mechanic.name} is on the way!</p>
        </div>

        <div className="relative h-[400px] rounded-3xl overflow-hidden border border-border shadow-soft">
          <LeafletMapComponent 
            center={{ lat: currentBooking.lat, lng: currentBooking.lng }} 
            mechanicPos={mechanicPos}
          />
        </div>

        <div className="p-6 bg-white rounded-3xl border border-border shadow-soft flex items-center gap-4">
          <img src={currentBooking.mechanic.image} alt="" className="w-16 h-16 rounded-2xl object-cover" />
          <div className="flex-1">
            <h4 className="font-bold">{currentBooking.mechanic.name}</h4>
            <p className="text-xs text-secondary-text">Specialty: {currentBooking.mechanic.specialty}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={12} className="text-warning" fill="currentColor" />
              <span className="text-xs font-bold">{currentBooking.mechanic.rating}</span>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = `tel:${currentBooking.mechanic.phone}`}
            className="p-3 bg-primary/10 text-primary rounded-2xl hover:bg-primary/20 transition-colors"
          >
            <Navigation size={20} />
          </button>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => setActiveTrackingId(null)}
            className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl"
          >
            View All
          </button>
          <button 
            onClick={() => {
              if (confirm('Are you sure you want to cancel this booking?')) {
                removeBooking(currentBooking.id);
                setActiveTrackingId(null);
              }
            }}
            className="flex-1 py-4 bg-red-50 text-red-600 font-bold rounded-2xl border border-red-100"
          >
            Cancel Booking
          </button>
        </div>
      </motion.div>
    );
  };

  const renderStep = () => {
    if (showTracking) return renderTracking();

    switch (step) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-left">
                <h2 className="text-2xl font-bold text-dark-text">What's the issue?</h2>
                <p className="text-secondary-text">Describe your problem for instant assistance</p>
              </div>
              {bookings.length > 0 && (
                <button 
                  onClick={() => setShowTracking(true)}
                  className="px-4 py-2 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20 flex items-center gap-2 hover:bg-primary/20 transition-all"
                >
                  <Truck size={14} /> Booked ({bookings.length})
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-3">
                {(['Bike', 'Car', 'Truck', 'Cycle'] as VehicleType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setVehicle(type)}
                    className={`p-3 rounded-xl border-2 transition-all text-sm font-bold ${
                      vehicle === type 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-border bg-white text-gray-500'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <textarea 
                className="w-full p-4 bg-gray-50 border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all min-h-[120px]"
                placeholder="e.g. My car has a flat tire and I'm stuck on the highway..."
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              />
              
              <div className="flex flex-wrap gap-2">
                {['Flat Tire', 'Engine Issue', 'Battery Dead', 'Fuel Out'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => setProblem(tag)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium text-gray-600 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="bottom-sticky-cta">
              <button 
                disabled={!problem || !vehicle || loading}
                onClick={startAnalysis}
                className="btn-primary w-full"
              >
                {loading ? 'Analyzing...' : 'Get Instant Help'}
              </button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-dark-text">Confirm Your Location</h2>
              <p className="text-secondary-text">We've detected your location. You can adjust it on the map.</p>
            </div>

            <div className="space-y-4">
              <LeafletMapComponent 
                center={mapCenter} 
                onLocationSelect={handleLocationSelect}
              />

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text"
                  placeholder="Enter your address or landmark"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <button 
                className="flex items-center justify-center gap-2 w-full py-3 text-primary font-bold hover:bg-primary/5 rounded-xl transition-colors border border-primary/10"
                onClick={handleCurrentLocation}
              >
                <Navigation size={18} /> Refresh Current Location
              </button>
            </div>

            <div className="bottom-sticky-cta flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 font-bold text-gray-500">Back</button>
              <button 
                disabled={!location || loading}
                onClick={findBestOption}
                className="btn-primary flex-2"
              >
                {loading ? 'Searching...' : 'Find Best Mechanic'}
              </button>
            </div>
          </motion.div>
        );

      case 3:
        const otherMechanics = mechanics.filter(m => m.id !== recommendedMechanic?.id);
        
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-xs font-bold mb-3">
                <CheckCircle2 size={14} /> RECOMMENDED OPTION
              </div>
              <h2 className="text-2xl font-bold mb-2 text-dark-text">Best Match Found</h2>
              <p className="text-secondary-text">Based on your issue: "{problem}"</p>
            </div>

            {recommendedMechanic && (
              <div className="relative">
                {recommendedMechanic.rating >= 4.9 && (
                  <div className="absolute -top-2 -right-2 z-10 bg-accent text-dark-text text-[10px] font-black px-2 py-1 rounded shadow-sm rotate-12">
                    TOP RATED
                  </div>
                )}
                <MechanicCard 
                  mechanic={recommendedMechanic}
                  isSelected={selectedMechanic?.id === recommendedMechanic.id}
                  onSelect={(mech) => setSelectedMechanic(mech)}
                />
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-2xl border border-border space-y-3">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <AlertCircle size={16} className="text-primary" /> Why this mechanic?
              </h4>
              <ul className="text-xs text-secondary-text space-y-2">
                <li className="flex items-center gap-2">• Specialized in {vehicle} {problem.toLowerCase()}</li>
                <li className="flex items-center gap-2">• Closest professional at {recommendedMechanic?.distance}</li>
                <li className="flex items-center gap-2">• Highest rated expert available now</li>
              </ul>
            </div>

            {otherMechanics.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-dark-text">Other Available Experts</h3>
                  <span className="text-xs text-secondary-text">{otherMechanics.length} more found</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {otherMechanics.map((m) => (
                    <MechanicCard 
                      key={m.id}
                      mechanic={m}
                      isSelected={selectedMechanic?.id === m.id}
                      onSelect={(mech) => setSelectedMechanic(mech)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="bottom-sticky-cta flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 py-3 font-bold text-gray-500">Back</button>
              <button 
                disabled={!selectedMechanic}
                onClick={handleBooking}
                className="btn-primary flex-2"
              >
                Confirm & Book Now
              </button>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center space-y-6"
          >
            <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-success/20">
              <CheckCircle2 size={48} />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Help is on the way!</h2>
              <p className="text-secondary-text">Your request has been processed successfully.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-3xl border border-border text-left space-y-4 max-w-sm mx-auto">
              <div className="flex items-center gap-4">
                <img src={selectedMechanic?.image} alt="" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-bold">{selectedMechanic?.name}</p>
                  <p className="text-xs text-secondary-text">Arriving in ~15 mins</p>
                </div>
              </div>
              <div className="h-px bg-border" />
              <p className="text-xs text-secondary-text leading-relaxed">
                The mechanic has received your problem details and is navigating to your location. 
                Please keep your phone active.
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] py-12 px-4 bg-background page-transition">
      <div className="step-wizard-container">
        <ProgressStepper currentStep={step} steps={steps} />
        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12"
            >
              <Loader />
              <div className="grid grid-cols-1 gap-4 mt-8">
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </motion.div>
          ) : (
            renderStep()
          )}
        </AnimatePresence>
      </div>

      <Toast 
        message="Booking Confirmed! Redirecting..." 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
}
