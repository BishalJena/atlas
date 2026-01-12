'use client';

import { WorkloadType } from '@/types';
import { MessageSquare, Image as ImageIcon, Video, Sparkles } from 'lucide-react';

interface WorkloadPickerProps {
    workloads: WorkloadType[];
    selectedWorkload: WorkloadType | null;
    onSelectWorkload: (workload: WorkloadType) => void;
}

export default function WorkloadPicker({ workloads, selectedWorkload, onSelectWorkload }: WorkloadPickerProps) {
    const getIcon = (id: string) => {
        switch (id) {
            case 'llm': return <MessageSquare className="w-3.5 h-3.5" />;
            case 'image': return <ImageIcon className="w-3.5 h-3.5" />;
            case 'video': return <Video className="w-3.5 h-3.5" />;
            default: return <Sparkles className="w-3.5 h-3.5" />;
        }
    };

    const getLabel = (id: string) => {
        switch (id) {
            case 'llm': return 'LLM';
            case 'image': return 'IMG';
            case 'video': return 'VID';
            default: return id.toUpperCase();
        }
    };

    return (
        <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]">
            {workloads.map((workload) => {
                const isSelected = selectedWorkload?.id === workload.id;

                return (
                    <button
                        key={workload.id}
                        onClick={() => onSelectWorkload(workload)}
                        className={`
                            relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
                            ${isSelected
                                ? 'bg-[var(--accent-primary)] text-white shadow-lg shadow-[var(--accent-primary)]/30'
                                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                            }
                        `}
                    >
                        {getIcon(workload.id)}
                        <span>{getLabel(workload.id)}</span>
                    </button>
                );
            })}
        </div>
    );
}
