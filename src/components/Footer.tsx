import { Wrench, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 text-primary font-bold text-xl mb-4">
              <Wrench size={24} />
              <span>Helpra Assist</span>
            </div>
            <p className="text-secondary-text text-sm leading-relaxed">
              Fast, reliable, and professional roadside assistance at your fingertips. We get you back on the road safely.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-dark-text mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-secondary-text">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/mechanics" className="hover:text-primary transition-colors">Mechanics</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/booking" className="hover:text-primary transition-colors">Book Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-dark-text mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-secondary-text">
              <li className="flex items-center gap-2"><Phone size={16} /> +91 12390-64567</li>
              <li className="flex items-center gap-2"><Mail size={16} /> support@helpra.com</li>
              {/* <li className="flex items-center gap-2"><MapPin size={16} /></li> */}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-dark-text mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-primary hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-primary hover:text-white transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-primary hover:text-white transition-all">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-gray-400 text-xs">
          <p>© {new Date().getFullYear()} Helpra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
