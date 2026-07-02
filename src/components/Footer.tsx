import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <footer className="bg-velvet text-porcelain pt-24 pb-12 border-t border-champagne/20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand */}
          <div className="md:col-span-4">
            <Link to="/" className="inline-block mb-6 group">
              <span className="font-display text-4xl font-light tracking-tight italic group-hover:text-orchid transition-colors">
                Infinite<span className="text-orchid">.</span>
              </span>
            </Link>
            <p className="font-body text-sm text-porcelain/70 mb-8 leading-relaxed max-w-sm">
              Your ultimate destination for trendy, premium fashion. Dream big, style bigger. Designed for the bold.
            </p>
            <div className="flex items-center gap-6 text-porcelain/50">
              <a href="#" className="hover:text-orchid transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="hover:text-orchid transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="hover:text-orchid transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-[0.1em] text-porcelain/50 mb-6">Shop</h4>
            <ul className="space-y-4">
              <li><Link to="/shop?category=dresses" className="font-body text-sm hover:text-orchid transition-colors">Dresses</Link></li>
              <li><Link to="/shop?category=tops" className="font-body text-sm hover:text-orchid transition-colors">Tops</Link></li>
              <li><Link to="/shop?category=accessories" className="font-body text-sm hover:text-orchid transition-colors">Accessories</Link></li>
              <li><Link to="/shop?category=footwear" className="font-body text-sm hover:text-orchid transition-colors">Footwear</Link></li>
              <li><Link to="/shop" className="font-body text-sm text-orchid hover:text-porcelain transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className="md:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-[0.1em] text-porcelain/50 mb-6">Help</h4>
            <ul className="space-y-4">
              <li><Link to="/contact" className="font-body text-sm hover:text-orchid transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="font-body text-sm hover:text-orchid transition-colors">About Us</Link></li>
              <li><a href="#" className="font-body text-sm hover:text-orchid transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="font-body text-sm hover:text-orchid transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Location */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.1em] text-porcelain/50 mb-6">Visit Us</h4>
            <div className="w-full h-40 rounded-xl overflow-hidden border border-champagne/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25279986985!2d-74.144487874252!3d40.6976312333919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="font-body text-sm text-porcelain/70 mt-4 leading-relaxed">
              123 Fashion Ave,<br />
              New York, NY 10001
            </p>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-champagne/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-mono text-xs tracking-widest text-porcelain/40 uppercase">
            &copy; {new Date().getFullYear()} Infinite.Style.Store
          </p>
          <div className="flex gap-2">
            {/* Payment placeholders */}
            <div className="h-6 w-10 border border-champagne/20 rounded-sm opacity-50" />
            <div className="h-6 w-10 border border-champagne/20 rounded-sm opacity-50" />
            <div className="h-6 w-10 border border-champagne/20 rounded-sm opacity-50" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
