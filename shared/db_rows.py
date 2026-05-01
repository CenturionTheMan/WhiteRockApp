from sqlalchemy import BigInteger, Boolean, Column, ForeignKey, Integer, Numeric, String, DateTime # type: ignore
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
    timestamp = Column(DateTime, index=True)
    open_ = Column("open", Numeric(12, 4))
    high = Column(Numeric(12, 4))
    low = Column(Numeric(12, 4))
    close = Column(Numeric(12, 4))
    volume = Column(BigInteger)

    stock = relationship("StockRow", back_populates="candles")
    
class SignalRow(Base):
    __tablename__ = 'signals'
    
    id = Column(Integer, primary_key=True)
    stock_id = Column(Integer, ForeignKey("stocks.id"))
    timestamp = Column(DateTime)
    action = Column(String)

    stock = relationship("StockRow", back_populates="signals")