"""
AIDP Compute Arena - Backend API
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import gpu, inference

app = FastAPI(
    title="AIDP Compute Arena API",
    description="Backend for AIDP GPU compute dashboard",
    version="0.1.0",
)

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(gpu.router, prefix="/api/gpu", tags=["GPU"])
app.include_router(inference.router, prefix="/api/inference", tags=["Inference"])


@app.get("/")
async def root():
    return {"message": "AIDP Compute Arena API", "status": "online"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
