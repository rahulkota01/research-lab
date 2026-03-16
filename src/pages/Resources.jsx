import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, X, AlertCircle } from 'lucide-react';

export default function Resources() {
    const [selectedResource, setSelectedResource] = useState(null);

    const fadeUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const resources = [
        { title: 'Documentation', desc: 'Comprehensive guides for using RO Virtual Lab platform features.', icon: '📚' },
        { title: 'Video Tutorials', desc: 'Step-by-step video guides for experiments and simulations.', icon: '🎥' },
        { title: 'Research Papers', desc: 'Published studies using our computational platform.', icon: '📄' },
        { title: 'FAQ', desc: 'Frequently asked questions and troubleshooting tips.', icon: '❓' },
        { title: 'Blog', desc: 'Latest updates, features, and research insights.', icon: '✍️' },
        { title: 'Community', desc: 'Join discussions with other researchers and scientists.', icon: '👥' }
    ];

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
                        <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Learning Resources
                    </div>
                    
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                        Resources
                    </h1>
                    
                    <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
                        Educational materials and documentation for researchers
                    </p>
                </motion.div>

                {/* Content Section */}
                <motion.section 
                    {...fadeUp}
                    transition={{ delay: 0.1 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                >
                    {resources.map((resource, i) => (
                        <motion.div 
                            key={i} 
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedResource(resource)}
                            className="bg-[#0F1629]/50 backdrop-blur border border-[#1E2A45] rounded-2xl p-6 sm:p-8 cursor-pointer hover:border-cyan-500/50 transition-all"
                        >
                            <div className="text-3xl sm:text-4xl mb-4">{resource.icon}</div>
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{resource.title}</h3>
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{resource.desc}</p>
                        </motion.div>
                    ))}
                </motion.section>

            </main>

            {/* Footer */}
            <footer className="border-t border-[#1E2A45] mt-12 sm:mt-16 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-slate-500 text-xs sm:text-sm">
                        © 2026 RO Ecosystem. All rights reserved.
                    </p>
                </div>
            </footer>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedResource && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#050810]/90 backdrop-blur-md"
                        onClick={() => setSelectedResource(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-[#0A0E1A] border border-[#1E2A45] shadow-2xl shadow-cyan-500/10 rounded-2xl w-full max-w-lg overflow-hidden relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setSelectedResource(null)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            
                            <div className="p-8 text-center border-b border-[#1E2A45] bg-[#0F1629]">
                                <div className="text-5xl sm:text-6xl mb-4 mx-auto animate-bounce">{selectedResource.icon}</div>
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{selectedResource.title}</h3>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                                    Under Development
                                </div>
                            </div>
                            
                            <div className="p-8">
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 mb-6">
                                    <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        We are actively developing the <strong>{selectedResource.title}</strong> section to bring you the best experience. 
                                    </p>
                                </div>
                                <p className="text-slate-400 text-sm text-center">
                                    Coming soon to RO Virtual Lab. Contact our team for further details or early access opportunities!
                                </p>
                                <div className="mt-8">
                                    <button 
                                        onClick={() => setSelectedResource(null)}
                                        className="w-full py-3 rounded-xl bg-[#1E2A45] hover:bg-[#2A3B5D] text-white text-sm font-semibold transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
