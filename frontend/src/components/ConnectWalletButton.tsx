'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Wallet, LogOut, Copy, Check } from 'lucide-react';
import { useState, useCallback } from 'react';

export default function ConnectWalletButton() {
    const { publicKey, disconnect, connected, connecting } = useWallet();
    const { setVisible } = useWalletModal();
    const [copied, setCopied] = useState(false);

    const handleConnect = useCallback(() => {
        setVisible(true);
    }, [setVisible]);

    const handleDisconnect = useCallback(() => {
        disconnect();
    }, [disconnect]);

    const copyAddress = useCallback(() => {
        if (publicKey) {
            navigator.clipboard.writeText(publicKey.toBase58());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [publicKey]);

    const truncateAddress = (address: string) => {
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    if (connecting) {
        return (
            <button
                disabled
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400"
            >
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Connecting...</span>
            </button>
        );
    }

    if (connected && publicKey) {
        return (
            <div className="flex items-center gap-2">
                {/* Wallet Address */}
                <button
                    onClick={copyAddress}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-slate-600 transition-colors group"
                >
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm text-slate-300 font-mono">
                        {truncateAddress(publicKey.toBase58())}
                    </span>
                    {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                    )}
                </button>

                {/* Disconnect Button */}
                <button
                    onClick={handleDisconnect}
                    className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-red-500/50 hover:bg-red-500/10 transition-colors group"
                    title="Disconnect wallet"
                >
                    <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={handleConnect}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-medium transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
        >
            <Wallet className="w-4 h-4" />
            <span className="text-sm">Connect Wallet</span>
        </button>
    );
}
