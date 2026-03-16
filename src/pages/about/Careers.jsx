import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Briefcase, Users, Laptop, Database, PenTool, FlaskConical, Cpu } from 'lucide-react';
import LandingNav from '../../components/LandingNav';
import AboutSubNav from '../../components/AboutSubNav';

const fade = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

const JobCard = ({ icon: Icon, title, description, tasks, color }) => (
    <motion.div
        {...fade}
        className="bg-[#141B2D] border border-[#1E2A45] rounded-2xl p-8 hover:border-cyan-500/50 transition-all group"
    >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-${color}-500/10`}>
            <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{title}</h3>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">{description}</p>

        <div className="space-y-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">What you'll work on</p>
            <ul className="space-y-2">
                {tasks.map((task, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                        <div className={`w-1 h-1 rounded-full bg-${color}-400`} />
                        {task}
                    </li>
                ))}
            </ul>
        </div>

        <button className="mt-8 flex items-center gap-2 text-cyan-400 text-sm font-medium hover:gap-3 transition-all">
            Apply Now <ChevronRight className="w-4 h-4" />
        </button>
    </motion.div>
);

export default function Careers() {
    const jobs = [
        {
            icon: FlaskConical,
            title: "🧬 Research Intern – Computational Biology",
            description: "For students interested in biology, bioinformatics, or drug discovery.",
            color: "cyan",
            tasks: [
                "Literature research",
                "Protein / molecular data analysis",
                "Bioinformatics tools development",
                "Supporting research projects in the lab"
            ]
        },
        {
            icon: Cpu,
            title: "🤖 AI / Machine Learning Intern",
            description: "For people interested in AI applied to healthcare or biology.",
            color: "purple",
            tasks: [
                "Training small ML models",
                "Data preparation for biological datasets",
                "AI-assisted research tools development",
                "Supporting RO Nexus development"
            ]
        },
        {
            icon: Laptop,
            title: "💻 Software Developer (Research Tools)",
            description: "People who like building scientific software platforms.",
            color: "blue",
            tasks: [
                "Web tools for researchers",
                "Data visualization dashboards",
                "Lab platform features",
                "Integrating scientific APIs"
            ]
        },
        {
            icon: Database,
            title: "📊 Bioinformatics / Data Science Intern",
            description: "For students working with biological datasets.",
            color: "emerald",
            tasks: [
                "Sequence analysis",
                "Dataset processing",
                "Research data pipelines",
                "Analytics for biological research"
            ]
        },
        {
            icon: Users,
            title: "🔬 Research Associate (Volunteer / Collaboration)",
            description: "For researchers who want to collaborate or explore ideas.",
            color: "amber",
            tasks: [
                "Contributing to research proposals",
                "Tool testing & validation",
                "Co-developing new research features",
                "Community engagement"
            ]
        },
        {
            icon: PenTool,
            title: "✍️ Scientific Writer / Research Analyst",
            description: "People who enjoy reading papers and summarizing research.",
            color: "rose",
            tasks: [
                "Literature reviews",
                "Research documentation",
                "Writing technical articles",
                "Presentation materials"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#0A0E1A] text-white">
            <LandingNav />
            <AboutSubNav />
            <div className="pt-[124px]" />

            {/* Hero */}
            <section className="relative h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E1A] via-[#0A0E1A]/60 to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2080&auto=format&fit=crop"
                        alt="Team working"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pt-20 lg:pt-0">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">Join our team</h1>
                        <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mb-10">
                            RO Research Lab's diverse global team is united by a common mission: to improve human health and quality of life by transforming the way therapeutics and materials are discovered. We've created the leading computational platform for molecular discovery, but we're not stopping there. Join us for what's next.
                        </p>
                        <button
                            onClick={() => document.getElementById('open-positions').scrollIntoView({ behavior: 'smooth' })}
                            className="px-6 sm:px-8 py-3 sm:py-4 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-bold text-white flex items-center gap-3 transition-all mx-auto lg:mx-0"
                        >
                            VIEW OPEN POSITIONS <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Open Positions */}
            <section id="open-positions" className="py-32 bg-[#080C18]">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div {...fade} className="mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Open Positions</h2>
                        <p className="text-slate-400">Join our mission to democratize computational research tools.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {jobs.map((job, i) => (
                            <JobCard key={i} {...job} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Culture Section */}
            <section className="py-32 bg-[#0A0E1A]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div {...fade}>
                            <h2 className="text-4xl font-bold text-white mb-6 uppercase tracking-wider">Innovation through collaboration</h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                At RO Research Lab, we believe that the best ideas come from diverse perspectives and open collaboration. We're building a culture where everyone's voice is heard and where innovation isn't just a goal, but a daily practice.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-cyan-400 font-bold text-2xl mb-2">Flexible</h4>
                                    <p className="text-slate-500 text-sm">Remote-first culture with global collaboration.</p>
                                </div>
                                <div>
                                    <h4 className="text-purple-400 font-bold text-2xl mb-2">Growth</h4>
                                    <p className="text-slate-500 text-sm">Continuous learning and professional development.</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div {...fade} transition={{ delay: 0.3 }} className="relative h-[400px] rounded-3xl overflow-hidden border border-[#1E2A45]">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                                alt="Culture"
                                className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
                            />
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
