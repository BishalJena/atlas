'use client';

import { useState } from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Line,
} from 'react-simple-maps';
import { GPUNode } from '@/types';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface GPUMapProps {
    nodes: GPUNode[];
    selectedNode: GPUNode | null;
    onSelectNode: (node: GPUNode) => void;
}

export default function GPUMap({ nodes, selectedNode, onSelectNode }: GPUMapProps) {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Only connect nearest neighbors for cleaner arcs (not all-to-all mesh)
    const arcs = [
        // US-West to US-East
        { from: nodes.find(n => n.name.includes('US-West')), to: nodes.find(n => n.name.includes('US-East')) },
        // US-East to Japan (trans-Atlantic cable)
        { from: nodes.find(n => n.name.includes('US-East')), to: nodes.find(n => n.name.includes('Japan')) },
        // Japan to India
        { from: nodes.find(n => n.name.includes('Japan')), to: nodes.find(n => n.name.includes('India')) },
        // India to US-West (completing the loop)
        { from: nodes.find(n => n.name.includes('India')), to: nodes.find(n => n.name.includes('US-West')) },
    ].filter(a => a.from && a.to) as { from: GPUNode; to: GPUNode }[];

    return (
        <div className="premium-card h-[400px] lg:h-[450px] relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)' }}>
            {/* Header - Live Network Badge */}
            <div className="absolute top-3 left-3 z-20">
                <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 px-2.5 py-1 rounded-full">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-medium text-slate-300">LIVE</span>
                </div>
            </div>

            {/* Region Flags */}
            <div className="absolute top-3 right-3 z-20">
                <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 px-2.5 py-1 rounded-full text-[10px] text-slate-400">
                    <span>🇺🇸</span>
                    <span>🇯🇵</span>
                    <span>🇮🇳</span>
                </div>
            </div>

            {/* World Map */}
            <ComposableMap
                projection="geoNaturalEarth1"
                projectionConfig={{
                    scale: 160,
                    center: [20, 20],
                }}
                className="w-full h-full"
                style={{ backgroundColor: 'transparent' }}
            >
                {/* Countries */}
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#1e293b"
                                stroke="#334155"
                                strokeWidth={0.4}
                                style={{
                                    default: { outline: 'none' },
                                    hover: { outline: 'none' },
                                    pressed: { outline: 'none' },
                                }}
                            />
                        ))
                    }
                </Geographies>

                {/* Connection Lines (cleaner - only nearby connections) */}
                {arcs.map(({ from, to }, idx) => (
                    <Line
                        key={`arc-${idx}`}
                        from={[from.location.lng, from.location.lat]}
                        to={[to.location.lng, to.location.lat]}
                        stroke="rgba(59, 130, 246, 0.4)"
                        strokeWidth={1}
                        strokeLinecap="round"
                    />
                ))}

                {/* Node Markers */}
                {nodes.map((node) => {
                    const isSelected = selectedNode?.id === node.id;
                    const isHovered = hoveredNode === node.id;

                    return (
                        <Marker
                            key={node.id}
                            coordinates={[node.location.lng, node.location.lat]}
                            onClick={() => onSelectNode(node)}
                            onMouseEnter={() => setHoveredNode(node.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                        >
                            <g style={{ cursor: 'pointer' }}>
                                {/* Outer glow */}
                                <circle
                                    r={isSelected ? 12 : 8}
                                    fill={isSelected ? 'rgba(16, 185, 129, 0.2)' : 'transparent'}
                                />

                                {/* Main dot */}
                                <circle
                                    r={isSelected ? 6 : isHovered ? 5 : 4}
                                    fill={node.status === 'online' ? '#10b981' : '#f59e0b'}
                                    stroke={isSelected ? '#fff' : 'rgba(255,255,255,0.4)'}
                                    strokeWidth={isSelected ? 2 : 1}
                                />

                                {/* Label */}
                                <text
                                    textAnchor="middle"
                                    y={-12}
                                    style={{
                                        fontSize: '9px',
                                        fontWeight: 500,
                                        fill: isSelected ? '#10b981' : '#64748b',
                                        fontFamily: 'system-ui, sans-serif',
                                    }}
                                >
                                    {node.location.city}
                                </text>
                            </g>
                        </Marker>
                    );
                })}
            </ComposableMap>

            {/* Hover Tooltip */}
            {hoveredNode && (
                <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 bg-slate-800/95 backdrop-blur border border-slate-600 rounded-lg px-3 py-2 shadow-xl pointer-events-none">
                    {(() => {
                        const node = nodes.find(n => n.id === hoveredNode);
                        if (!node) return null;
                        return (
                            <div className="text-center whitespace-nowrap">
                                <div className="text-xs font-semibold text-white">{node.name}</div>
                                <div className="text-[10px] text-slate-400">{node.gpu.model}</div>
                            </div>
                        );
                    })()}
                </div>
            )}

            {/* Bottom Legend */}
            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span>{nodes.length} nodes</span>
                </div>
            </div>

            {/* Click hint */}
            <div className="absolute bottom-3 right-3 z-20 text-[9px] text-slate-500">
                click to select
            </div>
        </div>
    );
}
