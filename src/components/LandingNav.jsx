import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FlaskConical, Menu, X, Search, Beaker, BookOpen, Activity,
  Target, RefreshCw, Pill, Dna, GraduationCap, Microscope, Building2,
  FileText, Database, Play, Rocket, User, Map, Mail, ChevronRight, Briefcase
} from 'lucide-react';

// Dropdown Menu Component
function MegaDropdown({ isOpen, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 pt-2 z-50"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Platform Dropdown
function PlatformDropdown({ navigate, onClose }) {
  const tools = [
    { icon: Search, title: 'Ingredient Library', desc: 'Search 100M+ compounds from PubChem', path: '/app/library' },
    { icon: FlaskConical, title: 'Lab Bench', desc: 'Run virtual experiments with AI', path: '/app/bench' },
    { icon: Activity, title: 'Simulation Results', desc: 'View and analyze experiment history', path: '/app/results' },
    { icon: BookOpen, title: 'Research Notebook', desc: 'Document and track your research', path: '/app/notebook' }
  ];

  const comingSoon = [
    { icon: Target, title: 'Drug-Protein Docking' },
    { icon: RefreshCw, title: 'Retrosynthesis Planning' },
    { icon: Pill, title: 'Drug Formulation' },
    { icon: Dna, title: 'Protein Structure Prediction' }
  ];

  return (
    <div className="bg-[#0F1629] border border-[#1E2A45] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-6 min-w-[500px]">
      <div className="grid grid-cols-2 gap-8">
        {/* Tools Column */}
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-4">Tools</p>
          <div className="space-y-3">
            {tools.map((tool, i) => (
              <button
                key={i}
                onClick={() => { navigate(tool.path); onClose(); }}
                className="flex items-start gap-3 w-full text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <tool.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">{tool.title}</p>
                  <p className="text-slate-500 text-xs">{tool.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Coming Soon Column */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider">In Development</p>
            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] rounded-full">Soon</span>
          </div>
          <div className="space-y-3">
            {comingSoon.map((item, i) => (
              <div key={i} className="flex items-center gap-3 opacity-60">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-slate-500" />
                </div>
                <p className="text-slate-400 text-sm">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="mt-6 pt-4 border-t border-[#1E2A45]">
        <p className="text-xs text-slate-500 text-center">
          RO Virtual Lab v3.0 — Powered by PubChem + Groq AI
        </p>
      </div>
    </div>
  );
}

// Solutions Dropdown
function SolutionsDropdown({ navigate, onClose }) {
  const byArea = [
    { icon: FlaskConical, title: 'Small Molecule Research', desc: 'Simulate drug compounds and reactions' },
    { icon: Pill, title: 'Drug Formulation', desc: 'Test excipient compatibility and stability' },
    { icon: Database, title: 'Natural Product Research', desc: 'Analyze plant extracts and alkaloids' },
    { icon: Microscope, title: 'Analytical Chemistry', desc: 'Identify and characterize unknown compounds' }
  ];

  const byUser = [
    { icon: GraduationCap, title: 'Students & Educators', desc: 'Learn chemistry interactively', path: '/app/library' },
    { icon: User, title: 'Research Scientists', desc: 'Professional-grade simulations', path: '/app/bench' },
    { icon: Building2, title: 'Pharma Industry', desc: 'Drug development workflows', path: '/app/bench' }
  ];

  return (
    <div className="bg-[#0F1629] border border-[#1E2A45] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-6 min-w-[500px]">
      <div className="grid grid-cols-2 gap-8">
        {/* By Research Area */}
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-4">By Research Area</p>
          <div className="space-y-3">
            {byArea.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{item.title}</p>
                  <p className="text-slate-500 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By User Type */}
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-4">By User Type</p>
          <div className="space-y-3">
            {byUser.map((item, i) => (
              <button
                key={i}
                onClick={() => { navigate(item.path); onClose(); }}
                className="flex items-start gap-3 w-full text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                  <item.icon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm group-hover:text-purple-400 transition-colors">{item.title}</p>
                  <p className="text-slate-500 text-xs">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Resources Dropdown
function ResourcesDropdown({ navigate, onClose }) {
  const resourceCategories = [
    { title: 'Case Studies', id: 'case-studies' },
    { title: 'Documentation', id: 'docs' },
    { title: 'Events', id: 'events' },
    { title: 'Training Videos', id: 'training' },
    { title: 'Publications', id: 'publications' },
    { title: 'Quick Reference Sheets', id: 'ref-sheets' },
    { title: 'Tutorials', id: 'tutorials' },
    { title: 'Webinars', id: 'webinars' },
    { title: 'White Papers', id: 'white-papers' }
  ];

  const handleItemClick = (id) => {
    if (id === 'all') {
      navigate('/resources');
    } else {
      navigate('/resources/' + id);
    }
    onClose();
  };

  return (
    <div className="bg-[#0F1629] border border-[#1E2A45] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-8 min-w-[350px]">
      <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-6 font-bold">Resources</p>
      <div className="space-y-4">
        {resourceCategories.map((item) => (
          <div key={item.id} className="relative">
            <button
              onClick={() => handleItemClick(item.id)}
              className="text-white hover:text-cyan-400 transition-colors text-sm font-medium w-full text-left flex items-center justify-between group"
            >
              {item.title}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-[#1E2A45]">
        <button
          onClick={() => handleItemClick('all')}
          className="flex items-center gap-2 text-white text-xs font-bold hover:gap-3 transition-all"
        >
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
            <ChevronRight className="w-4 h-4" />
          </div>
          VIEW ALL RESOURCES
        </button>
      </div>
    </div>
  );
}

// About Dropdown
function AboutDropdown({ navigate, onClose }) {
  const items = [
    { icon: Rocket, title: 'About RO Ecosystem', desc: 'Our mission, principles and vision', path: '/about' },
    { icon: User, title: 'Team', desc: 'Leadership, Board & Advisors', path: '/about/team' },
    { icon: Briefcase, title: 'Careers', desc: 'Join our growing team', path: '/about/careers' },
    { icon: Map, title: 'Investors & Partners', desc: 'Investment opportunities and partnerships', path: '/about/investors' },
    { icon: FileText, title: 'Press Releases', desc: 'Latest news and announcements', path: '/about/press' }
  ];

  return (
    <div className="bg-[#0F1629] border border-[#1E2A45] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-4 min-w-[320px]">
      <div className="space-y-2">
        {items.map((item, i) => (
          item.href ? (
            <a
              key={i}
              href={item.href}
              onClick={() => onClose()}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#141B2D] transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                <item.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">{item.title}</p>
                <p className="text-slate-500 text-xs">{item.desc}</p>
              </div>
            </a>
          ) : (
            <button
              key={i}
              onClick={() => { navigate(item.path); onClose(); }}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#141B2D] transition-colors group w-full text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                <item.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">{item.title}</p>
                <p className="text-slate-500 text-xs">{item.desc}</p>
              </div>
            </button>
          )
        ))}
      </div>
    </div>
  );
}

// Nav Item with Dropdown
function NavItem({ label, dropdown: Dropdown, navigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="text-slate-400 hover:text-white transition-colors text-sm font-medium py-2">
        {label}
      </button>
      <MegaDropdown isOpen={isOpen}>
        <Dropdown navigate={navigate} onClose={() => setIsOpen(false)} />
      </MegaDropdown>
    </div>
  );
}

export default function LandingNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
          ? 'bg-[#080C18]/95 backdrop-blur-xl border-[#1E2A45]'
          : 'bg-[#080C18]/80 backdrop-blur-sm border-transparent'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/favicon.png"
                alt="RO Virtual Lab"
                className="w-8 h-8 rounded-lg"
              />
              <span className="font-bold text-xl text-white">
                RO Research Lab
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <NavItem label="Platform" dropdown={PlatformDropdown} navigate={navigate} />
              <NavItem label="Solutions" dropdown={SolutionsDropdown} navigate={navigate} />
              <button 
                onClick={() => navigate('/company')}
                className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                Company
              </button>
              <NavItem label="Resources" dropdown={ResourcesDropdown} navigate={navigate} />
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <motion.button
                onClick={() => navigate('/app/dashboard')}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enter Lab →
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-[#141B2D] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute top-20 left-4 right-4 bg-[#0F1629] border border-[#1E2A45] rounded-2xl shadow-2xl p-6"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
            >
              <div className="space-y-2">
                {[
                  { label: 'Platform', path: '/app/library' },
                  { label: 'Solutions', path: '/app/bench' },
                  { label: 'Company', path: '/company' },
                  { label: 'About', path: '/about' },
                  { label: 'Team', path: '/about/team' },
                  { label: 'Careers', path: '/about/careers' },
                  { label: 'Resources', path: '/resources' }
                ].map((link) => (
                  <button
                    key={link.label}
                    onClick={() => { navigate(link.path); setIsMobileMenuOpen(false); }}
                    className="block w-full py-3 px-4 rounded-xl font-medium text-slate-400 hover:text-white hover:bg-[#141B2D] transition-colors text-left"
                  >
                    {link.label}
                  </button>
                ))}
                <hr className="border-[#1E2A45] my-4" />
                <button
                  onClick={() => { navigate('/app/dashboard'); setIsMobileMenuOpen(false); }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold"
                >
                  Enter Lab →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
