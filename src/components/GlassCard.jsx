import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ 
  children, 
  className = '', 
  hover = true,
  glow = false,
  gradient = false,
  onClick,
  ...props 
}) {
  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl
        bg-[#0F1629]/80 backdrop-blur-xl
        border border-[#1E2A45]
        shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        ${hover ? 'transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,212,255,0.1)] hover:-translate-y-1 hover:border-cyan-500/30' : ''}
        ${glow ? 'hover:shadow-[0_0_30px_rgba(0,212,255,0.2)]' : ''}
        ${gradient ? 'before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-br before:from-cyan-500/30 before:via-blue-500/30 before:to-purple-500/30 before:-z-10' : ''}
        ${className}
      `}
      whileHover={hover ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}
