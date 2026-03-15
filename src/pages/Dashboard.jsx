import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Plus, 
    Search, 
    BookOpen, 
    Activity, 
    Save, 
    TestTube, 
    FlaskConical, 
    Sparkles,
    Zap,
    Beaker,
    Microscope,
    ArrowUpRight,
    Clock,
    ChevronRight,
    Thermometer,
    Droplets,
    Flame
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Molecule3DViewer from '../components/Molecule3DViewer';

// Animated background grid - Dark theme
function GridBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0" style={{
                backgroundImage: `
                    linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
            }} />
            <motion.div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 50%)',
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
        </div>
    );
}

// Stat Card Component
function StatCard({ label, value, icon: Icon, color, delay }) {
    const colorClasses = {
        cyan: 'from-cyan-500/20 to-blue-500/20 text-cyan-400',
        emerald: 'from-emerald-500/20 to-teal-500/20 text-emerald-400',
        purple: 'from-purple-500/20 to-violet-500/20 text-purple-400',
        amber: 'from-amber-500/20 to-orange-500/20 text-amber-400',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            whileHover={{ y: -4, borderColor: 'rgba(0, 212, 255, 0.3)' }}
            className="glass-card p-6 rounded-2xl border border-[#1E2A45] transition-all duration-300"
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className="w-2 h-2 rounded-full bg-cyan-500/50" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-slate-400 text-sm">{label}</div>
        </motion.div>
    );
}

// Quick Action Card
function QuickActionCard({ icon: Icon, label, desc, onClick, delay }) {
    return (
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            onClick={onClick}
            whileHover={{ y: -4, borderColor: 'rgba(0, 212, 255, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            className="group relative glass-card p-6 rounded-2xl border border-[#1E2A45] text-left overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
        >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                {label}
                <ArrowUpRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-slate-400">{desc}</p>
            
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
    );
}

// Featured Compound Card
function FeaturedCompound({ name, formula, cid, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay }}
            whileHover={{ y: -4, borderColor: 'rgba(0, 212, 255, 0.3)' }}
            className="glass-card p-4 rounded-xl border border-[#1E2A45] min-w-[180px] cursor-pointer transition-all duration-300"
        >
            <div className="w-full h-24 mb-3 rounded-lg bg-[#0A0E1A] overflow-hidden">
                <Molecule3DViewer cid={cid} size="small" showControls={false} />
            </div>
            <h4 className="font-semibold text-white text-sm truncate">{name}</h4>
            <p className="text-xs text-slate-500 font-mono">{formula}</p>
        </motion.div>
    );
}

export default function Dashboard() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('Researcher');

    useEffect(() => {
        const profile = localStorage.getItem('roLab_profile');
        if (profile) {
            const parsed = JSON.parse(profile);
            setUserName(parsed.name || 'Researcher');
        }
    }, []);

    const stats = [
        { label: 'Total Experiments', value: '0', icon: TestTube, color: 'cyan' },
        { label: 'Simulations Run', value: '0', icon: Activity, color: 'emerald' },
        { label: 'Saved Formulations', value: '0', icon: Save, color: 'purple' },
        { label: 'Notebook Entries', value: '0', icon: BookOpen, color: 'amber' },
    ];

    const quickActions = [
        { 
            icon: Plus, 
            label: 'New Experiment', 
            desc: 'Start a fresh simulation',
            onClick: () => navigate('/app/bench')
        },
        { 
            icon: Search, 
            label: 'Browse Library', 
            desc: 'Find ingredients & compounds',
            onClick: () => navigate('/app/library')
        },
        { 
            icon: BookOpen, 
            label: 'Open Notebook', 
            desc: 'View your research notes',
            onClick: () => navigate('/app/notebook')
        },
    ];

    const featuredCompounds = [
        { name: 'Aspirin', formula: 'C9H8O4', cid: 2244 },
        { name: 'Caffeine', formula: 'C8H10N4O2', cid: 2519 },
        { name: 'Paracetamol', formula: 'C8H9NO2', cid: 1983 },
        { name: 'Ibuprofen', formula: 'C13H18O2', cid: 3672 },
        { name: 'Glucose', formula: 'C6H12O6', cid: 5793 },
        { name: 'Penicillin', formula: 'C16H18N2O4S', cid: 5904 },
    ];

    return (
        <div className="relative min-h-screen bg-[#0A0E1A]">
            <GridBackground />
            
            {/* Glowing orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <motion.div 
                className="relative z-10 space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                {/* Welcome Banner */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F1629] via-[#141B2D] to-[#0F1629] border border-[#1E2A45] p-8 md:p-10"
                    >
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute inset-0" style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,212,255,0.1) 1px, transparent 0)',
                                backgroundSize: '32px 32px',
                            }} />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium mb-4"
                                >
                                    <Zap className="w-3 h-3" />
                                    Advanced Research Platform
                                </motion.div>
                                
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{userName}</span>
                                </h1>
                                <p className="text-slate-400 text-lg max-w-xl">
                                    Your virtual laboratory for computational drug discovery and formulation research.
                                </p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="hidden md:block"
                            >
                                <div className="w-32 h-32 relative">
                                    <Molecule3DViewer cid={2244} size="medium" autoRotate={true} showControls={false} />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* Stats Row */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <StatCard
                            key={stat.label}
                            {...stat}
                            delay={0.5 + i * 0.1}
                        />
                    ))}
                </section>

                {/* Quick Actions */}
                <section>
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-cyan-400" />
                        Quick Actions
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {quickActions.map((action, i) => (
                            <QuickActionCard
                                key={action.label}
                                {...action}
                                delay={0.6 + i * 0.1}
                            />
                        ))}
                    </div>
                </section>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2 glass-card rounded-2xl border border-[#1E2A45] p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <Clock className="w-5 h-5 text-slate-400" />
                                Recent Activity
                            </h2>
                            <button className="text-sm text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors">
                                View All <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Empty State */}
                        <div className="text-center py-16">
                            <motion.div
                                className="relative inline-block mb-6"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center border border-cyan-500/20">
                                    <FlaskConical className="w-12 h-12 text-cyan-400/50" />
                                </div>
                                <motion.div
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full"
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </motion.div>
                            <h3 className="text-xl font-semibold text-white mb-2">No activity yet</h3>
                            <p className="text-slate-400 max-w-sm mx-auto">
                                Start your first experiment to see your research activity timeline here.
                            </p>
                            <motion.button
                                onClick={() => navigate('/app/bench')}
                                className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Start Experiment
                            </motion.button>
                        </div>
                    </div>

                    {/* Lab Status Panel */}
                    <div className="space-y-4">
                        <div className="glass-card rounded-2xl border border-[#1E2A45] p-6">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                <Beaker className="w-5 h-5 text-emerald-400" />
                                Lab Bench Status
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-[#0A0E1A] rounded-xl border border-[#1E2A45]">
                                    <span className="text-sm text-slate-400 flex items-center gap-2">
                                        <Droplets className="w-4 h-4" /> Vessel State
                                    </span>
                                    <span className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-xs font-medium">Empty</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-[#0A0E1A] rounded-xl border border-[#1E2A45]">
                                    <span className="text-sm text-slate-400 flex items-center gap-2">
                                        <FlaskConical className="w-4 h-4" /> Ingredients
                                    </span>
                                    <span className="text-sm font-bold text-white">0</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-[#0A0E1A] rounded-xl border border-[#1E2A45]">
                                    <span className="text-sm text-slate-400 flex items-center gap-2">
                                        <Thermometer className="w-4 h-4" /> Temperature
                                    </span>
                                    <span className="text-sm font-mono text-cyan-400">25°C</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-[#0A0E1A] rounded-xl border border-[#1E2A45]">
                                    <span className="text-sm text-slate-400 flex items-center gap-2">
                                        <Flame className="w-4 h-4" /> Heat Source
                                    </span>
                                    <span className="text-sm text-slate-500">Off</span>
                                </div>
                            </div>
                            <motion.button
                                onClick={() => navigate('/app/bench')}
                                className="w-full mt-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Open Lab Bench
                            </motion.button>
                        </div>

                        <div className="glass-card rounded-2xl border border-[#1E2A45] p-6">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                <Microscope className="w-5 h-5 text-purple-400" />
                                Research Tools
                            </h3>
                            <div className="space-y-2">
                                {[
                                    { icon: Search, label: 'Molecular Viewer', path: '/app/library' },
                                    { icon: Activity, label: 'Simulation History', path: '/app/results' },
                                    { icon: BookOpen, label: 'Documentation', path: '/app/notebook' },
                                ].map((tool) => (
                                    <motion.button
                                        key={tool.label}
                                        onClick={() => navigate(tool.path)}
                                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#141B2D] transition-colors text-left group"
                                        whileHover={{ x: 4 }}
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-[#0A0E1A] border border-[#1E2A45] flex items-center justify-center group-hover:border-cyan-500/30 transition-all">
                                            <tool.icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400" />
                                        </div>
                                        <span className="font-medium text-slate-300 group-hover:text-white">{tool.label}</span>
                                        <ChevronRight className="w-4 h-4 text-slate-600 ml-auto group-hover:text-cyan-400 transition-colors" />
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Compounds */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-cyan-400" />
                            Featured Compounds
                        </h2>
                        <button 
                            onClick={() => navigate('/app/library')}
                            className="text-sm text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors"
                        >
                            Browse All <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                        {featuredCompounds.map((compound, i) => (
                            <FeaturedCompound
                                key={compound.name}
                                {...compound}
                                delay={0.8 + i * 0.1}
                            />
                        ))}
                    </div>
                </section>

                {/* Getting Started Tip */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="glass-card rounded-2xl p-6 border border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-transparent"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0 border border-cyan-500/20">
                            <Sparkles className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-1">Getting Started</h3>
                            <p className="text-slate-400 text-sm">
                                New to virtual research? Start by exploring the Ingredient Library to discover available compounds, 
                                then configure your first experiment on the Lab Bench.
                            </p>
                        </div>
                    </div>
                </motion.section>
            </motion.div>
        </div>
    );
}
