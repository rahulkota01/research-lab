import React from 'react';
import { motion } from 'framer-motion';
import LandingNav from '../../components/LandingNav';
import AboutSubNav from '../../components/AboutSubNav';

const fade = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

export default function Press() {
    const releases = [
        {
            date: 'March 2026',
            badge: 'LAUNCH',
            badgeColor: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            emoji: '🚀',
            title: 'RO Virtual Lab v3.0 Launches with 3D Molecular Visualization',
            body: 'RO Ecosystem announces the launch of RO Virtual Lab v3.0 featuring interactive 3D molecular structures powered by Three.js and PubChem conformer data, AI-powered simulation via Groq llama-3.3-70b, support for 15+ laboratory glassware types, and real-time experiment animations. The platform is free and runs entirely in the browser.',
        },
        {
            date: 'February 2026',
            badge: 'PRODUCT',
            badgeColor: 'bg-blue-100 text-blue-700 border border-blue-200',
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
            emoji: '🧬',
            title: 'MedNeXuS AI Now Available for Indian Medical Researchers',
            body: "RO Ecosystem's medical research intelligence platform MedNeXuS AI is now live at mednexusai.roecosystem.in. Built on Cloudflare Workers, MedNeXuS AI provides AI-powered literature search, clinical study analysis and drug interaction insights specifically designed for Indian medical researchers and healthcare professionals.",
        },
        {
            date: 'January 2026',
            badge: 'MILESTONE',
            badgeColor: 'bg-purple-100 text-purple-700 border border-purple-200',
            iconBg: 'bg-purple-50',
            iconColor: 'text-purple-600',
            emoji: '🏆',
            title: 'RO Ecosystem Reaches First Development Milestone',
            body: 'RO Ecosystem completes initial development of its unified computational research framework, establishing the foundation for four interconnected research tools: RO Virtual Lab (live), MedNeXuS AI (live), RO-Link (collaborative workspaces, in development), and RO Nexus (offline AI research assistant, early stage).',
        },
    ];

    return (
        <div className="min-h-screen bg-[#0A0E1A] text-white">
            <LandingNav />
            <AboutSubNav />
            <div className="pt-[124px]" />

            {/* ── HERO with image ─────────────────────────────────────── */}
            <section className="relative h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E1A] via-[#0A0E1A]/70 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/50 via-transparent to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
                        alt="Press and media"
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pt-20 lg:pt-0">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
                    >
                        <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Newsroom</p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">Press Releases</h1>
                        <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed">
                            Latest news and announcements from RO Ecosystem.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── PRESS CARDS — Light Section ─────────────────────────── */}
            <section className="py-24" style={{ background: '#F3F6FF' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div {...fade} className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Latest Announcements</h2>
                        <p className="text-slate-500">Official press releases from the RO Ecosystem team</p>
                    </motion.div>

                    <div className="space-y-6">
                        {releases.map((r, i) => (
                            <motion.div
                                key={i}
                                {...fade}
                                transition={{ ...fade.transition, delay: i * 0.1 }}
                                className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-cyan-300 transition-all flex flex-col md:flex-row gap-6"
                            >
                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-2xl ${r.iconBg} flex items-center justify-center flex-shrink-0 text-3xl`}>
                                    {r.emoji}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-slate-500 text-sm font-medium">{r.date}</span>
                                        <span className={`px-3 py-0.5 rounded-full text-xs font-bold tracking-wider ${r.badgeColor}`}>{r.badge}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">{r.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{r.body}</p>
                                    <button className="mt-4 text-cyan-600 text-sm font-semibold hover:text-cyan-500 transition-colors flex items-center gap-1">
                                        Read Full Release →
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Media Contact */}
                    <motion.div {...fade} transition={{ ...fade.transition, delay: 0.4 }} className="mt-16 bg-white border border-slate-200 rounded-2xl p-10 shadow-sm text-center">
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">Media Contact</h3>
                        <p className="text-slate-500 mb-6">For press inquiries, interviews or media assets, reach out to our team directly.</p>
                        <a
                            href="mailto:orchestration.ro@gmail.com"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base"
                            style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)' }}
                        >
                            📧 orchestration.ro@gmail.com
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 bg-[#050810] border-t border-[#1E2A45]">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3">
                    <p className="text-slate-600 text-sm">© 2026 RO Ecosystem · India. All rights reserved.</p>
                    <p className="text-slate-600 text-sm">Powered by PubChem · Groq AI · Cloudflare</p>
                </div>
            </footer>
        </div>
    );
}
