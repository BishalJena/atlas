'use client';

import { Activity, Menu, X } from 'lucide-react';
import { useState } from 'react';
import ConnectWalletButton from './ConnectWalletButton';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Brand */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="font-semibold text-[var(--text-primary)] text-lg leading-tight">
                            Atlas <span className="text-[var(--text-secondary)] font-normal">by AIDP</span>
                        </h1>
                    </div>
                </div>

                {/* Desktop Stats */}
                <div className="hidden md:flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[var(--status-success)] marker-pulse"></div>
                        <span className="text-[var(--text-secondary)]">Network Online</span>
                    </div>
                    <div className="h-4 w-px bg-[var(--border-default)]"></div>
                    <div className="text-[var(--text-secondary)]">
                        <span className="text-[var(--text-primary)] font-mono font-medium">4</span> Nodes Active
                    </div>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-3">
                    <a
                        href="https://aidp.store"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm"
                    >
                        Docs
                    </a>
                    <ConnectWalletButton />
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-tertiary)] p-4 space-y-4 animate-in slide-in-from-top-2">
                    <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-[var(--bg-elevated)]">
                        <span className="text-[var(--text-secondary)]">Status</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[var(--status-success)]"></div>
                            <span className="text-[var(--status-success)]">Online</span>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <ConnectWalletButton />
                    </div>

                    <div className="flex gap-2">
                        <a
                            href="https://aidp.store"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 btn-secondary py-2 text-sm text-center"
                        >
                            Docs
                        </a>
                        <a
                            href="https://t.me/Aidpofficial"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 btn-secondary py-2 text-sm text-center"
                        >
                            Support
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
