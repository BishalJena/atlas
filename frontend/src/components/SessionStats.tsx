'use client';

import { SessionStats } from '@/types';
import { Layers, Zap, Clock, TrendingUp } from 'lucide-react';

interface SessionStatsProps {
    stats: SessionStats;
}

export default function SessionStatsPanel({ stats }: SessionStatsProps) {
    return (
        <div className="grid grid-cols-4 gap-4 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-3 mb-6">
            <div className="flex items-center gap-3 px-2 border-r border-[var(--border-subtle)] last:border-0">
                <div className="p-1.5 bg-[var(--bg-tertiary)] rounded-md text-[var(--text-secondary)]">
                    <Layers className="w-4 h-4" />
                </div>
                <div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">Total Jobs</div>
                    <div className="text-sm font-mono font-medium text-[var(--text-primary)]">{stats.totalJobs}</div>
                </div>
            </div>

            <div className="flex items-center gap-3 px-2 border-r border-[var(--border-subtle)] last:border-0">
                <div className="p-1.5 bg-[var(--bg-tertiary)] rounded-md text-[var(--text-secondary)]">
                    <Clock className="w-4 h-4" />
                </div>
                <div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">Compute Time</div>
                    <div className="text-sm font-mono font-medium text-[var(--text-primary)]">{(stats.totalInferenceTime / 1000).toFixed(1)}s</div>
                </div>
            </div>

            <div className="flex items-center gap-3 px-2 border-r border-[var(--border-subtle)] last:border-0">
                <div className="p-1.5 bg-[var(--bg-tertiary)] rounded-md text-[var(--text-secondary)]">
                    <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">Cost</div>
                    <div className="text-sm font-mono font-medium text-[var(--text-primary)]">${stats.totalCost.toFixed(4)}</div>
                </div>
            </div>

            <div className="flex items-center gap-3 px-2 last:border-0">
                <div className="p-1.5 bg-[var(--bg-tertiary)] rounded-md text-[var(--text-secondary)]">
                    <Zap className="w-4 h-4" />
                </div>
                <div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">Status</div>
                    <div className="text-sm font-medium text-[var(--status-success)] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-success)] animate-pulse"></span>
                        Active
                    </div>
                </div>
            </div>
        </div>
    );
}
