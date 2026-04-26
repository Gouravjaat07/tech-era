import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ children, className = "", hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -5 } : {}}
      className={`relative group bg-[#0A1628] border border-white/5 rounded-[2.5rem] p-8 ${hover ? 'hover:border-primary/30' : ''} transition-all duration-500 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
