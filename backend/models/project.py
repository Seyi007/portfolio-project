from pydantic import BaseModel
from typing import List, Optional


class Project(BaseModel):
    id: int
    title: str
    description: str
    technologies: List[str]
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
