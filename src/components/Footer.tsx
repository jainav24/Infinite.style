import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail } from 'lucide-react';

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
            <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-porcelain/50">
              <a href="#" className="hover:text-orchid transition-colors">IG</a>
              <a href="#" className="hover:text-orchid transition-colors">TW</a>
              <a href="#" className="hover:text-orchid transition-colors">FB</a>
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

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.1em] text-porcelain/50 mb-6">The Loop</h4>
            <p className="font-body text-sm text-porcelain/70 mb-6">Subscribe for exclusive drops, sales, and style curations.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border-b border-champagne/30 px-0 py-3 font-mono text-xs uppercase text-porcelain focus:border-orchid focus:outline-none transition-colors placeholder:text-porcelain/30"
                required
              />
              <button
                type="submit"
                className="border-b border-champagne/30 px-4 py-3 text-orchid hover:text-porcelain hover:border-porcelain transition-colors"
                aria-label="Subscribe"
              >
                <Mail size={18} strokeWidth={1.5} />
              </button>
            </form>
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
