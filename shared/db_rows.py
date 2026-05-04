from sqlalchemy import BigInteger, Boolean, Column, Enum, ForeignKey, Index, Integer, Numeric, String, DateTime, UniqueConstraint # type: ignore
from sqlalchemy.orm import relationship
from shared.database import Base

class StockRow(Base):
    __tablename__= 'stocks'
    
    id = Column(Integer, primary_key=True)
    ticker = Column(String, unique=True, index=True)
    name = Column(String)
    
    candles = relationship("CandleRow", back_populates="stock", cascade="all, delete-orphan")
    signals = relationship("SignalRow", back_populates="stock", cascade="all, delete-orphan")
    
class CandleRow(Base):
    __tablename__= 'stock_candles'
    
    id = Column(Integer, primary_key=True)
    stock_id = Column(Integer, ForeignKey("stocks.id"))
    timestamp = Column(DateTime)
    open_ = Column("open", Numeric(12, 4))
    high = Column(Numeric(12, 4))
    low = Column(Numeric(12, 4))
    close = Column(Numeric(12, 4))
    volume = Column(BigInteger)

    stock = relationship("StockRow", back_populates="candles")
    
    __table_args__ = (
        Index("ix_candle_stock_timestamp", "stock_id", "timestamp"),
        UniqueConstraint("stock_id", "timestamp")
    )
    
    
class SignalRow(Base):
    __tablename__ = 'signals'
    
    id = Column(Integer, primary_key=True)
    stock_id = Column(Integer, ForeignKey("stocks.id"))
    timestamp = Column(DateTime)
    call = Column(Enum("BUY", "SELL", "HOLD", name="signal_call"), nullable=False)
    confidence = Column(Numeric(5, 2))

    stock = relationship("StockRow", back_populates="signals")
    
    __table_args__ = (
        Index("ix_signals_stock_timestamp", "stock_id", "timestamp"),
        UniqueConstraint("stock_id", "timestamp")
    )
    
class SchedulerLogRow(Base):
    __tablename__ = 'scheduler_logs'
    
    id = Column(Integer, primary_key=True)
    taction = Column(String, nullable=False)
    timestamp = Column(DateTime, nullable=False)
    is_success = Column(Boolean, nullable=False)
   