import React, { Key } from 'react';
import { Star, MapPin, Phone, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

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

interface MechanicCardProps {
  key?: Key;
  mechanic: Mechanic;
  onSelect?: (mechanic: Mechanic) => void;
  isSelected?: boolean;
}

export default function MechanicCard({ mechanic, onSelect, isSelected }: MechanicCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`card cursor-pointer border-2 transition-all ${
        isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border'
      }`}
      onClick={() => onSelect?.(mechanic)}
    >
      <div className="flex gap-4">
        <img 
          src={mechanic.image} 
          alt={mechanic.name} 
          className="w-20 h-20 rounded-xl object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-dark-text">{mechanic.name}</h3>
            <div className="flex items-center gap-1 text-warning font-bold">
              <Star size={16} fill="currentColor" />
              <span>{mechanic.rating}</span>
            </div>
          </div>
          <p className="text-sm text-secondary-text mb-2">{mechanic.specialty} Specialist • {mechanic.experience} exp.</p>
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <MapPin size={14} />
            <span>{mechanic.distance} away</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex gap-2">
        <button className="flex-1 py-2 px-3 bg-slate-100 rounded-lg text-slate-800 text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
          <Phone size={16} />
          Call
        </button>
        <button className="flex-1 py-2 px-3 bg-slate-100 rounded-lg text-slate-800 text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
          <MessageSquare size={16} />
          Chat
        </button>
        {onSelect && (
          <button 
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-colors ${
              isSelected ? 'bg-success text-white' : 'bg-primary text-white'
            }`}
          >
            {isSelected ? 'Selected' : 'Book'}
          </button>
        )}
      </div>
    </motion.div>
  );
}
