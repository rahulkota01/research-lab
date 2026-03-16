import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  Beaker, Atom, Cpu, FlaskConical, ArrowRight, Play, Database,
  Zap, Cloud, Box, Globe, GraduationCap, Microscope, Building2,
  Search, BookOpen, Activity, FileText, ChevronRight
} from 'lucide-react';
import Molecule3DViewer from '../components/Molecule3DViewer';
import LandingNav from '../components/LandingNav';
import AboutSubNav from '../components/AboutSubNav';

// tsParticles Component
function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = 2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.3)';
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 80; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update();
        p.draw();
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      animationId = requestAnimationFrame(animate);
    };

    resize();
    init();
    animate();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

// Animated Counter
function AnimatedCounter({ value, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(value) || 0;
    const duration = 2000;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Floating Card
function FloatingCard({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`glass-card rounded-xl border border-[#1E2A45] p-4 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Section Components
function Hero({ navigate }) {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0A0E1A] pt-20 overflow-hidden">
      <ParticlesBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left - Text */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/50 text-cyan-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6 mx-auto lg:mx-0"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            AI-Powered Virtual Research Platform
          </motion.div>

          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.1]"
            >
              Scientific research meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">computational reasoning.</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm sm:text-base lg:text-lg text-slate-400 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0"
          >
            RO Research Lab is a digital research environment designed to explore the intersection of biology, computation, and artificial intelligence. We enable the next generation of discovery-driven technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12"
          >
            <motion.button
              onClick={() => navigate('/app/dashboard')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-white text-sm sm:text-base w-full sm:w-auto"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', boxShadow: '0 0 30px rgba(0,212,255,0.3)' }}
            >
              Enter Research Lab →
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-white text-sm sm:text-base border border-cyan-500/40 bg-transparent w-full sm:w-auto"
            >
              Watch Platform Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-[#1E2A45]"
          >
            {[
              { value: '100', suffix: 'M+', label: 'Compounds in Database' },
              { value: '15', suffix: '+', label: 'Glassware Types' },
              { value: '<5', suffix: 's', label: 'Simulation Speed' },
              { value: 'Free', suffix: '', label: 'To Use' }
            ].map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-400">
                  {stat.value === 'Free' ? 'Free' : <><AnimatedCounter value={stat.value} />{stat.suffix}</>}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right - 3D Molecule with Floating Cards */}
        <div className="relative flex items-center justify-center w-full h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] mt-8 lg:mt-0">
          {/* Radial glow behind molecule */}
          <div
            className="absolute rounded-full w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px]"
            style={{
              background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          {/* 3D Molecule - transparent background */}
          <div className="w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px] xl:w-[480px] xl:h-[480px]" style={{
            filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.1))'
          }}>
            <Molecule3DViewer
              cid={2244}
              size="large"
              autoRotate={true}
              showControls={true}
            />
          </div>

          {/* Floating card - top left of molecule - Hidden on mobile */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="hidden sm:block absolute top-4 lg:top-8 left-0 bg-[#0F1629]/90 backdrop-blur border border-[#1E2A45] rounded-xl p-2 lg:p-3 text-xs"
          >
            <div className="flex items-center gap-1 lg:gap-2 mb-1">
              <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-cyan-400" />
              <span className="text-slate-400 text-[10px] lg:text-xs">Real PubChem Data</span>
            </div>
            <div className="text-white font-mono font-bold text-[10px] lg:text-sm">CID: 2244 • MW: 180.16</div>
          </motion.div>

          {/* Floating card - top right - Hidden on mobile */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
            className="hidden sm:block absolute top-2 lg:top-4 right-0 bg-[#0F1629]/90 backdrop-blur border border-[#1E2A45] rounded-xl p-2 lg:p-3 text-xs"
          >
            <div className="text-slate-400 text-[10px] lg:text-xs mb-1">⚗️ Simulation Complete</div>
            <div className="text-red-400 font-bold text-[10px] lg:text-xs">Status: Decomposing</div>
          </motion.div>

          {/* Floating card - bottom right - Hidden on mobile */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="hidden sm:block absolute bottom-4 lg:bottom-8 right-0 bg-[#0F1629]/90 backdrop-blur border border-[#1E2A45] rounded-xl p-2 lg:p-3 text-xs"
          >
            <div className="text-slate-400 text-[10px] lg:text-xs mb-1">🤖 AI Analysis Ready</div>
            <div className="text-cyan-400 font-bold text-[10px] lg:text-xs">Groq • llama-3.3-70b</div>
          </motion.div>

          {/* Rotation hint - Only visible on desktop */}
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
            className="hidden lg:flex absolute bottom-0 left-1/2 -translate-x-1/2 items-center gap-2 text-slate-600 text-xs"
          >
            <span>←</span>
            <span>Drag to rotate • Scroll to zoom</span>
            <span>→</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PlatformPillars({ navigate }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const pillars = [
    { icon: Atom, num: '01', title: 'Real Compound Data', desc: 'Every simulation uses verified molecular data from PubChem — 100M+ compounds with real thermodynamic properties, SMILES, CAS numbers and 3D conformers.', link: 'Explore Library →', path: '/app/library' },
    { icon: Cpu, num: '02', title: 'AI Simulation Engine', desc: 'Groq-powered LLM trained on chemistry literature predicts reaction outcomes, stability, yield and safety — with research-grade scientific accuracy.', link: 'Try Lab Bench →', path: '/app/bench' },
    { icon: FlaskConical, num: '03', title: 'Interactive 3D Visualization', desc: 'Real CPK-colored 3D molecular structures rendered with Three.js from PubChem conformer data — rotate, zoom and analyze any compound in your browser.', link: 'View Molecules →', path: '/app/library' }
  ];

  return (
    <section id="platform" className="py-12 sm:py-16 lg:py-24 bg-[#080C18]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-cyan-400 text-xs sm:text-sm uppercase tracking-wider mb-3">The Platform</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Built on Real Science</h2>
          <p className="text-slate-400 text-sm sm:text-base">Three core technologies power every simulation</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-x divide-[#1E2A45]">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="px-6 sm:px-8 py-6 relative"
            >
              <span className="absolute top-0 left-6 sm:left-8 text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-800/50 select-none">{pillar.num}</span>
              <div className="relative z-10 pt-4">
                <pillar.icon className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">{pillar.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">{pillar.desc}</p>
                <button onClick={() => navigate(pillar.path)} className="text-cyan-400 text-xs sm:text-sm font-medium hover:text-cyan-300 flex items-center gap-1">
                  {pillar.link}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solutions({ navigate }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCard, setActiveCard] = useState(0);

  const solutions = [
    { num: '01', title: 'Compound Discovery', subtitle: 'Ingredient Library', desc: 'Search any of 100M+ compounds from PubChem. View 2D structural formulas, interactive 3D conformers, molecular properties and safety data instantly.', tags: ['PubChem API', '3D Viewer', 'Safety Data'], link: 'Open Library →', path: '/app/library' },
    { num: '02', title: 'Virtual Experimentation', subtitle: 'Lab Bench', desc: 'Build multi-step experiments with 15+ glassware types. Set temperature, pressure, pH and mixing speed. Watch your compound react with real animations and AI predictions.', tags: ['15+ Glassware', 'AI Simulation', 'Real-time'], link: 'Open Lab Bench →', path: '/app/bench' },
    { num: '03', title: 'AI-Powered Analysis', subtitle: 'Simulation Engine', desc: "Get comprehensive experiment results in under 5 seconds — or run real-time simulations for research-grade accuracy. Powered by Groq's fastest AI models.", tags: ['Groq AI', 'Research Grade', '5 sec Results'], link: 'Run Simulation →', path: '/app/bench' },
    { num: '04', title: 'Research Documentation', subtitle: 'Notebook + Results', desc: 'Document every experiment automatically. Track simulation history, compare results and build your research portfolio — all saved securely in your browser.', tags: ['Auto-save', 'History', 'Export'], link: 'Open Notebook →', path: '/app/notebook' }
  ];

  return (
    <section id="solutions" className="py-12 sm:py-16 lg:py-24 bg-[#0A0E1A] relative" style={{ backgroundImage: 'linear-gradient(rgba(30,42,69,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(30,42,69,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
          {/* Left - Sticky */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="md:col-span-2 md:sticky md:top-32 md:self-start text-center md:text-left mb-8 md:mb-0"
          >
            <p className="text-cyan-400 text-xs sm:text-sm uppercase tracking-wider mb-3">Solutions</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">Everything you need for virtual research</h2>
            <p className="text-slate-400 text-sm sm:text-base mb-6 sm:mb-8">From compound discovery to experiment simulation — RO Virtual Lab covers the full research workflow.</p>
            <button onClick={() => navigate('/app/dashboard')} className="text-cyan-400 text-sm sm:text-base font-medium hover:text-cyan-300 flex items-center gap-2 justify-center md:justify-start">
              Explore All Features →
            </button>
          </motion.div>

          {/* Right - Cards */}
          <div className="md:col-span-3 space-y-3 sm:space-y-4">
            {solutions.map((sol, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setActiveCard(i)}
                className={`p-4 sm:p-6 rounded-xl border-l-2 transition-all cursor-pointer ${activeCard === i ? 'border-cyan-500 bg-[#0F1629]' : 'border-slate-700 bg-[#080C18]/50'}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-cyan-400 text-xs sm:text-sm font-mono">{sol.num}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{sol.title}</h3>
                <p className="text-cyan-400 text-xs sm:text-sm mb-2 sm:mb-3">{sol.subtitle}</p>
                <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4">{sol.desc}</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {sol.tags.map((tag, j) => (
                    <span key={j} className="px-2 py-1 bg-[#141B2D] rounded text-[10px] sm:text-xs text-slate-400">{tag}</span>
                  ))}
                </div>
                <button onClick={() => navigate(sol.path)} className="text-cyan-400 text-xs sm:text-sm hover:text-cyan-300">{sol.link}</button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TechStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const techs = [
    { icon: '🔬', name: 'PubChem' },
    { icon: '⚡', name: 'Groq AI' },
    { icon: '☁️', name: 'Cloudflare' },
    { icon: '⚛️', name: 'Three.js' },
    { icon: '🇮🇳', name: 'Made in India' }
  ];

  return (
    <section className="py-20 bg-[#050810]">
      <div className="max-w-4xl mx-auto px-6 text-center" ref={ref}>
        <p className="text-slate-500 text-sm mb-8">Powered by</p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {techs.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 bg-[#0A0E1A] rounded-lg border border-[#1E2A45]"
            >
              <span>{tech.icon}</span>
              <span className="text-white text-sm">{tech.name}</span>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-2xl text-white italic"
        >
          "The next great molecule is already in PubChem.<br />RO Virtual Lab helps you find it."
        </motion.p>
      </div>
    </section>
  );
}

function ForResearchers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const profiles = [
    { icon: GraduationCap, title: 'Students & Educators', points: ['Learn molecular properties interactively', 'Run safe virtual experiments', '3D visualization for any compound', 'Free to use, browser-based'] },
    { icon: Microscope, title: 'Research Scientists', points: ['Research-grade simulation accuracy', 'Full ADMET analysis', 'GHS safety data sheets', 'Export experiment protocols'], highlighted: true },
    { icon: Building2, title: 'Pharma & Industry', points: ['Drug formulation simulation', 'Stability and compatibility analysis', 'API integration (coming soon)', 'Institution access (coming soon)'] }
  ];

  return (
    <section className="py-24 bg-[#0A0E1A]">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Built for every researcher</h2>
          <p className="text-slate-400">Whether you're a student or a PhD — RO Virtual Lab scales to your needs</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {profiles.map((profile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-2xl ${profile.highlighted ? 'border-2 border-cyan-500/50 bg-[#0F1629]' : 'border border-[#1E2A45] bg-[#080C18]'}`}
            >
              <profile.icon className="w-10 h-10 text-cyan-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-6">{profile.title}</h3>
              <ul className="space-y-3">
                {profile.points.map((point, j) => (
                  <li key={j} className="text-slate-400 text-sm flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA({ navigate }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A0E1A 0%, #0F0A1E 100%)' }}>
      <div className="max-w-4xl mx-auto px-6 text-center" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-5xl font-bold text-white mb-6 leading-tight"
        >
          Ready to start your<br />virtual research journey?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-slate-400 mb-10"
        >
          Free to use. No installation required.<br />Works in any modern browser.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          onClick={() => navigate('/app/dashboard')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-5 rounded-xl font-bold text-white text-lg mb-10"
          style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', boxShadow: '0 0 40px rgba(0,212,255,0.4)' }}
        >
          Enter RO Virtual Lab →
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 text-sm text-slate-500"
        >
          <span>🔒 No account needed to explore for now..!</span>
          <span>⚡ Powered by Groq AI</span>
          <span>🔬 100M+ compounds available</span>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const linkClass = "text-slate-500 text-sm hover:text-cyan-400 transition-colors";

  return (
    <footer className="py-16 bg-[#050810] border-t border-[#1E2A45]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Beaker className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">RO Virtual Lab</span>
            </div>
            <p className="text-slate-500 text-sm mb-4">Virtual research platform for computational drug discovery.</p>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/app/library" className={linkClass}>Library</Link></li>
              <li><Link to="/app/bench" className={linkClass}>Lab Bench</Link></li>
              <li><Link to="/app/notebook" className={linkClass}>Notebook</Link></li>
              <li><Link to="/app/results" className={linkClass}>Results</Link></li>
            </ul>
          </div>

          {/* Research Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Research</h4>
            <ul className="space-y-2">
              <li><Link to="/articles" className={linkClass}>Articles</Link></li>
              <li><Link to="/app/results" className={linkClass}>Simulations</Link></li>
              <li><Link to="/app/library" className={linkClass}>Safety Data</Link></li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              <li><Link to="/company" className={linkClass}>Company</Link></li>
              <li><Link to="/about" className={linkClass}>About Us</Link></li>
              <li><Link to="/team" className={linkClass}>Team</Link></li>
              <li><Link to="/careers" className={linkClass}>Careers</Link></li>
              <li><Link to="/investors" className={linkClass}>Investors</Link></li>
              <li><Link to="/press-releases" className={linkClass}>Press Releases</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1E2A45] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">© 2026 RO Ecosystem. All rights reserved.</p>
          <p className="text-slate-600 text-sm">Powered by PubChem • Groq AI • Cloudflare</p>
        </div>
      </div>
    </footer>
  );
}

// Main Landing Component
export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0A0E1A]">
      <LandingNav />
      <AboutSubNav />
      <Hero navigate={navigate} />
      <PlatformPillars navigate={navigate} />
      <Solutions navigate={navigate} />
      <TechStrip />
      <ForResearchers />
      <CTA navigate={navigate} />
      <Footer />
    </div>
  );
}
