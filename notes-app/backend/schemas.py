from pydantic import BaseModel
from typing import Optional


# ── NOTE SCHEMAS ─────────────────────────────────────

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
    user_id: str       # which user owns this note

    class Config:
        from_attributes = True


# ── USER SCHEMAS ─────────────────────────────────────

class UserCreate(BaseModel):
    username: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserOut(BaseModel):
    id:       str
    username: str      # password not sent back

    class Config:
        from_attributes = True
