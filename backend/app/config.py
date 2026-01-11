"""
Configuration from environment variables
"""
import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # AIDP API
    aidp_api_key: str = ""
    aidp_api_url: str = "https://api.aidp.store"
    
    # App
    environment: str = "development"
    
    class Config:
        env_file = ".env"


settings = Settings()
