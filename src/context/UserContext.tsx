import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  email: string;
}

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

interface BookingInfo {
  id: string;
  mechanic: Mechanic;
  problem: string;
  location: string;
  lat: number;
  lng: number;
  timestamp: number;
}

interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  bookings: BookingInfo[];
  addBooking: (booking: BookingInfo) => void;
  removeBooking: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<BookingInfo[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      
      // Load bookings for this specific user
      const userBookings = localStorage.getItem(`bookings_${parsedUser.email}`);
      if (userBookings) {
        setBookings(JSON.parse(userBookings));
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Load bookings for this specific user upon login
    const userBookings = localStorage.getItem(`bookings_${userData.email}`);
    if (userBookings) {
      setBookings(JSON.parse(userBookings));
    } else {
      setBookings([]);
    }
  };

  const logout = () => {
    setUser(null);
    setBookings([]);
    localStorage.removeItem('currentUser');
  };

  const addBooking = (booking: BookingInfo) => {
    if (!user) return;
    const updatedBookings = [...bookings, booking];
    setBookings(updatedBookings);
    localStorage.setItem(`bookings_${user.email}`, JSON.stringify(updatedBookings));
  };

  const removeBooking = (id: string) => {
    if (!user) return;
    const updatedBookings = bookings.filter(b => b.id !== id);
    setBookings(updatedBookings);
    localStorage.setItem(`bookings_${user.email}`, JSON.stringify(updatedBookings));
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      bookings,
      addBooking,
      removeBooking
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
