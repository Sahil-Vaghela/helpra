import React from 'react';
import { Search, Filter, Star, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import MechanicCard from '../components/MechanicCard';
import Loader, { SkeletonCard } from '../components/Loader';
import mechanicsData from '../data/mechanics.json';

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

export default function Mechanics() {
  const [mechanics, setMechanics] = React.useState<Mechanic[]>([]);
  const [filtered, setFiltered] = React.useState<Mechanic[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = mechanicsData as Mechanic[];
        setMechanics(data);
        setFiltered(data);
      } catch (error) {
        console.error('Error loading mechanics:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  React.useEffect(() => {
    let result = mechanics;
    if (filter !== 'All') {
      result = result.filter(m => m.specialty === filter);
    }
    if (searchTerm) {
      result = result.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFiltered(result);
  }, [filter, searchTerm, mechanics]);

  return (
    <div className="page-transition bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-dark-text mb-2">Our Professionals</h1>
            <p className="text-gray-500">Highly rated mechanics ready to help you.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by name..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 bg-white border border-border p-1 rounded-xl">
              {['All', 'Bike', 'Car', 'Truck'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filter === f ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-soft">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">No mechanics found</h3>
            <p className="text-gray-500">Try adjusting your filters or search term.</p>
            <button 
              onClick={() => {setFilter('All'); setSearchTerm('');}}
              className="mt-4 text-primary font-bold"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((m) => (
              <MechanicCard key={m.id} mechanic={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
