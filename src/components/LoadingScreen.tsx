import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
    >
      <div className="relative flex flex-col items-center">
        {/* Pulsing background blobs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-32 h-32 bg-hotpink/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute w-40 h-40 bg-lavender/30 rounded-full blur-xl"
        />

        {/* Logo Animation */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-10, 0, -10] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 text-4xl font-display font-bold text-gray-900 mb-6"
        >
          Infinite<span className="text-hotpink">.</span>Style
        </motion.div>

        {/* Loading Spinner / Progress bar */}
        <div className="relative z-10 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-hotpink to-coral"
          />
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 text-sm font-medium text-gray-400 tracking-widest uppercase"
        >
          Curating styles...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
