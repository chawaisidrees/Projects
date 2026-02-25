from pydantic import BaseModel
from typing import Optional

class NoteCreate(BaseModel):
    title:   str
    content: str

class NoteUpdate(BaseModel):
    title:   Optional[str] = None
    content: Optional[str] = None

class NoteOut(BaseModel):
    id:      str
    title:   str
    content: str

    class Config:
        from_attributes = True