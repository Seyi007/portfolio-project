from fastapi import APIRouter
from typing import List
from models.skill import Skill
from data.skills import SKILLS

router = APIRouter(prefix="/api/skills", tags=["skills"])


@router.get("", response_model=List[Skill])
async def get_skills():
    """Get all skills"""
    return SKILLS


@router.get("/{category}")
async def get_skills_by_category(category: str):
    """Get skills by category"""
    skills = [s for s in SKILLS if s["category"].lower() == category.lower()]
    return skills
