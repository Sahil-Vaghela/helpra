import React from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Zap,
  Clock,
  Star,
  Truck,
  Fuel,
  Battery,
  Wrench,
  MapPin,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import video from "../assets/videoplayback.mp4";

export default function Home() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  const handleBookClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      alert("Please login to book assistance");
      navigate("/login", { state: { from: { pathname: "/booking" } } });
    }
  };
  const features = [
    {
      icon: <Truck size={32} />,
      title: "Tow Service",
      desc: "Secure towing for all vehicle types.",
      offset: "mt-0",
    },
    {
      icon: <Fuel size={32} />,
      title: "Fuel Help",
      desc: "Emergency fuel delivery to your location.",
      offset: "mt-12",
    },
    {
      icon: <Battery size={32} />,
      title: "Battery Jump",
      desc: "Quick jumpstart or battery replacement.",
      offset: "mt-4",
    },
    {
      icon: <Wrench size={32} />,
      title: "Tyre Fix",
      desc: "On-site puncture repair and tyre change.",
      offset: "mt-16",
    },
  ];

  const mechanics = [
    {
      name: "Alex Rivera",
      rating: 4.9,
      specialty: "Engine Specialist",
      image: "https://i.pravatar.cc/150?u=alex",
      offset: "mt-0",
    },
    {
      name: "Sarah Chen",
      rating: 4.8,
      specialty: "Electrical Expert",
      image: "https://i.pravatar.cc/150?u=sarah",
      offset: "mt-12",
    },
    {
      name: "Marcus Thorne",
      rating: 5.0,
      specialty: "Towing Pro",
      image: "https://i.pravatar.cc/150?u=marcus",
      offset: "mt-6",
    },
  ];

  return (
    <div className="page-transition bg-background min-h-screen overflow-x-hidden">
      {/* Hero Section */}
     <section className="relative min-h-screen flex items-center overflow-hidden">

  {/* VIDEO BG */}
  <div className="absolute inset-0 z-0">
    <video
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover scale-110 opacity-30"
    >
      <source src={video} type="video/mp4" />
    </video>

    {/* cinematic gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent"></div>
  </div>

  {/* CONTAINER */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* LEFT */}
      <div className="max-w-xl">

        <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight text-dark-text mb-6">
          "Roadside Help.
          <br />
          <span className="text-primary">AnyWhere."</span>
        </h1>

        <p className="text-lg text-secondary-text leading-relaxed mb-10">
          Get professional roadside assistance anywhere, anytime.
          Real mechanics. Real tracking. Real fast.
        </p>

        {/* CTA BAR */}
        <div className="flex items-center gap-6">
          <Link
            to="/booking"
            onClick={handleBookClick}
            className="btn-primary px-10 py-4 text-lg shadow-2xl shadow-primary/30"
          >
            Book Now
          </Link>

          <Link
            to="/how-it-works"
            className="flex items-center gap-2 font-semibold text-secondary-text hover:text-primary transition"
          >
            How it works →
          </Link>
        </div>

      </div>

      {/* RIGHT ECOSYSTEM */}
      <div className="relative h-[520px] hidden lg:block">

        {/* glow depth */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[420px] h-[420px] bg-primary/20 rounded-full blur-[140px]"></div>
        </div>

        {/* main card */}
        <div className="absolute top-24 left-10 bg-white rounded-3xl shadow-2xl border border-border p-5 animate-float">
          <p className="text-xs text-secondary-text">Live Tracking</p>
          <p className="font-bold text-dark-text">Mechanic arriving</p>
          <p className="text-success text-sm font-semibold">3 mins away</p>
        </div>

        {/* price chip */}
        <div className="absolute top-10 right-10 bg-white rounded-2xl shadow-xl border border-border px-4 py-3 animate-float-slow">
          <p className="text-xs text-secondary-text">Estimated Price</p>
          <p className="font-bold">₹45</p>
        </div>

        {/* rating chip */}
        <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-xl border border-border px-4 py-3 animate-float-fast">
          ⭐ <span className="font-bold">4.9</span>
        </div>

        {/* eta */}
        <div className="absolute bottom-0 left-20 bg-white rounded-2xl shadow-xl border border-border px-4 py-3 animate-float-drift">
          ETA 12 mins
        </div>

      </div>

    </div>
  </div>
</section>

      {/* Feature Section - Asymmetric Floating Cards */}
      <section id="how-it-works" className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-dark-text mb-4">
              Premium Assistance
            </h2>
            <p className="text-secondary-text">
              Modern solutions for every roadside emergency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${feature.offset} floating-card group`}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-dark-text mb-3">
                  {feature.title}
                </h3>
                <p className="text-secondary-text text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mechanic Preview Section - Staggered Positioning */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-dark-text mb-4">
                Expert Mechanics
              </h2>
              <p className="text-secondary-text leading-relaxed">
                We only partner with the best. Our mechanics are vetted, rated,
                and ready to help you get back on the road.
              </p>
            </div>
            <Link
              to="/mechanics"
              className="text-primary font-bold flex items-center gap-2 hover:underline"
            >
              View all mechanics <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {mechanics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`${m.offset} bg-white rounded-3xl p-8 shadow-soft border border-border hover:shadow-2xl transition-all duration-500 group`}
              >
                <div className="relative mb-6">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-24 h-24 rounded-2xl object-cover shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-white px-3 py-1 rounded-full shadow-md border border-border flex items-center gap-1">
                    <Star
                      size={12}
                      className="text-warning"
                      fill="currentColor"
                    />
                    <span className="text-xs font-bold text-dark-text">
                      {m.rating}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-dark-text mb-1">
                  {m.name}
                </h3>
                <p className="text-sm text-primary font-semibold mb-4">
                  {m.specialty}
                </p>
                <div className="flex items-center gap-2 text-secondary-text text-xs">
                  <MapPin size={14} />
                  <span>Available Nearby</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Large Floating Container */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[40px] p-16 md:p-24 text-center shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-border relative overflow-hidden"
          >
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-extrabold text-dark-text mb-8 leading-tight">
                Ready to get <br />
                <span className="text-primary">moving again?</span>
              </h2>
              <p className="text-xl text-secondary-text mb-12 leading-relaxed">
                Don't wait in the cold. Book your assistance now and have a
                professional at your door in minutes.
              </p>
              <Link
                to="/booking"
                onClick={handleBookClick}
                className="btn-primary px-12 py-5 text-xl shadow-2xl shadow-primary/30 inline-block"
              >
                Book Assistance Now
              </Link>
            </div>

            {/* Decorative blobs */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
