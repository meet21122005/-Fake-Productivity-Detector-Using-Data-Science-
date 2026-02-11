"""
Configuration module for Fake Productivity Detector Backend.

This module handles all environment variables and application settings
using Pydantic for validation and type safety.
"""

import os
from functools import lru_cache
from typing import Optional
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    
    Attributes:
        app_name: Name of the application
        app_version: Current version
        debug: Debug mode flag
        supabase_url: Supabase project URL
        supabase_key: Supabase anonymous/public key
        supabase_service_key: Supabase service role key (for admin operations)
        jwt_secret: JWT secret for token verification
        cors_origins: Allowed CORS origins
        log_level: Logging level
    """
    
    # Application Settings
    app_name: str = Field(default="Fake Productivity Detector API", description="Application name")
    app_version: str = Field(default="1.0.0", description="Application version")
    debug: bool = Field(default=False, description="Debug mode")
    environment: str = Field(default="development", description="Environment (development/production)")
    
    # Supabase Configuration
    supabase_url: str = Field(
        default="https://iqdfsevjzfubmshlsxjr.supabase.co",
        description="Supabase project URL"
    )
    supabase_key: str = Field(
        default="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZGZzZXZqemZ1Ym1zaGxzeGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxODYxNjIsImV4cCI6MjA4NTc2MjE2Mn0.xyM0ZY6H_KDbks0NXnmJ7reuKFhe_4FEFgTkACiZpmo",
        description="Supabase anonymous key"
    )
    supabase_service_key: Optional[str] = Field(
        default="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZGZzZXZqemZ1Ym1zaGxzeGpyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDE4NjE2MiwiZXhwIjoyMDg1NzYyMTYyfQ.rKtPk3TslSQ8RvPPFk_Mp_GLBOTbC6GTEPPs0aOzdbw",
        description="Supabase service role key"
    )
    supabase_jwt_secret: Optional[str] = Field(
        default=None,
        description="Supabase JWT secret for token verification"
    )
    
    # CORS Settings
    cors_origins: list[str] = Field(
        default=["http://localhost:5173", "http://localhost:3000", "*"],
        description="Allowed CORS origins"
    )
    
    # Logging
    log_level: str = Field(default="INFO", description="Logging level")
    
    # ML Model Paths
    model_path: str = Field(default="app/ml/model.pkl", description="Path to trained ML model")
    scaler_path: str = Field(default="app/ml/scaler.pkl", description="Path to feature scaler")
    
    # Rate Limiting
    rate_limit_requests: int = Field(default=100, description="Max requests per minute")
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


@lru_cache()
def get_settings() -> Settings:
    """
    Get cached settings instance.
    
    Uses LRU cache to ensure settings are only loaded once.
    
    Returns:
        Settings: Application settings instance
    """
    return Settings()


# Scoring Configuration
class ScoringConfig:
    """
    Configuration for productivity scoring algorithm.
    
    Weights for each factor in the scoring formula:
    score = (task_hours × TASK_WEIGHT) + (tasks_completed × TASKS_COMPLETED_WEIGHT)
            - (idle_hours × IDLE_WEIGHT) - (social_media × SOCIAL_MEDIA_WEIGHT)
            - (break_frequency × BREAK_WEIGHT)
    """
    
    TASK_WEIGHT: float = 8.0
    IDLE_WEIGHT: float = 6.0
    SOCIAL_MEDIA_WEIGHT: float = 7.0
    BREAK_WEIGHT: float = 2.0
    TASKS_COMPLETED_WEIGHT: float = 5.0
    
    MIN_SCORE: float = 0.0
    MAX_SCORE: float = 100.0
    
    # Category thresholds
    HIGHLY_PRODUCTIVE_MIN: float = 80.0
    MODERATELY_PRODUCTIVE_MIN: float = 50.0


# Category Labels
class ProductivityCategory:
    """Productivity category constants."""
    
    HIGHLY_PRODUCTIVE: str = "Highly Productive"
    MODERATELY_PRODUCTIVE: str = "Moderately Productive"
    FAKE_PRODUCTIVITY: str = "Fake Productivity"


# Database Table Names
class TableNames:
    """Supabase table names."""
    
    PRODUCTIVITY_ANALYSIS: str = "productivity_analysis"
    USERS: str = "users"
    KV_STORE: str = "kv_store_a0c5b0f2"


# Export settings instance
settings = get_settings()
