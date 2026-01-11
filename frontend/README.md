# AIDP Compute Arena

> Decentralized GPU Compute Dashboard — Built for [AIDP](https://aidp.store) Superteam Bounty

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## Overview

AIDP Compute Arena is an interactive dashboard that showcases decentralized GPU compute power. Users can select GPU nodes across the globe, run AI workloads (LLM inference, image generation), and view real-time performance metrics.

## Features

- 🗺️ **Interactive GPU Map** — Global network visualization with live node status
- 🖥️ **Node Selector** — Choose from available GPUs (RTX 4090, A100, H100)
- 📊 **Live Metrics** — VRAM usage, latency, cost, temperature
- 💬 **Workload Types** — LLM Chat, Image Generation, Video Processing
- ⚡ **Real-time Output** — Typewriter effect for text, image viewer
- 🌙 **Dark Theme** — Glassmorphism design with micro-animations

## Quick Start

```bash
# Clone the repo
git clone https://github.com/yourusername/aidp-compute-arena.git
cd aidp-compute-arena/app

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS | Styling & design system |
| React Hooks | State management |

## Project Structure

```
app/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main dashboard
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Design system
│   ├── components/
│   │   ├── GPUMap.tsx        # World map with nodes
│   │   ├── NodeSelector.tsx  # GPU selection cards
│   │   ├── WorkloadPicker.tsx# Workload type selector
│   │   ├── MetricsPanel.tsx  # Live metrics display
│   │   ├── PromptInput.tsx   # Prompt input form
│   │   ├── OutputDisplay.tsx # Output renderer
│   │   ├── SessionStats.tsx  # Session statistics
│   │   └── Header.tsx        # App header
│   ├── lib/
│   │   └── mockData.ts       # Mock GPU nodes
│   └── types/
│       └── index.ts          # TypeScript interfaces
```

## AIDP Integration

This project uses AIDP's decentralized GPU compute network. To integrate:

1. Create account at [aidp.store](https://aidp.store)
2. Connect your wallet
3. Use AIDP GPU compute for your workloads

## Bounty Submission

- **Bounty:** [Build or Bring a GPU Compute Project to AIDP](https://earn.superteam.fun/listing/build-or-bring-a-gpu-compute-project-to-aidp-for-rewards/)
- **Deadline:** January 12, 2025
- **Prize Pool:** $1,500 USDC

## License

MIT License — see [LICENSE](LICENSE) for details.

---

**Built with ⚡ for the AIDP ecosystem**
