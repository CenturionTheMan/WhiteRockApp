import yfinance as yf
from sqlalchemy.orm import Session
from shared.database import SessionLocal
from shared import db_rows


def fetch_market_data():
    print("[] Fetching market data...")
    db : Session = SessionLocal()
    try:
        __add_stocks(db)
        __fetch_prices(db)

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
    
        
        
        
def __fetch_prices(db: Session):
    stocks = db.query(db_rows.StockRow).all()
    for stock in stocks:
        data = yf.download(stock.ticker, period="90d")

        for index, row in data.iterrows():
            timestamp = index.to_pydatetime()
            price = float(row["Close"][stock.ticker])

            exists = db.query(db_rows.PriceRow).filter(
                db_rows.PriceRow.stock_id == stock.id,
                db_rows.PriceRow.timestamp == timestamp
            ).first()

            if not exists:
                db_price = db_rows.PriceRow(
                    stock_id=stock.id,
                    timestamp=timestamp,
                    price=price
                )
                db.add(db_price)
                print(f"    Added {stock.ticker} at {timestamp}: {price}")
    db.commit()