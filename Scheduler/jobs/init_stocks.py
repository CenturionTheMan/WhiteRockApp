import yfinance as yf
from sqlalchemy.orm import Session
from shared.database import SessionLocal
from shared import db_rows
import pandas as pd

def init_stocks():
    print("[] Initializing stocks...")
    db : Session = SessionLocal()
    try:
        __add_stocks(db)

    except Exception as e:
        db.rollback()
        print(f"    Error fetching market data: {e}")

    finally:
        db.close()

def __add_stocks(db: Session):
    stocks_to_add = [
        ('AAPL', 'Apple Inc.'),
        ('MSFT', 'Microsoft Corporation'),
        ('GOOGL', 'Alphabet Inc. Class A'),
        ('AMZN', 'Amazon.com Inc.'),
        ('TSLA', 'Tesla Inc.'),
        ('META', 'Meta Platforms Inc.'),
        ('NVDA', 'NVIDIA Corporation'),
        ('NFLX', 'Netflix Inc.'),
        ('AMD', 'Advanced Micro Devices Inc.'),
        ('INTC', 'Intel Corporation')]
    for sta in stocks_to_add:
        exist = db.query(db_rows.StockRow).filter(db_rows.StockRow.ticker == sta[0]).first()
        if exist:
            continue
        db_stock = db_rows.StockRow(
            ticker = sta[0],
            name = sta[1]
        )
        db.add(db_stock)
        print(f"    Added stock {sta[0]} - {sta[1]}")
    db.commit()