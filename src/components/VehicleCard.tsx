import React, { Key } from 'react';
import { Bike, Car, Truck } from 'lucide-react';
import { motion } from 'motion/react';

interface VehicleCardProps {
  key?: Key;
  type: 'Bike' | 'Car' | 'Truck';
  isSelected?: boolean;
  onSelect: (type: 'Bike' | 'Car' | 'Truck') => void;
}

export default function VehicleCard({ type, isSelected, onSelect }: VehicleCardProps) {
  const icons = {
    Bike: <Bike size={32} />,
    Car: <Car size={32} />,
    Truck: <Truck size={32} />,
  };

  const descriptions = {
    Bike: 'Fastest for minor repairs',
    Car: 'Standard roadside help',
    Truck: 'Heavy duty & towing',
  };

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -4 }}
      className={`card flex flex-col items-center text-center gap-3 cursor-pointer border-2 transition-all ${
        isSelected ? 'border-primary bg-primary/5' : 'border-border'
      }`}
      onClick={() => onSelect(type)}
    >
      <div className={`p-4 rounded-full ${isSelected ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}>
        {icons[type]}
      </div>
      <div>
        <h3 className="font-bold text-lg">{type}</h3>
        <p className="text-xs text-secondary-text">{descriptions[type]}</p>
      </div>
    </motion.div>
  );
}
