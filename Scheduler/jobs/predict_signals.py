from datetime import datetime, timezone
from typing import List, Literal, Tuple
from sqlalchemy.orm import Session
from shared.database import SessionLocal
from shared import db_rows
from shared.db_rows import CandleRow
from datetime import datetime, timedelta
from decimal import Decimal
import random

def predict_signals():
    db : Session = SessionLocal()
    try:
        _insert_predictions_for_today(db)
    except Exception as e:
        db.rollback()
        print(f"    Error generating signals data: {e}")

    finally:
        db.close()
    
    
def _insert_predictions_for_today(db: Session):
    print("[] Generating todays predictions")
    
    stocks = db.query(db_rows.StockRow).all()
    now = datetime.now(timezone.utc)
    yesterday = datetime(now.year, now.month, now.day, tzinfo=timezone.utc) + timedelta(days=-1)
    
    for stock in stocks:
        signals = []
            
        exist = db.query(db_rows.SignalRow).filter(
            db_rows.SignalRow.stock_id == stock.id,
            db_rows.SignalRow.timestamp == yesterday
        ).first()
        
        if exist:
            continue
        
        is_success, pred_sig, confidence = __get_prediction_for_ticker(db, stock, yesterday)
        if not is_success:
            continue
            
        signal = db_rows.SignalRow(
            stock_id=stock.id,
            timestamp=yesterday,
            call=pred_sig,
            confidence=confidence
        )
        signals.append(signal)
            
        print(f"    Generated signal for {stock.ticker} - {pred_sig} with confidence {confidence*100}%")
            
        db.add_all(signals)
    db.commit()
    
def __get_prices_data(db: Session, stock_id: int, from_date: datetime, to_date: datetime) -> List[CandleRow]:
    prices = db.query(CandleRow).filter(CandleRow.stock_id == stock_id) \
        .filter(CandleRow.timestamp >= from_date) \
        .filter(CandleRow.timestamp <= to_date) \
        .order_by(CandleRow.timestamp.asc()) \
        .all()
    return prices
    
def __get_prediction_for_ticker(db: Session, stock: db_rows.StockRow, date: datetime) -> Tuple[bool, Literal["BUY", "SELL", "HOLD"], float]:
    """_summary_
    TODO method which will return prediction with confidence for given stock 
    """
    
    WINDOWS_SIZE = 30
    prices_data = __get_prices_data(db, stock.id, datetime - timedelta(days=WINDOWS_SIZE), datetime)
    if prices_data[-1].timestamp.date() != date.date():
        print(f"    No price data for {stock.ticker} on {date.date()}, skipping signal generation")
        return False, "HOLD", Decimal("0.00")
    
    ACTIONS = ["BUY", "SELL", "HOLD"]
    action = random.choices(ACTIONS,weights=[0.3, 0.3, 0.4])[0]
    confidence = Decimal(str(round(random.uniform(0, 1), 4)))
    
    return True, action, confidence