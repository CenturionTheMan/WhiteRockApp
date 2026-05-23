import yfinance as yf
from sqlalchemy.orm import Session
from shared.database import SessionLocal
from shared import db_rows
import pandas as pd

def fetch_market_data():
    print("[] Fetching market data...")
    db : Session = SessionLocal()
    try:
        __fetch_candles(db)

    except Exception as e:
        db.rollback()
        print(f"    Error fetching market data: {e}")

    finally:
        db.close()
        
def __fetch_candles(db: Session):
    stocks = db.query(db_rows.StockRow).all()
    for stock in stocks:
        df = yf.download(stock.ticker, period="90d", auto_adjust=False, progress=False)

        if df is None or df.empty:
            print(f"No data for {stock.ticker}")
            continue

        if isinstance(df.columns, pd.MultiIndex):
            last = df.columns.get_level_values(-1)
            if stock.ticker in last:
                df = df.xs(stock.ticker, axis=1, level=-1)
            else:
                df = df.droplevel(-1, axis=1)

        df = df.rename(columns=str.title)
        df.index = pd.to_datetime(df.index)

        needed = ["Open", "High", "Low", "Close"]
        df = df[[c for c in df.columns if c in needed + ["Volume"]]].dropna(subset=needed)

        if "Volume" not in df.columns or df["Volume"].sum() == 0:
            df["Volume"] = 1.0

        for index, row in df.iterrows():
            timestamp = index.to_pydatetime()

            open_ = float(row["Open"])
            high = float(row["High"])
            low = float(row["Low"])
            close = float(row["Close"])
            volume = float(row["Volume"])

            exists = db.query(db_rows.CandleRow).filter(
                db_rows.CandleRow.stock_id == stock.id,
                db_rows.CandleRow.timestamp == timestamp
            ).first()

            if not exists:
                db_candle = db_rows.CandleRow(
                    stock_id=stock.id,
                    timestamp=timestamp,
                    open_=open_,
                    high=high,
                    low=low,
                    close=close,
                    volume=volume
                )
                db.add(db_candle)

                print(
                    f"Added {stock.ticker} at {timestamp}: "
                    f"O={open_}, H={high}, L={low}, C={close}, V={volume}"
                )

    db.commit()