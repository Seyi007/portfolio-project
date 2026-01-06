import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    # API Configuration
    API_TITLE = "Portfolio API"
    API_VERSION = "1.0.0"
    API_HOST = os.getenv("API_HOST", "0.0.0.0")
    API_PORT = int(os.getenv("API_PORT", "8000"))
    
    # CORS Configuration
    CORS_ORIGINS = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost",
        # Production URLs
        "https://portfolio-project-2nen.onrender.com",  # Backend URL
        "https://portfolio-frontend-49lr.onrender.com",  # Frontend URL
    ]
    
    # Email Configuration
    SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USERNAME = os.getenv("SMTP_USERNAME", "")
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
    RECIPIENT_EMAIL = "kuforiji98@gmail.com"


settings = Settings()
