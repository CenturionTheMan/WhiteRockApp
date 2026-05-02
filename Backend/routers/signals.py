from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated, Literal
from sqlalchemy.orm import Session
from shared import db_rows
from shared.database import SessionLocal
import datetime
from pydantic import BaseModel

# ============================ MODELS ============================
class SignalModelGet(BaseModel):
    id: int
    stock_id: int
    timestamp: datetime.datetime
    action: Literal["BUY", "SELL", "HOLD"]
    confidence: float
    
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
@router.get("/", response_model=list[SignalModelGet])
async def get_all_signals(db: db_dependency):
    results = db.query(db_rows.SignalRow).all()
    return results

@router.get("/{ticker}", response_model=list[SignalModelGet])
async def get_signal(ticker: str, db: db_dependency):
    stock = db.query(db_rows.StockRow).filter(db_rows.StockRow.ticker == ticker).first()
    if stock is None:
        raise HTTPException(status_code=404, detail="Stock not found")
    
    result = db.query(db_rows.SignalRow).filter(db_rows.SignalRow.stock_id == stock.id).order_by(db_rows.SignalRow.timestamp.desc())
    if result is None:
        raise HTTPException(status_code=404, detail="Signal not found")
    return result

@router.get("/{ticker}/last", response_model=SignalModelGet)
async def get_last_signal(ticker: str, db: db_dependency):
    stock = db.query(db_rows.StockRow).filter(db_rows.StockRow.ticker == ticker).first()
    if stock is None:
        raise HTTPException(status_code=404, detail="Stock not found")
    
    result = db.query(db_rows.SignalRow).filter(db_rows.SignalRow.stock_id == stock.id).order_by(db_rows.SignalRow.timestamp.desc()).first()
    if result is None:
        raise HTTPException(status_code=404, detail="Signal not found")
    return result
