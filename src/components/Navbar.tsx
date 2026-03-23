import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Wrench, ChevronRight, User } from 'lucide-react';
import { useUser } from '../context/UserContext';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useUser();

  // Scroll listener for sticky animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Mechanics', path: '/mechanics' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <nav className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Left: Logo */}
          <Link to="/" className="navbar-logo">
            <Wrench size={28} strokeWidth={2.5} className="text-primary" />
            <span>Helpra</span>
          </Link>

          {/* Center: Navigation Links */}
          <div className="navbar-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) => {
                  const isHashLink = link.path.includes('#');
                  const currentHash = location.hash;
                  const linkHash = link.path.split('#')[1];
                  
                  let active = isActive;
                  if (isHashLink) {
                    active = currentHash === `#${linkHash}`;
                  } else if (link.path === '/') {
                    active = isActive && !currentHash;
                  }
                  
                  return `nav-link ${active ? 'active' : ''}`;
                }}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="navbar-actions">
            {isAuthenticated ? (
              <Link to="/profile" className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="font-bold text-sm hidden lg:block">{user?.username}</span>
              </Link>
            ) : (
              <div className="hidden lg:flex items-center gap-4">
                <Link to="/login" className="text-sm font-bold hover:text-primary transition-colors">Login</Link>
                <Link to="/signup" className="px-5 py-2 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary-hover transition-colors">Sign Up</Link>
              </div>
            )}
            
            {/* <Link to="/booking" className="btn-book-nav">
              Book Assistance
            </Link>
             */}
            <button 
              className="mobile-toggle"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div 
        className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div 
          className="mobile-menu-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-menu-header">
            <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
              <Wrench size={24} strokeWidth={2.5} className="text-primary" />
              <span>QuickFix</span>
            </Link>
            <button 
              className="mobile-toggle"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) => {
                  const isHashLink = link.path.includes('#');
                  const currentHash = location.hash;
                  const linkHash = link.path.split('#')[1];
                  
                  let active = isActive;
                  if (isHashLink) {
                    active = currentHash === `#${linkHash}`;
                  } else if (link.path === '/') {
                    active = isActive && !currentHash;
                  }
                  
                  return `mobile-nav-link ${active ? 'active' : ''}`;
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
                <ChevronRight size={18} opacity={0.5} />
              </NavLink>
            ))}
            
            {!isAuthenticated ? (
              <>
                <NavLink to="/login" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                  Login
                  <ChevronRight size={18} opacity={0.5} />
                </NavLink>
                <NavLink to="/signup" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                  <ChevronRight size={18} opacity={0.5} />
                </NavLink>
              </>
            ) : (
              <NavLink to="/profile" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Profile
                <ChevronRight size={18} opacity={0.5} />
              </NavLink>
            )}
          </div>

          <div className="mobile-menu-footer">
            <Link 
              to="/booking" 
              className="btn-mobile-book"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Assistance Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
