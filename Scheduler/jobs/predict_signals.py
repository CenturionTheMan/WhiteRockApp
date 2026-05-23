from datetime import datetime, timezone
from typing import Literal, Tuple
from sqlalchemy.orm import Session
from shared.database import SessionLocal
from shared import db_rows
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
    today = datetime(now.year, now.month, now.day, tzinfo=timezone.utc) 
    
    
    for stock in stocks:
        signals = []
            
        exist = db.query(db_rows.SignalRow).filter(
            db_rows.SignalRow.stock_id == stock.id,
            db_rows.SignalRow.timestamp == today
        ).first()
        
        if exist:
            continue
            
        pred_sig, confidence = __get_prediction_for_ticker(stock.ticker, today)
            
        signal = db_rows.SignalRow(
            stock_id=stock.id,
            timestamp=today,
            call=pred_sig,
            confidence=confidence
        )
        signals.append(signal)
            
        print(f"    Generated signal for {stock.ticker} - {pred_sig} with confidence {confidence*100}%")
            
        db.add_all(signals)
    db.commit()
    
def __get_prediction_for_ticker(ticker: str, date: datetime) -> Tuple[Literal["BUY", "SELL", "HOLD"], float]:
    """_summary_
    TODO method which will return prediction with confidence for given stock 
    """
    ACTIONS = ["BUY", "SELL", "HOLD"]
    action = random.choices(ACTIONS,weights=[0.3, 0.3, 0.4])[0]
    confidence = Decimal(str(round(random.uniform(0, 1), 4)))
    return action, confidence
    
  
# OLD --> to remove 
# def __insert_sample_data(db: Session):
#     print("[] Inserting sample data")
    
#     stocks = db.query(db_rows.StockRow).all()
#     days = 30
#     now = datetime.now(timezone.utc)
#     start_date = datetime(now.year, now.month, now.day, tzinfo=timezone.utc) 
#     ACTIONS = ["BUY", "SELL", "HOLD"]
    
#     for stock in stocks:
#         signals = []
#         for i in range(days):
#             target_date = start_date + timedelta(days=-i)
            
#             exist = db.query(db_rows.SignalRow).filter(
#                 db_rows.SignalRow.stock_id == stock.id,
#                 db_rows.SignalRow.timestamp == target_date
#             ).first()
#             if exist:
#                 continue
            
#             action = random.choices(ACTIONS,weights=[0.3, 0.3, 0.4])[0]
#             confidence = Decimal(str(round(random.uniform(0, 1), 4)))
            
#             signal = db_rows.SignalRow(
#                 stock_id=stock.id,
#                 timestamp=target_date,
#                 call=action,
#                 confidence=confidence
#             )
#             signals.append(signal)
            
#             print(f"    Generated signal for {stock.ticker} - {action} with confidence {confidence*100}%")
            
#         db.add_all(signals)
#     db.commit()