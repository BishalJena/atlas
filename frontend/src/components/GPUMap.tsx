'use client';

import { useState } from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup,
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
    const [position, setPosition] = useState({ coordinates: [0, 20] as [number, number], zoom: 1 });

    const handleMoveEnd = (pos: { coordinates: [number, number]; zoom: number }) => {
        setPosition(pos);
    };

    return (
        <div className="premium-card h-[400px] lg:h-[450px] relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)' }}>
            {/* Header - Live Network Badge */}
            <div className="absolute top-3 left-3 z-20">
                <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 px-2.5 py-1 rounded-full">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-medium text-slate-300">LIVE NETWORK</span>
                </div>
            </div>

            {/* Zoom Controls */}
            <div className="absolute top-3 right-3 z-20 flex flex-col gap-1">
                <button
                    onClick={() => setPosition(p => ({ ...p, zoom: Math.min(p.zoom * 1.5, 8) }))}
                    className="w-7 h-7 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded text-slate-300 hover:bg-slate-800 transition-colors text-sm font-medium"
                >
                    +
                </button>
                <button
                    onClick={() => setPosition(p => ({ ...p, zoom: Math.max(p.zoom / 1.5, 1) }))}
                    className="w-7 h-7 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded text-slate-300 hover:bg-slate-800 transition-colors text-sm font-medium"
                >
                    −
                </button>
            </div>

            {/* World Map with Zoom & Pan */}
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 140 }}
                className="w-full h-full"
                style={{ backgroundColor: 'transparent' }}
            >
                <ZoomableGroup
                    zoom={position.zoom}
                    center={position.coordinates}
                    onMoveEnd={handleMoveEnd}
                    minZoom={1}
                    maxZoom={8}
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
                                    strokeWidth={0.5}
                                    style={{
                                        default: { outline: 'none' },
                                        hover: { outline: 'none', fill: '#334155' },
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
                                            r={isSelected ? 16 : 12}
                                            fill={isSelected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.15)'}
                                            className="animate-pulse"
                                        />
                                    )}

                                    {/* Main marker */}
                                    <circle
                                        r={isSelected ? 8 : isHovered ? 7 : 6}
                                        fill={isOnline ? '#10b981' : '#f59e0b'}
                                        stroke={isSelected ? '#ffffff' : 'rgba(255,255,255,0.5)'}
                                        strokeWidth={isSelected ? 2.5 : 1.5}
                                    />

                                    {/* GPU icon (inner circle) */}
                                    <circle
                                        r={2.5}
                                        fill={isSelected ? '#ffffff' : 'rgba(255,255,255,0.8)'}
                                    />

                                    {/* Node label */}
                                    <text
                                        textAnchor="middle"
                                        y={-14}
                                        style={{
                                            fontSize: '10px',
                                            fontWeight: isSelected ? 600 : 500,
                                            fill: isSelected ? '#10b981' : '#94a3b8',
                                            fontFamily: 'system-ui, sans-serif',
                                            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                                        }}
                                    >
                                        {node.location.city}
                                    </text>

                                    {/* GPU Model label (on hover/select) */}
                                    {(isHovered || isSelected) && (
                                        <text
                                            textAnchor="middle"
                                            y={20}
                                            style={{
                                                fontSize: '8px',
                                                fontWeight: 500,
                                                fill: '#64748b',
                                                fontFamily: 'system-ui, sans-serif',
                                            }}
                                        >
                                            {node.gpu.model}
                                        </text>
                                    )}
                                </g>
                            </Marker>
                        );
                    })}
                </ZoomableGroup>
            </ComposableMap>

            {/* Bottom Legend */}
            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    <span>{nodes.filter(n => n.status === 'online').length} online</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                    <span>{nodes.filter(n => n.status !== 'online').length} busy</span>
                </div>
            </div>

            {/* Interaction hint */}
            <div className="absolute bottom-3 right-3 z-20 text-[9px] text-slate-500">
                drag to pan • scroll to zoom • click to select
            </div>
        </div>
    );
}
