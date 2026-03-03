from sqlalchemy import Column, String, Text, ForeignKey
from database import Base
import uuid


class User(Base):
    __tablename__ = "users"

    id       = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)


class Note(Base):
    __tablename__ = "notes"

    id      = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title   = Column(String, nullable=False)
    content = Column(Text,   nullable=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
