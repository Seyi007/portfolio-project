"""
Portfolio API - Main Application

A modern FastAPI backend for the portfolio website.
Structured with best engineering practices:
- Separation of concerns (models, routers, services, data)
- Clean architecture
- Type safety with Pydantic models
- Modular routing
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from config.settings import settings
from routers import projects, skills, experience, opensource, contact


# Initialize FastAPI app
app = FastAPI(
    title=settings.API_TITLE,
    version=settings.API_VERSION,
    description="Backend API for portfolio website"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(projects.router)
app.include_router(skills.router)
app.include_router(experience.router)
app.include_router(opensource.router)
app.include_router(contact.router)


@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Portfolio API",
        "version": settings.API_VERSION,
        "endpoints": {
            "projects": "/api/projects",
            "skills": "/api/skills",
            "experience": "/api/experience",
            "opensource": "/api/opensource",
            "contact": "/api/contact"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=True
    )
