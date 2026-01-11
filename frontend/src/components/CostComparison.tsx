'use client';

import { useState } from 'react';
import { TrendingDown, Zap, Server, DollarSign } from 'lucide-react';

interface PricingData {
    provider: string;
    logo: string;
    color: string;
    hourlyRate: number;
    inferenceRate: number; // per 1K tokens
    setupFee: number;
}

const pricingData: PricingData[] = [
    {
        provider: 'AIDP',
        logo: '⚡',
        color: '#10b981',
        hourlyRate: 0.14,
        inferenceRate: 0.0012,
        setupFee: 0,
    },
    {
        provider: 'AWS',
        logo: '☁️',
        color: '#ff9900',
        hourlyRate: 0.85,
        inferenceRate: 0.006,
        setupFee: 0,
    },
    {
        provider: 'GCP',
        logo: '🌐',
        color: '#4285f4',
        hourlyRate: 0.92,
        inferenceRate: 0.0065,
        setupFee: 0,
    },
    {
        provider: 'Azure',
        logo: '☁️',
        color: '#0078d4',
        hourlyRate: 0.90,
        inferenceRate: 0.007,
        setupFee: 0,
    },
];

interface WorkloadPreset {
    name: string;
    icon: string;
    hours: number;
    inferences: number; // in thousands
    description: string;
}

const workloadPresets: WorkloadPreset[] = [
    { name: 'Startup', icon: '🚀', hours: 100, inferences: 500, description: '~100 hrs/mo, 500K inferences' },
    { name: 'Growth', icon: '📈', hours: 500, inferences: 2000, description: '~500 hrs/mo, 2M inferences' },
    { name: 'Enterprise', icon: '🏢', hours: 2000, inferences: 10000, description: '~2000 hrs/mo, 10M inferences' },
];

export default function CostComparison() {
    const [selectedPreset, setSelectedPreset] = useState<WorkloadPreset>(workloadPresets[1]);
    const [customHours, setCustomHours] = useState(workloadPresets[1].hours);
    const [customInferences, setCustomInferences] = useState(workloadPresets[1].inferences);
    const [isCustom, setIsCustom] = useState(false);

    const hours = isCustom ? customHours : selectedPreset.hours;
    const inferences = isCustom ? customInferences : selectedPreset.inferences;

    const calculateCost = (provider: PricingData) => {
        return (provider.hourlyRate * hours) + (provider.inferenceRate * inferences) + provider.setupFee;
    };

    const aidpCost = calculateCost(pricingData[0]);
    const maxCost = Math.max(...pricingData.map(p => calculateCost(p)));

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
            <div className="flex items-center justify-between mb-6">
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
                        Save up to {getSavingsPercent(Math.max(...pricingData.slice(1).map(p => calculateCost(p))))}%
                    </span>
                </div>
            </div>

            {/* Workload Presets */}
            <div className="mb-6">
                <div className="text-xs text-slate-400 mb-2">Select Workload</div>
                <div className="flex gap-2">
                    {workloadPresets.map((preset) => (
                        <button
                            key={preset.name}
                            onClick={() => {
                                setSelectedPreset(preset);
                                setIsCustom(false);
                            }}
                            className={`flex-1 px-3 py-2.5 rounded-lg border transition-all ${!isCustom && selectedPreset.name === preset.name
                                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                                }`}
                        >
                            <div className="text-lg mb-1">{preset.icon}</div>
                            <div className="text-sm font-medium">{preset.name}</div>
                            <div className="text-[10px] text-slate-500">{preset.description}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Custom Sliders (collapsed by default) */}
            <div className="mb-6">
                <button
                    onClick={() => setIsCustom(!isCustom)}
                    className="text-xs text-slate-400 hover:text-slate-300 transition-colors mb-2 flex items-center gap-1"
                >
                    <Zap className="w-3 h-3" />
                    {isCustom ? 'Using custom values' : 'Customize values'}
                </button>
                {isCustom && (
                    <div className="space-y-4 p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">GPU Hours/Month</span>
                                <span className="text-white font-medium">{customHours} hrs</span>
                            </div>
                            <input
                                type="range"
                                min="10"
                                max="5000"
                                value={customHours}
                                onChange={(e) => setCustomHours(Number(e.target.value))}
                                className="w-full accent-emerald-500"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">Inferences (K/month)</span>
                                <span className="text-white font-medium">{customInferences}K</span>
                            </div>
                            <input
                                type="range"
                                min="100"
                                max="50000"
                                value={customInferences}
                                onChange={(e) => setCustomInferences(Number(e.target.value))}
                                className="w-full accent-emerald-500"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Cost Bars */}
            <div className="space-y-3">
                {pricingData.map((provider, index) => {
                    const cost = calculateCost(provider);
                    const barWidth = (cost / maxCost) * 100;
                    const savings = getSavingsPercent(cost);
                    const isAIDP = provider.provider === 'AIDP';

                    return (
                        <div key={provider.provider} className="relative">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{provider.logo}</span>
                                    <span className={`text-sm font-medium ${isAIDP ? 'text-emerald-400' : 'text-slate-300'}`}>
                                        {provider.provider}
                                    </span>
                                    {isAIDP && (
                                        <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-400 rounded">
                                            YOU SAVE
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-sm font-bold ${isAIDP ? 'text-emerald-400' : 'text-white'}`}>
                                        {formatCurrency(cost)}
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

            {/* Monthly Savings Summary */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-emerald-400" />
                        <div>
                            <div className="text-xs text-slate-400">Monthly Savings vs AWS</div>
                            <div className="text-xl font-bold text-emerald-400">
                                {formatCurrency(calculateCost(pricingData[1]) - aidpCost)}/mo
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-slate-400">Yearly Savings</div>
                        <div className="text-lg font-semibold text-white">
                            {formatCurrency((calculateCost(pricingData[1]) - aidpCost) * 12)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Note */}
            <div className="mt-4 text-[10px] text-slate-500 text-center">
                * Pricing based on RTX 4090 equivalent. Actual costs may vary by region and usage.
            </div>
        </div>
    );
}
