import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LandingNav from '../../components/LandingNav';
import AboutSubNav from '../../components/AboutSubNav';

const fade = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

export default function Investors() {
    const [form, setForm] = useState({ name: '', email: '', org: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent('Investment Inquiry - RO Ecosystem');
        const body = encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\nOrganization: ${form.org}\n\n${form.message}`
        );
        window.location.href = `mailto:rahulkota0101@gmail.com?subject=${subject}&body=${body}`;
    };

    const inputBase =
        'w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-sm';

    const miniStats = [
        { val: '$3B+', label: 'Market Size', icon: '📈' },
        { val: '100M+', label: 'Available Compounds', icon: '🔬' },
        { val: '2026', label: 'Founded', icon: '📅' },
    ];

    return (
        <div className="min-h-screen bg-[#0A0E1A] text-white">
            <LandingNav />
            <AboutSubNav />
            <div className="pt-[128px]" />

            {/* ── HERO with image ─────────────────────────────────────── */}
            <section className="relative h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E1A] via-[#0A0E1A]/70 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/50 via-transparent to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop"
                        alt="Investment and growth"
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Investment</p>
                        <h1 className="text-7xl font-bold text-white mb-6 tracking-tight">Investors & Partners</h1>
                        <p className="text-xl text-slate-300 leading-relaxed">
                            Join us in building the future of accessible computational research. We are seeking strategic partners and investors.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── STATS — Dark Section ─────────────────────────────────── */}
            <section className="bg-[#080C18] py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {miniStats.map((s, i) => (
                            <motion.div
                                key={i}
                                {...fade}
                                transition={{ ...fade.transition, delay: i * 0.1 }}
                                className="bg-[#141B2D] border border-[#1E2A45] rounded-xl p-6 text-center"
                            >
                                <span className="text-3xl mb-3 block">{s.icon}</span>
                                <div className="text-2xl font-bold text-cyan-400 mb-1">{s.val}</div>
                                <div className="text-slate-500 text-xs">{s.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── THE OPPORTUNITY — Light Section ─────────────────────── */}
            <section className="py-24" style={{ background: '#F3F6FF' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* LEFT — Opportunity text */}
                        <motion.div {...fade}>
                            <h2 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">The Opportunity</h2>
                            <div className="space-y-5 text-slate-600 text-base leading-relaxed">
                                <p>
                                    The global computational chemistry software market is valued at over <strong className="text-slate-800">$3B</strong> and growing rapidly. Current solutions like Schrödinger, Gaussian and BIOVIA cost $50,000 to $500,000 per year — putting them out of reach for the vast majority of researchers worldwide, particularly in emerging markets like India.
                                </p>
                                <p>
                                    RO Ecosystem is building an accessible, AI-powered alternative that serves the millions of researchers, students and pharmaceutical professionals who cannot afford enterprise solutions. Our platform combines real PubChem data, Groq-powered AI simulation and interactive 3D molecular visualization — all free in the browser.
                                </p>
                                <p>
                                    We combine real scientific databases (100M+ compounds from PubChem, NIST thermodynamic data), state-of-the-art AI models (Groq llama-3.3-70b) and intuitive design to deliver research-grade tools at a fraction of the cost.
                                </p>
                            </div>

                            <div className="mt-10 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-4">Why Now</p>
                                <ul className="space-y-3">
                                    {[
                                        'AI capabilities have reached research-grade accuracy',
                                        'India\'s pharma sector is the world\'s 3rd largest by volume',
                                        'Millions of researchers lack access to enterprise tools',
                                        'Open-access scientific databases have matured significantly',
                                    ].map((point, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                                            <span className="w-5 h-5 rounded-full bg-cyan-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">{i + 1}</span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* RIGHT — Contact Form */}
                        <motion.div {...fade} transition={{ ...fade.transition, delay: 0.2 }}>
                            <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-md">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Get In Touch</h3>
                                <p className="text-slate-500 text-sm mb-8">Interested in investing in or partnering with RO Ecosystem?</p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input type="text" placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputBase} />
                                    <input type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputBase} />
                                    <input type="text" placeholder="Organization" value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} className={inputBase} />
                                    <textarea placeholder="Tell us about your interest..." rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputBase} resize-none`} />
                                    <button type="submit" className="w-full py-4 rounded-xl font-bold text-white text-base" style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)' }}>
                                        Send Message →
                                    </button>
                                </form>

                                <p className="text-slate-400 text-sm mt-5 text-center">
                                    Or contact directly:{' '}
                                    <a href="mailto:rahulkota0101@gmail.com" className="text-cyan-600 hover:underline">rahulkota0101@gmail.com</a>
                                </p>
                            </div>
                        </motion.div>
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
