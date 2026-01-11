'use client';

import { GPUNode, ComputeJob } from '@/types';
import { useEffect, useState } from 'react';
import { Activity, Zap, Clock, DollarSign, Thermometer, Wifi } from 'lucide-react';

interface MetricsPanelProps {
    node: GPUNode | null;
    currentJob: ComputeJob | null;
    isRunning: boolean;
}

export default function MetricsPanel({ node, currentJob, isRunning }: MetricsPanelProps) {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [animatedVram, setAnimatedVram] = useState(0);

    // Simulate elapsed time counter
    useEffect(() => {
        if (!isRunning) {
            setElapsedTime(0);
            return;
        }

        const interval = setInterval(() => {
            setElapsedTime(prev => prev + 100);
        }, 100);

        return () => clearInterval(interval);
    }, [isRunning]);

    // Animate VRAM during job
    useEffect(() => {
        if (!isRunning) {
            setAnimatedVram(node?.metrics.vramUsed || 0);
            return;
        }

        const interval = setInterval(() => {
            setAnimatedVram(prev => {
                const target = Math.min(95, (node?.metrics.vramUsed || 50) + Math.random() * 30);
                return prev + (target - prev) * 0.1;
            });
        }, 200);

        return () => clearInterval(interval);
    }, [isRunning, node]);

    if (!node) {
        return (
            <div className="premium-card p-8 h-full flex flex-col items-center justify-center text-[var(--text-tertiary)] border-dashed">
                <Activity className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-sm font-medium">Select a node to view telemetry</p>
            </div>
        );
    }

    const formatTime = (ms: number) => {
        const seconds = Math.floor(ms / 1000);
        const milliseconds = ms % 1000;
        return `${seconds}.${milliseconds.toString().padStart(3, '0').slice(0, 3)}s`;
    };

    const estimateCost = () => {
        // Base cost plus runtime cost
        const perInference = node.pricing.perInference;
        const runtimeCost = (elapsedTime / 3600000) * node.pricing.hourly;
        return perInference + runtimeCost;
    };

    const metrics = [
        {
            label: "VRAM Usage",
            value: `${animatedVram.toFixed(1)}%`,
            subValue: `${((animatedVram / 100) * node.gpu.vram).toFixed(1)} / ${node.gpu.vram} GB`,
            icon: <Zap className="w-4 h-4" />,
            color: "text-blue-400",
            barColor: "bg-blue-500",
            percentage: animatedVram
        },
        {
            label: "Latency",
            value: `${node.latency}ms`,
            subValue: "Global Network",
            icon: <Wifi className="w-4 h-4" />,
            color: node.latency < 50 ? "text-green-400" : "text-yellow-400",
            barColor: node.latency < 50 ? "bg-green-500" : "bg-yellow-500",
            percentage: Math.min(100, (node.latency / 200) * 100)
        },
        {
            label: "Temperature",
            value: `${node.metrics.temperature}°C`,
            subValue: "Optimal Range",
            icon: <Thermometer className="w-4 h-4" />,
            color: node.metrics.temperature < 70 ? "text-green-400" : "text-orange-400",
            barColor: node.metrics.temperature < 70 ? "bg-green-500" : "bg-orange-500",
            percentage: node.metrics.temperature
        }
    ];

    return (
        <div className="premium-card p-5 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    Telemetry
                </h3>
                {isRunning && (
                    <div className="flex items-center gap-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)] px-2 py-1 rounded text-xs text-green-400 font-mono">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        LIVE
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 mb-6">
                {/* Primary Inference Metric */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[var(--text-secondary)]">Inference Time</span>
                        <Clock className="w-3 h-3 text-[var(--text-tertiary)]" />
                    </div>
                    <div className="text-2xl font-mono font-medium text-[var(--text-primary)]">
                        {formatTime(currentJob?.metrics.inferenceTime || elapsedTime)}
                    </div>
                    {isRunning && <div className="h-0.5 w-full bg-green-500 shimmer mt-2 rounded-full" />}
                </div>

                {/* Cost Metric */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[var(--text-secondary)]">Estimated Cost</span>
                        <DollarSign className="w-3 h-3 text-[var(--text-tertiary)]" />
                    </div>
                    <div className="text-2xl font-mono font-medium text-[var(--text-primary)]">
                        ${estimateCost().toFixed(5)}
                    </div>
                </div>
            </div>

            <div className="space-y-4 flex-1">
                {metrics.map((m, i) => (
                    <div key={i} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                                {m.icon}
                                <span>{m.label}</span>
                            </div>
                            <span className={`font-mono ${m.color}`}>{m.value}</span>
                        </div>
                        <div className="h-1.5 bg-[var(--bg-primary)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                            <div
                                className={`h-full rounded-full transition-all duration-300 ${m.barColor}`}
                                style={{ width: `${m.percentage}%` }}
                            />
                        </div>
                        <div className="text-[10px] text-right text-[var(--text-tertiary)]">
                            {m.subValue}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
