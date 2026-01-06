from fastapi import APIRouter, HTTPException
from typing import List
from models.project import Project
from data.projects import PROJECTS

router = APIRouter(prefix="/api/projects", tags=["projects"])


@router.get("", response_model=List[Project])
async def get_projects():
    """Get all projects"""
    return PROJECTS


@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: int):
    """Get a specific project by ID"""
    project = next((p for p in PROJECTS if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project
