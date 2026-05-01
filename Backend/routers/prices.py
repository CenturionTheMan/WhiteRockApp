from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated, List, Optional
from sqlalchemy.orm import Session, joinedload
from shared import db_rows
from shared.database import SessionLocal
import datetime
from pydantic import BaseModel


# ============================ MODELS ============================
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
def __handle_stock_prices_query(db: db_dependency, ticker: str,
                                from_timestamp: Optional[datetime.datetime] = None,
                                to_timestamp: Optional[datetime.datetime] = None) -> tuple[db_rows.StockRow, Session.query]:
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
    
    return stock, query

    
@router.get("/", response_model=List[PriceModelFormattedGet])
def get_stock_prices_formatted(
    db: db_dependency,
    from_timestamp: Optional[datetime.datetime] = None,
    to_timestamp: Optional[datetime.datetime] = None
):
    all_stocks = db.query(db_rows.StockRow).all()

    result = []
    for st in all_stocks:
        stock, query = __handle_stock_prices_query(db, st.ticker, from_timestamp, to_timestamp)

        values = [
            PriceValue(price=row.close, date=row.timestamp)
            for row in query.all()
        ]

        result.append(PriceModelFormattedGet(
            ticker=stock.ticker,
            subtext=stock.name,
            fromDate=from_timestamp,
            toDate=to_timestamp,
            values=values
        ))

    return result

@router.get("/{ticker}", response_model=PriceModelFormattedGet)
def get_stock_prices_formatted_ticker(db: db_dependency, ticker: str,
                                      from_timestamp: Optional[datetime.datetime] = None,
                                      to_timestamp: Optional[datetime.datetime] = None):
    
    stock, query = __handle_stock_prices_query(db, ticker, from_timestamp, to_timestamp)
    values = [PriceValue(price=row.close, date=row.timestamp) for row in query.all()]
    return PriceModelFormattedGet(
        ticker=stock.ticker,
        subtext=stock.name,
        fromDate=from_timestamp,
        toDate=to_timestamp,
        values=values)