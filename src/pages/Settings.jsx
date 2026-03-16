import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Server, Moon, Sun, Monitor, Bell, Shield, Database, Info, Settings, X, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import GlassCard from '../components/GlassCard';

// Info Modal Component
function InfoModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Backdrop */}
                <motion.div
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />

                {/* Modal */}
                <motion.div
                    className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 25 }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <Info className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold">About RO Virtual Lab</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[60vh]">
                        <div className="space-y-6">
                            {/* What is this lab */}
                            <section>
                                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary" />
                                    What is RO Virtual Research Lab?
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    RO Virtual Research Lab is a cutting-edge computational platform designed for pharmaceutical
                                    and chemical research. It enables researchers to simulate drug formulations, predict stability,
                                    and analyze compatibility between ingredients before physical prototyping.
                                </p>
                            </section>

                            {/* How it's helpful */}
                            <section>
                                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-secondary" />
                                    How It Helps Your Research
                                </h3>
                                <ul className="space-y-2 text-slate-600">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <span>Reduce experimental costs by simulating formulations virtually</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <span>Predict stability and degradation pathways using AI models</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <span>Access a comprehensive library of chemicals, excipients, and biologics</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <span>Document and track all experiments in your personal research notebook</span>
                                    </li>
                                </ul>
                            </section>

                            {/* Disclaimer */}
                            <section className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                <h3 className="text-lg font-bold text-amber-800 mb-3 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5" />
                                    Important Disclaimer
                                </h3>
                                <p className="text-amber-700 text-sm leading-relaxed">
                                    The simulations and predictions provided by this platform are for research and educational
                                    purposes only. Results should not be used as the sole basis for clinical decisions or
                                    regulatory submissions. Always validate computational predictions with appropriate
                                    laboratory testing and consult qualified professionals before proceeding with any
                                    formulation development.
                                </p>
                            </section>

                            {/* Terms */}
                            <section className="bg-slate-50 rounded-xl p-4">
                                <h3 className="text-lg font-bold text-slate-800 mb-3">Terms of Use</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    By using this platform, you agree to use it responsibly for legitimate research purposes.
                                    All data and simulations are stored securely. We respect your privacy and do not share
                                    your research data with third parties without consent.
                                </p>
                            </section>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-slate-200 p-4 flex justify-end">
                        <motion.button
                            onClick={onClose}
                            className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Got it
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default function Profile() {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <motion.div
            className="max-w-4xl space-y-8 pb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Info Modal */}
            <InfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} />

            {/* Header */}
            <header className="flex items-center justify-between pb-5 border-b border-slate-200">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-800">Profile</h1>
                    <p className="text-slate-500 mt-1">Manage your account and preferences</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Info Button */}
                    <motion.button
                        onClick={() => setShowInfo(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Info className="w-4 h-4" />
                        <span>About Lab</span>
                    </motion.button>

                    {/* Settings Icon */}
                    <motion.button
                        className="p-2.5 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-colors"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Settings className="w-5 h-5" />
                    </motion.button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column - Profile Card */}
                <div className="md:col-span-1 space-y-5">
                    <GlassCard className="p-6 flex flex-col items-center text-center" glow>
                        <div className="relative mb-4">
                            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full border-2 border-primary/30 flex items-center justify-center">
                                <User className="w-12 h-12 text-primary" />
                            </div>
                            <motion.div
                                className="w-5 h-5 bg-secondary rounded-full border-2 border-white absolute bottom-1 right-1"
                                animate={{
                                    boxShadow: ['0 0 0 0 rgba(0,201,167,0.4)', '0 0 0 8px rgba(0,201,167,0)']
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 tracking-wide">Testing</h2>
                        <p className="text-sm text-slate-500 font-medium mt-1">Researcher</p>
                        <div className="mt-4 px-4 py-2 bg-slate-100 rounded-lg border border-slate-200 w-full">
                            <p className="text-xs text-slate-500 font-mono">RO Ecosystem ID: 10492</p>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-5" hover={false}>
                        <h3 className="text-xs uppercase font-bold text-slate-500 tracking-wider flex items-center mb-4">
                            <Server className="w-4 h-4 mr-2" /> External Integrations
                        </h3>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Database className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">PubChem API</span>
                                </div>
                                <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(0,201,167,0.6)]" />
                            </div>

                            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-accent/10 rounded-lg">
                                        <Shield className="w-4 h-4 text-accent" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">MedNeXuS Core</span>
                                </div>
                                <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(0,201,167,0.6)]" />
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Right Column - Settings */}
                <div className="md:col-span-2 space-y-5">
                    <GlassCard className="p-6" hover={false}>
                        <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-200 pb-3 flex items-center">
                            <Monitor className="w-5 h-5 mr-3 text-primary" /> Application Preferences
                        </h3>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-700">Theme Mode</h4>
                                    <p className="text-xs text-slate-500 mt-1">Select visual appearance of the application.</p>
                                </div>
                                <div className="flex bg-slate-100 border border-slate-200 rounded-xl p-1 gap-1">
                                    <button className="px-4 py-2 rounded-lg text-xs font-semibold flex items-center bg-white text-primary shadow-sm">
                                        <Sun className="w-3.5 h-3.5 mr-1.5" /> Light
                                    </button>
                                    <button className="px-4 py-2 rounded-lg text-xs font-semibold flex items-center text-slate-500 hover:text-slate-700">
                                        <Moon className="w-3.5 h-3.5 mr-1.5" /> Dark
                                    </button>
                                </div>
                            </div>

                            <hr className="border-slate-200" />

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-700">Measurement Units</h4>
                                    <p className="text-xs text-slate-500 mt-1">Default unit system for bench setup.</p>
                                </div>
                                <select className="bg-white border border-slate-200 text-sm text-slate-700 rounded-xl px-4 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                                    <option>Metric (SI)</option>
                                    <option>Imperial / US Customary</option>
                                </select>
                            </div>

                            <hr className="border-slate-200" />

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-700">AI Verbosity Level</h4>
                                    <p className="text-xs text-slate-500 mt-1">Detail depth of AI interpretations in results.</p>
                                </div>
                                <select className="bg-white border border-slate-200 text-sm text-slate-700 rounded-xl px-4 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                                    <option>Summary (Concise)</option>
                                    <option selected>Standard (Balanced)</option>
                                    <option>Comprehensive (Detailed)</option>
                                </select>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6" hover={false}>
                        <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-200 pb-3 flex items-center">
                            <Bell className="w-5 h-5 mr-3 text-accent" /> Notification Alerts
                        </h3>

                        <div className="space-y-4">
                            {[
                                { label: 'Push Notifications', desc: 'Browser notifications when simulation completes', defaultChecked: true },
                                { label: 'Email Reports', desc: 'Receive pdf reports of successful bench runs automatically', defaultChecked: false },
                                { label: 'Weekly Summary', desc: 'An overview of all experiments and their statuses', defaultChecked: true }
                            ].map((setting, idx) => (
                                <div key={idx} className="flex items-start justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div>
                                        <h4 className="text-sm font-medium text-slate-700">{setting.label}</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">{setting.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked={setting.defaultChecked} />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    <div className="flex justify-end pt-2">
                        <motion.button
                            className="bg-gradient-to-r from-primary to-primary-light text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-xl transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Save Changes
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
