from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from shared import db_rows
from shared.database import SessionLocal
import datetime
from pydantic import BaseModel

# ============================ MODELS ============================
class SignalModelPost(BaseModel):
    ticker: str
    timestamp: datetime.datetime
    action: str
    
class SignalModelGet(BaseModel):
    id: int
    stock_id: int
    timestamp: datetime.datetime
    action: str

    class Config:
        from_attributes = True
# ================================================================
    
    
# ============================ UTILS ============================
router = APIRouter(prefix="/signals", tags=["signals"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
# ================================================================


# ============================ ROUTES ============================
@router.post("/", response_model=SignalModelGet)
async def create_signal(signal: SignalModelPost, db: db_dependency):
    stock = db.query(db_rows.StockRow).filter(db_rows.StockRow.ticker == signal.ticker).first()
    if stock is None:
        raise HTTPException(status_code=404, detail="Stock with given ticker not found")
    
    db_signal = db_rows.SignalRow(
        stock_id=stock.id,
        timestamp=signal.timestamp,
        action=signal.action
    )
    db.add(db_signal)
    db.commit()
    db.refresh(db_signal)
    return db_signal

@router.get("/", response_model=list[SignalModelGet])
async def get_all_signals(db: db_dependency):
    return db.query(db_rows.SignalRow).all()

@router.get("/{signal_id}", response_model=SignalModelGet)
async def get_signal(signal_id: int, db: db_dependency):
    result = db.query(db_rows.SignalRow).filter(db_rows.SignalRow.id == signal_id).first()
    if result is None:
        raise HTTPException(status_code=404, detail="Signal not found")
    return result