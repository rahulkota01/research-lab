import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Paper content types
const paperContents = [
    { type: 'code', text: 'const molecule = {\n  atoms: ["C", "H", "O"],\n  bonds: [[0,1], [1,2]]\n};' },
    { type: 'formula', text: 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂' },
    { type: 'formula', text: 'E = mc²' },
    { type: 'code', text: 'function simulate(pH, temp) {\n  return stability * factor;\n}' },
    { type: 'formula', text: 'ΔG = ΔH - TΔS' },
    { type: 'code', text: 'class Compound {\n  constructor(formula) {\n    this.formula = formula;\n  }\n}' },
    { type: 'formula', text: 'PV = nRT' },
    { type: 'code', text: 'const reaction = {\n  reactants: ["A", "B"],\n  products: ["C"]\n};' },
    { type: 'formula', text: 'k = Ae^(-Ea/RT)' },
    { type: 'code', text: '// TODO: Fix this bug\nconst result = null;' },
    { type: 'formula', text: 'pH = -log[H⁺]' },
    { type: 'code', text: 'ERROR: Simulation failed\n at line 42' },
];

// Paper colors
const paperColors = [
    'bg-white',
    'bg-amber-50',
    'bg-blue-50',
    'bg-slate-50',
    'bg-red-50',
];

// Individual Paper Component
function Paper({ content, color, index, isBroken = false }) {
    // Spread papers across full width with better distribution
    const section = index % 5; // Divide screen into 5 sections
    const sectionWidth = 20; // 20% per section
    const randomOffset = (Math.random() - 0.5) * 15; // +/- 7.5% variance
    const randomX = (section * sectionWidth) + 5 + randomOffset;
    
    const randomDelay = Math.random() * 8; // Spread delays 0-8 seconds
    const randomDuration = 10 + Math.random() * 8; // 10-18 seconds fall time
    const randomRotation = Math.random() * 720 - 360; // -360 to +360 degrees
    const randomSway = 30 + Math.random() * 60; // More sway variation
    const paperSize = isBroken ? 'w-12 h-16' : 'w-24 h-32'; // Slightly smaller

    if (isBroken) {
        // Broken/torn paper piece
        return (
            <motion.div
                className={`absolute ${paperSize} ${color} shadow-lg`}
                style={{
                    left: `${randomX}%`,
                    clipPath: 'polygon(0 0, 100% 10%, 90% 100%, 10% 90%)',
                }}
                initial={{ y: -200, opacity: 0, rotate: 0 }}
                animate={{
                    y: ['0vh', '120vh'],
                    opacity: [0, 1, 1, 0],
                    rotate: [0, randomRotation, randomRotation + 180],
                    x: [0, randomSway, -randomSway, 0],
                }}
                transition={{
                    duration: randomDuration,
                    delay: randomDelay,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            >
                <div className="p-2 text-[6px] font-mono text-slate-400 opacity-50 overflow-hidden">
                    {content.text.slice(0, 30)}...
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className={`absolute ${paperSize} ${color} rounded-sm shadow-xl border border-slate-200 overflow-hidden`}
            style={{ left: `${randomX}%` }}
            initial={{ y: -200, opacity: 0, rotate: 0 }}
            animate={{
                y: ['0vh', '120vh'],
                opacity: [0, 1, 1, 0],
                rotate: [0, randomRotation, randomRotation + 360],
                x: [0, randomSway, -randomSway, randomSway / 2, 0],
            }}
            transition={{
                duration: randomDuration,
                delay: randomDelay,
                repeat: Infinity,
                ease: 'linear',
            }}
        >
            {/* Paper content */}
            <div className="p-2 h-full">
                {content.type === 'code' ? (
                    <pre className="text-[5px] font-mono text-slate-600 leading-tight overflow-hidden">
                        {content.text}
                    </pre>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <span className="text-[8px] font-serif text-slate-700 text-center">
                            {content.text}
                        </span>
                    </div>
                )}
            </div>
            
            {/* Crumple/wrinkle effect overlay */}
            <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
                }}
            />
            
            {/* Tear marks on some papers */}
            {Math.random() > 0.7 && (
                <div 
                    className="absolute right-0 top-1/4 w-4 h-8 bg-gradient-to-l from-slate-100 to-transparent"
                    style={{ clipPath: 'polygon(100% 0, 0 20%, 100% 40%, 0 60%, 100% 80%, 0 100%)' }}
                />
            )}
        </motion.div>
    );
}

// Broken paper pieces that fall separately
function BrokenPieces({ originalX, originalDelay }) {
    const pieces = [
        { offsetX: -10, offsetY: -5, rotation: -15 },
        { offsetX: 15, offsetY: 10, rotation: 25 },
        { offsetX: -5, offsetY: 20, rotation: -10 },
    ];

    return (
        <>
            {pieces.map((piece, i) => (
                <motion.div
                    key={i}
                    className="absolute w-8 h-10 bg-white shadow-md"
                    style={{ left: `${originalX}%` }}
                    initial={{ y: -200, opacity: 0 }}
                    animate={{
                        y: ['0vh', '120vh'],
                        opacity: [0, 1, 0],
                        x: [piece.offsetX, piece.offsetX + (Math.random() * 40 - 20)],
                        rotate: [piece.rotation, piece.rotation + 360],
                    }}
                    transition={{
                        duration: 6 + Math.random() * 4,
                        delay: originalDelay + 0.5 + i * 0.2,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}
        </>
    );
}

// Main Falling Papers Component
export default function FallingPapers() {
    const [papers, setPapers] = useState([]);

    useEffect(() => {
        // Generate random papers with better distribution
        const generatedPapers = [];
        
        // Regular papers - spread across sections
        for (let i = 0; i < 20; i++) {
            generatedPapers.push({
                id: i,
                content: paperContents[Math.floor(Math.random() * paperContents.length)],
                color: paperColors[Math.floor(Math.random() * paperColors.length)],
                isBroken: false,
            });
        }
        
        // Broken paper pieces - fewer, more scattered
        for (let i = 20; i < 28; i++) {
            generatedPapers.push({
                id: i,
                content: paperContents[Math.floor(Math.random() * paperContents.length)],
                color: paperColors[Math.floor(Math.random() * paperColors.length)],
                isBroken: true,
            });
        }
        
        setPapers(generatedPapers);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Gradient overlay at top */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-50 to-transparent z-10" />
            
            {/* Falling papers */}
            {papers.map((paper) => (
                <Paper
                    key={paper.id}
                    content={paper.content}
                    color={paper.color}
                    index={paper.id}
                    isBroken={paper.isBroken}
                />
            ))}
            
            {/* Gradient overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent z-10" />
            
            {/* Scattered papers on "floor" */}
            <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={`floor-${i}`}
                        className={`absolute bottom-0 ${paperColors[i % paperColors.length]} shadow-lg`}
                        style={{
                            left: `${10 + i * 12}%`,
                            width: '60px',
                            height: '80px',
                            transform: `rotate(${Math.random() * 30 - 15}deg)`,
                            clipPath: i % 2 === 0 ? 'none' : 'polygon(0 0, 100% 10%, 90% 100%, 10% 90%)',
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.6, y: 0 }}
                        transition={{ delay: i * 0.2, duration: 0.5 }}
                    />
                ))}
            </div>
        </div>
    );
}
