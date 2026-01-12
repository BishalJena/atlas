'use client';

import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import GPUMap from '@/components/GPUMap';
import NodeSelector from '@/components/NodeSelector';
import WorkloadPicker from '@/components/WorkloadPicker';
import MetricsPanel from '@/components/MetricsPanel';
import PromptInput from '@/components/PromptInput';
import OutputDisplay from '@/components/OutputDisplay';
import SessionStatsPanel from '@/components/SessionStats';
import CostComparison from '@/components/CostComparison';
import Footer from '@/components/Footer';
import { mockNodes, workloadTypes, llmResponses, samplePrompts } from '@/lib/mockData';
import { GPUNode, WorkloadType, ComputeJob, SessionStats } from '@/types';

// Helper to select appropriate LLM response based on prompt
const selectLLMResponse = (prompt: string): string => {
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes('depin') || lowerPrompt.includes('decentralized')) {
        return llmResponses.depin || llmResponses.default;
    }
    if (lowerPrompt.includes('proof') || lowerPrompt.includes('verify') || lowerPrompt.includes('por')) {
        return llmResponses.proof || llmResponses.default;
    }
    return llmResponses.default;
};

export default function Home() {
    const [selectedNode, setSelectedNode] = useState<GPUNode | null>(null);
    const [selectedWorkload, setSelectedWorkload] = useState<WorkloadType | null>(null);
    const [currentJob, setCurrentJob] = useState<ComputeJob | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [sessionStats, setSessionStats] = useState<SessionStats>({
        totalJobs: 0,
        totalCost: 0,
        totalTokens: 0,
        totalInferenceTime: 0,
    });
    const [promptText, setPromptText] = useState('');

    const handleNodeSelect = useCallback((node: GPUNode) => {
        setSelectedNode(node);
    }, []);

    const handleWorkloadSelect = useCallback((workload: WorkloadType) => {
        setSelectedWorkload(workload);
    }, []);

    const handlePromptSubmit = useCallback(async (prompt: string) => {
        if (!selectedNode || !selectedWorkload) return;

        // Create new job
        const job: ComputeJob = {
            id: `job-${Date.now()}`,
            type: selectedWorkload.id,
            status: 'running',
            nodeId: selectedNode.id,
            prompt,
            createdAt: new Date(),
            metrics: {
                inferenceTime: 0,
                tokensGenerated: 0,
                vramPeak: 0,
                cost: 0,
            },
        };

        setCurrentJob(job);
        setIsRunning(true);

        // Simulate realistic inference time based on workload type
        const baseTime = selectedWorkload.avgTime || 2000;
        const inferenceTime = baseTime * (0.7 + Math.random() * 0.6);

        await new Promise(resolve => setTimeout(resolve, inferenceTime));

        // Generate mock result
        let result = '';
        let tokensGenerated = 0;

        if (selectedWorkload.id === 'llm') {
            result = selectLLMResponse(prompt);
            tokensGenerated = Math.floor(result.length / 4);
        } else if (selectedWorkload.id === 'image') {
            result = `https://picsum.photos/seed/${Date.now()}/1024/1024`;
        } else if (selectedWorkload.id === 'video') {
            result = 'video-generated';
        }

        const cost = selectedNode.pricing.perInference + (inferenceTime / (60 * 60 * 1000)) * selectedNode.pricing.hourly;
        const vramPeak = (selectedWorkload.vramRequired || 8) + Math.random() * 20;

        // Complete job
        const completedJob: ComputeJob = {
            ...job,
            status: 'completed',
            completedAt: new Date(),
            result,
            metrics: {
                inferenceTime,
                tokensGenerated,
                vramPeak,
                cost,
            },
        };

        setCurrentJob(completedJob);
        setIsRunning(false);

        // Update session stats
        setSessionStats(prev => ({
            totalJobs: prev.totalJobs + 1,
            totalCost: prev.totalCost + cost,
            totalTokens: prev.totalTokens + tokensGenerated,
            totalInferenceTime: prev.totalInferenceTime + inferenceTime,
            favoriteNode: selectedNode.id,
        }));
    }, [selectedNode, selectedWorkload]);

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[var(--accent-primary)] selection:text-white">
            <Header />

            <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 space-y-6">

                {/* Tier 1: Infrastructure (The "Where") */}
                <div className="grid grid-cols-12 gap-6 h-[600px]">
                    {/* Node Explorer (Left - 3 cols) */}
                    <div className="col-span-12 lg:col-span-3 h-full overflow-hidden flex flex-col glass-panel rounded-2xl p-1">
                        <div className="p-4 pb-2 border-b border-[var(--border-subtle)] mb-2">
                            <div className="text-label flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] shadow-[0_0_10px_var(--accent-primary)]"></div>
                                Node Explorer
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <NodeSelector
                                nodes={mockNodes}
                                selectedNode={selectedNode}
                                onSelectNode={handleNodeSelect}
                            />
                        </div>
                    </div>

                    {/* Global Map (Right - 9 cols) */}
                    <div className="col-span-12 lg:col-span-9 h-full glass-panel rounded-2xl overflow-hidden relative group">
                        <div className="absolute top-4 left-4 z-10 text-label bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
                            Global Compute Network
                        </div>
                        <GPUMap
                            nodes={mockNodes}
                            selectedNode={selectedNode}
                            onSelectNode={handleNodeSelect}
                        />
                        {/* Subtle vignette overlay */}
                        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,rgba(2,6,23,0.6)_100%)]"></div>
                    </div>
                </div>

                {/* Tier 2: Intelligence (The "Why") */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[320px]">
                    {/* Telemetry */}
                    <div className="glass-panel rounded-2xl p-6 flex flex-col relative overflow-hidden">
                        <div className="text-label mb-4 flex justify-between items-center">
                            <span>Live Telemetry</span>
                            {selectedNode && <span className="text-[var(--accent-primary)]">{selectedNode.name}</span>}
                        </div>
                        <div className="flex-1">
                            <MetricsPanel
                                node={selectedNode}
                                currentJob={currentJob}
                                isRunning={isRunning}
                            />
                        </div>
                    </div>

                    {/* Cost Analysis */}
                    <div className="glass-panel rounded-2xl flex flex-col overflow-hidden">
                        <div className="p-4 pb-2 border-b border-[var(--border-subtle)]">
                            <div className="text-label">Cost Analysis</div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <CostComparison selectedNode={selectedNode} />
                        </div>
                    </div>
                </div>

                {/* Tier 3: Operations (The "What") */}
                <div className="glass-panel rounded-2xl overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="px-5 py-3 border-b border-[var(--border-subtle)] bg-gradient-to-r from-[var(--bg-secondary)] to-transparent flex items-center justify-between">
                        <div className="text-label flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[var(--accent-secondary)] shadow-[0_0_8px_var(--accent-secondary)]"></div>
                            Workload Studio
                        </div>
                        <WorkloadPicker
                            workloads={workloadTypes}
                            selectedWorkload={selectedWorkload}
                            onSelectWorkload={handleWorkloadSelect}
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-[350px]">
                        {/* Input Area */}
                        <div className="p-5 border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)]">
                            <PromptInput
                                workload={selectedWorkload}
                                onSubmit={handlePromptSubmit}
                                isLoading={isRunning}
                                disabled={!selectedNode || !selectedWorkload}
                                prompt={promptText}
                                setPrompt={setPromptText}
                            />
                        </div>

                        {/* Output Console */}
                        <div className="min-h-[300px]">
                            <OutputDisplay
                                job={currentJob}
                                isRunning={isRunning}
                            />
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
