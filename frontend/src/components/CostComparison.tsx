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
    // If no node selected, show placeholder
    if (!selectedNode) {
        return (
            <div className="premium-card p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                        <TrendingDown className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">Cost Comparison</h3>
                        <p className="text-xs text-slate-400">AIDP vs Traditional Cloud</p>
                    </div>
                </div>
                <div className="flex items-center justify-center h-32 bg-slate-800/30 rounded-xl border border-dashed border-slate-700">
                    <div className="text-center">
                        <Cpu className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                        <p className="text-sm text-slate-500">Select a node to compare costs</p>
                    </div>
                </div>
            </div>
        );
    }

    // Get cloud pricing for selected GPU type
    const gpuModel = selectedNode.gpu.model;
    const cloudRates = cloudPricing[gpuModel];

    // If no cloud rates for this GPU (unlikely), show fallback
    if (!cloudRates) {
        return (
            <div className="premium-card p-6">
                <p className="text-slate-400">No comparison data for {gpuModel}</p>
            </div>
        );
    }

    // Calculate monthly costs (assuming 730 hours/month for comparison)
    const hoursPerMonth = 730;

    const providers: ProviderCost[] = [
        {
            provider: 'AIDP',
            logo: '⚡',
            color: '#10b981',
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
    const maxSavings = Math.max(...providers.slice(1).map(p =>
        Math.round(((p.monthlyRate - aidpCost) / p.monthlyRate) * 100)
    ));

    const formatCurrency = (value: number) => {
        if (value >= 1000) {
            return `$${(value / 1000).toFixed(1)}K`;
        }
        return `$${value.toFixed(2)}`;
    };

    const getSavingsPercent = (providerCost: number) => {
        if (providerCost <= aidpCost) return 0;
        return Math.round(((providerCost - aidpCost) / providerCost) * 100);
    };

    return (
        <div className="premium-card p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                        <TrendingDown className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">Cost Comparison</h3>
                        <p className="text-xs text-slate-400">AIDP vs Traditional Cloud</p>
                    </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                    <span className="text-xs font-medium text-emerald-400">
                        Save up to {maxSavings}%
                    </span>
                </div>
            </div>

            {/* Selected Node Info */}
            <div className="mb-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex-1">
                    <div className="text-sm font-medium text-white">{gpuModel}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {selectedNode.location.city}, {selectedNode.location.country}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-lg font-bold text-emerald-400">${selectedNode.pricing.hourly}/hr</div>
                    <div className="text-[10px] text-slate-500">AIDP Rate</div>
                </div>
            </div>

            {/* Cost Bars */}
            <div className="space-y-3">
                {providers.map((provider) => {
                    const barWidth = (provider.monthlyRate / maxCost) * 100;
                    const savings = getSavingsPercent(provider.monthlyRate);
                    const isAIDP = provider.provider === 'AIDP';

                    return (
                        <div key={provider.provider} className="relative">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{provider.logo}</span>
                                    <span className={`text-sm font-medium ${isAIDP ? 'text-emerald-400' : 'text-slate-300'}`}>
                                        {provider.provider}
                                    </span>
                                    <span className="text-[10px] text-slate-500 hidden sm:inline">
                                        {provider.instance}
                                    </span>
                                    {isAIDP && (
                                        <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-400 rounded">
                                            BEST VALUE
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-sm font-bold ${isAIDP ? 'text-emerald-400' : 'text-white'}`}>
                                        {formatCurrency(provider.monthlyRate)}/mo
                                    </span>
                                    {!isAIDP && savings > 0 && (
                                        <span className="text-[10px] text-red-400">
                                            +{savings}%
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                        width: `${barWidth}%`,
                                        backgroundColor: provider.color,
                                        opacity: isAIDP ? 1 : 0.6,
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Savings Summary */}
            <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                        <div>
                            <div className="text-[10px] text-slate-400">Monthly Savings vs AWS</div>
                            <div className="text-lg font-bold text-emerald-400">
                                {formatCurrency(providers[1].monthlyRate - aidpCost)}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-slate-400">Yearly Savings</div>
                        <div className="text-sm font-semibold text-white">
                            {formatCurrency((providers[1].monthlyRate - aidpCost) * 12)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-3 text-[9px] text-slate-500 text-center">
                * Prices as of Jan 2026. Based on on-demand rates, us-east region.
            </div>
        </div>
    );
}
