'use client';

import { WorkloadType } from '@/types';
import { MessageSquare, Image as ImageIcon, Video } from 'lucide-react';

interface WorkloadPickerProps {
    workloads: WorkloadType[];
    selectedWorkload: WorkloadType | null;
    onSelectWorkload: (workload: WorkloadType) => void;
}

export default function WorkloadPicker({ workloads, selectedWorkload, onSelectWorkload }: WorkloadPickerProps) {
    const getIcon = (id: string) => {
        switch (id) {
            case 'llm': return <MessageSquare className="w-4 h-4" />;
            case 'image': return <ImageIcon className="w-4 h-4" />;
            case 'video': return <Video className="w-4 h-4" />;
            default: return <MessageSquare className="w-4 h-4" />;
        }
    };

    const getShortName = (id: string) => {
        switch (id) {
            case 'llm': return 'LLM';
            case 'image': return 'Image';
            case 'video': return 'Video';
            default: return id;
        }
    };

    return (
        <div className="flex flex-col">
            {/* WORKLOAD header to match INPUT and OUTPUT headers */}
            <h2 className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider mb-2">
                Workload
            </h2>
            <div className="flex gap-2">
                {workloads.map((workload) => {
                    const isSelected = selectedWorkload?.id === workload.id;

                    return (
                        <button
                            key={workload.id}
                            onClick={() => onSelectWorkload(workload)}
                            className={`
                            flex flex-col items-center justify-center gap-1 px-4 py-4 rounded-xl
                            border transition-all duration-200 min-w-[80px] h-[72px]
                            ${isSelected
                                    ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-white shadow-lg shadow-blue-500/20'
                                    : 'bg-[var(--bg-tertiary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-default)] hover:text-[var(--text-primary)]'
                                }
                        `}
                        >
                            <div className="flex items-center gap-1.5">
                                {getIcon(workload.id)}
                                <span className="text-xs font-semibold">{getShortName(workload.id)}</span>
                            </div>
                            <span className={`text-[10px] font-mono ${isSelected ? 'text-blue-200' : 'text-[var(--text-muted)]'}`}>
                                ${workload.avgCost}/req
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
