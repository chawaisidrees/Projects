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
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/notes", response_model=List[schemas.NoteOut])
def get_all_notes(db: Session = Depends(get_db)):
    return db.query(models.Note).all()

@app.post("/notes", response_model=schemas.NoteOut, status_code=201)
def create_note(payload: schemas.NoteCreate, db: Session = Depends(get_db)):
    note = models.Note(title=payload.title, content=payload.content)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note

@app.put("/notes/{note_id}", response_model=schemas.NoteOut)
def update_note(note_id: str, payload: schemas.NoteUpdate, db: Session = Depends(get_db)):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note nahi mila!")
    if payload.title:   note.title   = payload.title
    if payload.content: note.content = payload.content
    db.commit()
    db.refresh(note)
    return note

@app.delete("/notes/{note_id}")
def delete_note(note_id: str, db: Session = Depends(get_db)):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note nahi mila!")
    db.delete(note)
    db.commit()
    return {"message": "Note delete ho gaya!"}