from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from shared import db_rows
from shared.database import SessionLocal
import datetime
from pydantic import BaseModel


# ============================ MODELS ============================
class StockModelPost(BaseModel):
    ticker: str
    name: str
   
    class Config:
        from_attributes = True
        
class StockModelGet(BaseModel):
    id: int
    ticker: str
    name: str
   
    class Config:
        from_attributes = True
# ================================================================
    
    
# ============================ UTILS ============================
router = APIRouter(prefix="/stocks", tags=["stocks"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
# ================================================================


# ============================ ROUTES ============================
@router.post("/", response_model=StockModelGet)
async def create_stock(stock: StockModelPost, db: db_dependency):
    db_stock = db_rows.StockRow(
        ticker=stock.ticker,
        name=stock.name
    )
    db.add(db_stock)
    db.commit()
    db.refresh(db_stock)
    return db_stock


@router.get("/", response_model=List[StockModelGet])
async def get_all_stocks(db: db_dependency):
    return db.query(db_rows.StockRow).all()


@router.get("/{stock_id}", response_model=StockModelGet)
async def get_stock(stock_id, db: db_dependency):
    return db.query(db_rows.StockRow).filter(db_rows.StockRow.id == stock_id).first()


