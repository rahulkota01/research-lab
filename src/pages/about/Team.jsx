import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingNav from '../../components/LandingNav';
import AboutSubNav from '../../components/AboutSubNav';

const fade = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: 0.3 },
};

function MemberCard({ photo, fallback, name, title, company, gradient = 'from-cyan-500 to-blue-600' }) {
    const [err, setErr] = useState(false);
    return (
        <div className="group text-left" style={{ width: '200px' }}>
            <div className="w-[200px] h-[266px] rounded-xl overflow-hidden mb-4 shadow-md">
                {!err ? (
                    <img
                        src={photo}
                        alt={name}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                        onError={() => setErr(true)}
                    />
                ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                        <span className="text-4xl font-bold text-white/90">{fallback}</span>
                    </div>
                )}
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">{name}</h3>
            <p className="text-slate-600 text-sm mt-1 leading-snug">{title}</p>
            <p className="text-cyan-600 text-xs mt-1 font-medium">{company}</p>
        </div>
    );
}

export default function Team() {
    const [activeTab, setActiveTab] = useState('leadership');

    const tabs = [
        { id: 'leadership', label: 'Leadership Team' },
        { id: 'board', label: 'Board of Directors' },
        { id: 'advisors', label: 'Scientific Advisors' },
    ];

    return (
        <div className="min-h-screen bg-[#0A0E1A] text-white">
            <LandingNav />
            <AboutSubNav />
            <div className="pt-[124px]" />

            {/* ── HERO without image ─────────────────────────────────────── */}
            <section className="relative h-[60vh] flex items-center overflow-hidden bg-gradient-to-r from-[#0A0E1A] to-[#141B2D]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-transparent z-10" />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pt-20 lg:pt-0">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
                    >
                        <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Our People</p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">Meet our people</h1>
                        <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed">
                            The teams and visionaries building the future of accessible computational research.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── TABS — sticky under content ─────────────────────────── */}
            <section
                className="border-b border-slate-200 sticky z-30 backdrop-blur-md"
                style={{ top: '124px', background: 'rgba(243,246,255,0.97)' }}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 overflow-x-auto hide-scrollbar">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 text-sm font-semibold transition-colors relative whitespace-nowrap ${activeTab === tab.id ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div layoutId="team-tab-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-500" />
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* ── CONTENT — Light Section ──────────────────────────────── */}
            <section className="py-20 min-h-[500px]" style={{ background: '#F3F6FF' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatePresence mode="wait">
                        {activeTab === 'leadership' && (
                            <motion.div key="leadership" {...fade} className="flex flex-wrap gap-8">
                                <MemberCard
                                    photo="/rahul.jpg"
                                    fallback="RK"
                                    name="Rahul Kota"
                                    title="Founder, CEO & Director"
                                    company="RO Ecosystem"
                                    gradient="from-cyan-500 to-purple-600"
                                />
                            </motion.div>
                        )}

                        {activeTab === 'board' && (
                            <motion.div key="board" {...fade} className="flex flex-wrap gap-8">
                                <MemberCard photo="/rahul.jpg" fallback="RK" name="Rahul Kota" title="Founder & Director" company="RO Ecosystem" gradient="from-cyan-500 to-blue-600" />
                                <MemberCard photo="/rihan.jpg" fallback="RK" name="Rihan Kota" title="Director" company="RO Ecosystem" gradient="from-purple-500 to-indigo-700" />
                            </motion.div>
                        )}

                        {activeTab === 'advisors' && (
                            <motion.div key="advisors" {...fade}>
                                <div className="max-w-[600px]">
                                    <div className="text-5xl mb-6">🔬</div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Seeking Scientific Advisors</h3>
                                    <p className="text-slate-600 text-base leading-relaxed mb-10">
                                        We are actively seeking Scientific Advisors in Computational Biology, Pharmaceutical Sciences and Drug Discovery to help guide our research and product direction.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="bg-white border-l-[3px] border-cyan-500 rounded-xl p-6 shadow-sm">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-lg">📧</span>
                                                <h4 className="text-slate-900 font-bold">Research Inquiries</h4>
                                            </div>
                                            <p className="text-slate-500 text-sm mb-4">orchestration.ro@gmail.com</p>
                                            <button onClick={() => window.open('mailto:orchestration.ro@gmail.com')} className="w-full py-3 rounded-lg text-sm font-bold text-white bg-cyan-500 hover:bg-cyan-400 transition-colors">
                                                Send Email →
                                            </button>
                                        </div>
                                        <div className="bg-white border-l-[3px] border-purple-500 rounded-xl p-6 shadow-sm">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-lg">💼</span>
                                                <h4 className="text-slate-900 font-bold">Collaboration & Advisory</h4>
                                            </div>
                                            <p className="text-slate-500 text-sm mb-4">rahulkota0101@gmail.com</p>
                                            <button onClick={() => window.open('mailto:rahulkota0101@gmail.com')} className="w-full py-3 rounded-lg text-sm font-bold text-white bg-purple-500 hover:bg-purple-400 transition-colors">
                                                Send Email →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
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
