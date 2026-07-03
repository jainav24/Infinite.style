import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();
  const { user } = useAuth();

  const isTransparentHome = location.pathname === '/' && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/aboutus' },
    { name: 'Contact', path: '/contact' },
    { name: 'Wishlist', path: '/wishlist' },
  ];

  return (
    <>
      {/* Spacer to prevent content from jumping up */}
      {location.pathname !== '/' && <div className="h-24 w-full bg-transparent" />}

      <nav className={`fixed top-0 left-0 w-full z-50 pointer-events-none transition-all duration-500 ease-in-out ${isScrolled ? 'pt-6 px-4' : 'pt-0 px-0'}`}>
        <div className={`mx-auto pointer-events-auto transition-all duration-500 ease-in-out overflow-hidden ${
          isScrolled 
            ? 'max-w-[800px] bg-porcelain/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-ink/10 rounded-full px-8' 
            : 'max-w-[1400px] bg-transparent border-transparent rounded-none px-4 sm:px-8'
        }`}>
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-16' : 'h-24'}`}>
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2 group hover:scale-105 transition-transform duration-300">
                <img src="/Logo.png" alt="Infinite Style Store" className={`transition-all duration-500 object-contain ${isScrolled ? 'h-8' : 'h-12'}`} />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-12">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`font-fjalla text-[15px] font-bold tracking-wide transition-all duration-300 relative ${
                        isActive 
                          ? (isTransparentHome ? 'text-orchid drop-shadow-[0_0_12px_rgba(232,62,140,0.8)] scale-105' : 'text-orchid scale-105')
                          : (isTransparentHome ? 'text-porcelain drop-shadow-md hover:text-orchid hover:scale-105' : 'text-ink/80 hover:text-orchid hover:scale-105')
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-orchid rounded-full shadow-[0_0_8px_rgba(232,62,140,0.8)]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              <Link to={user ? "/account" : "/login"} className={`transition-all duration-300 hover:scale-110 ${isTransparentHome ? 'text-porcelain drop-shadow-md hover:text-orchid' : 'text-ink hover:text-orchid'}`}>
                <User size={isScrolled ? 18 : 20} strokeWidth={2} />
              </Link>



              <Link to="/cart" className={`relative transition-all duration-300 hover:scale-110 ${isTransparentHome ? 'text-porcelain drop-shadow-md hover:text-orchid' : 'text-ink hover:text-orchid'}`}>
                <ShoppingBag size={isScrolled ? 18 : 20} strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-orchid text-[10px] font-fjalla font-bold text-porcelain shadow-[0_0_8px_rgba(232,62,140,0.6)]">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <div className="flex items-center md:hidden pl-2">
                <button
                  onClick={toggleMobileMenu}
                  className={`focus:outline-none pointer-events-auto transition-all duration-300 hover:scale-110 ${isTransparentHome ? 'text-porcelain drop-shadow-md hover:text-orchid' : 'text-ink hover:text-orchid'}`}
                >
                  {isMobileMenuOpen ? <X size={isScrolled ? 20 : 24} strokeWidth={2} /> : <Menu size={isScrolled ? 20 : 24} strokeWidth={2} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mx-4 mt-2 bg-porcelain/95 backdrop-blur-xl border border-ink/10 rounded-2xl overflow-hidden pointer-events-auto shadow-xl">
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={`block px-4 py-3 font-fjalla text-[15px] font-bold tracking-wide rounded-xl transition-all duration-300 ${
                      isActive ? 'bg-champagne/30 text-orchid' : 'text-ink/80 hover:bg-champagne/10 hover:text-orchid hover:pl-6'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
