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
            <div className="h-full flex flex-col items-center justify-center text-[var(--text-tertiary)] opacity-60">
                <Activity className="w-10 h-10 mb-2" />
                <p className="text-xs">No active telemetry feed</p>
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
            color: node.latency < 50 ? "text-[var(--status-success)]" : "text-[var(--status-warning)]",
            barColor: node.latency < 50 ? "bg-[var(--status-success)]" : "bg-[var(--status-warning)]",
            percentage: Math.min(100, (node.latency / 200) * 100)
        },
        {
            label: "Temperature",
            value: `${node.metrics.temperature}°C`,
            subValue: "Optimal Range",
            icon: <Thermometer className="w-4 h-4" />,
            color: node.metrics.temperature < 70 ? "text-[var(--status-success)]" : "text-[var(--status-warning)]",
            barColor: node.metrics.temperature < 70 ? "bg-[var(--status-success)]" : "bg-[var(--status-warning)]",
            percentage: node.metrics.temperature
        }
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Primary Inference Metric */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-4 rounded-lg relative overflow-hidden group hover:border-[var(--accent-primary)] transition-colors">
                    <div className="flex items-center justify-between mb-1 relative z-10">
                        <span className="text-xs text-[var(--text-secondary)]">Time</span>
                        <Clock className="w-3 h-3 text-[var(--text-tertiary)]" />
                    </div>
                    <div className="text-xl font-mono font-medium text-[var(--text-primary)] relative z-10">
                        {formatTime(currentJob?.metrics.inferenceTime || elapsedTime)}
                    </div>
                    {isRunning && <div className="absolute inset-0 bg-[var(--accent-primary)]/5 shimmer" />}
                </div>

                {/* Cost Metric */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-4 rounded-lg group hover:border-[var(--accent-primary)] transition-colors">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[var(--text-secondary)]">Cost</span>
                        <DollarSign className="w-3 h-3 text-[var(--text-tertiary)]" />
                    </div>
                    <div className="text-xl font-mono font-medium text-[var(--text-primary)]">
                        ${estimateCost().toFixed(5)}
                    </div>
                </div>
            </div>

            <div className="space-y-5 flex-1 p-2">
                {metrics.map((m, i) => (
                    <div key={i} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                                {m.icon}
                                <span>{m.label}</span>
                            </div>
                            <span className={`font-mono ${m.color}`}>{m.value}</span>
                        </div>
                        <div className="h-1 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-300 ${m.barColor}`}
                                style={{ width: `${m.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
