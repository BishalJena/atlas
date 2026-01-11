'use client';

import { Github, Twitter, ExternalLink, Cpu } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 mt-8">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Left: Branding */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-[var(--accent-primary)]" />
                            <span className="text-sm font-medium text-[var(--text-primary)]">AIDP Compute Arena</span>
                        </div>
                        <span className="text-xs text-[var(--text-tertiary)]">•</span>
                        <span className="text-xs text-[var(--text-tertiary)]">Powered by AIDP GPU Network</span>
                    </div>

                    {/* Center: Links */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://aidp.store"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
                        >
                            AIDP Store
                            <ExternalLink className="w-3 h-3" />
                        </a>
                        <a
                            href="https://x.com/aidpstore"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
                        >
                            <Twitter className="w-3 h-3" />
                            Twitter
                        </a>
                        <a
                            href="https://t.me/Aidpofficial"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            Telegram
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
                        >
                            <Github className="w-3 h-3" />
                            GitHub
                        </a>
                    </div>

                    {/* Right: Copyright */}
                    <div className="text-xs text-[var(--text-tertiary)]">
                        Built for Superteam Bounty • 2026
                    </div>
                </div>
            </div>
        </footer>
    );
}
