import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Beaker, ArrowRight } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Molecule3D from '../components/Molecule3D';

export default function SimulationResults() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex justify-between items-center pb-5 border-b border-slate-200">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-800 mb-1">Simulation Output</h1>
                    <p className="text-sm text-slate-500 font-mono">Analysis and visualization of computational results</p>
                </div>
            </motion.div>

            {/* Empty State */}
            <motion.div 
                variants={itemVariants}
                className="flex flex-col items-center justify-center py-16"
            >
                <GlassCard className="p-16 text-center max-w-2xl" glow>
                    {/* 3D Flask Animation */}
                    <div className="relative mb-8 flex justify-center">
                        <motion.div
                            animate={{ 
                                rotateY: [0, 360],
                                y: [0, -15, 0]
                            }}
                            transition={{ 
                                rotateY: { duration: 20, repeat: Infinity, ease: 'linear' },
                                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                            }}
                            className="w-40 h-40"
                        >
                            <Molecule3D type="benzene" />
                        </motion.div>
                        
                        {/* Orbiting particles */}
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-3 h-3 rounded-full bg-primary/60"
                                animate={{
                                    x: [0, 100, 0, -100, 0],
                                    y: [0, -50, 0, -50, 0],
                                }}
                                transition={{
                                    duration: 4 + i,
                                    repeat: Infinity,
                                    delay: i * 0.5,
                                    ease: 'easeInOut'
                                }}
                                style={{ 
                                    left: '50%', 
                                    top: '50%',
                                    marginLeft: '-6px',
                                    marginTop: '-6px'
                                }}
                            />
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold text-slate-700 mb-3">
                            Ready to simulate, <span className="text-primary">Testing</span>?
                        </h2>
                        <p className="text-slate-500 mb-8 max-w-md mx-auto">
                            Build your formulation on the Lab Bench and run a simulation to see detailed analysis, stability predictions, and compatibility scores here.
                        </p>

                        <motion.button
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transition-all"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Beaker className="w-5 h-5" />
                            Go to Lab Bench
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </motion.div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-secondary/50" />
                    <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-accent/50" />
                    <div className="absolute bottom-6 left-8 w-2 h-2 rounded-full bg-primary/50" />
                </GlassCard>

                {/* Feature preview cards */}
                <motion.div 
                    className="grid grid-cols-3 gap-4 mt-8 max-w-3xl w-full"
                    variants={containerVariants}
                >
                    {[
                        { icon: '📊', title: 'Data Visualization', desc: 'Interactive charts and graphs' },
                        { icon: '🧬', title: 'Stability Analysis', desc: 'Predict degradation pathways' },
                        { icon: '🔬', title: 'Compatibility Scoring', desc: 'AI-powered formulation insights' },
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="text-center p-4"
                        >
                            <div className="text-3xl mb-2">{feature.icon}</div>
                            <h3 className="font-semibold text-slate-700 text-sm mb-1">{feature.title}</h3>
                            <p className="text-xs text-slate-400">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
