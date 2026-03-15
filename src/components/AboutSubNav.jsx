import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const NAV_LINKS = [
    { path: '/about', label: 'About Us' },
    { path: '/about/team', label: 'Team' },
    { path: '/about/careers', label: 'Careers' },
    { path: '/about/investors', label: 'Investors' },
    { path: '/about/press', label: 'Press Releases' },
];

export default function AboutSubNav() {
    const { pathname } = useLocation();

    return (
        <div className="fixed top-20 left-0 right-0 z-40 bg-[#080C18]/95 backdrop-blur-xl border-b border-[#1E2A45]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center h-12 gap-0 overflow-x-auto hide-scrollbar">
                {NAV_LINKS.map((l) => {
                    const isActive = pathname === l.path;
                    return (
                        <Link
                            key={l.path}
                            to={l.path}
                            className={`relative whitespace-nowrap px-4 h-full flex items-center text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-slate-500 hover:text-white'}`}
                        >
                            {l.label}
                            {isActive && (
                                <motion.div
                                    layoutId="about-subnav-underline"
                                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-cyan-400 rounded-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
