/**
 * AIDP Compute Arena - TypeScript Types
 */

export interface GPUNode {
    id: string;
    name: string;
    location: {
        city: string;
        country: string;
        region?: string;
        lat: number;
        lng: number;
    };
    gpu: {
        model: string;
        vram: number; // GB
        cudaCores: number;
        tensorCores?: number;
    };
    status: 'online' | 'busy' | 'offline';
    pricing: {
        hourly: number; // USD
        perInference: number; // USD
        currency?: string;
    };
    metrics: {
        vramUsed: number; // percentage
        utilization: number; // percentage
        temperature: number; // celsius
        powerDraw?: number; // watts
    };
    latency: number; // ms
    uptime?: number; // percentage
}

export interface ComputeJob {
    id: string;
    type: 'llm' | 'image' | 'video';
    status: 'queued' | 'running' | 'completed' | 'failed';
    nodeId: string;
    nodeName?: string;
    prompt: string;
    model?: string;
    createdAt: Date;
    completedAt?: Date;
    result?: string;
    metrics: {
        inferenceTime: number; // ms
        tokensGenerated?: number;
        vramPeak: number; // percentage
        cost: number; // USD
    };
}

export interface SessionStats {
    totalJobs: number;
    totalCost: number;
    totalTokens: number;
    totalInferenceTime: number;
    favoriteNode?: string;
    nodesUsed?: number;
}

export interface WorkloadType {
    id: 'llm' | 'image' | 'video';
    name: string;
    description: string;
    icon: string;
    models: string[];
    avgCost: number;
    avgTime: number;
    vramRequired?: number;
}

export interface NetworkStats {
    totalNodes: number;
    onlineNodes: number;
    totalGPUs: number;
    regionsActive: number;
    totalVRAM: number;
    avgLatency: number;
    jobsProcessed24h: number;
    uptimePercent: number;
}

export interface CloudProvider {
    instance: string;
    hourly: number;
    inference: number;
}

export interface CloudPricing {
    aws: CloudProvider;
    gcp: CloudProvider;
    azure: CloudProvider;
}

