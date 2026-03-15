import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

// Atom component
function Atom({ position, color, size = 1 }) {
  return (
    <Sphere args={[size, 32, 32]} position={position}>
      <meshStandardMaterial 
        color={color} 
        roughness={0.3} 
        metalness={0.2}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
}

// Bond component
function Bond({ start, end, color = '#94A3B8' }) {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const direction = new THREE.Vector3().subVectors(endVec, startVec);
  const length = direction.length();
  const center = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
  
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());

  return (
    <Cylinder 
      args={[0.1, 0.1, length, 16]} 
      position={center}
      quaternion={quaternion}
    >
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
    </Cylinder>
  );
}

// Water molecule (H2O)
function WaterMolecule() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Oxygen */}
      <Atom position={[0, 0, 0]} color="#EF4444" size={1.2} />
      {/* Hydrogen 1 */}
      <Atom position={[-1.5, 1, 0]} color="#FFFFFF" size={0.8} />
      {/* Hydrogen 2 */}
      <Atom position={[1.5, 1, 0]} color="#FFFFFF" size={0.8} />
      {/* Bonds */}
      <Bond start={[0, 0, 0]} end={[-1.5, 1, 0]} />
      <Bond start={[0, 0, 0]} end={[1.5, 1, 0]} />
    </group>
  );
}

// Benzene ring (C6H6)
function BenzeneMolecule() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  const carbons = [];
  const hydrogens = [];
  const bonds = [];

  // Generate positions for 6 carbons in a hexagon
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    carbons.push([x, 0, z]);
    
    // Hydrogens outside
    const hx = Math.cos(angle) * 3.5;
    const hz = Math.sin(angle) * 3.5;
    hydrogens.push([hx, 0, hz]);
    
    // C-H bonds
    bonds.push({ start: [x, 0, z], end: [hx, 0, hz] });
    
    // C-C bonds
    const nextAngle = ((i + 1) / 6) * Math.PI * 2;
    const nx = Math.cos(nextAngle) * 2;
    const nz = Math.sin(nextAngle) * 2;
    bonds.push({ start: [x, 0, z], end: [nx, 0, nz] });
  }

  return (
    <group ref={groupRef}>
      {carbons.map((pos, i) => (
        <Atom key={`c-${i}`} position={pos} color="#334155" size={1} />
      ))}
      {hydrogens.map((pos, i) => (
        <Atom key={`h-${i}`} position={pos} color="#FFFFFF" size={0.7} />
      ))}
      {bonds.map((bond, i) => (
        <Bond key={`bond-${i}`} start={bond.start} end={bond.end} />
      ))}
    </group>
  );
}

// DNA Double Helix
function DnaHelix() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const basePairs = [];
  const numPairs = 12;

  for (let i = 0; i < numPairs; i++) {
    const y = (i - numPairs / 2) * 0.8;
    const angle1 = (i / numPairs) * Math.PI * 4;
    const angle2 = angle1 + Math.PI;
    
    const r = 1.5;
    const x1 = Math.cos(angle1) * r;
    const z1 = Math.sin(angle1) * r;
    const x2 = Math.cos(angle2) * r;
    const z2 = Math.sin(angle2) * r;

    basePairs.push({
      pos1: [x1, y, z1],
      pos2: [x2, y, z2],
      color: i % 2 === 0 ? '#0066FF' : '#00C9A7',
    });
  }

  return (
    <group ref={groupRef}>
      {basePairs.map((pair, i) => (
        <React.Fragment key={i}>
          <Atom position={pair.pos1} color={pair.color} size={0.6} />
          <Atom position={pair.pos2} color={pair.color} size={0.6} />
          <Bond start={pair.pos1} end={pair.pos2} color={pair.color} />
        </React.Fragment>
      ))}
    </group>
  );
}

// Main export component
export default function Molecule3D({ 
  type = 'water', 
  className = '',
  controls = false 
}) {
  const renderMolecule = () => {
    switch (type) {
      case 'benzene':
        return <BenzeneMolecule />;
      case 'dna':
        return <DnaHelix />;
      case 'water':
      default:
        return <WaterMolecule />;
    }
  };

  return (
    <div className={`${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0066FF" />
        {renderMolecule()}
        {controls && <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />}
      </Canvas>
    </div>
  );
}
