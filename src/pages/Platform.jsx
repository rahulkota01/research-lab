import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, ArrowRight } from 'lucide-react';

export default function Platform() {
    const fadeUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-[#0A0E1A] text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 -z-20 bg-[#0A0E1A]" />
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

            {/* Navigation Bar */}
            <nav className="border-b border-[#1E2A45] backdrop-blur-sm bg-[#0A0E1A]/80 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <img src="/favicon.png" alt="RO Virtual Lab" className="w-6 h-6" />
                            <span className="text-sm font-semibold text-white">RO Virtual Lab</span>
                        </Link>
                        
                        <Link 
                            to="/"
                            className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
                
                {/* Header */}
                <motion.div 
                    {...fadeUp}
                    className="text-center mb-12 sm:mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs sm:text-sm font-medium mb-6">
                        <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Platform Overview
                    </div>
                    
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                        Our Platform
                    </h1>
                    
                    <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
                        Advanced computational tools for modern scientific research
                    </p>
                </motion.div>

                {/* Content Section */}
                <motion.section 
                    {...fadeUp}
                    transition={{ delay: 0.1 }}
                    className="bg-[#0F1629]/50 backdrop-blur border border-[#1E2A45] rounded-2xl p-6 sm:p-8 lg:p-10 mb-8"
                >
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Platform Features</h2>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                        RO Virtual Lab provides a comprehensive suite of computational tools designed to accelerate scientific discovery. 
                        Our platform integrates molecular visualization, AI-powered analysis, and virtual experimentation capabilities 
                        in a unified research environment.
                    </p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {[
                            { title: 'Molecular Library', desc: 'Access 100M+ compounds from PubChem' },
                            { title: 'Virtual Lab Bench', desc: 'Run experiments with AI assistance' },
                            { title: '3D Visualization', desc: 'Interactive molecular conformers' },
                            { title: 'Simulation Engine', desc: 'Research-grade accuracy' },
                            { title: 'Research Notebook', desc: 'Document your experiments' },
                            { title: 'Results Analysis', desc: 'Comprehensive data insights' }
                        ].map((feature, i) => (
                            <div key={i} className="bg-[#0A0E1A] border border-[#1E2A45] rounded-xl p-4 sm:p-6">
                                <h3 className="text-white font-semibold text-sm sm:text-base mb-2">{feature.title}</h3>
                                <p className="text-slate-400 text-xs sm:text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* CTA Section */}
                <motion.div
                    {...fadeUp}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <Link
                        to="/app/library"
                        className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 text-sm sm:text-base"
                    >
                        Explore Platform
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                </motion.div>

            </main>

            {/* Footer */}
            <footer className="border-t border-[#1E2A45] mt-12 sm:mt-16 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-slate-500 text-xs sm:text-sm">
                        © 2026 RO Ecosystem. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
