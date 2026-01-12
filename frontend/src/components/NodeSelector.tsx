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
        <div className="flex flex-col h-full w-full">
            <div className="flex-1 overflow-y-auto space-y-1 pr-1 hide-scrollbar">
                {nodes.map((node) => {
                    const isSelected = selectedNode?.id === node.id;
                    const isOnline = node.status === 'online';

                    return (
                        <div
                            key={node.id}
                            onClick={() => onSelectNode(node)}
                            className={`interactive-item p-3 flex flex-col gap-2 transition-all duration-200 ${isSelected
                                    ? 'bg-[var(--accent-dim)] border-[var(--accent-primary)]'
                                    : 'bg-transparent border-transparent hover:bg-[var(--bg-elevated)]'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center border transition-colors ${isSelected
                                            ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-white'
                                            : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                                        }`}>
                                        <Cpu className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className={`text-sm font-medium truncate ${isSelected ? 'text-white' : 'text-[var(--text-primary)]'}`}>
                                            {node.name}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-tertiary)] truncate">
                                            <MapPin className="w-3 h-3 text-[var(--text-tertiary)]" />
                                            {node.location.city}, {node.location.country}
                                        </div>
                                    </div>
                                </div>

                                <div className="shrink-0 flex flex-col items-end gap-1">
                                    <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-[var(--status-success)] shadow-[0_0_5px_var(--status-success)]' : 'bg-[var(--status-warning)]'}`} />
                                    <div className="text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                                        {node.gpu.model.replace('NVIDIA ', '')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
