'use client';

import { GPUNode } from '@/types';
import { Cpu, Server, MapPin, Gauge } from 'lucide-react';

interface NodeSelectorProps {
    nodes: GPUNode[];
    selectedNode: GPUNode | null;
    onSelectNode: (node: GPUNode) => void;
}

export default function NodeSelector({ nodes, selectedNode, onSelectNode }: NodeSelectorProps) {
    return (
        <div className="flex flex-col h-full premium-card p-4">
            <h2 className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider mb-4 px-2">
                Available Compute
            </h2>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 hide-scrollbar max-h-[400px]">
                {nodes.map((node) => {
                    const isSelected = selectedNode?.id === node.id;
                    const isOnline = node.status === 'online';

                    return (
                        <div
                            key={node.id}
                            onClick={() => onSelectNode(node)}
                            className={`interactive-item p-3 flex flex-col gap-2 ${isSelected ? 'active' : 'bg-transparent hover:bg-[var(--bg-elevated)] border-transparent'}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-[var(--bg-secondary)] flex items-center justify-center border border-[var(--border-subtle)]">
                                        <Cpu className="w-4 h-4 text-[var(--text-secondary)]" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-[var(--text-primary)]">
                                            {node.name}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
                                            <MapPin className="w-3 h-3" />
                                            {node.location.city}, {node.location.country}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-1.5 mb-0.5">
                                        <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-[var(--status-success)]' : 'bg-[var(--status-warning)]'}`} />
                                        <span className={`text-xs font-medium ${isOnline ? 'text-[var(--status-success)]' : 'text-[var(--status-warning)]'}`}>
                                            {isOnline ? 'Ready' : 'Busy'}
                                        </span>
                                    </div>
                                    <div className="text-[10px] text-[var(--text-tertiary)] bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)]">
                                        {node.gpu.model}
                                    </div>
                                </div>
                            </div>

                            {isSelected && (
                                <div className="grid grid-cols-2 gap-2 mt-1 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="bg-[var(--bg-secondary)] p-2 rounded border border-[var(--border-subtle)] flex items-center justify-between">
                                        <span className="text-[10px] text-[var(--text-tertiary)]">VRAM</span>
                                        <span className="text-xs font-mono font-medium">{node.gpu.vram}GB</span>
                                    </div>
                                    <div className="bg-[var(--bg-secondary)] p-2 rounded border border-[var(--border-subtle)] flex items-center justify-between">
                                        <span className="text-[10px] text-[var(--text-tertiary)]">Price</span>
                                        <span className="text-xs font-mono font-medium">${node.pricing.hourly}/h</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
