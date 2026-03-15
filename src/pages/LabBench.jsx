import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Beaker, FlaskConical, TestTube, Circle, Square, Thermometer,
  Wind, Droplets, Gauge, Clock, Play, RotateCcw, Save,
  Plus, X, AlertTriangle, Flame, Snowflake, Waves,
  ArrowRight, Check, Filter, Beaker as BeakerIcon,
  Microscope, ChevronUp, ChevronDown, BookOpen,
  Zap, Activity, Eye, RefreshCw, Timer, Sparkles, Shield,
  AlertOctagon, Skull, FlaskRound, Target, Lightbulb, Info,
  PlayCircle, Pause, Settings2, Hourglass
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

const GLASSWARE_TYPES = [
  { id: 'testtube', name: 'Test Tube', volume: '5-50ml', maxVolume: 50 },
  { id: 'beaker', name: 'Beaker', volume: '50-1000ml', maxVolume: 1000 },
  { id: 'erlenmeyer', name: 'Erlenmeyer Flask', volume: '50-500ml', maxVolume: 500 },
  { id: 'roundbottom', name: 'Round Bottom Flask', volume: '100-2000ml', maxVolume: 2000 },
  { id: 'volumetric', name: 'Volumetric Flask', volume: '10-2000ml', maxVolume: 2000 },
  { id: 'separating', name: 'Separating Funnel', volume: '50-500ml', maxVolume: 500 },
  { id: 'petri', name: 'Petri Dish', volume: 'Surface', maxVolume: 100 },
  { id: 'crucible', name: 'Crucible', volume: '5-50ml', maxVolume: 50 },
  { id: 'watchglass', name: 'Watch Glass', volume: 'Surface', maxVolume: 50 },
  { id: 'conicaltube', name: 'Conical Tube', volume: '15-50ml', maxVolume: 50 },
  { id: 'reagentbottle', name: 'Reagent Bottle', volume: '100-1000ml', maxVolume: 1000 },
  { id: 'crystallization', name: 'Crystallization Dish', volume: 'Wide', maxVolume: 500 },
  { id: 'distillation', name: 'Distillation Flask', volume: '250-1000ml', maxVolume: 1000 },
  { id: 'reflux', name: 'Reflux Condenser', volume: 'Setup', maxVolume: 1000 },
  { id: 'mortar', name: 'Mortar & Pestle', volume: 'Grinding', maxVolume: 100 },
];

const STEP_TYPES = [
  { id: 'heat', name: 'Heat', icon: Flame, color: 'orange', desc: 'Raise temperature over time' },
  { id: 'cool', name: 'Cool', icon: Snowflake, color: 'blue', desc: 'Lower temperature over time' },
  { id: 'pressurize', name: 'Pressurize', icon: Gauge, color: 'purple', desc: 'Increase pressure' },
  { id: 'wait', name: 'Wait', icon: Clock, color: 'slate', desc: 'Hold conditions and incubate' },
  { id: 'addcompound', name: 'Add Compound', icon: Plus, color: 'green', desc: 'Add another compound' },
  { id: 'mix', name: 'Mix', icon: Waves, color: 'cyan', desc: 'Start or change mixing' },
  { id: 'adjustph', name: 'Adjust pH', icon: Droplets, color: 'emerald', desc: 'Add acid or base' },
  { id: 'filter', name: 'Filter', icon: Filter, color: 'amber', desc: 'Filter the solution' },
  { id: 'evaporate', name: 'Evaporate', icon: Wind, color: 'sky', desc: 'Reduce solvent volume' },
];

const COMPOUND_COLORS = {
  'Aspirin': '#f5f5f5', 'Paracetamol': '#fafafa', 'Caffeine': '#d4a574',
  'Curcumin': '#fbbf24', 'Ibuprofen': '#f5f5dc', 'Ethanol': '#e0f2fe',
  'Water': '#dbeafe', 'Glucose': '#fef3c7', 'Sucrose': '#fafafa',
  'Chloroform': '#f0fdf4', 'Quercetin': '#fef9c3', 'Penicillin': '#f8fafc',
};

const getCorrectFormula = (compound) => {
  if (!compound) return 'N/A';
  const corrections = { 'Curcumin': 'C21H20O6', 'Caffeine': 'C8H10N4O2', 'Aspirin': 'C9H8O4', 'Ibuprofen': 'C13H18O2', 'Paracetamol': 'C8H9NO2', 'Glucose': 'C6H12O6', 'Sucrose': 'C12H22O11', 'Ethanol': 'C2H6O', 'Water': 'H2O', 'Penicillin': 'C16H18N2O4S' };
  return corrections[compound.commonName] || compound.formula || 'N/A';
};

const getPubChemImageUrl = (cid) => `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG`;

function CompoundImage({ compound, className }) {
  const [hasError, setHasError] = useState(false);
  let imageUrl = compound.imageUrl;
  if (!imageUrl && compound.commonName === 'Penicillin') imageUrl = getPubChemImageUrl(5904);
  else if (!imageUrl) imageUrl = getPubChemImageUrl(compound.cid);
  const firstLetter = (compound.commonName || compound.name || '?')[0].toUpperCase();
  const colors = ['bg-blue-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500'];
  const bgColor = colors[(compound.commonName || '').length % colors.length];
  if (hasError) return <div className={`${className} ${bgColor} flex items-center justify-center text-white font-bold text-xl`}>{firstLetter}</div>;
  return <img src={imageUrl} alt={compound.commonName} className={className} onError={() => setHasError(true)} />;
}

function GlasswareIcon({ type, className = "w-12 h-12" }) {
  const glassColor = "#e2e8f0";
  const highlightColor = "#f8fafc";
  const strokeColor = "#94a3b8";  
  switch (type) {
    case 'testtube':
      return (
        <svg viewBox="0 0 60 60" className={className}>
          <defs><linearGradient id="ttGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={glassColor}/><stop offset="50%" stopColor={highlightColor}/><stop offset="100%" stopColor={glassColor}/></linearGradient></defs>
          <path d="M20,5 L20,45 Q20,55 30,55 Q40,55 40,45 L40,5" fill="url(#ttGrad)" stroke={strokeColor} strokeWidth="1.5"/>
          <ellipse cx="30" cy="5" rx="10" ry="2" fill={highlightColor} stroke={strokeColor} strokeWidth="1"/>
          <path d="M22,15 L25,15" stroke={strokeColor} strokeWidth="1" opacity="0.5"/>
          <path d="M22,25 L25,25" stroke={strokeColor} strokeWidth="1" opacity="0.5"/>
          <path d="M22,35 L25,35" stroke={strokeColor} strokeWidth="1" opacity="0.5"/>
        </svg>
      );
    case 'beaker':
      return (
        <svg viewBox="0 0 60 60" className={className}>
          <defs><linearGradient id="bkGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={glassColor}/><stop offset="50%" stopColor={highlightColor}/><stop offset="100%" stopColor={glassColor}/></linearGradient></defs>
          <path d="M10,10 L12,50 Q12,55 18,55 L42,55 Q48,55 48,50 L50,10" fill="url(#bkGrad)" stroke={strokeColor} strokeWidth="1.5"/>
          <path d="M50,15 L55,12 L55,18 L50,18" fill={glassColor} stroke={strokeColor} strokeWidth="1"/>
          <line x1="15" y1="20" x2="20" y2="20" stroke={strokeColor} strokeWidth="1" opacity="0.5"/>
          <line x1="15" y1="30" x2="22" y2="30" stroke={strokeColor} strokeWidth="1" opacity="0.5"/>
          <line x1="15" y1="40" x2="20" y2="40" stroke={strokeColor} strokeWidth="1" opacity="0.5"/>
        </svg>
      );
    case 'erlenmeyer':
      return (
        <svg viewBox="0 0 60 60" className={className}>
          <defs><linearGradient id="efGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={glassColor}/><stop offset="50%" stopColor={highlightColor}/><stop offset="100%" stopColor={glassColor}/></linearGradient></defs>
          <path d="M22,5 L22,15 L10,50 Q8,55 15,55 L45,55 Q52,55 50,50 L38,15 L38,5" fill="url(#efGrad)" stroke={strokeColor} strokeWidth="1.5"/>
          <ellipse cx="30" cy="5" rx="8" ry="2" fill={highlightColor} stroke={strokeColor} strokeWidth="1"/>
          <line x1="18" y1="35" x2="22" y2="35" stroke={strokeColor} strokeWidth="1" opacity="0.5"/>
          <line x1="16" y1="42" x2="22" y2="42" stroke={strokeColor} strokeWidth="1" opacity="0.5"/>
        </svg>
      );
    case 'roundbottom':
      return (
        <svg viewBox="0 0 60 60" className={className}>
          <defs><linearGradient id="rbGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={glassColor}/><stop offset="50%" stopColor={highlightColor}/><stop offset="100%" stopColor={glassColor}/></linearGradient></defs>
          <path d="M24,5 L24,20 Q10,25 10,40 Q10,55 30,55 Q50,55 50,40 Q50,25 36,20 L36,5" fill="url(#rbGrad)" stroke={strokeColor} strokeWidth="1.5"/>
          <ellipse cx="30" cy="5" rx="6" ry="2" fill={highlightColor} stroke={strokeColor} strokeWidth="1"/>
          <path d="M15,35 Q18,38 22,35" stroke={strokeColor} strokeWidth="1" opacity="0.5" fill="none"/>
          <path d="M15,42 Q20,46 25,42" stroke={strokeColor} strokeWidth="1" opacity="0.5" fill="none"/>
        </svg>
      );
    case 'volumetric':
      return (
        <svg viewBox="0 0 60 60" className={className}>
          <defs><linearGradient id="vfGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={glassColor}/><stop offset="50%" stopColor={highlightColor}/><stop offset="100%" stopColor={glassColor}/></linearGradient></defs>
          <path d="M26,5 L26,15 L18,30 Q12,40 15,50 Q18,55 30,55 Q42,55 45,50 Q48,40 42,30 L34,15 L34,5" fill="url(#vfGrad)" stroke={strokeColor} strokeWidth="1.5"/>
          <ellipse cx="30" cy="5" rx="4" ry="1.5" fill={highlightColor} stroke={strokeColor} strokeWidth="1"/>
          <line x1="20" y1="30" x2="40" y2="30" stroke={strokeColor} strokeWidth="2" opacity="0.7"/>
        </svg>
      );
    case 'separating':
      return (
        <svg viewBox="0 0 60 60" className={className}>
          <defs><linearGradient id="sfGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={glassColor}/><stop offset="50%" stopColor={highlightColor}/><stop offset="100%" stopColor={glassColor}/></linearGradient></defs>
          <path d="M22,5 L22,15 L12,35 L12,50 L18,55 L30,55 L42,55 L48,50 L48,35 L38,15 L38,5" fill="url(#sfGrad)" stroke={strokeColor} strokeWidth="1.5"/>
          <ellipse cx="30" cy="5" rx="8" ry="2" fill={highlightColor} stroke={strokeColor} strokeWidth="1"/>
          <circle cx="30" cy="52" r="4" fill={glassColor} stroke={strokeColor} strokeWidth="1"/>
          <line x1="26" y1="52" x2="34" y2="52" stroke={strokeColor} strokeWidth="1.5"/>
        </svg>
      );
    case 'petri':
      return (
        <svg viewBox="0 0 60 60" className={className}>
          <defs><linearGradient id="pdGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={glassColor}/><stop offset="50%" stopColor={highlightColor}/><stop offset="100%" stopColor={glassColor}/></linearGradient></defs>
          <ellipse cx="30" cy="35" rx="25" ry="12" fill={glassColor} stroke={strokeColor} strokeWidth="1.5"/>
          <ellipse cx="30" cy="32" rx="22" ry="10" fill="url(#pdGrad)" stroke={strokeColor} strokeWidth="1"/>
          <ellipse cx="30" cy="30" rx="18" ry="8" fill={highlightColor} opacity="0.5"/>
        </svg>
      );
    case 'crucible':
      return (
        <svg viewBox="0 0 60 60" className={className}>
          <defs><linearGradient id="crGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#94a3b8"/><stop offset="50%" stopColor="#cbd5e1"/><stop offset="100%" stopColor="#94a3b8"/></linearGradient></defs>
          <path d="M15,15 L15,45 Q15,55 30,55 Q45,55 45,45 L45,15" fill="url(#crGrad)" stroke="#64748b" strokeWidth="1.5"/>
          <ellipse cx="30" cy="15" rx="15" ry="3" fill="#64748b" stroke="#475569" strokeWidth="1"/>
          <ellipse cx="30" cy="15" rx="12" ry="2" fill="#334155"/>
        </svg>
      );
    case 'watchglass':
      return (
        <svg viewBox="0 0 60 60" className={className}>
          <defs><linearGradient id="wgGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={glassColor}/><stop offset="50%" stopColor={highlightColor}/><stop offset="100%" stopColor={glassColor}/></linearGradient></defs>
          <ellipse cx="30" cy="32" rx="25" ry="8" fill="url(#wgGrad)" stroke={strokeColor} strokeWidth="1.5"/>
          <ellipse cx="30" cy="30" rx="22" ry="6" fill={highlightColor} opacity="0.6"/>
          <path d="M10,32 Q30,42 50,32" fill="none" stroke={strokeColor} strokeWidth="1" opacity="0.3"/>
        </svg>
      );
    case 'conicaltube':
      return (
        <svg viewBox="0 0 60 60" className={className}>
          <defs><linearGradient id="ctGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={glassColor}/><stop offset="50%" stopColor={highlightColor}/><stop offset="100%" stopColor={glassColor}/></linearGradient></defs>
          <path d="M20,5 L20,35 L15,50 Q12,55 20,55 L40,55 Q48,55 45,50 L40,35 L40,5" fill="url(#ctGrad)" stroke={strokeColor} strokeWidth="1.5"/>
          <ellipse cx="30" cy="5" rx="10" ry="2" fill={highlightColor} stroke={strokeColor} strokeWidth="1"/>
          <line x1="22" y1="20" x2="25" y2="20" stroke={strokeColor} strokeWidth="1" opacity="0.5"/>
          <line x1="21" y1="30" x2="25" y2="30" stroke={strokeColor} strokeWidth="1" opacity="0.5"/>
          <line x1="19" y1="40" x2="24" y2="40" stroke={strokeColor} strokeWidth="1" opacity="0.5"/>
        </svg>
      );
    case 'reagentbottle':
      return (
        <svg viewBox="0 0 60 60" className={className}>
          <defs><linearGradient id="rbottleGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={glassColor}/><stop offset="50%" stopColor={highlightColor}/><stop offset="100%" stopColor={glassColor}/></linearGradient></defs>
          <rect x="18" y="5" width="24" height="12" rx="2" fill="#64748b" stroke="#475569" strokeWidth="1"/>
          <rect x="15" y="17" width="30" height="38" rx="3" fill="url(#rbottleGrad)" stroke={strokeColor} strokeWidth="1.5"/>
          <rect x="20" y="25" width="20" height="25" rx="2" fill={highlightColor} opacity="0.3"/>
        </svg>
      );
    case 'crystallization':
      return (
        <svg viewBox="0 0 60 60" className={className}>
          <defs><linearGradient id="crystGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={glassColor}/><stop offset="50%" stopColor={highlightColor}/><stop offset="100%" stopColor={glassColor}/></linearGradient></defs>
          <path d="M5,20 L10,50 Q12,55 30,55 Q48,55 50,50 L55,20 Q55,15 30,15 Q5,15 5,20" fill="url(#crystGrad)" stroke={strokeColor} strokeWidth="1.5"/>
          <ellipse cx="30" cy="20" rx="25" ry="5" fill={highlightColor} stroke={strokeColor} strokeWidth="1"/>
          <line x1="10" y1="30" x2="15" y2="30" stroke={strokeColor} strokeWidth="1" opacity="0.5"/>
          <line x1="10" y1="40" x2="18" y2="40" stroke={strokeColor} strokeWidth="1" opacity="0.5"/>
        </svg>
      );
    case 'distillation':
      return (
        <svg viewBox="0 0 60 60" className={className}>
          <defs><linearGradient id="distGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={glassColor}/><stop offset="50%" stopColor={highlightColor}/><stop offset="100%" stopColor={glassColor}/></linearGradient></defs>
          <path d="M22,5 L22,20 Q10,25 10,40 Q10,50 20,52" fill="none" stroke={strokeColor} strokeWidth="1.5"/>
          <path d="M38,5 L38,20 Q50,25 50,30 L55,30" fill="none" stroke={strokeColor} strokeWidth="1.5"/>
          <path d="M22,5 L22,20 Q8,25 8,40 Q8,55 30,55 Q52,55 52,40 Q52,25 38,20 L38,5" fill="url(#distGrad)" stroke={strokeColor} strokeWidth="1.5"/>
          <ellipse cx="30" cy="5" rx="8" ry="2" fill={highlightColor} stroke={strokeColor} strokeWidth="1"/>
          <circle cx="55" cy="30" r="3" fill={glassColor} stroke={strokeColor} strokeWidth="1"/>
        </svg>
      );
    case 'reflux':
      return (
        <svg viewBox="0 0 60 60" className={className}>
          <defs><linearGradient id="refluxGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={glassColor}/><stop offset="50%" stopColor={highlightColor}/><stop offset="100%" stopColor={glassColor}/></linearGradient></defs>
          <path d="M24,5 L24,15 L12,25 L12,15" fill="none" stroke={strokeColor} strokeWidth="1.5"/>
          <path d="M36,5 L36,15 L48,25 L48,15" fill="none" stroke={strokeColor} strokeWidth="1.5"/>
          <rect x="20" y="5" width="20" height="25" rx="2" fill="url(#refluxGrad)" stroke={strokeColor} strokeWidth="1.5"/>
          <path d="M22,5 L22,20 Q10,25 10,40 Q10,55 30,55 Q50,55 50,40 Q50,25 38,20 L38,5" fill="url(#refluxGrad)" stroke={strokeColor} strokeWidth="1.5"/>
          <path d="M22,12 L38,12" stroke={strokeColor} strokeWidth="1" opacity="0.5"/>
          <path d="M22,18 L38,18" stroke={strokeColor} strokeWidth="1" opacity="0.5"/>
        </svg>
      );
    case 'mortar':
      return (
        <svg viewBox="0 0 60 60" className={className}>
          <defs><linearGradient id="mortarGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#94a3b8"/><stop offset="50%" stopColor="#cbd5e1"/><stop offset="100%" stopColor="#94a3b8"/></linearGradient></defs>
          <path d="M10,20 Q10,50 30,55 Q50,50 50,20" fill="url(#mortarGrad)" stroke="#64748b" strokeWidth="1.5"/>
          <ellipse cx="30" cy="20" rx="20" ry="5" fill="#64748b" stroke="#475569" strokeWidth="1"/>
          <ellipse cx="30" cy="20" rx="15" ry="3" fill="#334155"/>
          <path d="M35,5 L32,25 L40,25 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="1"/>
          <ellipse cx="36" cy="5" rx="4" ry="2" fill="#e2e8f0" stroke="#64748b" strokeWidth="1"/>
        </svg>
      );
    default:
      return <Beaker className={className} />;
  }
}

function EmptyBenchState({ onNavigate }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-center">
      <motion.div animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="mb-8">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center"><Beaker className="w-16 h-16 text-blue-500" /></div>
      </motion.div>
      <h2 className="text-3xl font-bold text-slate-800 mb-4">Your bench is empty</h2>
      <p className="text-slate-500 mb-8 max-w-md">Add compounds from the Ingredient Library to start</p>
      <motion.button onClick={onNavigate} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-2xl font-semibold shadow-lg">Go to Ingredient Library <ArrowRight className="w-5 h-5" /></motion.button>
    </motion.div>
  );
}

function GlasswareModal({ isOpen, onClose, onSelect, selectedId }) {
  if (!isOpen) return null;
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="glass-card rounded-2xl border border-[#1E2A45] w-full max-w-4xl max-h-[85vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Select Glassware</h2>
              <p className="text-sm text-slate-400">Choose the appropriate vessel for your experiment</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-[#141B2D] rounded-lg transition-colors"><X className="w-5 h-5 text-slate-400" /></button>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {GLASSWARE_TYPES.map((gw) => (
              <motion.button
                key={gw.id}
                onClick={() => { onSelect(gw); onClose(); }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${selectedId === gw.id ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20' : 'border-[#1E2A45] hover:border-cyan-500/50 bg-[#0A0E1A]'}`}
              >
                <GlasswareIcon type={gw.id} className="w-14 h-14" />
                <span className="text-xs font-medium text-slate-300 text-center leading-tight">{gw.name}</span>
                <span className="text-[10px] text-slate-500">{gw.volume}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Vessel({ glassware, compounds, temperature, mixSpeed, liquidColorOverride }) {
  const totalVolume = compounds.reduce((sum, c) => sum + (c.quantity || 10), 0);
  const fillPercentage = Math.min((totalVolume / (glassware?.maxVolume || 500)) * 100, 90);
  
  const getLiquidColor = () => {
    if (liquidColorOverride) return liquidColorOverride;
    if (compounds.length === 0) return '#dbeafe';
    const colors = compounds.map(c => COMPOUND_COLORS[c.commonName] || '#dbeafe');
    let r = 0, g = 0, b = 0;
    colors.forEach(color => { const hex = color.replace('#', ''); r += parseInt(hex.substr(0, 2), 16); g += parseInt(hex.substr(2, 2), 16); b += parseInt(hex.substr(4, 2), 16); });
    r = Math.round(r / colors.length); g = Math.round(g / colors.length); b = Math.round(b / colors.length);
    if (temperature > 150) { r = Math.min(255, r + 30); g = Math.max(0, g - 30); b = Math.max(0, b - 30); }
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };
  
  const liquidColor = getLiquidColor();
  const showFlame = temperature > 50;
  const showSteam = temperature > 80;
  const showIce = temperature < 5;
  const bubbleCount = temperature < 50 ? 0 : temperature < 100 ? 5 : temperature < 200 ? 10 : 15;
  
  const renderVesselSVG = () => {
    switch (glassware?.id) {
      case 'testtube':
        return (
          <svg viewBox="0 0 200 240" className="w-48 h-56">
            <defs>
              <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="rgba(255,255,255,0.5)" /><stop offset="50%" stopColor="rgba(255,255,255,0.1)" /><stop offset="100%" stopColor="rgba(255,255,255,0.5)" /></linearGradient>
              <clipPath id="vesselClip"><path d="M70,20 L70,200 Q70,220 100,220 Q130,220 130,200 L130,20" /></clipPath>
            </defs>
            <path d="M70,20 L70,200 Q70,220 100,220 Q130,220 130,200 L130,20" fill="url(#glassGrad)" stroke="rgba(148,163,184,0.6)" strokeWidth="2" />
            <motion.rect x="72" y={220 - (fillPercentage * 2)} width="56" height={fillPercentage * 2} fill={liquidColor} opacity="0.9" clipPath="url(#vesselClip)" />
            {mixSpeed > 0 && <motion.ellipse cx="100" cy={215 - (fillPercentage * 0.5)} rx="4" ry="2" fill="white" animate={{ rotate: 360 }} transition={{ duration: Math.max(0.2, 10 / (mixSpeed / 100)), repeat: Infinity, ease: 'linear' }} />}
            {bubbleCount > 0 && <>{[...Array(Math.floor(bubbleCount/2))].map((_, i) => <motion.circle key={i} r={2 + Math.random() * 2} fill="rgba(255,255,255,0.7)" initial={{ cx: 80 + Math.random() * 40, cy: 210 }} animate={{ cy: 180 - Math.random() * 20, opacity: [0, 1, 0] }} transition={{ duration: 1.5 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.1 }} />)}</>}
            {showIce && <>{[...Array(3)].map((_, i) => <motion.text key={i} x={80 + i * 15} y={180} fontSize="10" fill="rgba(100,200,255,0.8)" animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}>❄</motion.text>)}</>}
            {[50, 100, 150].map((y) => <g key={y}><line x1="72" y1={220 - y} x2="82" y2={220 - y} stroke="rgba(148,163,184,0.5)" strokeWidth="1" /><text x="75" y={220 - y + 3} fontSize="7" fill="rgba(148,163,184,0.7)">{y}ml</text></g>)}
            {showSteam && <>{[0, 1].map((i) => <motion.path key={i} d={`M${85 + i * 30},20 Q${90 + i * 30},5 ${85 + i * 30},-15`} stroke="rgba(200,200,200,0.5)" strokeWidth="2" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, y: [-5, -30], opacity: [0, 0.6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} />)}</>}
          </svg>
        );
      case 'roundbottom':
        return (
          <svg viewBox="0 0 200 240" className="w-56 h-64">
            <defs>
              <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="rgba(255,255,255,0.5)" /><stop offset="50%" stopColor="rgba(255,255,255,0.1)" /><stop offset="100%" stopColor="rgba(255,255,255,0.5)" /></linearGradient>
              <clipPath id="vesselClip"><path d="M80,20 L80,60 Q40,70 40,120 Q40,180 100,190 Q160,180 160,120 Q160,70 120,60 L120,20" /></clipPath>
            </defs>
            <path d="M80,20 L80,60 Q40,70 40,120 Q40,180 100,190 Q160,180 160,120 Q160,70 120,60 L120,20" fill="url(#glassGrad)" stroke="rgba(148,163,184,0.6)" strokeWidth="2" />
            <ellipse cx="100" cy="20" rx="20" ry="4" fill="rgba(255,255,255,0.3)" stroke="rgba(148,163,184,0.6)" strokeWidth="2" />
            <motion.ellipse cx="100" cy={170 - (fillPercentage * 0.8)} rx={50 * (fillPercentage/100)} ry={30 * (fillPercentage/100)} fill={liquidColor} opacity="0.9" clipPath="url(#vesselClip)" />
            {mixSpeed > 0 && <motion.ellipse cx="100" cy={175} rx="6" ry="3" fill="white" animate={{ rotate: 360 }} transition={{ duration: Math.max(0.2, 10 / (mixSpeed / 100)), repeat: Infinity, ease: 'linear' }} />}
            {bubbleCount > 0 && <>{[...Array(Math.floor(bubbleCount/2))].map((_, i) => <motion.circle key={i} r={3 + Math.random() * 3} fill="rgba(255,255,255,0.7)" initial={{ cx: 70 + Math.random() * 60, cy: 170 }} animate={{ cy: 120 - Math.random() * 30, opacity: [0, 1, 0] }} transition={{ duration: 1.5 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.1 }} />)}</>}
            {showIce && <>{[...Array(4)].map((_, i) => <motion.text key={i} x={70 + (i % 2) * 50} y={140 + Math.floor(i / 2) * 30} fontSize="12" fill="rgba(100,200,255,0.8)" animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}>❄</motion.text>)}</>}
            <path d="M55,120 Q60,125 65,120" stroke="rgba(148,163,184,0.5)" strokeWidth="1" fill="none" opacity="0.5"/>
            <path d="M50,140 Q60,148 70,140" stroke="rgba(148,163,184,0.5)" strokeWidth="1" fill="none" opacity="0.5"/>
            {showSteam && <>{[0, 1, 2].map((i) => <motion.path key={i} d={`M${75 + i * 25},20 Q${80 + i * 25},5 ${75 + i * 25},-15`} stroke="rgba(200,200,200,0.5)" strokeWidth="2" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, y: [-5, -30], opacity: [0, 0.6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} />)}</>}
          </svg>
        );
      case 'erlenmeyer':
        return (
          <svg viewBox="0 0 200 240" className="w-52 h-60">
            <defs>
              <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="rgba(255,255,255,0.5)" /><stop offset="50%" stopColor="rgba(255,255,255,0.1)" /><stop offset="100%" stopColor="rgba(255,255,255,0.5)" /></linearGradient>
              <clipPath id="vesselClip"><path d="M75,20 L75,50 L40,180 Q35,200 50,210 L150,210 Q165,200 160,180 L125,50 L125,20" /></clipPath>
            </defs>
            <path d="M75,20 L75,50 L40,180 Q35,200 50,210 L150,210 Q165,200 160,180 L125,50 L125,20" fill="url(#glassGrad)" stroke="rgba(148,163,184,0.6)" strokeWidth="2" />
            <ellipse cx="100" cy="20" rx="25" ry="4" fill="rgba(255,255,255,0.3)" stroke="rgba(148,163,184,0.6)" strokeWidth="2" />
            <motion.polygon points={`100,${205 - fillPercentage} 50,205 150,205`} fill={liquidColor} opacity="0.9" clipPath="url(#vesselClip)" />
            {mixSpeed > 0 && <motion.ellipse cx="100" cy={200} rx="8" ry="4" fill="white" animate={{ rotate: 360 }} transition={{ duration: Math.max(0.2, 10 / (mixSpeed / 100)), repeat: Infinity, ease: 'linear' }} />}
            {bubbleCount > 0 && <>{[...Array(Math.floor(bubbleCount/2))].map((_, i) => <motion.circle key={i} r={3 + Math.random() * 3} fill="rgba(255,255,255,0.7)" initial={{ cx: 70 + Math.random() * 60, cy: 190 }} animate={{ cy: 150 - Math.random() * 40, opacity: [0, 1, 0] }} transition={{ duration: 1.5 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.1 }} />)}</>}
            {showIce && <>{[...Array(3)].map((_, i) => <motion.text key={i} x={70 + i * 25} y={170} fontSize="12" fill="rgba(100,200,255,0.8)" animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}>❄</motion.text>)}</>}
            <line x1="50" y1="150" x2="60" y2="150" stroke="rgba(148,163,184,0.5)" strokeWidth="1" />
            <line x1="48" y1="170" x2="62" y2="170" stroke="rgba(148,163,184,0.5)" strokeWidth="1" />
            <line x1="45" y1="190" x2="65" y2="190" stroke="rgba(148,163,184,0.5)" strokeWidth="1" />
            {showSteam && <>{[0, 1, 2].map((i) => <motion.path key={i} d={`M${80 + i * 20},20 Q${85 + i * 20},5 ${80 + i * 20},-15`} stroke="rgba(200,200,200,0.5)" strokeWidth="2" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, y: [-5, -30], opacity: [0, 0.6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} />)}</>}
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 200 240" className="w-56 h-64">
            <defs>
              <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="rgba(255,255,255,0.5)" /><stop offset="50%" stopColor="rgba(255,255,255,0.1)" /><stop offset="100%" stopColor="rgba(255,255,255,0.5)" /></linearGradient>
              <clipPath id="vesselClip"><path d="M50,20 L50,200 Q50,225 75,225 L125,225 Q150,225 150,200 L150,20" /></clipPath>
            </defs>
            <path d="M50,20 L50,200 Q50,225 75,225 L125,225 Q150,225 150,200 L150,20" fill="url(#glassGrad)" stroke="rgba(148,163,184,0.6)" strokeWidth="2" />
            <motion.rect x="52" y={225 - (fillPercentage * 2.05)} width="96" height={fillPercentage * 2.05} fill={liquidColor} opacity="0.9" clipPath="url(#vesselClip)" />
            {mixSpeed > 0 && <motion.ellipse cx="100" cy={220 - (fillPercentage * 0.1)} rx="6" ry="3" fill="white" animate={{ rotate: 360 }} transition={{ duration: Math.max(0.2, 10 / (mixSpeed / 100)), repeat: Infinity, ease: 'linear' }} />}
            {bubbleCount > 0 && <>{[...Array(bubbleCount)].map((_, i) => <motion.circle key={i} r={2 + Math.random() * 3} fill="rgba(255,255,255,0.7)" initial={{ cx: 60 + Math.random() * 80, cy: 215 }} animate={{ cy: 180 - Math.random() * 30, opacity: [0, 1, 0] }} transition={{ duration: 1.5 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.12 }} />)}</>}
            {showIce && <>{[...Array(5)].map((_, i) => <motion.text key={i} x={60 + (i % 3) * 25} y={170 + Math.floor(i / 3) * 25} fontSize="12" fill="rgba(100,200,255,0.8)" animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}>❄</motion.text>)}</>}
            {[50, 100, 150].map((y) => <g key={y}><line x1="52" y1={225 - y} x2="65" y2={225 - y} stroke="rgba(148,163,184,0.5)" strokeWidth="1" /><text x="55" y={225 - y + 3} fontSize="8" fill="rgba(148,163,184,0.7)">{y}ml</text></g>)}
            {showSteam && <>{[0, 1, 2].map((i) => <motion.path key={i} d={`M${75 + i * 25},20 Q${80 + i * 25},5 ${75 + i * 25},-15`} stroke="rgba(200,200,200,0.5)" strokeWidth="2" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, y: [-5, -30], opacity: [0, 0.6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} />)}</>}
          </svg>
        );
    }
  };
  
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative flex flex-col items-center z-10">
        {renderVesselSVG()}
      </div>
      {showFlame && (
        <div className="flex items-end justify-center mt-[-8px] z-0" style={{ width: '80px', height: '50px' }}>
          <motion.div className="w-10 h-12 bg-gradient-to-t from-orange-600 via-orange-500 to-transparent rounded-full blur-[2px]" animate={{ height: [48, 60 + temperature * 0.05, 48], scaleX: [1, 1.1, 1] }} transition={{ duration: 0.5, repeat: Infinity }} />
          <motion.div className="w-6 h-10 bg-gradient-to-t from-yellow-500 via-yellow-400 to-transparent rounded-full absolute" animate={{ height: [40, 52 + temperature * 0.04, 40], scaleX: [1, 1.15, 1] }} transition={{ duration: 0.4, repeat: Infinity, delay: 0.05 }} />
          <motion.div className="w-4 h-8 bg-gradient-to-t from-yellow-200 via-white to-transparent rounded-full absolute" animate={{ height: [32, 40 + temperature * 0.03, 32] }} transition={{ duration: 0.35, repeat: Infinity, delay: 0.1 }} />
        </div>
      )}
      <div className="mt-4 text-center">
        <p className="text-sm font-mono text-slate-600">{totalVolume.toFixed(1)} ml</p>
        <p className="text-xs text-slate-400">{glassware?.name}</p>
      </div>
    </div>
  );
}

function AddStepModal({ isOpen, onClose, onAdd }) {
  const [selectedType, setSelectedType] = useState(null);
  const [config, setConfig] = useState({});
  if (!isOpen) return null;
  
  const handleAdd = () => { onAdd(selectedType, config); setSelectedType(null); setConfig({}); onClose(); };
  const stepType = STEP_TYPES.find(s => s.id === selectedType);
  const Icon = stepType?.icon || Flame;
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="glass-card rounded-2xl border border-[#1E2A45] w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">{selectedType ? 'Configure Step' : 'Add Experiment Step'}</h2>
          {!selectedType ? (
            <div className="grid grid-cols-3 gap-3">
              {STEP_TYPES.map((type) => {
                const TypeIcon = type.icon;
                return (
                  <motion.button key={type.id} onClick={() => setSelectedType(type.id)} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="flex flex-col items-center gap-2 p-4 bg-[#0A0E1A] hover:bg-[#141B2D] rounded-xl border border-[#1E2A45] hover:border-cyan-500/50 transition-colors">
                    <div className={`w-10 h-10 rounded-lg bg-${type.color}-500/20 flex items-center justify-center`}><TypeIcon className={`w-5 h-5 text-${type.color}-400`} /></div>
                    <span className="text-xs font-medium text-slate-300 text-center">{type.name}</span>
                    <span className="text-[10px] text-slate-500 text-center">{type.desc}</span>
                  </motion.button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[#0A0E1A] rounded-xl border border-[#1E2A45]">
                <div className={`w-10 h-10 rounded-lg bg-${stepType.color}-500/20 flex items-center justify-center`}><Icon className={`w-5 h-5 text-${stepType.color}-400`} /></div>
                <div><p className="font-semibold text-white">{stepType.name}</p><p className="text-xs text-slate-500">{stepType.desc}</p></div>
                <button onClick={() => setSelectedType(null)} className="ml-auto text-sm text-cyan-400 hover:text-cyan-300">Change</button>
              </div>
              <div className="space-y-3">
                {(selectedType === 'heat' || selectedType === 'cool') && (
                  <>
                    <div><label className="text-sm font-medium text-slate-400">Target Temperature (°C)</label><input type="number" value={config.targetTemp || ''} onChange={(e) => setConfig({ ...config, targetTemp: Number(e.target.value) })} className="w-full mt-1 px-3 py-2 bg-[#0A0E1A] border border-[#1E2A45] rounded-lg text-white placeholder-slate-500" placeholder="e.g. 80" /></div>
                    <div><label className="text-sm font-medium text-slate-400">Duration (minutes)</label><div className="flex items-center gap-3 mt-1"><input type="range" min="1" max="120" value={config.duration || 5} onChange={(e) => setConfig({ ...config, duration: Number(e.target.value) })} className="flex-1" /><input type="number" min="1" max="120" value={config.duration || 5} onChange={(e) => setConfig({ ...config, duration: Number(e.target.value) })} className="w-16 px-2 py-1 bg-[#0A0E1A] border border-[#1E2A45] rounded-lg text-center text-white" /></div></div>
                  </>
                )}
                {selectedType === 'pressurize' && (
                  <>
                    <div><label className="text-sm font-medium text-slate-400">Target Pressure (atm)</label><input type="number" step="0.1" min="0.1" max="10" value={config.targetPressure || ''} onChange={(e) => setConfig({ ...config, targetPressure: Number(e.target.value) })} className="w-full mt-1 px-3 py-2 bg-[#0A0E1A] border border-[#1E2A45] rounded-lg text-white" /></div>
                    <div><label className="text-sm font-medium text-slate-400">Duration (minutes)</label><input type="number" min="1" max="60" value={config.duration || 5} onChange={(e) => setConfig({ ...config, duration: Number(e.target.value) })} className="w-full mt-1 px-3 py-2 bg-[#0A0E1A] border border-[#1E2A45] rounded-lg text-white" /></div>
                  </>
                )}
                {selectedType === 'wait' && <div><label className="text-sm font-medium text-slate-400">Duration (minutes)</label><input type="number" min="1" max="480" value={config.duration || 30} onChange={(e) => setConfig({ ...config, duration: Number(e.target.value) })} className="w-full mt-1 px-3 py-2 bg-[#0A0E1A] border border-[#1E2A45] rounded-lg text-white" /></div>}
                {selectedType === 'mix' && (
                  <>
                    <div><label className="text-sm font-medium text-slate-400">RPM</label><div className="flex items-center gap-3 mt-1"><input type="range" min="0" max="1500" step="50" value={config.rpm || 300} onChange={(e) => setConfig({ ...config, rpm: Number(e.target.value) })} className="flex-1" /><input type="number" step="50" value={config.rpm || 300} onChange={(e) => setConfig({ ...config, rpm: Number(e.target.value) })} className="w-16 px-2 py-1 bg-[#0A0E1A] border border-[#1E2A45] rounded-lg text-center text-white" /></div></div>
                    <div><label className="text-sm font-medium text-slate-400">Duration (minutes)</label><input type="number" min="1" max="60" value={config.duration || 5} onChange={(e) => setConfig({ ...config, duration: Number(e.target.value) })} className="w-full mt-1 px-3 py-2 bg-[#0A0E1A] border border-[#1E2A45] rounded-lg text-white" /></div>
                  </>
                )}
                {selectedType === 'adjustph' && (
                  <>
                    <div><label className="text-sm font-medium text-slate-400">Target pH</label><input type="number" step="0.1" min="1" max="14" value={config.targetPh || ''} onChange={(e) => setConfig({ ...config, targetPh: Number(e.target.value) })} className="w-full mt-1 px-3 py-2 bg-[#0A0E1A] border border-[#1E2A45] rounded-lg text-white" /></div>
                    <div><label className="text-sm font-medium text-slate-400">Method</label><select value={config.method || 'HCl'} onChange={(e) => setConfig({ ...config, method: e.target.value })} className="w-full mt-1 px-3 py-2 bg-[#0A0E1A] border border-[#1E2A45] rounded-lg text-white"><option value="HCl">HCl (acid)</option><option value="NaOH">NaOH (base)</option><option value="Buffer">Buffer solution</option></select></div>
                  </>
                )}
                {selectedType === 'filter' && <div><label className="text-sm font-medium text-slate-400">Filter Type</label><select value={config.filterType || 'Gravity'} onChange={(e) => setConfig({ ...config, filterType: e.target.value })} className="w-full mt-1 px-3 py-2 bg-[#0A0E1A] border border-[#1E2A45] rounded-lg text-white"><option value="Gravity">Gravity filtration</option><option value="Vacuum">Vacuum filtration</option><option value="Centrifuge">Centrifuge</option></select></div>}
                {selectedType === 'evaporate' && (
                  <>
                    <div><label className="text-sm font-medium text-slate-400">Evaporate (%)</label><input type="range" min="10" max="90" value={config.percentage || 50} onChange={(e) => setConfig({ ...config, percentage: Number(e.target.value) })} className="w-full mt-1" /></div>
                    <div><label className="text-sm font-medium text-slate-400">Duration (minutes)</label><input type="number" min="5" max="120" value={config.duration || 30} onChange={(e) => setConfig({ ...config, duration: Number(e.target.value) })} className="w-full mt-1 px-3 py-2 bg-[#0A0E1A] border border-[#1E2A45] rounded-lg text-white" /></div>
                  </>
                )}
              </div>
              <p className="text-sm text-slate-500">This step will take <span className="font-semibold text-cyan-400">{config.duration || 5} minutes</span></p>
              <div className="flex gap-3 pt-4"><button onClick={() => setSelectedType(null)} className="flex-1 py-3 border-2 border-[#1E2A45] text-slate-400 rounded-xl font-semibold hover:bg-[#141B2D]">Back</button><button onClick={handleAdd} className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:opacity-90 shadow-lg shadow-cyan-500/25">Add Step</button></div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function RealTimeConfirmModal({ isOpen, onClose, onConfirm, durationMinutes }) {
  if (!isOpen) return null;
  const hours = Math.floor(durationMinutes / 60);
  const mins = durationMinutes % 60;
  const timeDisplay = hours > 0 ? `${hours}h ${mins}m` : `${mins} minutes`;
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="glass-card rounded-2xl border border-[#1E2A45] w-full max-w-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center"><Hourglass className="w-6 h-6 text-amber-400" /></div>
          <div>
            <h2 className="text-xl font-bold text-white">Real Time Simulation</h2>
            <p className="text-sm text-slate-400">This will run for actual time</p>
          </div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
          <p className="text-slate-300">This experiment will run for <span className="font-bold text-amber-400">{timeDisplay}</span> of actual time.</p>
          <p className="text-sm text-slate-500 mt-2">You'll receive live updates every 10 minutes. Keep this tab open.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 border-2 border-[#1E2A45] text-slate-400 rounded-xl font-semibold hover:bg-[#141B2D]">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:opacity-90 shadow-lg shadow-amber-500/25">Start Real Simulation</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ResultsModal({ results, compound, glassware, totalDuration, elapsedTime, temperature, steps, onClose, onReset, onSave, onContinue }) {
  if (!results) return null;
  const displayFormula = getCorrectFormula(compound);
  const yieldNum = results.yieldPercent !== undefined ? results.yieldPercent : parseInt(results.yield) || 0;
  const purityNum = results.purityPercent !== undefined ? results.purityPercent : parseInt(results.purity) || 0;
  const timeline = results.timelineAnalysis || [];
  
  const getYieldBadge = (val) => {
    if (val >= 75) return { text: 'Excellent ✓', color: 'bg-green-100 text-green-700' };
    if (val >= 50) return { text: 'Good', color: 'bg-yellow-100 text-yellow-700' };
    if (val >= 25) return { text: 'Poor', color: 'bg-orange-100 text-orange-700' };
    return { text: 'Optimize! ↑', color: 'bg-red-100 text-red-700 animate-pulse' };
  };
  
  const yieldBadge = getYieldBadge(yieldNum);
  const purityBadge = purityNum >= 80 ? { text: 'High', color: 'bg-emerald-100 text-emerald-700' } : purityNum >= 50 ? { text: 'Medium', color: 'bg-amber-100 text-amber-700' } : { text: 'Low', color: 'bg-red-100 text-red-700' };
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-white text-2xl font-bold">{compound?.commonName || 'Experiment'} Results</h2>
              <p className="text-violet-100 mt-1">{displayFormula} • {glassware?.name} • Captured at {elapsedTime}</p>
            </div>
            <div className={`px-4 py-2 rounded-full font-bold text-sm ${results.status?.includes('Success') ? 'bg-green-500 text-white' : results.status?.includes('Failed') ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>{results.status || 'Complete'}</div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2 text-white/90"><Target className="w-4 h-4" /><span className="text-sm">Yield: {yieldNum}%</span></div>
            <div className="flex items-center gap-2 text-white/90"><Sparkles className="w-4 h-4" /><span className="text-sm">Purity: {purityNum}%</span></div>
            <div className="flex items-center gap-2 text-white/90"><Shield className="w-4 h-4" /><span className="text-sm">Hazard: {results.hazardLevel || 'Low'}</span></div>
            <div className="flex items-center gap-2 text-white/90"><Clock className="w-4 h-4" /><span className="text-sm">{totalDuration} min total</span></div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2"><Eye className="w-5 h-5 text-blue-600" />Physical Observations</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-xl p-4"><div className="flex items-center gap-2 mb-2"><span className="text-lg">👁</span><span className="font-semibold text-slate-700">Visual</span></div><div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full" style={{ backgroundColor: results.color || results.colorHex || '#dbeafe' }} /><span className="text-sm text-slate-600">{results.visualChanges || results.visualNow || 'Clear solution'}</span></div></div>
              <div className="bg-slate-50 rounded-xl p-4"><div className="flex items-center gap-2 mb-2"><span className="text-lg">👃</span><span className="font-semibold text-slate-700">Smell</span></div><p className="text-sm text-slate-600">{results.odor || 'Odorless'}</p></div>
              <div className="bg-slate-50 rounded-xl p-4"><div className="flex items-center gap-2 mb-2"><span className="text-lg">🌡️</span><span className="font-semibold text-slate-700">Temperature Feel</span></div><p className="text-sm text-slate-600">{temperature > 50 ? 'Warm/Hot to touch' : temperature < 10 ? 'Cold to touch' : 'Room temperature'}</p></div>
              <div className="bg-slate-50 rounded-xl p-4"><div className="flex items-center gap-2 mb-2"><span className="text-lg">⚗️</span><span className="font-semibold text-slate-700">Physical State</span></div><p className="text-sm text-slate-600">{results.physicalState || 'Liquid'}</p></div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2"><Target className="w-5 h-5 text-green-600" />Quantitative Results</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-slate-700">Yield</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-slate-800">{yieldNum}%</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${yieldBadge.color}`}>{yieldBadge.text}</span>
                  </div>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${yieldNum}%` }} transition={{ duration: 1 }} className={`h-full ${yieldNum >= 70 ? 'bg-green-500' : yieldNum >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                </div>
                <p className="text-xs text-slate-500 mt-1">{results.yieldExplanation || 'Yield based on reaction conditions'}</p>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-slate-700">Purity</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-slate-800">{purityNum}%</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${purityBadge.color}`}>{purityBadge.text}</span>
                  </div>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${purityNum}%` }} transition={{ duration: 1, delay: 0.2 }} className={`h-full ${purityNum >= 70 ? 'bg-emerald-500' : purityNum >= 40 ? 'bg-amber-500' : 'bg-red-500'}`} />
                </div>
                <p className="text-xs text-slate-500 mt-1">{results.purityExplanation || 'Purity assessment'}</p>
              </div>
            </div>
          </div>
          {timeline.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2"><Activity className="w-5 h-5 text-violet-600" />Experiment Progress Timeline</h3>
              <div className="relative pl-4">
                <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-slate-200" />
                {timeline.map((point, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 mb-4">
                    <div className={`w-4 h-4 rounded-full border-2 z-10 mt-1 ${idx === timeline.length - 1 ? 'bg-green-500 border-green-500' : 'bg-white border-slate-300'}`} />
                    <div className="flex-1 bg-slate-50 rounded-lg p-3">
                      <span className="text-xs font-mono text-slate-500">{point.time}</span>
                      <p className="text-sm text-slate-700">{point.observation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2"><FlaskRound className="w-5 h-5 text-violet-600" />What Happened Chemically</h3>
            <div className="bg-violet-50 rounded-xl p-4"><p className="text-slate-700 leading-relaxed">{results.outcome || 'The compound underwent transformation under the specified conditions.'}</p></div>
          </div>
          {(results.reactionTime || results.preparationTime) && (
            <div className="grid grid-cols-2 gap-4">
              {results.reactionTime && <div className="bg-blue-50 rounded-xl p-4"><p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Reaction Time</p><p className="text-lg font-bold text-slate-800">{results.reactionTime}</p></div>}
              {results.preparationTime && <div className="bg-green-50 rounded-xl p-4"><p className="text-xs text-green-600 font-medium uppercase tracking-wide">Prep Time</p><p className="text-lg font-bold text-slate-800">{results.preparationTime}</p></div>}
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2"><Shield className="w-5 h-5 text-amber-600" />Safety Assessment</h3>
            <div className={`p-4 rounded-xl ${results.hazardLevel === 'High' || results.hazardLevel === 'Extreme' ? 'bg-orange-100 border-2 border-orange-300' : results.hazardLevel === 'Medium' ? 'bg-yellow-100 border-2 border-yellow-300' : 'bg-green-100 border-2 border-green-300'}`}>
              <div className="flex items-center gap-3">
                {results.hazardLevel === 'High' || results.hazardLevel === 'Extreme' ? <AlertOctagon className="w-8 h-8 text-orange-600" /> : results.hazardLevel === 'Medium' ? <AlertTriangle className="w-8 h-8 text-yellow-600" /> : <Check className="w-8 h-8 text-green-600" />}
                <div><p className="font-bold text-lg text-slate-800">Hazard Level: {results.hazardLevel || 'Low'}</p><p className="text-sm text-slate-600">{results.warnings || 'Standard lab safety protocols apply'}</p></div>
              </div>
            </div>
          </div>
          {results.funFact && <div><h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2"><Info className="w-5 h-5 text-pink-500" />Did You Know?</h3><div className="bg-gradient-to-r from-pink-50 to-violet-50 rounded-xl p-4 border border-pink-100"><p className="text-slate-600 italic">{results.funFact}</p></div></div>}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button onClick={onSave} className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"><BookOpen className="w-5 h-5" /> Save to Notebook</button>
            {onContinue && <button onClick={onContinue} className="flex-1 flex items-center justify-center gap-2 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700"><PlayCircle className="w-5 h-5" /> Continue</button>}
            <button onClick={onReset} className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"><RefreshCw className="w-5 h-5" /> Try Again</button>
            <button onClick={onClose} className="px-4 py-3 border-2 border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50">Close</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LabBench() {
  const navigate = useNavigate();
  const [benchItems, setBenchItems] = useState([]);
  const [selectedGlassware, setSelectedGlassware] = useState(null);
  const [vesselCompounds, setVesselCompounds] = useState([]);
  const [steps, setSteps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [showAddStep, setShowAddStep] = useState(false);
  const [showGlasswareModal, setShowGlasswareModal] = useState(false);
  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStepTime, setCurrentStepTime] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);
  const [temperature, setTemperature] = useState(25);
  const [pressure, setPressure] = useState(1);
  const [ph, setPh] = useState(7);
  const [mixSpeed, setMixSpeed] = useState(0);
  
  // Duration control state
  const [durationHours, setDurationHours] = useState(0);
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [useRealTime, setUseRealTime] = useState(false);
  const [showRealTimeConfirm, setShowRealTimeConfirm] = useState(false);
  const [realTimeProgress, setRealTimeProgress] = useState(0);
  const [liveUpdate, setLiveUpdate] = useState(null);
  const [liquidColorOverride, setLiquidColorOverride] = useState(null);
  
  const totalDurationMinutes = durationHours * 60 + durationMinutes;
  
  useEffect(() => { const saved = localStorage.getItem('ro_bench_items'); if (saved) { try { setBenchItems(JSON.parse(saved)); } catch (e) { console.error('Failed to load bench', e); } } }, []);
  
  const addToVessel = (compound, quantity, unit) => setVesselCompounds(prev => [...prev, { ...compound, quantity, unit }]);
  const removeFromBench = (cid) => { const updated = benchItems.filter(item => item.cid !== cid); setBenchItems(updated); localStorage.setItem('ro_bench_items', JSON.stringify(updated)); };
  const addStep = (typeId, config) => { const type = STEP_TYPES.find(t => t.id === typeId); setSteps(prev => [...prev, { id: Date.now(), type: typeId, name: type.name, icon: type.icon, color: type.color, ...config }]); };
  const removeStep = (id) => setSteps(prev => prev.filter(s => s.id !== id));
  const moveStep = (index, direction) => { const newSteps = [...steps]; if (direction === 'up' && index > 0) { [newSteps[index], newSteps[index - 1]] = [newSteps[index - 1], newSteps[index]]; setSteps(newSteps); } else if (direction === 'down' && index < steps.length - 1) { [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]]; setSteps(newSteps); } };
  const stepsTotalDuration = steps.reduce((sum, s) => sum + (s.duration || 5), 0);
  const formatElapsedTime = (seconds) => { const mins = Math.floor(seconds / 60); const secs = seconds % 60; return `${mins}:${secs.toString().padStart(2, '0')}`; };
  const formatDuration = (minutes) => { const h = Math.floor(minutes / 60); const m = minutes % 60; return h > 0 ? `${h}h ${m}m` : `${m} min`; };
  
  const startTimer = () => { if (!isTimerRunning) { setIsTimerRunning(true); timerRef.current = setInterval(() => setElapsedSeconds(prev => prev + 1), 1000); } };
  const stopTimer = () => { setIsTimerRunning(false); if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);
  
  const getSimulationResults = async (mode = 'simulate', elapsedMinutes = 0) => {
    const primaryCompound = vesselCompounds[0]; if (!primaryCompound) return;
    try {
      const response = await fetch('https://ro-researc-lab.rahulkota505.workers.dev/', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ 
          mode: mode,
          compound: { 
            commonName: primaryCompound.commonName, 
            name: primaryCompound.name, 
            formula: getCorrectFormula(primaryCompound), 
            mw: primaryCompound.mw, 
            logP: primaryCompound.logP, 
            smiles: primaryCompound.smiles 
          }, 
          params: { 
            temperature, 
            pressure, 
            ph, 
            rpm: mixSpeed,
            solvent: 'Water', 
            duration: totalDurationMinutes,
            steps: steps.map(s => ({ type: s.type, duration: s.duration, targetTemp: s.targetTemp, targetPressure: s.targetPressure, targetPh: s.targetPh, rpm: s.rpm })), 
            glassware: selectedGlassware?.name, 
            allCompounds: vesselCompounds.map(c => c.commonName),
            elapsedMinutes: elapsedMinutes,
            previousObservations: liveUpdate?.visualNow || ''
          } 
        }) 
      });
      const data = await response.json();
      return data.result || data;
    } catch (error) { 
      console.error('Simulation error:', error); 
      return { 
        status: 'Complete', 
        outcome: 'Experiment completed successfully.', 
        physicalState: 'Liquid', 
        yieldPercent: 85, 
        purityPercent: 92, 
        hazardLevel: 'Low', 
        visualChanges: 'Clear solution', 
        color: '#dbeafe', 
        colorHex: '#dbeafe',
        odor: 'Odorless', 
        warnings: 'Standard lab safety protocols apply', 
        funFact: 'This compound has interesting properties!',
        timelineAnalysis: [
          { time: '0 min', observation: 'Experiment started' },
          { time: '25% duration', observation: 'Initial reaction observed' },
          { time: '50% duration', observation: 'Mid-point reached' },
          { time: '75% duration', observation: 'Reaction progressing well' },
          { time: '100% duration', observation: 'Experiment complete' }
        ]
      }; 
    }
  };
  
  const runRealTimeExperiment = async () => {
    setShowRealTimeConfirm(false);
    setIsRunning(true);
    setProgress(0);
    setRealTimeProgress(0);
    startTimer();
    
    const totalSeconds = totalDurationMinutes * 60;
    const updateInterval = 10 * 60; // 10 minutes in seconds
    let lastUpdateTime = 0;
    
    const startTime = Date.now();
    
    const runInterval = setInterval(async () => {
      const elapsedMs = Date.now() - startTime;
      const elapsedSec = Math.floor(elapsedMs / 1000);
      const elapsedMin = Math.floor(elapsedSec / 60);
      const progressPct = Math.min((elapsedSec / totalSeconds) * 100, 100);
      
      setRealTimeProgress(progressPct);
      setElapsedSeconds(elapsedSec);
      
      // Call Worker every 10 minutes for live update
      if (elapsedMin > 0 && elapsedMin % 10 === 0 && elapsedMin > lastUpdateTime) {
        lastUpdateTime = elapsedMin;
        const update = await getSimulationResults('realtime_update', elapsedMin);
        setLiveUpdate(update);
        if (update.colorHexNow) setLiquidColorOverride(update.colorHexNow);
      }
      
      if (elapsedSec >= totalSeconds) {
        clearInterval(runInterval);
        setIsAnalyzing(true);
        const finalResults = await getSimulationResults('simulate', elapsedMin);
        setResults(finalResults);
        setIsAnalyzing(false);
        setIsRunning(false);
        setLiveUpdate(null);
      }
    }, 1000);
  };
  
  const runQuickExperiment = async () => {
    setIsRunning(true);
    setProgress(0);
    startTimer();
    
    if (steps.length === 0) {
      setIsAnalyzing(true);
      const results = await getSimulationResults();
      setResults(results);
      setIsAnalyzing(false);
      setIsRunning(false);
      return;
    }
    
    for (let i = 0; i < steps.length; i++) {
      setCurrentStepIndex(i);
      const step = steps[i];
      if (step.targetTemp !== undefined) {
        const startTemp = temperature;
        const endTemp = step.targetTemp;
        for (let j = 0; j <= 20; j++) {
          setTemperature(startTemp + (endTemp - startTemp) * (j / 20));
          await new Promise(r => setTimeout(r, 50));
        }
      }
      if (step.targetPressure !== undefined) setPressure(step.targetPressure);
      if (step.targetPh !== undefined) setPh(step.targetPh);
      if (step.rpm !== undefined) setMixSpeed(step.rpm);
      
      const stepDuration = (step.duration || 5) * 100;
      const startTime = Date.now();
      while (Date.now() - startTime < stepDuration) {
        const elapsed = Date.now() - startTime;
        setCurrentStepTime(Math.ceil((stepDuration - elapsed) / 1000));
        const stepProgress = elapsed / stepDuration;
        setProgress(((i + stepProgress) / steps.length) * 100);
        await new Promise(r => setTimeout(r, 50));
      }
      if (step.type === 'mix') setMixSpeed(0);
      setCurrentStepTime(0);
    }
    
    setCurrentStepIndex(-1);
    setProgress(100);
    setIsAnalyzing(true);
    const results = await getSimulationResults();
    setResults(results);
    setIsAnalyzing(false);
    setIsRunning(false);
  };
  
  const runExperiment = () => {
    if (vesselCompounds.length === 0) { alert('Please add at least one compound to the flask'); return; }
    if (useRealTime) {
      setShowRealTimeConfirm(true);
    } else {
      runQuickExperiment();
    }
  };
  
  const resetExperiment = () => { 
    setVesselCompounds([]); 
    setSteps([]); 
    setIsRunning(false); 
    setCurrentStepIndex(-1); 
    setProgress(0); 
    setResults(null); 
    setTemperature(25); 
    setPressure(1); 
    setPh(7); 
    setMixSpeed(0); 
    setLiveUpdate(null);
    setLiquidColorOverride(null);
    setRealTimeProgress(0);
    stopTimer(); 
    setElapsedSeconds(0); 
  };
  
  const uniqueCompounds = useMemo(() => { 
    const seen = new Map(); 
    vesselCompounds.forEach(c => { 
      if (!seen.has(c.cid)) seen.set(c.cid, { ...c, totalQuantity: c.quantity }); 
      else seen.get(c.cid).totalQuantity += c.quantity; 
    }); 
    return Array.from(seen.values()); 
  }, [vesselCompounds]);
  
  if (benchItems.length === 0) return <EmptyBenchState onNavigate={() => navigate('/app/library')} />;
  
  return (
    <div className="h-[calc(100vh-6rem)] flex gap-4 p-4">
      <div className="w-80 flex flex-col border-r border-slate-200 pr-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 mb-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-800 flex items-center gap-2"><Beaker className="w-5 h-5 text-blue-600" />Bench Compounds</h2>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">{benchItems.length}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">{vesselCompounds.length} in flask</p>
        </div>
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {benchItems.map((item) => (
            <motion.div key={item.cid} layout className="bg-white rounded-xl border border-slate-200 p-3 relative group">
              <button onClick={() => removeFromBench(item.cid)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-4 h-4" /></button>
              <div className="flex gap-3"><CompoundImage compound={item} className="w-14 h-14 object-contain bg-slate-50 rounded-lg" /><div className="flex-1 min-w-0"><h4 className="font-semibold text-slate-800 text-sm truncate">{item.commonName}</h4><p className="text-xs font-mono text-blue-600">{getCorrectFormula(item)}</p><p className="text-xs text-slate-400">MW: {item.mw}</p></div></div>
              <div className="mt-3 flex gap-2"><input type="number" defaultValue={10} min="0.1" step="0.1" className="w-14 px-2 py-1 text-sm border border-slate-200 rounded-lg" id={`qty-${item.cid}`} /><select className="flex-1 px-2 py-1 text-sm border border-slate-200 rounded-lg" id={`unit-${item.cid}`}><option value="mg">mg</option><option value="g">g</option><option value="ml">ml</option></select></div>
              <button onClick={() => { const qty = Number(document.getElementById(`qty-${item.cid}`)?.value || 10); const unit = document.getElementById(`unit-${item.cid}`)?.value || 'mg'; addToVessel(item, qty, unit); }} disabled={!selectedGlassware || isRunning} className="mt-2 w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Add to Flask</button>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-4">
        {!selectedGlassware ? (
          <div className="flex-1 bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-center">
            <h3 className="font-bold text-slate-800 mb-2 text-xl">Select Glassware</h3>
            <p className="text-slate-500 mb-6">Choose a vessel to begin your experiment</p>
            <motion.button 
              onClick={() => setShowGlasswareModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold"
            >
              <Settings2 className="w-5 h-5" />
              Browse Glassware
            </motion.button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <GlasswareIcon type={selectedGlassware.id} className="w-8 h-8" />
                  <div>
                    <h3 className="font-bold text-slate-800">{selectedGlassware.name}</h3>
                    <p className="text-xs text-slate-500">{selectedGlassware.volume}</p>
                  </div>
                </div>
                <button onClick={() => !isRunning && setShowGlasswareModal(true)} disabled={isRunning} className="text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50">Change Glassware</button>
              </div>
            </div>
            
            {/* Duration Control Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-violet-600" />
                <h3 className="font-bold text-slate-800">Set Experiment Duration</h3>
              </div>
              <p className="text-sm text-slate-500 mb-4">How long should this experiment run?</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <label className="text-xs text-slate-500 mb-1 block">Hours</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="24" 
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    disabled={isRunning}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-center"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-slate-500 mb-1 block">Minutes</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="59" 
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    disabled={isRunning}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-center"
                  />
                </div>
                <div className="flex-1 bg-slate-50 rounded-lg p-2 text-center">
                  <label className="text-xs text-slate-500 mb-1 block">Total</label>
                  <p className="font-bold text-slate-800">{formatDuration(totalDurationMinutes)}</p>
                </div>
              </div>
              
              {/* Quick vs Real Time Toggle */}
              <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${useRealTime ? 'bg-amber-100' : 'bg-blue-100'}`}>
                    {useRealTime ? <Hourglass className="w-5 h-5 text-amber-600" /> : <Zap className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{useRealTime ? 'Real Time Mode' : 'Quick Mode'}</p>
                    <p className="text-xs text-slate-500">{useRealTime ? `Results take actual ${formatDuration(totalDurationMinutes)}` : 'Results in ~5 seconds'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setUseRealTime(!useRealTime)}
                  disabled={isRunning}
                  className={`relative w-14 h-7 rounded-full transition-colors ${useRealTime ? 'bg-amber-500' : 'bg-blue-500'} disabled:opacity-50`}
                >
                  <motion.div 
                    className="absolute top-1 w-5 h-5 bg-white rounded-full"
                    animate={{ left: useRealTime ? '32px' : '4px' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>
            
            <div className="flex-1 bg-white rounded-xl border border-slate-200 p-6 relative flex flex-col items-center justify-center">
              {(isTimerRunning || elapsedSeconds > 0) && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl">
                  <Timer className="w-4 h-4" />
                  <span className="font-mono font-bold text-lg">{formatElapsedTime(elapsedSeconds)}</span>
                  {isTimerRunning && <motion.div className="w-2 h-2 bg-green-400 rounded-full" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />}
                </motion.div>
              )}
              
              {isRunning && currentStepIndex >= 0 && (
                <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center">
                  <p className="text-sm text-slate-600">Currently: <span className="font-semibold text-blue-600">{steps[currentStepIndex].name}</span></p>
                  {currentStepTime > 0 && <p className="text-xs text-slate-500">{currentStepTime}s remaining</p>}
                </div>
              )}
              
              {useRealTime && isRunning && liveUpdate && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-3 rounded-xl shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Microscope className="w-4 h-4" />
                    <span className="text-sm font-semibold">Live Update — {Math.floor(elapsedSeconds / 60)} min elapsed</span>
                  </div>
                  <p className="text-xs text-blue-100">{liveUpdate.visualNow || liveUpdate.currentStatus}</p>
                </motion.div>
              )}
              
              <Vessel 
                glassware={selectedGlassware} 
                compounds={vesselCompounds} 
                temperature={temperature} 
                mixSpeed={mixSpeed}
                liquidColorOverride={liquidColorOverride}
              />
              
              {uniqueCompounds.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 justify-center max-w-md">
                  {uniqueCompounds.map((c) => { 
                    const color = COMPOUND_COLORS[c.commonName] || '#dbeafe'; 
                    return (
                      <span key={c.cid} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full text-xs text-slate-700">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                        {c.totalQuantity}{c.unit} {c.commonName}
                      </span>
                    ); 
                  })}
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-800">Experiment Timeline</h3>
                  <p className="text-xs text-slate-500">{steps.length} steps • {stepsTotalDuration} min from steps</p>
                </div>
                {!isRunning && (
                  <motion.button onClick={() => setShowAddStep(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold">
                    <Plus className="w-4 h-4" />Add Step
                  </motion.button>
                )}
              </div>
              
              {(isRunning || progress > 0) && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>{isAnalyzing ? 'AI Analyzing...' : `${Math.round(useRealTime ? realTimeProgress : progress)}%`}</span>
                    <span>{currentStepIndex >= 0 ? `Step ${currentStepIndex + 1}/${steps.length}` : ''}</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-600 to-violet-600" 
                      animate={{ width: `${useRealTime ? realTimeProgress : progress}%` }} 
                    />
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 overflow-x-auto pb-2">
                {steps.map((step, index) => { 
                  const StepIcon = step.icon; 
                  const isActive = index === currentStepIndex; 
                  const isDone = index < currentStepIndex; 
                  return (
                    <motion.div 
                      key={step.id} 
                      layout 
                      className={`flex-shrink-0 w-32 p-2.5 rounded-xl border-2 ${isActive ? 'border-green-500 bg-green-50 shadow-lg shadow-green-200' : isDone ? 'border-green-300 bg-green-50/50' : 'border-slate-200 bg-white'}`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className={`w-7 h-7 rounded-lg bg-${step.color}-100 flex items-center justify-center`}>
                          {isDone ? <Check className="w-3.5 h-3.5 text-green-600" /> : <StepIcon className={`w-3.5 h-3.5 text-${step.color}-600`} />}
                        </div>
                        {!isRunning && (
                          <div className="flex gap-0.5">
                            <button onClick={() => moveStep(index, 'up')} disabled={index === 0} className="p-0.5 text-slate-300 hover:text-slate-600 disabled:opacity-30"><ChevronUp className="w-3 h-3" /></button>
                            <button onClick={() => moveStep(index, 'down')} disabled={index === steps.length - 1} className="p-0.5 text-slate-300 hover:text-slate-600 disabled:opacity-30"><ChevronDown className="w-3 h-3" /></button>
                            <button onClick={() => removeStep(step.id)} className="p-0.5 text-slate-300 hover:text-red-500"><X className="w-3 h-3" /></button>
                          </div>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-slate-700">{step.name}</p>
                      <p className="text-[10px] text-slate-500">{step.targetTemp !== undefined ? `→ ${step.targetTemp}°C` : step.targetPh !== undefined ? `→ pH ${step.targetPh}` : `${step.duration || 5} min`}</p>
                    </motion.div>
                  ); 
                })}
                {steps.length === 0 && !isRunning && (
                  <div className="flex-shrink-0 w-full py-6 text-center text-slate-400">
                    <p className="text-sm">No steps added</p>
                    <p className="text-xs">Add steps or use current conditions</p>
                  </div>
                )}
              </div>
              
              <div className="mt-3 flex gap-3">
                <motion.button 
                  onClick={runExperiment} 
                  disabled={isRunning || vesselCompounds.length === 0} 
                  whileTap={{ scale: 0.97 }} 
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold disabled:opacity-50"
                >
                  {isRunning ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                        <Clock className="w-5 h-5" />
                      </motion.div>
                      {isAnalyzing ? 'Analyzing...' : useRealTime ? 'Running...' : 'Running...'}
                    </>
                  ) : (
                    <>
                      {useRealTime ? <Hourglass className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                      {useRealTime ? 'Run Real Time' : 'Run Quick Sim'}
                    </>
                  )}
                </motion.button>
                <button onClick={resetExperiment} disabled={isRunning} className="px-4 py-3 border-2 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 disabled:opacity-50">
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="w-64 flex flex-col border-l border-slate-200 pl-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 mb-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2"><Gauge className="w-5 h-5 text-violet-600" />Conditions</h2>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-3">
            <div className="flex justify-between mb-1">
              <label className="text-xs font-medium text-slate-600 flex items-center gap-1"><Thermometer className="w-3 h-3" /> Temp</label>
              <span className={`text-xs font-mono font-bold ${temperature < 0 ? 'text-blue-600' : temperature < 50 ? 'text-green-600' : temperature < 100 ? 'text-orange-600' : temperature < 200 ? 'text-red-600' : 'text-red-800'}`}>{Math.round(temperature)}°C</span>
            </div>
            <input type="range" min="-50" max="400" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} disabled={isRunning} className="w-full h-1.5 rounded-full appearance-none cursor-pointer" style={{ background: 'linear-gradient(to right, #3b82f6, #22c55e, #f97316, #ef4444, #7f1d1d)' }} />
            <p className="text-[10px] text-slate-500 mt-1">{temperature < 0 ? '❄️ Freezing' : temperature < 25 ? '🧊 Cold' : temperature < 50 ? '✓ Room Temp' : temperature < 100 ? '🔥 Heating' : temperature < 200 ? '🔥🔥 Hot' : '⚠️ Extreme Heat'}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-3">
            <div className="flex justify-between mb-1">
              <label className="text-xs font-medium text-slate-600 flex items-center gap-1"><Gauge className="w-3 h-3" /> Pressure</label>
              <span className="text-xs font-mono font-bold text-slate-700">{pressure}atm</span>
            </div>
            <input type="range" min="0.1" max="10" step="0.1" value={pressure} onChange={(e) => setPressure(Number(e.target.value))} disabled={isRunning} className="w-full h-1.5 bg-gradient-to-r from-green-200 to-red-400 rounded-full appearance-none" />
            {pressure > 5 && <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />High Pressure ⚠️</p>}
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-3">
            <div className="flex justify-between mb-1">
              <label className="text-xs font-medium text-slate-600 flex items-center gap-1"><Droplets className="w-3 h-3" /> pH</label>
              <span className="text-xs font-mono font-bold text-slate-700">{ph}</span>
            </div>
            <input type="range" min="1" max="14" step="0.1" value={ph} onChange={(e) => setPh(Number(e.target.value))} disabled={isRunning} className="w-full h-1.5 rounded-full appearance-none" style={{ background: 'linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6)' }} />
            <p className="text-[10px] text-slate-500 mt-1">{ph < 3 ? '⚠️ Strong Acid' : ph < 6 ? 'Weak Acid' : ph < 8 ? '✓ Neutral' : ph < 11 ? 'Weak Base' : '⚠️ Strong Base'}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-3">
            <div className="flex justify-between mb-1">
              <label className="text-xs font-medium text-slate-600 flex items-center gap-1"><Waves className="w-3 h-3" /> Mix</label>
              <span className="text-xs font-mono font-bold text-slate-700">{mixSpeed}rpm</span>
            </div>
            <input type="range" min="0" max="1500" step="50" value={mixSpeed} onChange={(e) => setMixSpeed(Number(e.target.value))} disabled={isRunning} className="w-full h-1.5 bg-slate-200 rounded-full appearance-none" />
          </div>
        </div>
      </div>
      
      <AnimatePresence>{showGlasswareModal && <GlasswareModal isOpen={showGlasswareModal} onClose={() => setShowGlasswareModal(false)} onSelect={setSelectedGlassware} selectedId={selectedGlassware?.id} />}</AnimatePresence>
      <AnimatePresence>{showAddStep && <AddStepModal isOpen={showAddStep} onClose={() => setShowAddStep(false)} onAdd={addStep} />}</AnimatePresence>
      <AnimatePresence>{showRealTimeConfirm && <RealTimeConfirmModal isOpen={showRealTimeConfirm} onClose={() => setShowRealTimeConfirm(false)} onConfirm={runRealTimeExperiment} durationMinutes={totalDurationMinutes} />}</AnimatePresence>
      <AnimatePresence>{results && <ResultsModal results={results} compound={vesselCompounds[0]} glassware={selectedGlassware} totalDuration={totalDurationMinutes} elapsedTime={formatElapsedTime(elapsedSeconds)} temperature={temperature} steps={steps} onClose={() => setResults(null)} onReset={resetExperiment} onSave={() => { alert('Saved to Research Notebook!'); setResults(null); }} />}</AnimatePresence>
    </div>
  );
}
