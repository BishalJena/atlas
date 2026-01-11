"""
GPU node endpoints
"""
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class GPUNode(BaseModel):
    id: str
    name: str
    location: dict
    gpu: dict
    status: str
    pricing: dict
    metrics: dict
    latency: int


# TODO: Replace with real AIDP API calls
MOCK_NODES = [
    {
        "id": "node-usa",
        "name": "AIDP-US-West",
        "location": {"city": "San Francisco", "country": "USA", "lat": 37.77, "lng": -122.42},
        "gpu": {"model": "NVIDIA RTX 4090", "vram": 24, "cudaCores": 16384},
        "status": "online",
        "pricing": {"hourly": 0.15, "perInference": 0.001},
        "metrics": {"vramUsed": 35, "utilization": 42, "temperature": 65},
        "latency": 45,
    },
    {
        "id": "node-japan",
        "name": "AIDP-Asia-JP",
        "location": {"city": "Tokyo", "country": "Japan", "lat": 35.68, "lng": 139.69},
        "gpu": {"model": "NVIDIA A100", "vram": 80, "cudaCores": 6912},
        "status": "online",
        "pricing": {"hourly": 0.45, "perInference": 0.002},
        "metrics": {"vramUsed": 22, "utilization": 18, "temperature": 58},
        "latency": 120,
    },
    {
        "id": "node-india",
        "name": "AIDP-Asia-IN",
        "location": {"city": "Mumbai", "country": "India", "lat": 19.08, "lng": 72.88},
        "gpu": {"model": "NVIDIA RTX 4080", "vram": 16, "cudaCores": 9728},
        "status": "online",
        "pricing": {"hourly": 0.12, "perInference": 0.0008},
        "metrics": {"vramUsed": 55, "utilization": 60, "temperature": 70},
        "latency": 80,
    },
]


@router.get("/nodes")
async def list_nodes():
    """List all available GPU nodes"""
    return {"nodes": MOCK_NODES}


@router.get("/nodes/{node_id}")
async def get_node(node_id: str):
    """Get a specific GPU node"""
    for node in MOCK_NODES:
        if node["id"] == node_id:
            return node
    return {"error": "Node not found"}


@router.get("/nodes/{node_id}/metrics")
async def get_node_metrics(node_id: str):
    """Get real-time metrics for a node"""
    for node in MOCK_NODES:
        if node["id"] == node_id:
            return node["metrics"]
    return {"error": "Node not found"}
