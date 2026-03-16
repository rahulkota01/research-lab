import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Beaker } from 'lucide-react';

export default function Company() {
    const navigate = useNavigate();

    const fadeUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-[#0A0E1A] text-white relative overflow-hidden">
            {/* Background with Favicon Pattern */}
            <div className="fixed inset-0 z-0">
                {/* Dark overlay base */}
                <div className="absolute inset-0 bg-[#0A0E1A]/95" />
                
                {/* Favicon background pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url('/favicon.png')`,
                        backgroundSize: '80px 80px',
                        backgroundRepeat: 'repeat',
                        backgroundPosition: 'center'
                    }}
                />
                
                {/* Gradient overlays for smooth transitions */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A] via-transparent to-[#0A0E1A]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E1A] via-[#0A0E1A]/80 to-[#0A0E1A]" />
            </div>

            {/* Content Container */}
            <div className="relative z-10">
                {/* Navigation Bar */}
                <nav className="border-b border-[#1E2A45] backdrop-blur-sm bg-[#0A0E1A]/80 sticky top-0 z-50">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <div className="flex items-center justify-between h-16">
                            <Link 
                                to="/" 
                                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                            >
                                <img src="/favicon.png" alt="RO Ecosystem" className="w-6 h-6" />
                                <span className="text-sm font-semibold text-white">RO Ecosystem</span>
                            </Link>
                            
                            <button 
                                onClick={() => navigate(-1)}
                                className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                            >
                                ← Back
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
                    
                    {/* Header */}
                    <motion.div 
                        {...fadeUp}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs sm:text-sm font-medium mb-6">
                            <Beaker className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            About RO Ecosystem
                        </div>
                        
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                            Company Overview
                        </h1>
                        
                        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
                            Building computational environments for the future of scientific discovery
                        </p>
                    </motion.div>

                    {/* About Section */}
                    <motion.section 
                        {...fadeUp}
                        transition={{ delay: 0.1 }}
                        className="mb-12 sm:mb-16"
                    >
                        <div className="bg-[#0F1629]/50 backdrop-blur border border-[#1E2A45] rounded-2xl p-6 sm:p-8 lg:p-10">
                            <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-[#1E2A45]">
                                About the Company
                            </h2>
                            
                            <div className="space-y-4 sm:space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
                                <p>
                                    RO Ecosystem is an emerging technology and research initiative focused on developing computational platforms that support modern scientific exploration. The organization operates at the intersection of biology, artificial intelligence, and digital infrastructure, with the goal of creating systems that assist researchers in understanding complex scientific problems.
                                </p>
                                
                                <p>
                                    The company was established with the belief that the future of discovery will increasingly rely on intelligent computational environments that can organize knowledge, analyze data, and support scientific reasoning. Through its research initiatives and experimental platforms, RO Ecosystem aims to contribute to the development of next-generation research technologies.
                                </p>
                                
                                <p>
                                    RO Research Lab serves as one of the core environments within the ecosystem, focusing on experimental research concepts and computational approaches that can help accelerate scientific investigation. The lab provides a space for exploring ideas, developing research systems, and fostering collaboration between scientific and technological disciplines.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Vision & Philosophy Grid */}
                    <motion.div 
                        {...fadeUp}
                        transition={{ delay: 0.2 }}
                        className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16"
                    >
                        {/* Vision */}
                        <div className="bg-[#0F1629]/50 backdrop-blur border border-[#1E2A45] rounded-2xl p-6 sm:p-8">
                            <h2 className="text-base sm:text-lg font-bold text-cyan-400 mb-4">Vision</h2>
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                                To build advanced computational environments that support the future of scientific discovery by integrating biological knowledge, artificial intelligence, and digital research infrastructure.
                            </p>
                        </div>

                        {/* Philosophy */}
                        <div className="bg-[#0F1629]/50 backdrop-blur border border-[#1E2A45] rounded-2xl p-6 sm:p-8">
                            <h2 className="text-base sm:text-lg font-bold text-purple-400 mb-4">Philosophy</h2>
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                                RO Ecosystem believes that modern research increasingly requires interdisciplinary collaboration between science and technology. By combining computational reasoning with scientific insight, the organization aims to create tools and platforms that empower researchers to explore complex biological systems and generate new knowledge.
                            </p>
                        </div>
                    </motion.div>

                    {/* Learn More CTA */}
                    <motion.div
                        {...fadeUp}
                        transition={{ delay: 0.3 }}
                        className="text-center"
                    >
                        <div className="bg-gradient-to-r from-[#0F1629] to-[#141B2D] border border-[#1E2A45] rounded-2xl p-6 sm:p-8 lg:p-10">
                            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                                Learn More
                            </h2>
                            
                            <p className="text-slate-400 text-sm sm:text-base mb-6 sm:mb-8 max-w-xl mx-auto">
                                To learn more about the broader mission and initiatives of RO Ecosystem, please visit the official company website.
                            </p>
                            
                            <a
                                href="https://roecosystem.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 text-sm sm:text-base"
                            >
                                Visit Company Website
                                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                            </a>
                        </div>
                    </motion.div>

                </main>

                {/* Footer */}
                <footer className="border-t border-[#1E2A45] mt-12 sm:mt-16 py-8">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                        <p className="text-slate-500 text-xs sm:text-sm">
                            © 2026 RO Ecosystem. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
