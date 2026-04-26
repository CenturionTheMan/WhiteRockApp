from sqlalchemy import Boolean, Column, ForeignKey, Integer, Numeric, String, DateTime # type: ignore
from sqlalchemy.orm import relationship
from shared.database import Base

class StockRow(Base):
    __tablename__= 'stocks'
    
    id = Column(Integer, primary_key=True)
    ticker = Column(String, unique=True, index=True)
    name = Column(String)
    
    prices = relationship("PriceRow", back_populates="stock", cascade="all, delete-orphan")
    signals = relationship("SignalRow", back_populates="stock", cascade="all, delete-orphan")
    

class PriceRow(Base):
    __tablename__= 'stock_prices'
    
    id = Column(Integer, primary_key=True)
    stock_id = Column(Integer, ForeignKey("stocks.id"))
    timestamp = Column(DateTime, index=True)
    price = Column(Numeric(10, 2))

    stock = relationship("StockRow", back_populates="prices")
    
    
class SignalRow(Base):
    __tablename__ = 'signals'
    
    id = Column(Integer, primary_key=True)
    stock_id = Column(Integer, ForeignKey("stocks.id"))
    timestamp = Column(DateTime)
    action = Column(String)

    stock = relationship("StockRow", back_populates="signals")