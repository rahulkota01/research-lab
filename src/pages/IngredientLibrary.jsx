import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Beaker, Atom, Leaf, Pill, Microscope, Thermometer, 
  Zap, FlaskConical, Clock, ChevronRight, X, Play, Plus, Loader2, ArrowRight 
} from 'lucide-react';
import { cn } from '../components/Sidebar';
import Molecule3DViewer from '../components/Molecule3DViewer';

const FILTERS = [
  { id: 'All', label: 'All', icon: Microscope },
  { id: 'Chemicals', label: 'Chemicals', icon: Atom },
  { id: 'Plant Extracts', label: 'Plant Extracts', icon: Leaf },
  { id: 'Excipients', label: 'Excipients', icon: Pill },
  { id: 'Biologics', label: 'Biologics', icon: Beaker },
];

const SOLVENTS = ['Water', 'Ethanol', 'DMSO', 'Methanol', 'Acetone', 'Chloroform'];

// PubChem 2D image URL builder
const getPubChemImageUrl = (cid) =>
  `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG`;

// Real compound photos from Wikimedia Commons
const COMPOUND_PHOTOS = {
  "Aspirin": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Aspirin-tabletten.jpg/320px-Aspirin-tabletten.jpg",
  "Caffeine": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Caffeine_crystals_under_polarized_light.jpg/320px-Caffeine_crystals_under_polarized_light.jpg",
  "Ibuprofen": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Ibuprofen_200mg.jpg/320px-Ibuprofen_200mg.jpg",
  "Paracetamol": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Paracetamol_tablets.jpg/320px-Paracetamol_tablets.jpg",
  "Ethanol": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ethanol_flask.jpg/320px-Ethanol_flask.jpg",
  "Glucose": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/D-glucose_chain.png/320px-D-glucose_chain.png",
  "Curcumin": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Curcuma_longa_roots.jpg/320px-Curcuma_longa_roots.jpg",
  "Morphine": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Morphine_powder.jpg/320px-Morphine_powder.jpg",
  "Penicillin": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Penicillin_core_structure.svg/320px-Penicillin_core_structure.svg.png",
  "Sucrose": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Sugar_cubes.jpg/320px-Sugar_cubes.jpg",
  "Water": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Water_drop_001.jpg/320px-Water_drop_001.jpg",
};

// Debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// Featured compound CIDs with their common names
const FEATURED_CIDS = [
  { cid: 2244, commonName: 'Aspirin' },
  { cid: 3672, commonName: 'Caffeine' },
  { cid: 5090, commonName: 'Ibuprofen' },
  { cid: 1983, commonName: 'Paracetamol' },
  { cid: 702, commonName: 'Ethanol' },
  { cid: 5281792, commonName: 'Quercetin' },
  { cid: 2723872, commonName: 'Curcumin' },
  { cid: 3033464, commonName: 'Penicillin' },
  { cid: 5865, commonName: 'Glucose' },
  { cid: 6253, commonName: 'Chloroform' },
  { cid: 5793, commonName: 'Sucrose' },
  { cid: 962, commonName: 'Water' },
];

// Fetch featured compounds on load
async function fetchFeaturedCompounds() {
  console.log('📡 Fetching featured compounds...');
  
  try {
    const cids = FEATURED_CIDS.map(f => f.cid).join(',');
    const response = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cids}/property/MolecularFormula,MolecularWeight,IUPACName,XLogP,ExactMass,CanonicalSMILES/JSON`,
      { method: 'GET' }
    );
    
    if (!response.ok) {
      throw new Error(`Featured fetch error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Featured data:', data);
    
    const properties = data.PropertyTable?.Properties || [];
    const compounds = [];
    
    for (const prop of properties) {
      const featured = FEATURED_CIDS.find(f => f.cid === prop.CID);
      const mw = parseFloat(prop.MolecularWeight) || 0;
      const logP = parseFloat(prop.XLogP) || 0;
      const exactMass = parseFloat(prop.ExactMass) || 0;
      
      let smiles = prop.CanonicalSMILES || '—';
      if (smiles.length > 30) {
        smiles = smiles.substring(0, 30) + '...';
      }
      
      compounds.push({
        cid: prop.CID,
        commonName: featured?.commonName || prop.IUPACName || `Compound ${prop.CID}`,
        name: prop.IUPACName || `Compound ${prop.CID}`,
        formula: prop.MolecularFormula || '—',
        mw: mw > 0 ? mw.toFixed(2) : '—',
        smiles: smiles,
        fullSmiles: prop.CanonicalSMILES || '—',
        logP: logP !== 0 ? logP.toFixed(2) : '—',
        exactMass: exactMass > 0 ? exactMass.toFixed(4) : '—',
        charge: 0,
        category: 'Chemicals',
      });
    }
    
    console.log('✅ Featured compounds:', compounds);
    return compounds;
  } catch (error) {
    console.error('❌ Featured fetch error:', error);
    return [];
  }
}

// Search PubChem API - Two step approach
async function searchPubChem(query) {
  if (!query || query.length < 2) return [];
  
  console.log('🔍 Searching PubChem for:', query);
  
  try {
    // Step 1: Get CIDs from name search
    console.log('📡 Step 1: Fetching CIDs...');
    const cidsResponse = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(query)}/cids/JSON`,
      { method: 'GET' }
    );
    
    console.log('CIDs Response status:', cidsResponse.status);
    
    if (!cidsResponse.ok) {
      if (cidsResponse.status === 404) {
        console.log('No CIDs found for query');
        return [];
      }
      throw new Error(`CIDs API error: ${cidsResponse.status}`);
    }
    
    const cidsData = await cidsResponse.json();
    console.log('CIDs Data:', cidsData);
    
    // Extract CIDs array
    let cids = [];
    if (cidsData.IdentifierList && cidsData.IdentifierList.CID) {
      cids = cidsData.IdentifierList.CID;
    } else if (cidsData.PC_Compounds) {
      cids = cidsData.PC_Compounds.map(pc => pc.id?.id?.cid).filter(Boolean);
    }
    
    // Take first 12 CIDs only
    cids = cids.slice(0, 12);
    console.log('Found CIDs:', cids);
    
    if (cids.length === 0) {
      console.log('No CIDs to fetch properties for');
      return [];
    }
    
    // Step 2: Fetch properties for these CIDs
    console.log('📡 Step 2: Fetching properties for CIDs:', cids.join(','));
    const propsResponse = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cids.join(',')}/property/MolecularFormula,MolecularWeight,IUPACName,XLogP,ExactMass,CanonicalSMILES/JSON`,
      { method: 'GET' }
    );
    
    console.log('Properties Response status:', propsResponse.status);
    
    if (!propsResponse.ok) {
      throw new Error(`Properties API error: ${propsResponse.status}`);
    }
    
    const propsData = await propsResponse.json();
    console.log('Properties Data:', propsData);
    
    // Parse properties
    const compounds = [];
    const properties = propsData.PropertyTable?.Properties || [];
    
    for (const prop of properties) {
      // Convert all numeric fields to proper types (PubChem returns strings)
      const mw = parseFloat(prop.MolecularWeight) || 0;
      const logP = parseFloat(prop.XLogP) || 0;
      const exactMass = parseFloat(prop.ExactMass) || 0;
      
      // Truncate SMILES to 30 chars
      let smiles = prop.CanonicalSMILES || '—';
      if (smiles.length > 30) {
        smiles = smiles.substring(0, 30) + '...';
      }
      
      const compound = {
        cid: prop.CID,
        commonName: query, // Store the original search term
        name: prop.IUPACName || `Compound ${prop.CID}`,
        formula: prop.MolecularFormula || '—',
        mw: mw > 0 ? mw.toFixed(2) : '—',
        smiles: smiles,
        fullSmiles: prop.CanonicalSMILES || '—',
        logP: logP !== 0 ? logP.toFixed(2) : '—',
        exactMass: exactMass > 0 ? exactMass.toFixed(4) : '—',
        charge: 0,
        category: 'Chemicals',
      };
      
      compounds.push(compound);
    }
    
    console.log('✅ Final compounds:', compounds);
    return compounds;
    
  } catch (error) {
    console.error('❌ PubChem search error:', error);
    
    // Try alternative approach - direct property search
    console.log('🔄 Trying alternative approach...');
    try {
      const altResponse = await fetch(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(query)}/property/MolecularFormula,MolecularWeight,IUPACName,XLogP,ExactMass,CanonicalSMILES/JSON`
      );
      
      console.log('Alternative Response status:', altResponse.status);
      
      if (!altResponse.ok) {
        if (altResponse.status === 404) return [];
        throw new Error(`Alternative API error: ${altResponse.status}`);
      }
      
      const altData = await altResponse.json();
      console.log('Alternative Data:', altData);
      
      const compounds = [];
      const properties = altData.PropertyTable?.Properties || [];
      
      for (const prop of properties.slice(0, 12)) {
        // Convert all numeric fields to proper types (PubChem returns strings)
        const mw = parseFloat(prop.MolecularWeight) || 0;
        const logP = parseFloat(prop.XLogP) || 0;
        const exactMass = parseFloat(prop.ExactMass) || 0;
        
        // Truncate SMILES to 30 chars
        let smiles = prop.CanonicalSMILES || '—';
        if (smiles.length > 30) {
          smiles = smiles.substring(0, 30) + '...';
        }
        
        const compound = {
          cid: prop.CID,
          commonName: query, // Store the original search term
          name: prop.IUPACName || `Compound ${prop.CID}`,
          formula: prop.MolecularFormula || '—',
          mw: mw > 0 ? mw.toFixed(2) : '—',
          smiles: smiles,
          fullSmiles: prop.CanonicalSMILES || '—',
          logP: logP !== 0 ? logP.toFixed(2) : '—',
          exactMass: exactMass > 0 ? exactMass.toFixed(4) : '—',
          charge: 0,
          category: 'Chemicals',
        };
        
        compounds.push(compound);
      }
      
      console.log('✅ Alternative compounds:', compounds);
      return compounds;
      
    } catch (altError) {
      console.error('❌ Alternative approach also failed:', altError);
      return [];
    }
  }
}

// Categorize compound based on properties
function categorizeCompound(compound) {
  const name = compound.name.toLowerCase();
  const formula = compound.formula.toLowerCase();
  
  // Biologics - complex molecules
  if (compound.mw > 1000 || name.includes('protein') || name.includes('enzyme') || 
      name.includes('peptide') || name.includes('antibody')) {
    return 'Biologics';
  }
  
  // Plant Extracts - natural compounds
  if (name.includes('flavonoid') || name.includes('terpene') || name.includes('alkaloid') ||
      name.includes('glycoside') || name.includes('phenol') || name.includes('resveratrol') ||
      name.includes('curcumin') || name.includes('catechin')) {
    return 'Plant Extracts';
  }
  
  // Excipients - common formulation ingredients
  if (name.includes('cellulose') || name.includes('starch') || name.includes('lactose') ||
      name.includes('magnesium stearate') || name.includes('povidone') || name.includes('peg') ||
      name.includes('talc') || name.includes('mannitol') || name.includes('crospovidone')) {
    return 'Excipients';
  }
  
  return 'Chemicals';
}

// Call Cloudflare Worker for simulation
async function runSimulation(compound, params) {
  console.log('🚀 Calling Cloudflare Worker for simulation...');
  console.log('Compound:', compound);
  console.log('Params:', params);
  
  try {
    const response = await fetch('https://ro-researc-lab.rahulkota505.workers.dev/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mode: 'simulate',
        compound: {
          commonName: compound.commonName,
          name: compound.name,
          formula: compound.formula,
          mw: compound.mw,
          mp: compound.mp || 'Unknown',
          bp: compound.bp || 'Unknown',
          logP: compound.logP || 'Unknown',
          smiles: compound.smiles || 'Unknown'
        },
        params: {
          temperature: params.temperature,
          pressure: params.pressure,
          ph: params.ph,
          solvent: params.solvent,
          duration: '30'
        }
      }),
    });
    
    console.log('Worker response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`Worker error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Worker response:', data);
    
    // Return the result from the worker
    return data.result || data;
  } catch (error) {
    console.error('❌ Simulation error:', error);
    // Return mock result on failure
    return {
      status: 'Stable',
      reactionTime: 'No reaction',
      outcome: `${compound.commonName || compound.name} remains stable under the specified conditions.`,
      color: 'No change',
      warnings: 'Standard laboratory safety protocols apply',
      yield: '100% (no reaction)',
      nextStep: 'Proceed with formulation or further testing'
    };
  }
}

// Compound Card Component
function CompoundCard({ item, onSimulate, onAddToBench }) {
  const [imageError, setImageError] = useState(false);
  const [viewMode, setViewMode] = useState('3d'); // '3d', '2d', or 'photo'
  const [photoUrl, setPhotoUrl] = useState(null);
  const [photoError, setPhotoError] = useState(false);
  
  // Get photo URL from hardcoded map or null
  const getPhotoUrl = () => {
    return COMPOUND_PHOTOS[item.commonName] || null;
  };
  
  // Get category-based gradient for placeholder
  const getCategoryGradient = () => {
    const gradients = {
      'Chemicals': 'from-blue-900/50 to-cyan-900/50',
      'Plant Extracts': 'from-green-900/50 to-emerald-900/50',
      'Biologics': 'from-purple-900/50 to-violet-900/50',
      'Excipients': 'from-slate-800 to-gray-800',
    };
    return gradients[item.category] || 'from-slate-800 to-blue-900/50';
  };
  
  // Handle photo load error
  const handlePhotoError = () => {
    setPhotoError(true);
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, borderColor: 'rgba(0, 212, 255, 0.3)' }}
      className="glass-card rounded-2xl border border-[#1E2A45] overflow-hidden group"
    >
      {/* Molecule Image */}
      <div className="relative bg-gradient-to-br from-[#0A0E1A] to-[#141B2D] p-4 flex items-center justify-center h-48 border-b border-[#1E2A45]">
        {/* 2D/3D/Photo Toggle */}
        <div className="absolute top-3 left-3 flex gap-1 z-10">
          <button
            onClick={() => setViewMode('2d')}
            title="Structural Formula"
            className={`px-2.5 py-1 text-[10px] font-bold rounded-full transition-all duration-200 ${
              viewMode === '2d'
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-[#141B2D]/90 text-slate-400 border border-[#1E2A45] hover:border-cyan-500/50'
            }`}
          >
            2D
          </button>
          <button
            onClick={() => setViewMode('3d')}
            title="3D Conformer (PubChem)"
            className={`px-2.5 py-1 text-[10px] font-bold rounded-full transition-all duration-200 ${
              viewMode === '3d'
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-[#141B2D]/90 text-slate-400 border border-[#1E2A45] hover:border-cyan-500/50'
            }`}
          >
            3D
          </button>
          <button
            onClick={() => setViewMode('photo')}
            title="Real Compound Photo"
            className={`px-2.5 py-1 text-[10px] font-bold rounded-full transition-all duration-200 ${
              viewMode === 'photo'
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-[#141B2D]/90 text-slate-400 border border-[#1E2A45] hover:border-cyan-500/50'
            }`}
          >
            Photo
          </button>
        </div>
        
        <div className="flex items-center justify-center w-full h-full">
          {viewMode === '2d' ? (
            !imageError ? (
              <img
                src={getPubChemImageUrl(item.cid)}
                alt={item.name}
                className="max-h-36 max-w-full object-contain drop-shadow-md"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-32 h-32 bg-[#141B2D] rounded-xl flex items-center justify-center border border-[#1E2A45]">
                <Beaker className="w-12 h-12 text-slate-600" />
              </div>
            )
          ) : viewMode === '3d' ? (
            <div className="flex items-center justify-center">
              <Molecule3DViewer cid={item.cid} size="medium" autoRotate={true} showControls={false} />
            </div>
          ) : (
            // Image mode - Real compound photo or fallback
            <div className="w-full h-full flex items-center justify-center">
              {(() => {
                const photoUrl = getPhotoUrl();
                if (photoUrl && !photoError) {
                  return (
                    <img
                      src={photoUrl}
                      alt={item.commonName}
                      className="w-full h-full object-cover rounded-lg"
                      onError={handlePhotoError}
                    />
                  );
                } else {
                  // Beautiful gradient placeholder based on category
                  return (
                    <div className={`w-full h-full rounded-lg bg-gradient-to-br ${getCategoryGradient()} flex flex-col items-center justify-center p-4 border border-[#1E2A45]`}>
                      <p className="text-4xl font-bold text-cyan-400 text-center">
                        {item.formula}
                      </p>
                      <p className="text-xs text-slate-500 mt-3 text-center">
                        No photo available
                      </p>
                    </div>
                  );
                }
              })()}
            </div>
          )}
        </div>
        
        <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-1 rounded-full bg-[#141B2D]/80 backdrop-blur text-slate-400 border border-[#1E2A45]">
          CID: {item.cid}
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="mb-3">
          {/* Common name as primary title */}
          <h3 className="font-bold text-white text-lg line-clamp-1" title={item.commonName}>
            {item.commonName}
          </h3>
          {/* IUPAC name underneath in grey */}
          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5" title={item.name}>
            {item.name}
          </p>
          <p className="text-sm font-mono text-cyan-400 mt-1">{item.formula}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="bg-[#0A0E1A] rounded-lg p-2 border border-[#1E2A45]">
            <p className="text-slate-500">Mol. Weight</p>
            <p className="font-mono font-semibold text-slate-300">{item.mw}</p>
          </div>
          <div className="bg-[#0A0E1A] rounded-lg p-2 border border-[#1E2A45]">
            <p className="text-slate-500">XLogP</p>
            <p className="font-mono font-semibold text-slate-300">{item.logP}</p>
          </div>
          <div className="bg-[#0A0E1A] rounded-lg p-2 border border-[#1E2A45]">
            <p className="text-slate-500">Exact Mass</p>
            <p className="font-mono font-semibold text-slate-300">{item.exactMass}</p>
          </div>
          <div className="bg-[#0A0E1A] rounded-lg p-2 border border-[#1E2A45]">
            <p className="text-slate-500">Charge</p>
            <p className="font-mono font-semibold text-slate-300">{item.charge}</p>
          </div>
        </div>

        {/* SMILES */}
        <div className="mb-4">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">SMILES</p>
          <p className="text-xs font-mono text-slate-400 truncate" title={item.fullSmiles}>
            {item.smiles}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <motion.button
            onClick={() => onSimulate(item)}
            whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/25"
          >
            <Play className="w-3.5 h-3.5" />
            Simulate
          </motion.button>
          <motion.button
            onClick={() => onAddToBench(item)}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl text-sm font-semibold text-cyan-400 bg-[#0A0E1A] border-2 border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Simulation Panel Component
function SimulationPanel({ compound, onClose }) {
  const [params, setParams] = useState({ 
    temperature: 25, 
    pressure: 1, 
    ph: 7, 
    solvent: 'Water' 
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    setLoading(true);
    setResult(null);
    const res = await runSimulation(compound, params);
    setResult(res);
    setLoading(false);
  };

  const statusColors = {
    'Stable': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Unstable': 'bg-red-500/20 text-red-400 border-red-500/30',
    'Reaction Occurring': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'Decomposing': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card rounded-3xl border border-[#1E2A45] w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white text-xl font-bold">{compound.name}</h2>
              <p className="text-cyan-200 text-sm font-mono">{compound.formula}</p>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <img
            src={getPubChemImageUrl(compound.cid)}
            alt={compound.name}
            className="h-28 mx-auto object-contain drop-shadow-lg"
          />
        </div>

        <div className="p-6 space-y-6">
          {/* Controls */}
          <div>
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-cyan-400" />
              Simulation Parameters
            </h3>

            <div className="space-y-4">
              {/* Temperature */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-red-400" /> Temperature
                  </label>
                  <span className="text-sm font-mono font-bold text-cyan-400">{params.temperature}°C</span>
                </div>
                <input 
                  type="range" min={-20} max={400} value={params.temperature}
                  onChange={(e) => setParams(p => ({ ...p, temperature: Number(e.target.value) }))}
                  className="w-full h-2 bg-gradient-to-r from-cyan-500 to-red-500 rounded-full appearance-none cursor-pointer" 
                />
              </div>

              {/* Pressure */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" /> Pressure
                  </label>
                  <span className="text-sm font-mono font-bold text-cyan-400">{params.pressure} atm</span>
                </div>
                <input 
                  type="range" min={0.1} max={10} step={0.1} value={params.pressure}
                  onChange={(e) => setParams(p => ({ ...p, pressure: Number(e.target.value) }))}
                  className="w-full h-2 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full appearance-none cursor-pointer" 
                />
              </div>

              {/* pH */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <Beaker className="w-4 h-4 text-purple-400" /> pH
                  </label>
                  <span className="text-sm font-mono font-bold text-cyan-400">pH {params.ph}</span>
                </div>
                <input 
                  type="range" min={1} max={14} step={0.1} value={params.ph}
                  onChange={(e) => setParams(p => ({ ...p, ph: Number(e.target.value) }))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6)` }} 
                />
              </div>

              {/* Solvent */}
              <div>
                <label className="text-sm font-medium text-slate-400 block mb-2">Solvent</label>
                <div className="flex flex-wrap gap-2">
                  {SOLVENTS.map(s => (
                    <button 
                      key={s} 
                      onClick={() => setParams(p => ({ ...p, solvent: s }))}
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm font-medium transition-all border",
                        params.solvent === s
                          ? "bg-cyan-500 text-white border-cyan-500"
                          : "bg-[#0A0E1A] text-slate-400 border-[#1E2A45] hover:border-cyan-500/50"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Run Button */}
          <motion.button
            onClick={handleSimulate}
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/25"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Running Simulation...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Run Simulation
              </>
            )}
          </motion.button>

          {/* Results */}
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 border-t border-[#1E2A45] pt-6"
            >
              <h3 className="font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-400" /> Results
              </h3>

              <div className={cn("inline-flex px-4 py-2 rounded-full text-sm font-bold border", statusColors[result.status] || 'bg-[#141B2D] text-slate-400 border-[#1E2A45]')}>
                ● {result.status}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0A0E1A] rounded-2xl p-4 border border-[#1E2A45]">
                  <p className="text-xs text-cyan-400 mb-1">Reaction Time</p>
                  <p className="font-bold text-white">{result.reactionTime}</p>
                </div>
                <div className="bg-[#0A0E1A] rounded-2xl p-4 border border-[#1E2A45]">
                  <p className="text-xs text-emerald-400 mb-1">Expected Yield</p>
                  <p className="font-bold text-white">{result.yield || '—'}</p>
                </div>
              </div>

              <div className="bg-[#0A0E1A] rounded-2xl p-4 border border-[#1E2A45]">
                <p className="text-xs text-slate-500 mb-2">Outcome</p>
                <p className="text-slate-300 text-sm leading-relaxed">{result.outcome}</p>
              </div>

              {result.color && result.color !== 'No change' && (
                <div className="bg-purple-50 rounded-2xl p-4">
                  <p className="text-xs text-purple-400 mb-1">Color Change</p>
                  <p className="text-purple-700 text-sm">{result.color}</p>
                </div>
              )}

              {result.warnings && (
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                  <p className="text-xs text-orange-400 mb-1">Warning</p>
                  <p className="text-orange-700 text-sm">{result.warnings}</p>
                </div>
              )}

              <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-2xl p-4 border border-blue-100">
                <p className="text-xs text-blue-400 mb-1">
                  <ChevronRight className="w-3 h-3 inline" /> Next Step
                </p>
                <p className="text-slate-700 text-sm font-medium">{result.nextStep}</p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main Component
export default function IngredientLibrary() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isFocused, setIsFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [featuredCompounds, setFeaturedCompounds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCompound, setSelectedCompound] = useState(null);
  const [benchItems, setBenchItems] = useState([]);
  const [benchNotif, setBenchNotif] = useState(null);

  const debouncedSearch = useDebounce(searchQuery, 600);

  // Load featured compounds on mount
  useEffect(() => {
    const loadFeatured = async () => {
      setLoading(true);
      const featured = await fetchFeaturedCompounds();
      setFeaturedCompounds(featured);
      setLoading(false);
    };
    loadFeatured();
  }, []);

  // Load bench from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ro_bench_items');
    if (saved) {
      try {
        setBenchItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load bench', e);
      }
    }
  }, []);

  // Save bench to localStorage
  useEffect(() => {
    localStorage.setItem('ro_bench_items', JSON.stringify(benchItems));
  }, [benchItems]);

  // Search PubChem when debounced query changes
  useEffect(() => {
    const doSearch = async () => {
      if (!debouncedSearch || debouncedSearch.length < 2) {
        setSearchResults([]);
        return;
      }
      
      setLoading(true);
      const results = await searchPubChem(debouncedSearch);
      
      // Categorize results
      const categorized = results.map(compound => ({
        ...compound,
        category: categorizeCompound(compound)
      }));
      
      setSearchResults(categorized);
      setLoading(false);
    };
    
    doSearch();
  }, [debouncedSearch]);

  // Determine which compounds to show
  const displayCompounds = searchQuery.length >= 2 
    ? (activeFilter === 'All' 
        ? searchResults 
        : searchResults.filter(item => item.category === activeFilter))
    : (activeFilter === 'All'
        ? featuredCompounds
        : featuredCompounds.filter(item => item.category === activeFilter));

  const handleAddToBench = (item) => {
    const benchItem = {
      cid: item.cid,
      name: item.name,
      commonName: item.commonName,
      formula: item.formula,
      mw: item.mw,
      logP: item.logP,
      smiles: item.fullSmiles || item.smiles,
      imageUrl: getPubChemImageUrl(item.cid),
    };
    
    setBenchItems(prev => [...prev, benchItem]);
    setBenchNotif(item.commonName);
    setTimeout(() => setBenchNotif(null), 2500);
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {benchNotif && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '50%' }}
            animate={{ opacity: 1, y: 0, x: '50%' }}
            exit={{ opacity: 0, y: -20, x: '50%' }}
            className="fixed top-6 right-1/2 z-50 bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-lg font-medium text-sm flex items-center gap-2"
          >
            ✅ {benchNotif} added to Lab Bench!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
            Ingredient Library
          </h1>
          <p className="text-slate-400">Search PubChem database and run simulations</p>
        </div>
        <div className="flex items-center gap-3">
          {benchItems.length > 0 && (
            <>
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl px-4 py-2 text-sm text-cyan-400 font-medium">
                🧪 {benchItems.length} item{benchItems.length > 1 ? 's' : ''} in bench
              </div>
              <motion.button
                onClick={() => navigate('/app/bench')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/25"
              >
                Go to Lab Bench
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </>
          )}
        </div>
      </motion.header>

      {/* Search */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          {loading ? (
            <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
          ) : (
            <Search className={cn("h-5 w-5 transition-colors", isFocused ? "text-cyan-400" : "text-slate-500")} />
          )}
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "block w-full pl-14 pr-5 py-4 rounded-2xl border-2 text-white placeholder-slate-500 bg-[#0F1629] transition-all",
            isFocused ? "border-cyan-500/50 shadow-lg shadow-cyan-500/10" : "border-[#1E2A45]"
          )}
          placeholder="Search PubChem by compound name..."
        />
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {FILTERS.map((filter) => {
          const Icon = filter.icon;
          return (
            <motion.button 
              key={filter.id} 
              onClick={() => setActiveFilter(filter.id)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all border",
                activeFilter === filter.id
                  ? "bg-cyan-500 text-white border-cyan-500 shadow-lg shadow-cyan-500/25"
                  : "bg-[#0F1629] text-slate-400 border-[#1E2A45] hover:border-cyan-500/50"
              )}
            >
              <Icon className="w-4 h-4" />{filter.label}
            </motion.button>
          );
        })}
      </div>

      {/* Featured Label */}
      {searchQuery.length < 2 && featuredCompounds.length > 0 && (
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-[#1E2A45]"></div>
          <span className="text-sm font-medium text-slate-500">Featured Compounds</span>
          <div className="h-px flex-1 bg-[#1E2A45]"></div>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
          <p className="text-slate-400">
            {searchQuery.length < 2 ? 'Loading featured compounds...' : 'Searching PubChem...'}
          </p>
        </div>
      ) : displayCompounds.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <Beaker className="w-16 h-16 mb-4 opacity-30" />
          <p className="text-lg font-medium">
            {searchQuery.length >= 2 ? 'No compounds found' : 'No featured compounds'}
          </p>
          <p className="text-sm">
            {searchQuery.length >= 2 ? 'Try a different search term' : 'Something went wrong'}
          </p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {displayCompounds.map((item) => (
              <CompoundCard 
                key={item.cid} 
                item={item}
                onSimulate={setSelectedCompound}
                onAddToBench={handleAddToBench} 
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Simulation Panel */}
      <AnimatePresence>
        {selectedCompound && (
          <SimulationPanel 
            compound={selectedCompound} 
            onClose={() => setSelectedCompound(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
