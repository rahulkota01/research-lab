import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const RES_LINKS = [
    { path: '/resources', label: 'All Resources' },
    { path: '/resources/case-studies', label: 'Case Studies' },
    { path: '/resources/docs', label: 'Documentation' },
    { path: '/resources/events', label: 'Events' },
    { path: '/resources/training', label: 'Training Videos' },
    { path: '/resources/publications', label: 'Publications' },
    { path: '/resources/ref-sheets', label: 'Reference Sheets' },
    { path: '/resources/tutorials', label: 'Tutorials' },
    { path: '/resources/webinars', label: 'Webinars' },
    { path: '/resources/white-papers', label: 'White Papers' },
];

export default function ResourcesSubNav() {
    const { pathname } = useLocation();

    return (
        <div className="fixed top-20 left-0 right-0 z-40 bg-[#080C18]/95 backdrop-blur-xl border-b border-[#1E2A45]">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center h-11 gap-0 overflow-x-auto"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {RES_LINKS.map((l) => {
                    const isActive = pathname === l.path;
                    return (
                        <Link
                            key={l.path}
                            to={l.path}
                            className={`relative whitespace-nowrap px-3 sm:px-4 h-full flex items-center text-xs sm:text-sm font-medium transition-colors flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500 hover:text-white'}`}
                        >
                            {l.label}
                            {isActive && (
                                <motion.div
                                    layoutId="res-subnav-underline"
                                    className="absolute bottom-0 left-1 right-1 h-[2px] bg-cyan-400 rounded-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
