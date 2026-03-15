import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import ParticleBackground from './ParticleBackground';

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen text-white relative overflow-hidden bg-[#0A0E1A]">
            {/* Dark background */}
            <div className="fixed inset-0 -z-20 bg-[#0A0E1A]" />
            
            {/* Subtle gradient overlay */}
            <div className="fixed inset-0 -z-10">
                <motion.div 
                    className="absolute inset-0 opacity-20"
                    animate={{
                        background: [
                            'radial-gradient(circle at 0% 0%, rgba(0,212,255,0.15) 0%, transparent 50%)',
                            'radial-gradient(circle at 100% 100%, rgba(0,245,160,0.15) 0%, transparent 50%)',
                            'radial-gradient(circle at 50% 50%, rgba(123,47,190,0.15) 0%, transparent 50%)',
                            'radial-gradient(circle at 0% 0%, rgba(0,212,255,0.15) 0%, transparent 50%)',
                        ]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                />
            </div>
            
            {/* Particle overlay */}
            <ParticleBackground />
            
            <Sidebar />
            
            <main className="flex-1 ml-72 p-8 overflow-y-auto min-h-screen relative">
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={window.location.pathname}
                        className="max-w-6xl mx-auto space-y-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
