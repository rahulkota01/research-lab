import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Mail, Rocket } from 'lucide-react';
import LandingNav from '../../components/LandingNav';
import AboutSubNav from '../../components/AboutSubNav';

const fade = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

export default function AboutUs() {
    const principles = [
        { color: 'border-cyan-500', icon: '🔬', title: 'Open Science', text: 'Research tools should be accessible to every scientist — not just those at elite institutions.' },
        { color: 'border-purple-500', icon: '⚛️', title: 'Scientific Accuracy', text: 'Every simulation is grounded in real thermodynamic data from verified scientific databases.' },
        { color: 'border-emerald-500', icon: '🤝', title: 'Community First', text: 'Built for researchers, by researchers. We value every piece of feedback from our growing community.' },
    ];

    const stats = [
        { value: '2026', label: 'Year Founded', icon: '📅' },
        { value: '4', label: 'Research Tools', icon: '🔬' },
        { value: '100M+', label: 'Compounds Available', icon: '🌐' },
    ];

    const techBadges = ['PubChem', 'Groq AI', 'Cloudflare', 'Three.js', 'React'];

    const coreList = [
        'Research tools should be accessible to every scientist worldwide — regardless of institution, location or funding.',
        'Scientific accuracy and reproducibility in every simulation, analysis and prediction we deliver.',
        'Community-driven development — we build features requested by the researchers who use our tools daily.',
        'Open collaboration with the global research community through shared experiments, datasets and publications.',
        'Ethical standards in all research applications — we prioritize safety data, proper citations and responsible use.',
        'Free access for students and early-stage researchers — because great science shouldn\'t have a paywall.',
    ];

    return (
        <div className="min-h-screen bg-[#0A0E1A] text-white">
            <LandingNav />
            <AboutSubNav />
            <div className="pt-[128px]" />

            {/* ── HERO with image ─────────────────────────────────────── */}
            <section className="relative h-[50vh] sm:h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E1A] via-[#0A0E1A]/75 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/60 via-transparent to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop"
                        alt="Research Lab"
                        className="w-full h-full object-cover opacity-70"
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <p className="text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-3 sm:mb-4">About RO Research Lab</p>
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight">We are RO Ecosystem</h1>
                        <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed">
                            A digital research environment designed to explore the intersection of biology, computation, and artificial intelligence.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── MISSION — Light Section ──────────────────────────────── */}
            <section className="py-12 sm:py-16 lg:py-24 bg-[#F3F6FF]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left — Mission text */}
                        <motion.div {...fade}>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 sm:leading-tight">Our Mission</h2>
                            <div className="space-y-3 sm:space-y-4 sm:text-slate-600 text-sm sm:text-base leading-relaxed sm:leading-[1.8]">
                                <p>
                                    RO Research Lab is a digital research environment designed to explore the intersection of biology, computation, and artificial intelligence. The platform aims to support modern scientific investigation by providing intelligent tools that help researchers analyze data, explore hypotheses, and accelerate discovery through computational reasoning.
                                </p>
                                <p>
                                    Inspired by the evolution of computational drug discovery platforms and modern scientific software, RO Research Lab focuses on building a virtual ecosystem where scientific thinking, experimentation, and analysis can happen in a structured digital space.
                                </p>
                                <p>
                                    RO Research Lab operates with a simple vision: to create a space where scientific research meets computational reasoning, enabling the next generation of discovery-driven technologies.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-6 sm:mt-8">
                                {techBadges.map((t, i) => (
                                    <span key={i} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-slate-200 rounded-lg text-slate-700 text-xs sm:text-sm font-medium shadow-sm">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right — Principle cards */}
                        <motion.div {...fade} transition={{ ...fade.transition, delay: 0.15 }} className="space-y-3 sm:space-y-5">
                            {principles.map((p, i) => (
                                <div key={i} className={`bg-white border-l-4 ${p.color} rounded-xl p-4 sm:p-6 sm:shadow-sm`}>
                                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                        <span className="text-xl sm:text-2xl">{p.icon}</span>
                                        <h3 className="text-slate-900 font-bold text-base sm:text-lg">{p.title}</h3>
                                    </div>
                                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{p.text}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── AT A GLANCE — Dark Section ──────────────────────────── */}
            <section className="bg-[#080C18] py-12 sm:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div {...fade} className="text-center mb-10 sm:mb-12 lg:mb-14">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">RO Ecosystem at a Glance</h2>
                        <p className="text-slate-400 text-sm sm:text-base">Key numbers that define our platform</p>
                    </motion.div>
                    <motion.div {...fade} transition={{ ...fade.transition, delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {stats.map((s, i) => (
                            <div key={i} className="bg-[#141B2D] border border-[#1E2A45] rounded-xl p-6 sm:p-8 lg:p-10 text-center">
                                <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block">{s.icon}</span>
                                <div className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2">{s.value}</div>
                                <div className="text-slate-500 text-xs sm:text-sm">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── CORE PRINCIPLES — Light Section ─────────────────────── */}
            <section className="py-12 sm:py-16 lg:py-24 bg-[#F3F6FF]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div {...fade} className="mb-8 sm:mb-10 lg:mb-12">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 sm:mb-3">Our Core Principles</h2>
                        <p className="text-slate-600 text-sm sm:text-base">The values that guide every decision at RO Ecosystem</p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left — Visual grid */}
                        <motion.div {...fade} className="grid grid-cols-2 gap-4">
                            {[
                                { icon: '⚛️', label: 'Molecular Analysis', bg: 'from-cyan-50 to-blue-50', border: 'border-cyan-200' },
                                { icon: '🧪', label: 'Virtual Lab', bg: 'from-purple-50 to-indigo-50', border: 'border-purple-200' },
                                { icon: '🔬', label: 'Drug Discovery', bg: 'from-emerald-50 to-teal-50', border: 'border-emerald-200' },
                                { icon: '🤖', label: 'AI Simulation', bg: 'from-amber-50 to-orange-50', border: 'border-amber-200' },
                            ].map((b, i) => (
                                <div
                                    key={i}
                                    className={`w-full h-[180px] rounded-xl bg-gradient-to-br ${b.bg} border ${b.border} flex flex-col items-center justify-center gap-3 shadow-sm`}
                                >
                                    <span className="text-4xl">{b.icon}</span>
                                    <span className="text-slate-600 text-sm font-medium">{b.label}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Right — Numbered list */}
                        <motion.div {...fade} transition={{ ...fade.transition, delay: 0.15 }}>
                            <ol className="space-y-5">
                                {coreList.map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-500 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                                            {i + 1}
                                        </span>
                                        <p className="text-slate-700 text-base leading-relaxed pt-1">{item}</p>
                                    </li>
                                ))}
                            </ol>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CONTACT — Dark Section ───────────────────────────────── */}
            <section id="contact" className="bg-[#0F1629] py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div {...fade} className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-3">Get In Touch</h2>
                        <p className="text-slate-400">Interested in collaborating, investing or joining our team?</p>
                    </motion.div>
                    <motion.div {...fade} transition={{ ...fade.transition, delay: 0.1 }} className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-[#141B2D] rounded-2xl border-2 border-cyan-500/30 p-8">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6">
                                <Mail className="w-6 h-6 text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">General & Research Inquiries</h3>
                            <p className="text-slate-400 text-sm mb-4">orchestration.ro@gmail.com</p>
                            <a href="mailto:orchestration.ro@gmail.com" className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl text-sm font-medium hover:bg-cyan-500/20 transition-colors">
                                Send Email <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>
                        <div className="bg-[#141B2D] rounded-2xl border-2 border-purple-500/30 p-8">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
                                <Rocket className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Investment & Partnership</h3>
                            <p className="text-slate-400 text-sm mb-4">rahulkota0101@gmail.com</p>
                            <a href="mailto:rahulkota0101@gmail.com" className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-500/10 text-purple-400 rounded-xl text-sm font-medium hover:bg-purple-500/20 transition-colors">
                                Send Email <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.div>
                    <motion.p {...fade} transition={{ ...fade.transition, delay: 0.2 }} className="text-center text-slate-500 text-sm">
                        We typically respond within 24–48 hours
                    </motion.p>
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
