from pydantic import BaseModel
from typing import List, Optional


class OpenSourceContribution(BaseModel):
    id: int
    type: str  # 'speaking', 'volunteering', 'contribution'
    title: str
    organization: str
    description: str
    date: str
    location: Optional[str] = None
    url: Optional[str] = None
    image_url: Optional[str] = None
    images: Optional[List[str]] = None
    technologies: Optional[List[str]] = None
