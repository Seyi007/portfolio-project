from pydantic import BaseModel


class Skill(BaseModel):
    name: str
    category: str
    level: int  # 1-100
