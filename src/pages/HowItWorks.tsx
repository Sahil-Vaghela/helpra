import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MapPin, Search, CheckCircle2, Navigation, ArrowRight, Shield, Clock, Zap } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Describe Your Issue',
      desc: 'Tell us what happened with your vehicle. Whether it\'s a flat tire, engine trouble, or you\'ve run out of fuel, our system analyzes your needs instantly.',
      icon: <Search className="w-8 h-8" />,
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      number: '02',
      title: 'Set Your Location',
      desc: 'Confirm your current location on our interactive map. We use high-precision GPS to ensure our mechanics find you exactly where you are.',
      icon: <MapPin className="w-8 h-8" />,
      color: 'bg-orange-500/10 text-orange-500',
    },
    {
      number: '03',
      title: 'Match with Experts',
      desc: 'Our intelligent matching algorithm finds the best-rated mechanic specialized in your vehicle type and specific problem within your vicinity.',
      icon: <CheckCircle2 className="w-8 h-8" />,
      color: 'bg-green-500/10 text-green-500',
    },
    {
      number: '04',
      title: 'Track in Real-Time',
      desc: 'Watch your mechanic navigate to you in real-time. Get live ETAs and stay updated on their progress until they arrive at your door.',
      icon: <Navigation className="w-8 h-8" />,
      color: 'bg-purple-500/10 text-purple-500',
    },
  ];

  return (
    <div className="page-transition bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                The Process
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-dark-text leading-tight mb-8">
                Help is just <br />
                <span className="text-primary">four steps away.</span>
              </h1>
              <p className="text-xl text-secondary-text leading-relaxed mb-10">
                We've redesigned roadside assistance from the ground up to be fast, 
                transparent, and reliable. No more waiting on hold for hours.
              </p>
              <Link to="/booking" className="btn-primary px-10 py-4 text-lg inline-flex items-center gap-3">
                Experience it now <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-0 hidden lg:block"></div>
      </section>

      {/* Steps Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="sticky top-32">
              <h2 className="text-4xl font-bold text-dark-text mb-6">A seamless journey to safety.</h2>
              <p className="text-secondary-text text-lg leading-relaxed mb-12">
                Our platform handles the complexity so you can focus on staying safe. 
                From the moment you report an issue to the final repair, we're with you.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <Shield size={20} />, title: 'Fully Insured', desc: 'Every service is protected by our comprehensive insurance.' },
                  { icon: <Clock size={20} />, title: '24/7 Availability', desc: 'Our network of mechanics operates around the clock.' },
                  { icon: <Zap size={20} />, title: 'Instant Dispatch', desc: 'No middleman. Direct connection to the nearest expert.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl border border-border bg-slate-50/50">
                    <div className="text-primary">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-dark-text">{item.title}</h4>
                      <p className="text-sm text-secondary-text">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-8 bg-white rounded-3xl border border-border shadow-soft hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="absolute -top-6 -left-6 text-8xl font-black text-slate-100 -z-10 group-hover:text-primary/5 transition-colors">
                    {step.number}
                  </div>
                  <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-dark-text mb-4">{step.title}</h3>
                  <p className="text-secondary-text leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ/Trust Section */}
      <section className="py-24 bg-dark-text text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Common Questions</h2>
            <p className="text-gray-400">Everything you need to know about QuickFix.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              { q: 'How fast will a mechanic arrive?', a: 'On average, our mechanics arrive within 15-30 minutes depending on your location and traffic conditions.' },
              { q: 'Are the prices fixed?', a: 'We provide an upfront estimate. The final price is based on standard labor rates and any parts required for the repair.' },
              { q: 'Do I need a membership?', a: 'No. QuickFix is a pay-per-use service. You only pay when you need help, with no monthly fees.' },
              { q: 'What if my car needs towing?', a: 'If on-site repair isn\'t possible, our mechanics can arrange for a secure tow to the nearest service center.' },
            ].map((faq, i) => (
              <div key={i} className="space-y-3">
                <h4 className="text-lg font-bold text-primary">{faq.q}</h4>
                <p className="text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-dark-text mb-8">Ready for peace of mind?</h2>
          <p className="text-xl text-secondary-text mb-12">
            Join thousands of drivers who trust QuickFix for their roadside needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/booking" className="btn-primary px-12 py-4 text-lg w-full sm:w-auto">
              Book Assistance Now
            </Link>
            <Link to="/signup" className="px-12 py-4 bg-white border border-border text-dark-text font-bold rounded-2xl hover:bg-slate-50 transition-all w-full sm:w-auto">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
