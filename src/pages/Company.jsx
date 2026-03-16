import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, Cpu, Microscope, Zap } from 'lucide-react';
import LandingNav from '../components/LandingNav';
import AboutSubNav from '../components/AboutSubNav';

const fade = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

const principles = [
    { num: '01', title: 'Scientific Excellence', desc: 'We are driven to be a world leader in transforming drug discovery and materials design by relentlessly pursuing scientific and technology breakthroughs.' },
    { num: '02', title: 'Stakeholder Commitment', desc: 'We are committed to achieving the best possible outcomes for our customers, partners, patients, and other stakeholders.' },
    { num: '03', title: 'People First', desc: 'We deeply value our dedicated team and invest in their growth, development, and well-being.' },
    { num: '04', title: 'Radical Collaboration', desc: 'We help and support each other, generously and with compassion — inside the lab and beyond.' },
    { num: '05', title: 'Inclusive Workplace', desc: 'We pursue a diverse, equitable, and inclusive workspace where teamwork, collaboration, and respectful debate are always welcome.' },
    { num: '06', title: 'Highest Ethics', desc: 'We strive to do the right thing, applying the highest ethical standards to our work and always considering our impact on individuals and communities.' },
];

const pillars = [
    { icon: Cpu, label: 'AI & Computation', color: 'cyan' },
    { icon: Microscope, label: 'Biology & Chemistry', color: 'purple' },
    { icon: Zap, label: 'Digital Infrastructure', color: 'amber' },
    { icon: Globe, label: 'Global Research Access', color: 'emerald' },
];

export default function Company() {
    return (
        <div className="min-h-screen bg-[#0A0E1A] text-white overflow-x-hidden">
            <LandingNav />
            <AboutSubNav />

            {/* ── HERO ─────────────────────────────────────── */}
            <section
                className="relative min-h-[55vh] sm:min-h-[60vh] flex items-center overflow-hidden"
                style={{ paddingTop: 'calc(80px + 44px)' }}
            >
                {/* Background grid pattern */}
                <div className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(30,42,69,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(30,42,69,0.25) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0E1A]/20 to-[#0A0E1A] z-0" />
                <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />

                <div className="max-w-7xl mx-auto px-6 relative z-10 py-16 sm:py-24 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">RO Ecosystem</p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1]">
                            Company <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Overview</span>
                        </h1>
                        <p className="text-slate-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
                            Building computational environments for the future of scientific discovery — at the intersection of biology, AI, and digital research infrastructure.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── PILLARS STRIP ──────────────────────────────── */}
            <section className="bg-[#080C18] py-8 border-y border-[#1E2A45]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {pillars.map(({ icon: Icon, label, color }, i) => (
                            <motion.div
                                key={i}
                                {...fade}
                                transition={{ ...fade.transition, delay: i * 0.08 }}
                                className="flex items-center gap-3 p-4 rounded-xl bg-[#0F1629] border border-[#1E2A45]"
                            >
                                <div className={`w-9 h-9 rounded-lg bg-${color}-500/10 flex items-center justify-center flex-shrink-0`}>
                                    <Icon className={`w-4 h-4 text-${color}-400`} />
                                </div>
                                <span className="text-slate-300 text-sm font-medium">{label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ABOUT THE COMPANY ──────────────────────────── */}
            <section className="py-20 sm:py-28 bg-[#0A0E1A]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">

                        {/* Left — sticky label */}
                        <motion.div {...fade} className="lg:sticky lg:top-36">
                            <p className="text-xs text-cyan-400 uppercase tracking-[0.2em] font-bold mb-3">About the Company</p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">Who we are</h2>
                            <div className="w-12 h-[3px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                        </motion.div>

                        {/* Right — body copy */}
                        <div className="space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed">
                            <motion.p {...fade}>
                                RO Ecosystem is an emerging technology and research initiative focused on developing computational platforms that support modern scientific exploration. The organization operates at the intersection of biology, artificial intelligence, and digital infrastructure, with the goal of creating systems that assist researchers in understanding complex scientific problems.
                            </motion.p>
                            <motion.p {...fade} transition={{ ...fade.transition, delay: 0.1 }}>
                                The company was established with the belief that the future of discovery will increasingly rely on intelligent computational environments that can organize knowledge, analyze data, and support scientific reasoning. Through its research initiatives and experimental platforms, RO Ecosystem aims to contribute to the development of next-generation research technologies.
                            </motion.p>
                            <motion.p {...fade} transition={{ ...fade.transition, delay: 0.2 }}>
                                RO Research Lab serves as one of the core environments within the ecosystem, focusing on experimental research concepts and computational approaches that can help accelerate scientific investigation. The lab provides a space for exploring ideas, developing research systems, and fostering collaboration between scientific and technological disciplines.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── VISION & PHILOSOPHY — Light Section ───────── */}
            <section className="py-20 sm:py-28" style={{ background: '#F3F6FF' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div {...fade} className="text-center mb-16">
                        <p className="text-cyan-600 text-xs uppercase tracking-[0.2em] font-bold mb-3">Our Foundation</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Vision & Philosophy</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Vision */}
                        <motion.div
                            {...fade}
                            className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-slate-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-50 rounded-bl-[80px] -z-0" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center mb-6">
                                    <Zap className="w-6 h-6 text-cyan-500" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Vision</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    To build advanced computational environments that support the future of scientific discovery by integrating biological knowledge, artificial intelligence, and digital research infrastructure.
                                </p>
                            </div>
                        </motion.div>

                        {/* Philosophy */}
                        <motion.div
                            {...fade}
                            transition={{ ...fade.transition, delay: 0.1 }}
                            className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-slate-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-50 rounded-bl-[80px] -z-0" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-6">
                                    <Globe className="w-6 h-6 text-purple-500" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Philosophy</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    RO Ecosystem believes that modern research increasingly requires interdisciplinary collaboration between science and technology. By combining computational reasoning with scientific insight, the organization aims to create tools and platforms that empower researchers to explore complex biological systems and generate new knowledge.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CORE PRINCIPLES ────────────────────────────── */}
            <section className="py-20 sm:py-28 bg-[#080C18]">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div {...fade} className="mb-16">
                        <p className="text-cyan-400 text-xs uppercase tracking-[0.2em] font-bold mb-3">Our Core Principles</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white">What guides us</h2>
                    </motion.div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {principles.map((p, i) => (
                            <motion.div
                                key={i}
                                {...fade}
                                transition={{ ...fade.transition, delay: i * 0.07 }}
                                className="bg-[#0F1629] border border-[#1E2A45] rounded-2xl p-7 relative group hover:border-cyan-500/40 transition-all"
                            >
                                <span className="text-5xl font-bold text-slate-800/50 select-none absolute top-4 right-5">{p.num}</span>
                                <h4 className="text-white font-bold text-lg mb-3 relative z-10 group-hover:text-cyan-400 transition-colors">{p.title}</h4>
                                <p className="text-slate-400 text-sm leading-relaxed relative z-10">{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── LEARN MORE CTA ──────────────────────────────── */}
            <section className="py-20 sm:py-28 bg-[#0A0E1A]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div {...fade}>
                        <p className="text-cyan-400 text-xs uppercase tracking-[0.2em] font-bold mb-4">Learn More</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Want to know more about RO Ecosystem?</h2>
                        <p className="text-slate-400 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
                            To learn more about the broader mission and initiatives of RO Ecosystem, visit the official company website.
                        </p>
                        <a
                            href="https://roecosystem.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all text-base"
                            style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)' }}
                        >
                            Visit Company Website — roecosystem.in
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 bg-[#050810] border-t border-[#1E2A45]">
                <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-slate-600 text-sm">© 2026 RO Ecosystem · India. All rights reserved.</p>
                    <p className="text-slate-600 text-sm">Powered by PubChem · Groq AI · Cloudflare</p>
                </div>
            </footer>
        </div>
    );
}
