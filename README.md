# Atlas

> Decentralized GPU Compute Dashboard — Built for [AIDP](https://aidp.store)

![Atlas Dashboard](https://img.shields.io/badge/status-live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688) ![Solana](https://img.shields.io/badge/Solana-devnet-blueviolet)

## Overview

Atlas is an interactive dashboard that showcases AIDP's decentralized GPU compute network. Users can select GPU nodes globally, run AI workloads (LLM inference, image generation), and view real-time performance metrics — all while connecting their Solana wallet for seamless payments.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🗺️ **Global GPU Map** | Interactive visualization with Equal Earth projection showing nodes across USA, Japan, India |
| 💰 **Cost Comparison** | See how AIDP pricing compares to AWS, GCP, Azure — save up to 85% |
| � **Wallet Connect** | Phantom & Solflare wallet integration via Solana devnet |
| �🖥️ **Node Selector** | Choose from available GPUs with real-time status |
| 📊 **Live Metrics** | VRAM, latency, cost, temperature monitoring |
| 💬 **AI Workloads** | LLM Chat, Image Generation, Video |
| 🌙 **Premium Design** | Dark theme with glassmorphism effects |

## 🚀 Quick Start

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

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS |
| Backend | FastAPI, Python 3.11+ |
| Maps | react-simple-maps (Equal Earth) |
| Wallet | Solana Wallet Adapter (Phantom, Solflare) |
| Network | AIDP GPU Compute |

## 📁 Project Structure

```
atlas/
├── frontend/                # Next.js dashboard
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   │   ├── GPUMap.tsx           # Global node visualization
│   │   │   ├── CostComparison.tsx   # AIDP vs Cloud pricing
│   │   │   ├── ConnectWalletButton.tsx
│   │   │   └── ...
│   │   ├── lib/             # Utilities & mock data
│   │   └── types/           # TypeScript types
│   └── public/              # Static assets
├── backend/                 # FastAPI server
│   └── app/
│       ├── routers/         # API endpoints
│       └── services/        # AIDP integration
├── LICENSE                  # MIT License
└── README.md
```

## 💸 Why AIDP?

Atlas includes a built-in cost comparison showing the dramatic savings with AIDP:

| Provider | Monthly Cost (Enterprise) |
|----------|---------------------------|
| **AIDP** | **$292** |
| AWS | $1,800 (+84%) |
| GCP | $1,900 (+85%) |
| Azure | $1,900 (+84%) |

**Save $17,600/year** compared to traditional cloud providers.

## 📜 License

MIT License — see [LICENSE](LICENSE)

## 🔗 Links

- [AIDP Store](https://aidp.store)
- [AIDP Twitter](https://x.com/aidpstore)
- [AIDP Telegram](https://t.me/Aidpofficial)
