from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from database import engine, get_db
import models, schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Notes App API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/register", response_model=schemas.UserOut, status_code=201)
def register(payload: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.username == payload.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists!")
    user = models.User(username=payload.username, password=payload.password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@app.post("/login", response_model=schemas.UserOut)
def login(payload: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == payload.username).first()
    if not user:
        raise HTTPException(status_code=404, detail="Username not found!")
    if user.password != payload.password:
        raise HTTPException(status_code=400, detail="Incorrect password!")
    return user


@app.get("/notes/{user_id}", response_model=List[schemas.NoteOut])
def get_all_notes(user_id: str, db: Session = Depends(get_db)):
    return db.query(models.Note).filter(models.Note.user_id == user_id).all()


@app.post("/notes/{user_id}", response_model=schemas.NoteOut, status_code=201)
def create_note(user_id: str, payload: schemas.NoteCreate, db: Session = Depends(get_db)):
    note = models.Note(title=payload.title, content=payload.content, user_id=user_id)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note


@app.put("/notes/{note_id}", response_model=schemas.NoteOut)
def update_note(note_id: str, payload: schemas.NoteUpdate, db: Session = Depends(get_db)):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found!")
    if payload.title:   note.title   = payload.title
    if payload.content: note.content = payload.content
    db.commit()
    db.refresh(note)
    return note


@app.delete("/notes/{note_id}")
def delete_note(note_id: str, db: Session = Depends(get_db)):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found!")
    db.delete(note)
    db.commit()
    return {"message": "Note deleted successfully!"}