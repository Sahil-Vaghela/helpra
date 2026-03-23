import { Shield, Users, Clock, Award } from 'lucide-react';
import { motion } from 'motion/react';
import img from "../assets/aboutimg.png"

export default function About() {
  const values = [
    { icon: <Shield size={32} />, title: 'Safety First', desc: 'All our mechanics are verified and background-checked for your peace of mind.' },
    { icon: <Users size={32} />, title: 'Expert Network', desc: 'Access to the largest network of professional roadside assistance providers.' },
    { icon: <Clock size={32} />, title: '24/7 Support', desc: 'Day or night, rain or shine, we are here to get you back on the road.' },
    { icon: <Award size={32} />, title: 'Quality Service', desc: 'Consistently rated 4.8+ stars by thousands of satisfied travelers.' },
  ];

  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="bg-dark-text text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold mb-6"
          >
            Our Mission
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            To revolutionize roadside assistance by making it fast, transparent, and accessible to everyone, everywhere.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Helpra?</h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Founded in 2026, Helpra  was born out of a simple frustration: waiting hours for a tow truck in the middle of nowhere. We believed technology could bridge the gap between stranded drivers and local experts.
              </p>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Today, we serve over lots of  cities with a fleet of dedicated professionals. Our platform uses advanced matching algorithms to ensure you get the right help for your specific vehicle type in record time.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-background rounded-2xl">
                  <p className="text-3xl font-bold text-primary mb-1">98%</p>
                  <p className="text-sm text-gray-500 font-medium">Success Rate</p>
                </div>
                <div className="p-4 bg-background rounded-2xl">
                  <p className="text-3xl font-bold text-primary mb-1">15m</p>
                  <p className="text-sm text-gray-500 font-medium">Avg. Arrival</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={img} 
                alt="Our Team" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-500">The principles that drive every assistance call.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="card text-center p-8">
                <div className="text-primary mb-6 flex justify-center">{v.icon}</div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
