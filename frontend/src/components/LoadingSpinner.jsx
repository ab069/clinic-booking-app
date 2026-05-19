import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity }}
        className="rounded-full h-16 w-16 border-b-4 border-primary"
      />
    </div>
  );
};

export default LoadingSpinner;
