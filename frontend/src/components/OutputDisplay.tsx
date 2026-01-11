'use client';

import { ComputeJob } from '@/types';
import { CheckCircle2, Copy, Download, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OutputDisplayProps {
    job: ComputeJob | null;
    isRunning: boolean;
}

export default function OutputDisplay({ job, isRunning }: OutputDisplayProps) {
    // Show empty state placeholder when no job
    const showEmptyState = !job && !isRunning;

    return (
        <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider">
                    Output
                </h2>
                {job?.status === 'completed' && (
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--status-success)] flex items-center gap-1.5 bg-[var(--status-success)]/10 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed in {(job.metrics.inferenceTime / 1000).toFixed(2)}s
                        </span>
                    </div>
                )}
            </div>

            <div className="premium-card flex-1 p-1 relative group bg-[var(--bg-tertiary)] overflow-hidden">
                {isRunning ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg-tertiary)] z-10">
                        <div className="w-8 h-8 rounded-full border-2 border-[var(--border-default)] border-t-[var(--accent-primary)] animate-spin mb-3"></div>
                        <p className="text-sm text-[var(--text-secondary)] animate-pulse">Running inference on GPU...</p>
                    </div>
                ) : job?.result ? (
                    <>
                        {/* Result Content */}
                        <div className="h-full w-full">
                            {job.type === 'image' ? (
                                <div className="relative h-[300px] w-full bg-[var(--bg-black)] rounded-lg overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={job.result}
                                        alt="Generated"
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                                        <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors">
                                            Download High-Res
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-4 h-full font-mono text-sm leading-relaxed text-[var(--text-primary)] bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-subtle)] overflow-auto max-h-[300px]">
                                    {job.result.split('\n').map((line, i) => (
                                        <p key={i} className="mb-2 last:mb-0">{line}</p>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Actions Toolbar */}
                        <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--bg-primary)]/80 backdrop-blur border border-[var(--border-subtle)] rounded-lg p-1">
                            <button className="p-1.5 text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-elevated)] rounded-md" title="Copy">
                                <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1.5 text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-elevated)] rounded-md" title="Share">
                                <Share2 className="w-3.5 h-3.5" />
                            </button>
                            {job.type === 'image' && (
                                <button className="p-1.5 text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-elevated)] rounded-md" title="Download">
                                    <Download className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    // Empty state placeholder
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                        <div className="text-[var(--text-tertiary)] text-sm">
                            Select a node and workload, then run a prompt to see results
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
