from pydantic_settings import BaseSettings # NEW
import os

class Settings(BaseSettings):
    
    DATABASE_URL: str = os.getenv("DATABASE_URL","postgresql://postgres_super_user:cpms_user_password@db:5432/cpms_db")

settings = Settings()