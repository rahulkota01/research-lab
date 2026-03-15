import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Tag, FileText, Calendar, Edit3, BookOpen, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Molecule3D from '../components/Molecule3D';

const ENTRIES = [];

export default function ResearchNotebook() {
    const [activeId, setActiveId] = useState(null);
    const activeEntry = ENTRIES.find(e => e.id === activeId);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div 
            className="h-[calc(100vh-6rem)] flex gap-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Sidebar List */}
            <GlassCard className="w-80 flex flex-col overflow-hidden" hover={false}>
                <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-gradient-to-r from-slate-50 to-transparent">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-accent/10 rounded-lg">
                            <BookOpen className="w-4 h-4 text-accent" />
                        </div>
                        <h2 className="font-bold text-slate-700">Saved Entries</h2>
                    </div>
                    <motion.button 
                        className="p-2 bg-primary/10 rounded-lg transition-colors text-primary hover:bg-primary hover:text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Plus className="w-4 h-4" />
                    </motion.button>
                </div>

                <div className="flex-1 overflow-y-auto w-full p-3">
                    {ENTRIES.length === 0 ? (
                        <motion.div 
                            className="flex flex-col items-center justify-center h-48 text-slate-400 text-center px-4"
                            variants={itemVariants}
                        >
                            <Sparkles className="w-10 h-10 mb-3 text-slate-300" />
                            <p className="text-sm font-medium text-slate-500">No saved entries yet</p>
                            <p className="text-xs text-slate-400 mt-1">Create your first research note</p>
                        </motion.div>
                    ) : (
                        ENTRIES.map((entry, index) => (
                            <motion.div
                                key={entry.id}
                                variants={itemVariants}
                                custom={index}
                            >
                                <div
                                    onClick={() => setActiveId(entry.id)}
                                    className={`p-4 rounded-xl cursor-pointer transition-all mb-2 ${activeId === entry.id ? 'bg-primary/5 border-l-4 border-primary shadow-sm' : 'hover:bg-white/50'}`}
                                >
                                    <h3 className={`font-semibold text-sm mb-2 line-clamp-1 ${activeId === entry.id ? 'text-primary' : 'text-slate-700'}`}>{entry.title}</h3>
                                    <div className="flex items-center text-xs text-slate-400 mb-2">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {entry.date}
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {entry.tags.map(tag => (
                                            <span key={tag} className="text-[9px] uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded text-slate-500 border border-slate-200">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </GlassCard>

            {/* Main Content Area */}
            <GlassCard className="flex-1 flex flex-col p-6 overflow-y-auto" hover={false}>
                <AnimatePresence mode="wait">
                    {activeEntry ? (
                        <motion.div 
                            key="editor"
                            className="max-w-3xl space-y-6"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="border-b border-slate-200 pb-4 space-y-4">
                                <div className="flex justify-between items-start">
                                    <input
                                        type="text"
                                        defaultValue={activeEntry.title}
                                        className="bg-transparent text-2xl font-bold tracking-tight text-slate-800 focus:outline-none focus:border-b-2 focus:border-primary w-full pb-1 transition-colors"
                                    />
                                    <motion.button 
                                        className="text-slate-400 hover:text-primary transition-colors ml-4 p-2 bg-white rounded-lg border border-slate-200 relative group"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Edit3 className="w-4 h-4" />
                                        <span className="absolute top-full right-0 mt-2 whitespace-nowrap bg-slate-800 text-white text-xs rounded-lg px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium">Edit Tags</span>
                                    </motion.button>
                                </div>

                                <div className="flex items-center gap-3 text-sm flex-wrap">
                                    <div className="flex items-center text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span>{activeEntry.date}</span>
                                    </div>
                                    <div className="flex items-center text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 flex-1">
                                        <Tag className="w-4 h-4 mr-2" />
                                        <div className="flex gap-2 flex-wrap">
                                            {activeEntry.tags.map(tag => (
                                                <span key={tag} className="bg-white px-2 py-0.5 rounded text-xs text-slate-600 border border-slate-200 uppercase tracking-wider">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-primary font-bold mb-3 flex items-center gap-2">
                                        <div className="p-1 bg-primary/10 rounded">
                                            <FileText className="w-3 h-3" />
                                        </div>
                                        Protocol Notes
                                    </h4>
                                    <textarea
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 min-h-[150px] leading-relaxed resize-y transition-all"
                                        placeholder="Enter your protocol notes here..."
                                    />
                                </div>

                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-secondary font-bold mb-3 flex items-center gap-2">
                                        <div className="p-1 bg-secondary/10 rounded">
                                            <FileText className="w-3 h-3" />
                                        </div>
                                        Results Summary
                                    </h4>
                                    <textarea
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 font-mono focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 min-h-[120px] resize-y transition-all"
                                        placeholder="Enter your results summary here..."
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-200 flex justify-end">
                                <motion.button 
                                    className="bg-gradient-to-r from-primary to-primary-light text-white px-8 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider shadow-lg shadow-primary/25 hover:shadow-xl transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Save Entry
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="empty"
                            className="w-full h-full flex flex-col justify-center items-center text-slate-400"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <div className="relative mb-6">
                                <div className="w-32 h-32">
                                    <Molecule3D type="dna" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                    <BookOpen className="w-4 h-4 text-primary" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-600 mb-2">Your Research Space</h3>
                            <p className="text-slate-400 text-center max-w-sm">
                                Select an entry from the sidebar or create a new one to start documenting your research, <span className="text-primary font-medium">Testing</span>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </GlassCard>
        </motion.div>
    );
}
