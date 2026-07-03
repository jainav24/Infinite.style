import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    imageDesktop: "/Slide1.png",
    imageMobile: "/SlideM1.png",
    title: "The New Collection",
    subtitle: "Spring / Summer 2026",
  },
  {
    id: 2,
    imageDesktop: "/Slide2.png",
    imageMobile: "/SlideM2.png",
    title: "Editorial",
    subtitle: "No Boundaries.",
  },
  {
    id: 3,
    imageDesktop: "/Slide3.png",
    imageMobile: "/SlideM3.png",
    title: "Essentials",
    subtitle: "Elevate your everyday.",
  }
];

const HeroSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-ink">
      <AnimatePresence>
        <motion.div
          key={currentSlide}
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img 
            src={slides[currentSlide].imageMobile} 
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover block md:hidden"
          />
          <img 
            src={slides[currentSlide].imageDesktop} 
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover hidden md:block"
          />
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 flex gap-4 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className="group py-2 focus:outline-none"
          >
            <div className={`h-[1px] transition-all duration-300 ${
              currentSlide === idx ? 'w-12 bg-porcelain' : 'w-6 bg-porcelain/30 group-hover:bg-porcelain/60 group-hover:w-8'
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlideshow;
