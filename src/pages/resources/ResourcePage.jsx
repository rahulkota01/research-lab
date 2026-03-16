import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LandingNav from '../../components/LandingNav';
import ResourcesSubNav from '../../components/ResourcesSubNav';

const resourceMetadata = {
    'all': { title: 'All Resources', desc: 'Browse our entire library of research tools, guides, and studies.', hasBg: true, bgUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop' },
    'case-studies': { title: 'Case Studies', desc: 'Real-world applications of RO Virtual Lab.', hasBg: true, bgUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2000&auto=format&fit=crop' },
    'docs': { title: 'Documentation', desc: 'Technical documentation for platform usage.', hasBg: false },
    'events': { title: 'Events', desc: 'Upcoming conferences, meetups and talks.', hasBg: true, bgUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop' },
    'training': { title: 'Training Videos', desc: 'Step-by-step video guides for the platform.', hasBg: true, bgUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop' },
    'publications': { title: 'Publications', desc: 'Research papers incorporating our tools.', hasBg: true, bgUrl: 'https://images.unsplash.com/photo-1456324504439-367cef3e3dd8?q=80&w=2000&auto=format&fit=crop' },
    'ref-sheets': { title: 'Reference Sheets', desc: 'Quick cheat sheets for computational methods.', hasBg: false },
    'tutorials': { title: 'Tutorials', desc: 'In-depth articles from our community.', hasBg: true, bgUrl: 'https://images.unsplash.com/photo-1503694978374-8a2fa686963a?q=80&w=2000&auto=format&fit=crop' },
    'webinars': { title: 'Webinars', desc: 'Interactive live sessions and recordings.', hasBg: true, bgUrl: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2000&auto=format&fit=crop' },
    'white-papers': { title: 'White Papers', desc: 'In-depth analysis of our underlying methodology.', hasBg: false },
};

export default function ResourcePage() {
    let { slug } = useParams();
    if (!slug) slug = 'all';
    
    const pageData = resourceMetadata[slug] || resourceMetadata['all'];
    
    return (
        <div className="min-h-screen bg-[#0A0E1A] text-white">
            <LandingNav />
            <ResourcesSubNav />
            <div className="pt-[124px]" />

            {/* ── HERO ─────────────────────────────────────── */}
            <section className={`relative h-[50vh] flex items-center overflow-hidden ${!pageData.hasBg ? 'bg-gradient-to-br from-[#0A0E1A] to-[#141B2D]' : ''}`}>
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E1A] via-[#0A0E1A]/80 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-transparent z-10" />
                    {pageData.hasBg && (
                        <img
                            src={pageData.bgUrl}
                            alt={pageData.title}
                            className="w-full h-full object-cover opacity-50"
                        />
                    )}
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pt-20 lg:pt-0">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
                    >
                        <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Resources</p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">{pageData.title}</h1>
                        <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed">
                            {pageData.desc}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── CONTENT — Light Section ──────────────────────────────── */}
            <section className="py-24" style={{ background: '#F3F6FF' }}>
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-2xl bg-white/50 backdrop-blur">
                        <div className="flex flex-col items-center">
                            <span className="text-4xl mb-4 text-slate-400">🚧</span>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Content in Development</h2>
                            <p className="text-slate-500 max-w-md">
                                The {pageData.title} section is currently being curated by our platform team. It will be launched in the next platform update.
                            </p>
                            <Link to="/" className="mt-8 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors">
                                Return Home
                            </Link>
                        </div>
                    </div>
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
