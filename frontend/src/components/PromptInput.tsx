'use client';

import { WorkloadType } from '@/types';
import { Send, Zap, Lightbulb } from 'lucide-react';
import { samplePrompts } from '@/lib/mockData';

interface PromptInputProps {
    workload: WorkloadType | null;
    onSubmit: (prompt: string) => void;
    isLoading: boolean;
    disabled: boolean;
    prompt: string;
    setPrompt: (prompt: string) => void;
}

export default function PromptInput({ workload, onSubmit, isLoading, disabled, prompt, setPrompt }: PromptInputProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim() && !disabled && !isLoading) {
            onSubmit(prompt);
            setPrompt('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // Get suggestions for current workload
    const suggestions = workload
        ? samplePrompts[workload.id as keyof typeof samplePrompts] || []
        : [];

    return (
        <form onSubmit={handleSubmit} className="h-full flex flex-col">
            {/* Input Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[var(--accent-primary)]/20 flex items-center justify-center">
                        <Zap className="w-3 h-3 text-[var(--accent-primary)]" />
                    </div>
                    <span className="text-xs text-[var(--text-secondary)]">
                        {workload ? workload.name : 'Select Workload'}
                    </span>
                </div>
                {workload && (
                    <span className="text-[10px] text-[var(--text-tertiary)] font-mono">
                        ~{workload.avgTime / 1000}s • ${workload.avgCost}
                    </span>
                )}
            </div>

            {/* Textarea */}
            <div className="flex-1 relative">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={workload ? `Describe your ${workload.name.toLowerCase()} task...` : "First, select a workload type →"}
                    disabled={disabled || isLoading}
                    className="w-full h-full min-h-[100px] bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-xl p-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]/50 resize-none transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed leading-relaxed"
                    spellCheck={false}
                />

                {/* Character count */}
                {prompt.length > 0 && (
                    <div className="absolute bottom-3 left-4 text-[10px] text-[var(--text-tertiary)]">
                        {prompt.length} chars
                    </div>
                )}
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
                <div className="mt-3">
                    <div className="flex items-center gap-1.5 mb-2">
                        <Lightbulb className="w-3 h-3 text-[var(--text-tertiary)]" />
                        <span className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">Try these</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {suggestions.map((suggestion, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setPrompt(suggestion)}
                                className="text-[11px] text-[var(--text-secondary)] bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] px-3 py-1.5 rounded-lg hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/5 transition-all"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Submit Button */}
            <div className="mt-4 flex justify-end">
                <button
                    type="submit"
                    disabled={disabled || isLoading || !prompt.trim()}
                    className={`
                        relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs uppercase tracking-wider transition-all duration-300
                        ${disabled || isLoading || !prompt.trim()
                            ? 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] cursor-not-allowed border border-[var(--border-subtle)]'
                            : 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-lg shadow-[var(--accent-primary)]/25 hover:shadow-xl hover:shadow-[var(--accent-primary)]/30 hover:scale-[1.02]'
                        }
                    `}
                >
                    {isLoading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            <span>Execute</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
