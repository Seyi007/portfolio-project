from pydantic import BaseModel, EmailStr
from typing import Optional


class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str
    subject: Optional[str] = None
