import React from 'react';
import { motion } from 'framer-motion';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-porcelain font-body">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-ink flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1600" 
          alt="Fashion models" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display text-porcelain italic mb-6"
          >
            Our Story
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="garment-tag bg-transparent text-porcelain border-porcelain inline-block"
          >
            EST. 2026
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-4 sm:px-8 max-w-[900px] mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-display text-ink mb-8 leading-tight">
          We believe fashion is an <span className="italic text-velvet">infinite loop</span> of self-expression.
        </h2>
        <div className="w-16 h-[1px] bg-orchid mx-auto mb-12"></div>
        <p className="text-lg text-ink/70 leading-relaxed mb-8">
          Born from a desire to break the mold, Infinite.Style.Store is a boutique destination for the bold and the curious. We curate pieces that transcend fleeting trends, focusing instead on enduring style, quality construction, and fearless design.
        </p>
        <p className="text-lg text-ink/70 leading-relaxed">
          Every collection is an edit—a carefully selected wardrobe of statement pieces and elevated basics designed to be mixed, matched, and lived in. Welcome to the loop.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
