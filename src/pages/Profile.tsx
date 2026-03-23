import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, LogOut, ShieldCheck, History, Settings } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function Profile() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-160px)] py-12 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-soft border border-border overflow-hidden"
        >
          {/* Header */}
          <div className="bg-primary p-8 text-white relative">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/30">
                <User size={48} />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{user.username}</h2>
                <p className="text-white/80">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-border flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-xs text-secondary-text">Account Status</p>
                  <p className="font-bold">Verified Member</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-border flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <History size={20} />
                </div>
                <div>
                  <p className="text-xs text-secondary-text">Total Bookings</p>
                  <p className="font-bold">0 Assistance</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full p-4 flex items-center justify-between bg-white border border-border rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Settings size={20} className="text-gray-400" />
                  <span className="font-medium">Account Settings</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
              
              <button 
                onClick={handleLogout}
                className="w-full p-4 flex items-center gap-3 bg-red-50 text-red-600 border border-red-100 rounded-2xl hover:bg-red-100 transition-colors"
              >
                <LogOut size={20} />
                <span className="font-bold">Logout</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
