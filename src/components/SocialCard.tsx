import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SocialCard: React.FC = () => {
  const images = [
    '/Social/social1.png',
    '/Social/social2.png',
    '/Social/social3.png',
    '/Social/social4.png',
  ];
  
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative flex flex-col"
    >
      <div className="relative overflow-hidden bg-champagne/10">
        <Link to="/shop" className="block relative aspect-[3/4]">
          <AnimatePresence initial={false}>
            <motion.img
              key={currentIdx}
              src={images[currentIdx]}
              alt="Just a Social Life"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full object-cover filter brightness-95 group-hover:brightness-100 group-hover:scale-[1.02] transition-all duration-700"
            />
          </AnimatePresence>

        </Link>
        
        {/* Slideshow Controls */}
        <button 
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-porcelain/80 text-ink rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-porcelain z-20"
        >
          <ChevronLeft size={16} />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-porcelain/80 text-ink rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-porcelain z-20"
        >
          <ChevronRight size={16} />
        </button>
        
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          {images.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1 rounded-full transition-all duration-300 ${idx === currentIdx ? 'w-4 bg-ink' : 'w-1.5 bg-ink/30'}`}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex flex-col gap-2 pl-2 border-l border-champagne">
        <Link to="/shop" className="font-display text-xl text-ink hover:text-orchid transition-colors">
          Just a Social Life
        </Link>
        <div className="flex justify-between items-center">
          <div className="garment-tag">
            As Seen On You
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SocialCard;
