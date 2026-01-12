/**
 * AIDP Compute Arena - Mock Data
 * 
 * Realistic mock data aligned with AIDP's compute partner regions:
 * USA, Japan, India (as shown on aidp.store)
 * 
 * This data will be replaced with real API responses once AIDP access is granted.
 */
import { GPUNode, WorkloadType } from '@/types';

// AIDP Network Nodes - matches actual partner regions (USA, Japan, India)
export const mockNodes: GPUNode[] = [
    {
        id: 'aidp-us-01',
        name: 'AIDP-US-West',
        location: {
            city: 'Los Angeles',
            country: 'USA',
            region: 'North America',
            lat: 34.0522,    // LA - clearly on US west coast
            lng: -118.2437,
        },
        gpu: {
            model: 'NVIDIA RTX 4090',
            vram: 24,
            cudaCores: 16384,
            tensorCores: 512,
        },
        status: 'online',
        pricing: {
            hourly: 0.14,
            perInference: 0.0012,
            currency: 'USD',
        },
        metrics: {
            vramUsed: 42,
            utilization: 38,
            temperature: 62,
            powerDraw: 320,
        },
        latency: 45,
        uptime: 99.7,
    },
    {
        id: 'aidp-jp-01',
        name: 'AIDP-Japan',
        location: {
            city: 'Tokyo',
            country: 'Japan',
            region: 'Asia Pacific',
            lat: 35.6762,    // Tokyo - clearly on Japan
            lng: 139.6503,
        },
        gpu: {
            model: 'NVIDIA A100',
            vram: 80,
            cudaCores: 6912,
            tensorCores: 432,
        },
        status: 'online',
        pricing: {
            hourly: 0.48,
            perInference: 0.0025,
            currency: 'USD',
        },
        metrics: {
            vramUsed: 28,
            utilization: 22,
            temperature: 55,
            powerDraw: 280,
        },
        latency: 120,
        uptime: 99.9,
    },
    {
        id: 'aidp-in-01',
        name: 'AIDP-India',
        location: {
            city: 'Bangalore',
            country: 'India',
            region: 'Asia Pacific',
            lat: 12.9716,    // Bangalore - central India, clearly on land
            lng: 77.5946,
        },
        gpu: {
            model: 'NVIDIA RTX 4090',
            vram: 24,
            cudaCores: 16384,
            tensorCores: 512,
        },
        status: 'online',
        pricing: {
            hourly: 0.12,
            perInference: 0.001,
            currency: 'USD',
        },
        metrics: {
            vramUsed: 65,
            utilization: 58,
            temperature: 68,
            powerDraw: 350,
        },
        latency: 85,
        uptime: 99.5,
    },
    {
        id: 'aidp-us-02',
        name: 'AIDP-US-East',
        location: {
            city: 'Virginia',
            country: 'USA',
            region: 'North America',
            lat: 38.9072,    // DC/Virginia area - clearly on US east coast
            lng: -77.0369,
        },
        gpu: {
            model: 'NVIDIA H100',
            vram: 80,
            cudaCores: 16896,
            tensorCores: 528,
        },
        status: 'online',
        pricing: {
            hourly: 0.95,
            perInference: 0.004,
            currency: 'USD',
        },
        metrics: {
            vramUsed: 18,
            utilization: 15,
            temperature: 48,
            powerDraw: 420,
        },
        latency: 35,
        uptime: 99.8,
    },
];

// Workload types supported on AIDP
export const workloadTypes: WorkloadType[] = [
    {
        id: 'llm',
        name: 'LLM Inference',
        description: 'Run large language models for chat and text generation',
        icon: '💬',
        models: ['Llama 3.2 8B', 'Mistral 7B', 'Qwen 2.5', 'Phi-3'],
        avgCost: 0.0015,
        avgTime: 2500,
        vramRequired: 8,
    },
    {
        id: 'image',
        name: 'Image Generation',
        description: 'Generate images from text prompts using diffusion models',
        icon: '🎨',
        models: ['SDXL', 'FLUX.1-dev', 'Kandinsky 3'],
        avgCost: 0.015,
        avgTime: 12000,
        vramRequired: 12,
    },
    {
        id: 'video',
        name: 'Video Generation',
        description: 'Create short video clips from text or image prompts',
        icon: '🎬',
        models: ['Mochi', 'AnimateDiff', 'Stable Video'],
        avgCost: 0.08,
        avgTime: 45000,
        vramRequired: 24,
    },
];

// Sample prompts for demo - kept SHORT for UI fit
export const samplePrompts = {
    llm: [
        'How does AIDP work?',
        'Explain DePIN benefits',
        'Compare to AWS/GCP',
    ],
    image: [
        'Futuristic data center',
        'GPU network nodes',
        'AI infrastructure art',
    ],
    video: [
        'Network data flow',
        'GPU nodes animation',
    ],
};

// Simulated LLM responses for demo
export const llmResponses: Record<string, string> = {
    default: `**AIDP** (AI Decentralized Protocol) is a revolutionary decentralized GPU compute network that's changing how AI workloads are processed.

Here's what makes AIDP special:

🌐 **Global Network** — GPUs distributed across USA, Japan, and India provide low-latency compute access worldwide.

⚡ **High Performance** — Enterprise-grade GPUs like RTX 4090, A100, and H100 deliver blazing fast inference.

💰 **Cost Effective** — Pay only for what you use with transparent per-inference pricing. Up to 70% cheaper than centralized alternatives.

🔐 **Verifiable Compute** — Built on Solana with cryptographic proofs (PoR, PoD, PoU) ensuring every computation is verified.

🔓 **Permissionless** — Any AI developer, startup, or enterprise can connect and access compute instantly.

The future of AI compute is decentralized, and AIDP is leading the way!`,

    depin: `DePIN (Decentralized Physical Infrastructure Networks) represents a new paradigm where physical resources like GPUs are coordinated through blockchain incentives.

AIDP leverages DePIN to create a global compute layer:
- **Compute Nodes** provide raw GPU power
- **Storage Nodes** handle datasets and model weights
- **Bandwidth Nodes** optimize data transfer
- **Orchestration Nodes** coordinate job distribution

This architecture eliminates single points of failure and reduces costs by utilizing idle hardware globally.`,

    proof: `AIDP uses three types of cryptographic proofs to ensure compute integrity:

1. **PoR (Proof of Resources)** — Verifies that nodes actually have the GPU resources they claim
2. **PoD (Proof of Delivery)** — Confirms that compute jobs were delivered correctly
3. **PoU (Proof of Usage)** — Tracks actual resource consumption for accurate billing

These proofs are submitted on-chain, making every computation verifiable without centralized oversight.`,
};

// Network statistics for dashboard
export const networkStats = {
    totalNodes: 4,
    onlineNodes: 4,
    totalGPUs: 4,
    regionsActive: 3, // USA, Japan, India
    totalVRAM: 208, // GB (24+80+24+80)
    avgLatency: 71, // ms
    jobsProcessed24h: 1247,
    uptimePercent: 99.7,
};

// Cloud provider pricing for comparison (rates as of Jan 2026)
// Based on on-demand pricing, us-east region equivalents
export const cloudPricing: Record<string, {
    aws: { instance: string; hourly: number; inference: number };
    gcp: { instance: string; hourly: number; inference: number };
    azure: { instance: string; hourly: number; inference: number };
}> = {
    'NVIDIA RTX 4090': {
        aws: { instance: 'g5.xlarge', hourly: 1.01, inference: 0.006 },
        gcp: { instance: 'g2-standard-4', hourly: 0.94, inference: 0.0055 },
        azure: { instance: 'NV36ads_A10_v5', hourly: 0.90, inference: 0.0058 },
    },
    'NVIDIA A100': {
        aws: { instance: 'p4d.24xlarge', hourly: 3.67, inference: 0.015 },
        gcp: { instance: 'a2-highgpu-1g', hourly: 3.19, inference: 0.013 },
        azure: { instance: 'NC24ads_A100_v4', hourly: 3.06, inference: 0.012 },
    },
    'NVIDIA H100': {
        aws: { instance: 'p5.48xlarge', hourly: 8.77, inference: 0.035 },
        gcp: { instance: 'a3-highgpu-1g', hourly: 8.00, inference: 0.032 },
        azure: { instance: 'ND96isr_H100_v5', hourly: 7.50, inference: 0.030 },
    },
};

