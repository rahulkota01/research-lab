import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Microscope, AlertCircle } from 'lucide-react';
import * as THREE from 'three';

// CPK Atom Colors
const ATOM_COLORS = {
  1: '#FFFFFF',   // H - White
  6: '#404040',   // C - Dark Grey
  7: '#3050F8',   // N - Blue
  8: '#FF0D0D',   // O - Red
  9: '#90E050',   // F - Light Green
  15: '#FF8000',  // P - Orange
  16: '#FFFF30',  // S - Yellow
  17: '#1FF01F',  // Cl - Green
  35: '#A62929',  // Br - Brown
};

// Van der Waals Radii (scaled for visualization)
const ATOM_SIZES = {
  1: 0.15,   // H
  6: 0.25,   // C
  7: 0.23,   // N
  8: 0.22,   // O
  9: 0.20,   // F
  15: 0.28,  // P
  16: 0.30,  // S
  17: 0.28,  // Cl
  35: 0.30,  // Br
};

const DEFAULT_COLOR = '#FF69B4'; // Pink for unknown
const DEFAULT_SIZE = 0.25;
const BOND_COLOR = '#888888';
const BOND_RADIUS = 0.05;

function Atom({ position, element, color, size }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.1} 
        roughness={0.3}
        envMapIntensity={0.5}
      />
    </mesh>
  );
}

function Bond({ start, end }) {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const midPoint = startVec.clone().add(endVec).multiplyScalar(0.5);
  const distance = startVec.distanceTo(endVec);
  
  const direction = endVec.clone().sub(startVec).normalize();
  const up = new THREE.Vector3(0, 1, 0);
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(up, direction);

  return (
    <mesh position={midPoint} quaternion={quaternion}>
      <cylinderGeometry args={[BOND_RADIUS, BOND_RADIUS, distance, 8]} />
      <meshStandardMaterial color={BOND_COLOR} metalness={0.2} roughness={0.5} />
    </mesh>
  );
}

function Molecule({ atoms, bonds }) {
  const groupRef = useRef();
  
  // Center the molecule
  const center = atoms.reduce((acc, atom) => ({
    x: acc.x + atom.x,
    y: acc.y + atom.y,
    z: acc.z + atom.z
  }), { x: 0, y: 0, z: 0 });
  
  center.x /= atoms.length;
  center.y /= atoms.length;
  center.z /= atoms.length;

  return (
    <group ref={groupRef} position={[-center.x, -center.y, -center.z]}>
      {/* Render bonds first (behind atoms) */}
      {bonds.map((bond, idx) => (
        <Bond 
          key={`bond-${idx}`}
          start={[atoms[bond.aid1].x, atoms[bond.aid1].y, atoms[bond.aid1].z]}
          end={[atoms[bond.aid2].x, atoms[bond.aid2].y, atoms[bond.aid2].z]}
        />
      ))}
      
      {/* Render atoms */}
      {atoms.map((atom, idx) => (
        <Atom
          key={`atom-${idx}`}
          position={[atom.x, atom.y, atom.z]}
          element={atom.element}
          color={ATOM_COLORS[atom.element] || DEFAULT_COLOR}
          size={ATOM_SIZES[atom.element] || DEFAULT_SIZE}
        />
      ))}
    </group>
  );
}

function Scene({ atoms, bonds, autoRotate }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} />
      <Molecule atoms={atoms} bonds={bonds} />
      <OrbitControls 
        enableZoom={true}
        autoRotate={autoRotate}
        autoRotateSpeed={2}
        enablePan={false}
        minDistance={3}
        maxDistance={15}
      />
    </>
  );
}

function LoadingState({ size }) {
  const sizeClasses = {
    small: 'w-[120px] h-[120px]',
    medium: 'w-[200px] h-[200px]',
    large: 'w-[400px] h-[400px]',
  };

  return (
    <div className={`${sizeClasses[size]} flex flex-col items-center justify-center bg-[#0A0E1A] rounded-xl`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <Microscope className="w-12 h-12 text-cyan-500" />
      </motion.div>
      <motion.p 
        className="text-sm text-slate-500 mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Loading 3D structure...
      </motion.p>
    </div>
  );
}

function ErrorState({ cid, size }) {
  const sizeClasses = {
    small: 'w-[120px] h-[120px]',
    medium: 'w-[200px] h-[200px]',
    large: 'w-[400px] h-[400px]',
  };

  return (
    <div className={`${sizeClasses[size]} relative flex flex-col items-center justify-center bg-[#0A0E1A] rounded-xl overflow-hidden`}>
      <img 
        src={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG`}
        alt="2D structure"
        className="w-full h-full object-contain p-4"
      />
      <div className="absolute top-2 right-2 px-2 py-1 bg-[#0F1629] text-white text-xs font-bold rounded">
        2D
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full">
        <AlertCircle className="w-3 h-3" />
        3D unavailable
      </div>
    </div>
  );
}



export default function Molecule3DViewer({ 
  cid, 
  size = 'medium', 
  autoRotate = true, 
  showControls = false 
}) {
  const [atoms, setAtoms] = useState([]);
  const [bonds, setBonds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const sizeClasses = {
    small: 'w-[120px] h-[120px]',
    medium: 'w-[200px] h-[200px]',
    large: 'w-[400px] h-[400px]',
  };

  const cameraPositions = {
    small: { position: [0, 0, 10], fov: 50 },
    medium: { position: [0, 0, 14], fov: 45 },
    large: { position: [0, 0, 18], fov: 40 },
  };

  useEffect(() => {
    const fetch3DStructure = async () => {
      setLoading(true);
      setError(false);
      
      try {
        const response = await fetch(
          `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/JSON?record_type=3d`
        );
        
        if (!response.ok) {
          throw new Error('3D data not available');
        }
        
        const data = await response.json();
        
        if (!data.PC_Compounds || !data.PC_Compounds[0]) {
          throw new Error('Invalid data structure');
        }
        
        const compound = data.PC_Compounds[0];
        
        // Extract atom coordinates
        if (!compound.coords || !compound.coords[0] || !compound.coords[0].conformers || !compound.coords[0].conformers[0]) {
          throw new Error('No conformer data');
        }
        
        const conformer = compound.coords[0].conformers[0];
        const xCoords = conformer.x || [];
        const yCoords = conformer.y || [];
        const zCoords = conformer.z || [];
        
        // Extract atom elements
        const elements = compound.atoms?.element || [];
        
        // Build atoms array
        const atomsData = [];
        for (let i = 0; i < xCoords.length; i++) {
          atomsData.push({
            x: xCoords[i],
            y: yCoords[i],
            z: zCoords[i],
            element: elements[i] || 6, // Default to carbon if unknown
          });
        }
        
        // Extract bonds
        const bondsData = [];
        if (compound.bonds) {
          const aid1 = compound.bonds.aid1 || [];
          const aid2 = compound.bonds.aid2 || [];
          
          for (let i = 0; i < aid1.length; i++) {
            bondsData.push({
              aid1: aid1[i] - 1, // Convert to 0-based index
              aid2: aid2[i] - 1,
            });
          }
        }
        
        setAtoms(atomsData);
        setBonds(bondsData);
        setLoading(false);
        
      } catch (err) {
        console.error('Failed to fetch 3D structure:', err);
        setError(true);
        setLoading(false);
      }
    };

    if (cid) {
      fetch3DStructure();
    }
  }, [cid]);

  if (loading) {
    return <LoadingState size={size} />;
  }

  if (error) {
    return <ErrorState cid={cid} size={size} />;
  }

  const cam = cameraPositions[size];

  return (
    <div className={`${sizeClasses[size]} rounded-xl overflow-hidden bg-transparent relative`}>
      <Canvas
        camera={{ position: cam.position, fov: cam.fov }}
        gl={{ 
          antialias: true, 
          alpha: true,
          premultipliedAlpha: false
        }}
        style={{ 
          background: 'transparent', 
          width: '100%', 
          height: '100%'
        }}
      >
        <Suspense fallback={null}>
          <Scene atoms={atoms} bonds={bonds} autoRotate={autoRotate} />
        </Suspense>
      </Canvas>
      
      {showControls && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 bg-[#0F1629]/80 text-white text-xs rounded-full backdrop-blur-sm">
          <span className="text-slate-400">Drag to rotate</span>
          <span className="w-1 h-1 bg-slate-600 rounded-full" />
          <span className="text-slate-400">Scroll to zoom</span>
        </div>
      )}
    </div>
  );
}
