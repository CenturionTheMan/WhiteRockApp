from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated, Literal
from sqlalchemy.orm import Session
from shared import db_rows
from shared.database import SessionLocal
import datetime
from pydantic import BaseModel

# ============================ MODELS ============================
class SignalModelGet(BaseModel):
    ticker: str
    timestamp: datetime.datetime
    call: Literal["BUY", "SELL", "HOLD"]
    confidence: float

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
    return [SignalModelGet(ticker = r.stock.ticker, timestamp = r.timestamp, call = r.call, confidence = r.confidence) for r in results]


@router.get("/{ticker}", response_model=list[SignalModelGet])
async def get_signal(ticker: str, db: db_dependency):
    stock = db.query(db_rows.StockRow).filter(db_rows.StockRow.ticker == ticker).first()
    if stock is None:
        raise HTTPException(status_code=404, detail="Stock not found")
    
    result = db.query(db_rows.SignalRow).filter(db_rows.SignalRow.stock_id == stock.id).order_by(db_rows.SignalRow.timestamp.desc())
    if result is None:
        raise HTTPException(status_code=404, detail="Signal not found")
    
    return [SignalModelGet(ticker = r.stock.ticker, timestamp = r.timestamp, call = r.call, confidence = r.confidence) for r in result]

@router.get("/latest", response_model=list[SignalModelGet])
async def get_latest_signals(db: db_dependency):
    stocks = db.query(db_rows.StockRow).all()

    fin_res = []
    for stock in stocks:
        r = db.query(db_rows.SignalRow).filter(db_rows.SignalRow.stock_id == stock.id).order_by(db_rows.SignalRow.timestamp.desc()).first()
        if r is None:
            continue
        fin_res.append(SignalModelGet(ticker = stock.ticker, timestamp = r.timestamp, call = r.call, confidence = r.confidence))
        
    return fin_res

@router.get("/latest/{ticker}", response_model=SignalModelGet)
async def get_latest_signal_by_ticker(ticker: str, db: db_dependency):
    stock = db.query(db_rows.StockRow).filter(db_rows.StockRow.ticker == ticker).first()
    if stock is None:
        raise HTTPException(status_code=404, detail="Stock not found")
    
    result = db.query(db_rows.SignalRow).filter(db_rows.SignalRow.stock_id == stock.id).order_by(db_rows.SignalRow.timestamp.desc()).first()
    if result is None:
        raise HTTPException(status_code=404, detail="Signal not found")
    return SignalModelGet(ticker = stock.ticker, timestamp = result.timestamp, call = result.call, confidence = result.confidence)
