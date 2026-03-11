from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date # type: ignore
from database import Base

class SignalRow(Base):
    __tablename__ = 'signals'
    
    id = Column(Integer, primary_key=True, index=True)
    ticker = Column(String)
    date = Column(Date)
    action = Column(String)