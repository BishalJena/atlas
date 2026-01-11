# AIDP Compute Arena - Backend

## Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Start dev server:
```bash
uvicorn app.main:app --reload --port 8000
```

## API Docs

Once running, visit: http://localhost:8000/docs

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/gpu/nodes` | List all GPU nodes |
| GET | `/api/gpu/nodes/{id}` | Get specific node |
| GET | `/api/gpu/nodes/{id}/metrics` | Get node metrics |
| POST | `/api/inference/run` | Submit inference job |
| GET | `/api/inference/job/{id}` | Get job status |
