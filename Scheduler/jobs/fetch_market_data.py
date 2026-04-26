import yfinance as yf
from shared.database import SessionLocal
from shared import db_rows


def fetch_market_data():
    print("[] Fetching market data...")

    db = SessionLocal()

    try:
        stocks = db.query(db_rows.StockRow).all()

        for stock in stocks:
            data = yf.download(stock.ticker, period="90d")

            for index, row in data.iterrows():
                print(row)
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
                    print(f"[] Added {stock.ticker} at {timestamp}: {price}")

        db.commit()

    except Exception as e:
        db.rollback()
        print(f"[] Error fetching market data: {e}")

    finally:
        db.close()