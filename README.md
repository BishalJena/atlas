# Atlas

> Decentralized GPU Compute Dashboard — Built for [AIDP](https://aidp.store)

![Atlas Dashboard](https://img.shields.io/badge/status-live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688)

## Overview

Atlas is an interactive dashboard that showcases AIDP's decentralized GPU compute network. Users can select GPU nodes globally, run AI workloads (LLM inference, image generation), and view real-time performance metrics.

## Features

- 🗺️ **Interactive GPU Map** — Global network visualization with Equal Earth projection
- 🖥️ **Node Selector** — Choose from available GPUs across USA, Japan, India
- 📊 **Live Metrics** — VRAM, latency, cost, temperature
- 💬 **AI Workloads** — LLM Chat, Image Generation, Video
- 🌙 **Premium Design** — Dark theme with glassmorphism

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

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS |
| Backend | FastAPI, Python 3.11+ |
| Maps | react-simple-maps |
| Network | AIDP GPU Compute |

## Project Structure

```
atlas/
├── frontend/          # Next.js dashboard
│   ├── src/
│   │   ├── app/       # App router pages
│   │   ├── components/# React components
│   │   ├── lib/       # Utilities & mock data
│   │   └── types/     # TypeScript types
│   └── public/        # Static assets
├── backend/           # FastAPI server
│   └── app/
│       ├── routers/   # API endpoints
│       └── services/  # AIDP integration
└── README.md
```

## Screenshots

*Coming soon*

## License

MIT License — see [LICENSE](LICENSE)

## Links

- [AIDP Store](https://aidp.store)
- [AIDP Twitter](https://x.com/aidpstore)
- [AIDP Telegram](https://t.me/Aidpofficial)
