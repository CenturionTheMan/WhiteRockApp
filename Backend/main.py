from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Annotated
import datetime
import db_rows
from database import engine, SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()
db_rows.Base.metadata.create_all(bind=engine) #TODO not for production

class SignalBase(BaseModel):
    ticker: str
    date: datetime.date
    action: str
    
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        

db_dependency = Annotated[Session, Depends(get_db)]

@app.get("/")
def root():
    return {"prop": "Hello World!"}

@app.post("/signals/")
async def create_signals(signal: SignalBase, db:db_dependency):
    db_signal = db_rows.SignalRow(
        ticker = signal.ticker,
        date = signal.date,
        action = signal.action
    )
    db.add(db_signal)
    db.commit()
    db.refresh(db_signal)
    
    return db_signal
    
    
@app.get("/signals/")
async def get_all_signals(db:db_dependency):
    result = db.query(db_rows.SignalRow).all()
    return result


@app.get("/signals/{signal_id}")
async def get_signals(signal_id:int, db:db_dependency):
    result = db.query(db_rows.SignalRow).filter(db_rows.SignalRow.id == signal_id).first()
    if result is None:
        raise HTTPException(status_code=404, detail='Signal not found')
    return result