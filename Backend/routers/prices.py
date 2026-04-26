from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated, List, Optional
from sqlalchemy.orm import Session, joinedload
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
    
class PriceValue(BaseModel):
    price: float
    date: datetime.datetime
    
class PriceModelFormattedGet(BaseModel):
    ticker: str
    subtext: str
    fromDate: datetime.datetime | None
    toDate: datetime.datetime | None
    values: List[PriceValue]
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


def __create_stock_prices_query(db: db_dependency, ticker: str,
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
    return stock, query

    
@router.get("/{ticker}", response_model=List[PriceModelGet])
def get_stock_prices_raw(db: db_dependency, ticker: str,
                     from_timestamp: Optional[datetime.datetime] = None,
                     to_timestamp: Optional[datetime.datetime] = None):
    
    stock, query = __create_stock_prices_query(db, ticker, from_timestamp, to_timestamp)
    return [RowToGetModel(row) for row in query.all()]

@router.get("/{ticker}/formatted", response_model=PriceModelFormattedGet)
def get_stock_prices_formatted(db: db_dependency, ticker: str,
                     from_timestamp: Optional[datetime.datetime] = None,
                     to_timestamp: Optional[datetime.datetime] = None):
    
    stock, query = __create_stock_prices_query(db, ticker, from_timestamp, to_timestamp)

    return PriceModelFormattedGet(
        ticker=stock.ticker,
        subtext=stock.name,
        fromDate=from_timestamp,
        toDate=to_timestamp,
        values=[{"price": row.price, "date": row.timestamp} for row in query.all()]
    )
        