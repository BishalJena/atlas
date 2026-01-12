'use client';

import { useState } from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Graticule,
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

    return (
        <div className="h-full w-full relative">
            {/* Header - Live Network Badge */}
            <div className="absolute top-4 right-4 z-20">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-secondary)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-secondary)]"></span>
                    </span>
                    <span className="text-[10px] font-medium text-[var(--text-secondary)] tracking-wider">LIVE MAINNET</span>
                </div>
            </div>

            {/* World Map - Equal Earth Projection */}
            <ComposableMap
                projection="geoEqualEarth"
                projectionConfig={{
                    scale: 180,
                    center: [10, 5],
                }}
                className="w-full h-full"
                style={{ backgroundColor: 'transparent' }}
            >
                {/* Graticule (grid lines) */}
                <Graticule stroke="rgba(255, 255, 255, 0.03)" strokeWidth={0.5} />

                {/* Countries */}
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="rgba(30, 41, 59, 0.4)"
                                stroke="rgba(148, 163, 184, 0.1)"
                                strokeWidth={0.5}
                                style={{
                                    default: { outline: 'none' },
                                    hover: { outline: 'none', fill: 'rgba(59, 130, 246, 0.2)', stroke: 'rgba(59, 130, 246, 0.4)' },
                                    pressed: { outline: 'none' },
                                }}
                            />
                        ))
                    }
                </Geographies>

                {/* GPU Node Markers */}
                {nodes.map((node) => {
                    const isSelected = selectedNode?.id === node.id;
                    const isHovered = hoveredNode === node.id;
                    const isOnline = node.status === 'online';

                    return (
                        <Marker
                            key={node.id}
                            coordinates={[node.location.lng, node.location.lat]}
                            onClick={() => onSelectNode(node)}
                            onMouseEnter={() => setHoveredNode(node.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                        >
                            <g style={{ cursor: 'pointer' }}>
                                {/* Pulse animation for online nodes */}
                                {isOnline && (
                                    <circle
                                        r={isSelected ? 20 : 12}
                                        fill={isSelected ? 'rgba(6, 182, 212, 0.1)' : 'rgba(16, 185, 129, 0.05)'}
                                        className={isSelected ? "animate-ping opacity-20" : "animate-pulse"}
                                    />
                                )}

                                {/* Marker Circle */}
                                <circle
                                    r={isSelected ? 8 : isHovered ? 6 : 4}
                                    fill={isSelected ? 'var(--accent-primary)' : isOnline ? 'var(--status-success)' : 'var(--status-warning)'}
                                    stroke={isSelected ? 'white' : 'transparent'}
                                    strokeWidth={1}
                                    className="transition-all duration-300"
                                />

                                {/* Connection Line Effect (if selected) */}
                                {isSelected && (
                                    <circle r={40} fill="none" stroke="var(--accent-primary)" strokeWidth={0.5} opacity={0.2} className="animate-spin-slow" />
                                )}

                                {/* Label */}
                                <text
                                    textAnchor="middle"
                                    y={-14}
                                    style={{
                                        fontSize: '10px',
                                        fontWeight: isSelected ? 700 : 500,
                                        fill: isSelected ? 'white' : 'rgba(255,255,255,0.7)',
                                        opacity: isSelected || isHovered ? 1 : 0,
                                        transition: 'opacity 0.2s',
                                        pointerEvents: 'none'
                                    }}
                                >
                                    {node.location.city}
                                </text>
                            </g>
                        </Marker>
                    );
                })}
            </ComposableMap>

            {/* Bottom Legend */}
            <div className="absolute bottom-4 left-6 z-20 flex flex-col gap-1 text-[10px] text-[var(--text-tertiary)]">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--status-success)]"></div>
                    <span>{nodes.filter(n => n.status === 'online').length} Nodes Online</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)]"></div>
                    <span>High Performance</span>
                </div>
            </div>
        </div>
    );
}
