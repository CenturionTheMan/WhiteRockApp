from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated, List, Optional
from sqlalchemy.orm import Session, joinedload
from shared import db_rows
from shared.database import SessionLocal
import datetime
from pydantic import BaseModel


# ============================ MODELS ============================
class CandleModel(BaseModel):
    ticker: str
    timestamp: datetime.datetime
    close: float
    open_: float
    high: float
    low: float
    volume: float


   
def RowToModel(row: db_rows.CandleRow) -> CandleModel:
    return CandleModel(
        ticker=row.stock.ticker,
        timestamp=row.timestamp,
        close=row.close,
        open_=row.open_,
        high=row.high,
        low=row.low,
        volume=row.volume
    ) 
# ================================================================
    
    
# ============================ UTILS ============================
router = APIRouter(prefix="/candles", tags=["candles"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
# ================================================================


# ============================ ROUTES ============================
@router.get("/latest/{ticker}", response_model=CandleModel)
def get_latest_candle_by_ticker(db: db_dependency, ticker: str):
    stock = db.query(db_rows.StockRow).filter(db_rows.StockRow.ticker == ticker).first()
    if stock is None:
        raise HTTPException(status_code=404, detail="Stock not found")
    
    query = db.query(db_rows.CandleRow).filter(db_rows.CandleRow.stock_id == stock.id).order_by(db_rows.CandleRow.timestamp.desc())
    query = query.options(joinedload(db_rows.CandleRow.stock))
    latest_candle = query.first()
    if latest_candle is None:
        raise HTTPException(status_code=404, detail="No candles found for this stock")
    else:
        return RowToModel(latest_candle)    
         


@router.get("/{ticker}", response_model=List[CandleModel])
def get_candles_by_ticker(db: db_dependency, ticker: str,
                     from_timestamp: Optional[datetime.datetime] = None,
                     to_timestamp: Optional[datetime.datetime] = None):
    
    stock = db.query(db_rows.StockRow).filter(db_rows.StockRow.ticker == ticker).first()
    if stock is None:
        raise HTTPException(status_code=404, detail="Stock not found")
    
    query = db.query(db_rows.CandleRow).filter(db_rows.CandleRow.stock_id == stock.id)
    
    
    if from_timestamp:
        query = query.filter(db_rows.CandleRow.timestamp >= from_timestamp)

    if to_timestamp:
        query = query.filter(db_rows.CandleRow.timestamp <= to_timestamp)
    
    query = query.options(joinedload(db_rows.CandleRow.stock))
    query = query.order_by(db_rows.CandleRow.timestamp.asc())
    
    return [RowToModel(row) for row in query.all()]

@router.post("/", response_model=CandleModel)
async def create_candle(price: CandleModel, db: db_dependency):
    stock = db.query(db_rows.StockRow).filter(db_rows.StockRow.ticker == price.ticker).first()
    if stock is None:
        raise HTTPException(status_code=404, detail="Stock with given ticker not found")
    
    db_candle = db_rows.CandleRow1(
        stock_id = stock.id,
        timestamp = price.timestamp,
        close = price.close,
        open_ = price.open_,
        high = price.high,
        low = price.low,
        volume = price.volume)
    
    db.add(db_candle)
    db.commit()
    db.refresh(db_candle)
    
    return RowToModel(db_candle)

        
