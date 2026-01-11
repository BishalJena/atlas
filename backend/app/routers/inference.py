"""
Inference endpoints
"""
from fastapi import APIRouter
from pydantic import BaseModel
import time
import random

router = APIRouter()


class InferenceRequest(BaseModel):
    node_id: str
    prompt: str
    model: str = "llama-3.2"
    workload_type: str = "llm"  # llm, image, video


class InferenceResponse(BaseModel):
    job_id: str
    status: str
    result: str | None
    metrics: dict


# TODO: Replace with real AIDP API calls
@router.post("/run")
async def run_inference(request: InferenceRequest):
    """Submit an inference job to AIDP GPU"""
    job_id = f"job-{int(time.time())}"
    
    # Simulate inference time (will be replaced with real AIDP call)
    inference_time = random.randint(1500, 3500)
    
    # Mock result based on workload type
    if request.workload_type == "llm":
        result = f"Response from {request.model} on AIDP: This is a placeholder response to '{request.prompt[:50]}...'"
    elif request.workload_type == "image":
        result = f"https://placeholder.aidp.store/generated/{job_id}.png"
    else:
        result = f"https://placeholder.aidp.store/video/{job_id}.mp4"
    
    return InferenceResponse(
        job_id=job_id,
        status="completed",
        result=result,
        metrics={
            "inferenceTime": inference_time,
            "tokensGenerated": random.randint(100, 500) if request.workload_type == "llm" else 0,
            "vramPeak": random.randint(40, 80),
            "cost": round(random.uniform(0.001, 0.01), 4),
        }
    )


@router.get("/job/{job_id}")
async def get_job_status(job_id: str):
    """Get status of an inference job"""
    return {
        "job_id": job_id,
        "status": "completed",
        "message": "Job completed successfully"
    }
