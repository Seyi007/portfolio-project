from pydantic import BaseModel
from typing import List, Optional


class Experience(BaseModel):
    id: int
    company: str
    position: str
    description: str
    start_date: str
    end_date: Optional[str] = None
    technologies: List[str]
