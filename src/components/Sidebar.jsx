import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Home, FlaskConical, Beaker, LineChart, BookOpen, User, ArrowLeft } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { icon: Home, label: 'Dashboard', path: '/app/dashboard' },
    { icon: FlaskConical, label: 'Ingredient Library', path: '/app/library' },
    { icon: Beaker, label: 'Lab Bench', path: '/app/bench' },
    { icon: LineChart, label: 'Simulation Results', path: '/app/results' },
    { icon: BookOpen, label: 'Notebook', path: '/app/notebook' },
    { icon: User, label: 'Profile', path: '/app/settings' },
];

export default function Sidebar() {
    const location = useLocation();

    return (
        <div className="w-72 fixed top-0 left-0 h-full flex flex-col items-start p-6 z-50">
            {/* Dark Glassmorphism background */}
            <div className="absolute inset-0 bg-[#080C18] backdrop-blur-xl border-r border-[#1E2A45]" />
            
            <div className="relative mb-6 w-full">
                {/* Back to Home Link */}
                <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-4 group">
                    <motion.div
                        whileHover={{ x: -4 }}
                        className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider"
                    >
                        <ArrowLeft className="w-3 h-3" />
                        Back to Home
                    </motion.div>
                </Link>
                
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3"
                >
                    {/* Logo Icon with Cyan Glow */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        <Beaker className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-tight">
                            RO Virtual Lab
                        </h1>
                        <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Research Platform</p>
                    </div>
                </motion.div>
            </div>

            <nav className="relative flex-1 w-full space-y-1">
                {navItems.map((item, index) => (
                    <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                cn(
                                    'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden group',
                                    isActive
                                        ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400'
                                        : 'text-slate-400 hover:text-white hover:bg-[#141B2D]'
                                )
                            }
                        >
                            {/* Active indicator glow */}
                            {location.pathname === item.path && (
                                <motion.div
                                    layoutId="activeGlow"
                                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent rounded-xl"
                                    initial={false}
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                            )}
                            
                            <div className={cn(
                                'relative z-10 p-2 rounded-lg transition-all duration-300',
                                location.pathname === item.path 
                                    ? 'bg-cyan-500/20 text-cyan-400' 
                                    : 'group-hover:bg-[#1E2A45]'
                            )}>
                                <item.icon className={cn(
                                    'w-5 h-5 transition-transform duration-300',
                                    location.pathname === item.path && 'text-cyan-400'
                                )} />
                            </div>
                            <span className="relative z-10 font-semibold text-sm">{item.label}</span>
                        </NavLink>
                    </motion.div>
                ))}
            </nav>

            <motion.div 
                className="relative mt-auto w-full pt-6 border-t border-[#1E2A45]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center space-x-2 text-xs text-slate-400">
                        <motion.div 
                            className="w-2 h-2 rounded-full bg-emerald-500"
                            animate={{ 
                                boxShadow: ['0 0 0 0 rgba(0,245,160,0.4)', '0 0 0 8px rgba(0,245,160,0)'],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="font-medium">System Online</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">v3.0.0</span>
                </div>
            </motion.div>
        </div>
    );
}
