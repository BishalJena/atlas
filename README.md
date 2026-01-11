# AIDP Compute Arena

> Decentralized GPU Compute Dashboard — Built for [AIDP](https://aidp.store) Superteam Bounty

## Overview

AIDP Compute Arena is an interactive dashboard that showcases AIDP's decentralized GPU compute network. Users can select GPU nodes globally, run AI workloads (LLM inference, image generation), and view real-time performance metrics.

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
# → http://localhost:8000
```

## Project Structure

```
superteam-aidp/
├── .agent/workflows/     # Agent commands
│   ├── run-frontend.md
│   ├── run-backend.md
│   └── submit.md
├── frontend/             # Next.js dashboard
├── backend/              # FastAPI + AIDP integration
├── docs/                 # Planning & documentation
└── README.md
```

## Features

- 🗺️ **Interactive GPU Map** — Global network visualization
- 🖥️ **Node Selector** — Choose from available GPUs
- 📊 **Live Metrics** — VRAM, latency, cost, temperature
- 💬 **AI Workloads** — LLM Chat, Image Generation
- 🌙 **Premium Design** — Dark theme with glassmorphism

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS |
| Backend | FastAPI, Python 3.11+ |
| AIDP | GPU Compute Network |

## Links

- [AIDP Store](https://aidp.store)
- [AIDP Twitter](https://x.com/aidpstore)
- [AIDP Telegram](https://t.me/Aidpofficial)
