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
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
            <Header />

            <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">

                {/* Top Section: Dashboard Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold mb-1">Compute Dashboard</h1>
                        <p className="text-[var(--text-secondary)] text-sm">Orchestrate GPU workloads across the decentralized network</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <SessionStatsPanel stats={sessionStats} />
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-12 gap-6 min-h-[700px]">

                    {/* Left Column: Primary Visualization (6 cols) */}
                    <div className="col-span-12 lg:col-span-6 flex flex-col gap-6 h-full overflow-hidden">
                        {/* Map */}
                        <GPUMap
                            nodes={mockNodes}
                            selectedNode={selectedNode}
                            onSelectNode={handleNodeSelect}
                        />

                        {/* Workload Section */}
                        <div className="premium-card flex-1 p-6 flex flex-col gap-4 overflow-hidden">
                            {/* Row 1: Input Field + Workload Buttons (same line) */}
                            <div className="flex flex-col lg:flex-row gap-4">
                                {/* Input Field (takes most space) */}
                                <div className="flex-1 min-w-0">
                                    <PromptInput
                                        workload={selectedWorkload}
                                        onSubmit={handlePromptSubmit}
                                        isLoading={isRunning}
                                        disabled={!selectedNode || !selectedWorkload}
                                        prompt={promptText}
                                        setPrompt={setPromptText}
                                    />
                                </div>

                                {/* Workload Buttons (right side) */}
                                <div className="flex-shrink-0">
                                    <WorkloadPicker
                                        workloads={workloadTypes}
                                        selectedWorkload={selectedWorkload}
                                        onSelectWorkload={handleWorkloadSelect}
                                    />
                                </div>
                            </div>

                            {/* Row 2: Sample Prompts (FULL WIDTH, spread evenly) */}
                            {selectedWorkload && (
                                <div className="flex flex-row gap-3 overflow-hidden">
                                    {(samplePrompts[selectedWorkload.id as keyof typeof samplePrompts] || []).slice(0, 3).map((sample: string, i: number) => (
                                        <button
                                            key={i}
                                            onClick={() => setPromptText(sample)}
                                            className="flex-1 min-w-0 text-xs text-[var(--text-secondary)] bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] px-3 py-2 rounded-lg hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] hover:border-[var(--border-default)] transition-all flex items-center justify-center gap-1.5 text-center overflow-hidden"
                                        >
                                            <span className="truncate">{sample}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Row 3: Output Section (full width, scrollable) */}
                            <div className="flex-1 min-h-[150px] overflow-hidden">
                                <OutputDisplay
                                    job={currentJob}
                                    isRunning={isRunning}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Controls & telemetry (6 cols) */}
                    <div className="col-span-12 lg:col-span-6 flex flex-col gap-6 h-full">
                        {/* Node List - Fixed height */}
                        <div className="h-[400px]">
                            <NodeSelector
                                nodes={mockNodes}
                                selectedNode={selectedNode}
                                onSelectNode={handleNodeSelect}
                            />
                        </div>

                        {/* Telemetry - Fills remaining space */}
                        <div className="flex-1 min-h-[300px]">
                            <MetricsPanel
                                node={selectedNode}
                                currentJob={currentJob}
                                isRunning={isRunning}
                            />
                        </div>
                    </div>
                </div>

                {/* Cost Comparison Section */}
                <div className="mt-8">
                    <CostComparison />
                </div>
            </main>
            <Footer />
        </div>
    );
}
