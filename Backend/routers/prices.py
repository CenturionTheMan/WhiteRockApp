from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated, List, Optional
from sqlalchemy.orm import Session
from shared import db_rows
from shared.database import SessionLocal
import datetime
from pydantic import BaseModel


# ============================ MODELS ============================
class PriceModelPost(BaseModel):
    ticker: str
    timestamp: datetime.datetime
    price: float


class PriceModelGet(BaseModel):
    ticker: str
    timestamp: datetime.datetime
    price: float
   
def RowToGetModel(row: db_rows.PriceRow) -> PriceModelGet:
    return PriceModelGet(
        ticker=row.stock.ticker,
        timestamp=row.timestamp,
        price=row.price
    ) 
# ================================================================
    
    
# ============================ UTILS ============================
router = APIRouter(prefix="/prices", tags=["prices"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
# ================================================================


# ============================ ROUTES ============================
@router.post("/", response_model=PriceModelGet)
async def create_price(price: PriceModelPost, db: db_dependency):
    stock = db.query(db_rows.StockRow).filter(db_rows.StockRow.ticker == price.ticker).first()
    if stock is None:
        raise HTTPException(status_code=404, detail="Stock with given ticker not found")
    
    db_price = db_rows.PriceRow(
       stock_id = stock.id,
       timestamp = price.timestamp,
       price = price.price)
    
    db.add(db_price)
    db.commit()
    db.refresh(db_price)
    
    return RowToGetModel(db_price)

@router.get("/{ticker}", response_model=list[PriceModelGet])
def get_stock_prices(db: db_dependency, ticker: str,
                     from_timestamp: Optional[datetime.datetime] = None,
                     to_timestamp: Optional[datetime.datetime] = None):
    stock = db.query(db_rows.StockRow).filter(db_rows.StockRow.ticker == ticker).first()
    if stock is None:
        raise HTTPException(status_code=404, detail="Stock not found")

    query = db.query(db_rows.PriceRow).filter(
        db_rows.PriceRow.stock_id == stock.id
    )

    if from_timestamp:
        query = query.filter(db_rows.PriceRow.timestamp >= from_timestamp)

    if to_timestamp:
        query = query.filter(db_rows.PriceRow.timestamp <= to_timestamp)

    query = query.options(joinedload(db_rows.PriceRow.stock))

    return [RowToGetModel(row) for row in query.all()]