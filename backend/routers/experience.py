from fastapi import APIRouter, HTTPException
from typing import List
from models.experience import Experience
from data.experience import EXPERIENCES

router = APIRouter(prefix="/api/experience", tags=["experience"])


@router.get("", response_model=List[Experience])
async def get_experience():
    """Get all work experience"""
    return EXPERIENCES


@router.get("/{experience_id}", response_model=Experience)
async def get_experience_by_id(experience_id: int):
    """Get specific work experience by ID"""
    experience = next((e for e in EXPERIENCES if e["id"] == experience_id), None)
    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    return experience
