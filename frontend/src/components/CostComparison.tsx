'use client';

import { TrendingDown, DollarSign, Cpu, MapPin } from 'lucide-react';
import { GPUNode } from '@/types';
import { cloudPricing } from '@/lib/mockData';

interface CostComparisonProps {
    selectedNode: GPUNode | null;
}

interface ProviderCost {
    provider: string;
    logo: string;
    color: string;
    instance: string;
    hourlyRate: number;
    monthlyRate: number;
}

export default function CostComparison({ selectedNode }: CostComparisonProps) {
    // If no node selected, show simple placeholder
    if (!selectedNode) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center opacity-50">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mb-3">
                    <TrendingDown className="w-5 h-5 text-[var(--text-secondary)]" />
                </div>
                <p className="text-sm text-[var(--text-secondary)]">Select a node to view detailed cost analysis</p>
            </div>
        );
    }

    const gpuModel = selectedNode.gpu.model;
    const cloudRates = cloudPricing[gpuModel];

    if (!cloudRates) {
        return (
            <div className="p-6 text-center text-[var(--text-secondary)]">
                No pricing data available for {gpuModel}
            </div>
        );
    }

    const hoursPerMonth = 730;

    const providers: ProviderCost[] = [
        {
            provider: 'AIDP',
            logo: '⚡',
            color: 'var(--accent-primary)',
            instance: selectedNode.name,
            hourlyRate: selectedNode.pricing.hourly,
            monthlyRate: selectedNode.pricing.hourly * hoursPerMonth,
        },
        {
            provider: 'AWS',
            logo: '☁️',
            color: '#ff9900',
            instance: cloudRates.aws.instance,
            hourlyRate: cloudRates.aws.hourly,
            monthlyRate: cloudRates.aws.hourly * hoursPerMonth,
        },
        {
            provider: 'GCP',
            logo: '🌐',
            color: '#4285f4',
            instance: cloudRates.gcp.instance,
            hourlyRate: cloudRates.gcp.hourly,
            monthlyRate: cloudRates.gcp.hourly * hoursPerMonth,
        },
        {
            provider: 'Azure',
            logo: '☁️',
            color: '#0078d4',
            instance: cloudRates.azure.instance,
            hourlyRate: cloudRates.azure.hourly,
            monthlyRate: cloudRates.azure.hourly * hoursPerMonth,
        },
    ];

    const aidpCost = providers[0].monthlyRate;
    const maxCost = Math.max(...providers.map(p => p.monthlyRate));

    // Format helpers
    const formatCurrency = (value: number) => value >= 1000 ? `$${(value / 1000).toFixed(1)}K` : `$${value.toFixed(2)}`;
    const getSavingsPercent = (cost: number) => cost <= aidpCost ? 0 : Math.round(((cost - aidpCost) / cost) * 100);

    return (
        <div className="p-4 h-full flex flex-col">
            {/* Selected Node Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-bold text-white">{gpuModel}</span>
                        <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--accent-dim)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                            AIDP NODE
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                        <MapPin className="w-3 h-3" />
                        {selectedNode.location.city}, {selectedNode.location.country}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-mono text-[var(--accent-secondary)]">${selectedNode.pricing.hourly}/hr</div>
                    <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">Current Rate</div>
                </div>
            </div>

            {/* Bars */}
            <div className="flex-1 space-y-4">
                {providers.map((p) => {
                    const width = (p.monthlyRate / maxCost) * 100;
                    const savings = getSavingsPercent(p.monthlyRate);
                    const isAIDP = p.provider === 'AIDP';

                    return (
                        <div key={p.provider} className="group">
                            <div className="flex justify-between text-xs mb-1">
                                <div className="flex items-center gap-2">
                                    <span className={isAIDP ? 'text-white font-bold' : 'text-[var(--text-secondary)]'}>{p.provider}</span>
                                    <span className="text-[10px] text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity">{p.instance}</span>
                                </div>
                                <div className="font-mono">
                                    <span className={isAIDP ? 'text-[var(--accent-secondary)]' : 'text-[var(--text-primary)]'}>{formatCurrency(p.monthlyRate)}/mo</span>
                                </div>
                            </div>
                            <div className="h-1.5 w-full bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-1000 ease-out"
                                    style={{
                                        width: `${width}%`,
                                        backgroundColor: p.color,
                                        opacity: isAIDP ? 1 : 0.4
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Savings Callout */}
            <div className="mt-auto pt-4 border-t border-[var(--border-subtle)]">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-secondary)]">Potential Monthly Savings</span>
                    <span className="text-lg font-bold text-[var(--accent-secondary)]">
                        {formatCurrency(providers[1].monthlyRate - aidpCost)}
                    </span>
                </div>
            </div>
        </div>
    );
}
