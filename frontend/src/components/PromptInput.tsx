'use client';

import { WorkloadType } from '@/types';
import { Send } from 'lucide-react';

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
        if (prompt.trim()) {
            onSubmit(prompt);
            setPrompt('');
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* INPUT header to match OUTPUT header */}
            <h2 className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider mb-2">
                Input
            </h2>

            <form onSubmit={handleSubmit} className="relative flex-1">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={workload ? `Enter ${workload.name.toLowerCase()} prompt...` : "Select a workload first"}
                    disabled={disabled || isLoading}
                    rows={2}
                    className="w-full h-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-xl p-4 pr-24 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] resize-none transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {/* Run button - vertically centered */}
                <button
                    type="submit"
                    disabled={disabled || isLoading || !prompt.trim()}
                    className="absolute top-1/2 -translate-y-1/2 right-3 btn-primary text-xs py-2 px-3 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing
                        </>
                    ) : (
                        <>
                            <Send className="w-3 h-3" />
                            Run
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
