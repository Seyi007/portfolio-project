from fastapi import APIRouter, HTTPException
from typing import List
from models.opensource import OpenSourceContribution
from data.opensource import OPENSOURCE_CONTRIBUTIONS

router = APIRouter(prefix="/api/opensource", tags=["opensource"])


@router.get("", response_model=List[OpenSourceContribution])
async def get_opensource():
    """Get all open source contributions"""
    return OPENSOURCE_CONTRIBUTIONS


@router.get("/type/{type}")
async def get_opensource_by_type(type: str):
    """Get open source contributions by type (speaking, volunteering, contribution)"""
    contributions = [c for c in OPENSOURCE_CONTRIBUTIONS if c["type"].lower() == type.lower()]
    return contributions


@router.get("/{contribution_id}", response_model=OpenSourceContribution)
async def get_opensource_by_id(contribution_id: int):
    """Get specific contribution by ID"""
    contribution = next((c for c in OPENSOURCE_CONTRIBUTIONS if c["id"] == contribution_id), None)
    if not contribution:
        raise HTTPException(status_code=404, detail="Contribution not found")
    return contribution
