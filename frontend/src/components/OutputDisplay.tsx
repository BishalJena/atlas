'use client';

import { ComputeJob } from '@/types';
import { Copy, Download, Terminal, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';

interface OutputDisplayProps {
    job: ComputeJob | null;
    isRunning: boolean;
}

// Simple markdown-like formatting for LLM output
function formatOutput(text: string): ReactNode[] {
    const lines = text.split('\n');
    return lines.map((line, i) => {
        // Bold text: **text**
        const formattedLine = line.split(/(\*\*[^*]+\*\*)/).map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
            }
            return part;
        });

        // Empty lines
        if (line.trim() === '') {
            return <div key={i} className="h-3" />;
        }

        // List items
        if (line.trim().startsWith('-')) {
            return (
                <div key={i} className="flex gap-2 ml-2 mb-1">
                    <span className="text-[var(--accent-primary)]">•</span>
                    <span>{formattedLine}</span>
                </div>
            );
        }

        // Numbered items
        if (/^\d+\./.test(line.trim())) {
            const [num, ...rest] = line.trim().split('.');
            return (
                <div key={i} className="flex gap-2 ml-2 mb-1">
                    <span className="text-[var(--accent-secondary)] font-mono text-xs">{num}.</span>
                    <span>{rest.join('.').split(/(\*\*[^*]+\*\*)/).map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
                        }
                        return part;
                    })}</span>
                </div>
            );
        }

        return <p key={i} className="mb-1">{formattedLine}</p>;
    });
}

export default function OutputDisplay({ job, isRunning }: OutputDisplayProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (job?.result) {
            navigator.clipboard.writeText(job.result);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (isRunning) {
        return (
            <div className="h-full flex flex-col p-5 relative overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] to-black/60">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)]/20 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-[var(--accent-primary)] animate-pulse" />
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-white">Processing Request</div>
                        <div className="text-[10px] text-[var(--text-tertiary)]">Generating response...</div>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="space-y-3 text-xs">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[var(--status-success)]/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-[var(--status-success)]" />
                        </div>
                        <span className="text-[var(--text-secondary)]">Connected to compute node</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[var(--status-success)]/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-[var(--status-success)]" />
                        </div>
                        <span className="text-[var(--text-secondary)]">VRAM allocated</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <span className="text-[var(--accent-primary)]">Running inference...</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-auto pt-6">
                    <div className="h-1 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full animate-pulse" style={{ width: '65%' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!job?.result) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[var(--bg-secondary)]/50 to-black/40">
                <div className="w-16 h-16 rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center mb-4 border border-[var(--border-subtle)]">
                    <Terminal className="w-7 h-7 text-[var(--text-tertiary)]" strokeWidth={1.5} />
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-1">Ready for Input</p>
                <p className="text-[11px] text-[var(--text-tertiary)] text-center max-w-[220px]">
                    Select a node and workload, then enter your prompt to begin
                </p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col relative group bg-gradient-to-br from-[var(--bg-secondary)]/50 to-black/40">
            {/* Header Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-subtle)] bg-black/20">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--status-success)]"></div>
                    <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">Output</span>
                </div>
                <div className="flex gap-1">
                    <button
                        onClick={handleCopy}
                        className="p-1.5 text-[var(--text-tertiary)] hover:text-white hover:bg-[var(--bg-elevated)] rounded transition-colors"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-[var(--status-success)]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    {job.type === 'image' && (
                        <a
                            href={job.result}
                            download
                            className="p-1.5 text-[var(--text-tertiary)] hover:text-white hover:bg-[var(--bg-elevated)] rounded transition-colors"
                            title="Download"
                        >
                            <Download className="w-3.5 h-3.5" />
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4">
                {job.type === 'image' ? (
                    <div className="h-full w-full flex items-center justify-center bg-black/30 rounded-xl overflow-hidden border border-[var(--border-subtle)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={job.result}
                            alt="Generated"
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                ) : (
                    <div className="text-[var(--text-secondary)] text-sm leading-relaxed">
                        {formatOutput(job.result)}
                    </div>
                )}
            </div>

            {/* Status Footer */}
            <div className="px-4 py-2 flex justify-between items-center text-[10px] border-t border-[var(--border-subtle)] bg-black/20">
                <div className="flex items-center gap-4 text-[var(--text-tertiary)]">
                    <span className="font-mono">{(job.metrics.inferenceTime / 1000).toFixed(2)}s</span>
                    {(job.metrics.tokensGenerated ?? 0) > 0 && (
                        <span className="font-mono">{job.metrics.tokensGenerated} tokens</span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[var(--text-tertiary)]">Cost:</span>
                    <span className="font-mono text-[var(--accent-secondary)]">${job.metrics.cost.toFixed(5)}</span>
                </div>
            </div>
        </div>
    );
}
