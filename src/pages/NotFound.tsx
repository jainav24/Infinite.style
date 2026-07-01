import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-velvet text-porcelain flex flex-col items-center justify-center px-4 font-body relative overflow-hidden">
      
      {/* Decorative large text behind */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <span className="font-display text-[30vw] italic tracking-tighter">404</span>
      </div>

      <div className="relative z-10 text-center">
        <h1 className="text-6xl md:text-8xl font-display mb-6 italic">Lost in the Loop.</h1>
        <p className="font-mono text-xs uppercase tracking-widest text-porcelain/60 mb-12 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="garment-tag bg-porcelain text-ink border-porcelain hover:bg-transparent hover:text-porcelain hover:border-porcelain transition-colors px-8 py-4"
        >
          RETURN HOME
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
