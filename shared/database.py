import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def init_db():
    with engine.connect() as conn:
        conn.execute(text("""
            DO $$ BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'signal_call') THEN
                    CREATE TYPE signal_call AS ENUM ('BUY', 'SELL', 'HOLD');
                END IF;
            END $$;
        """))
        conn.commit()
    Base.metadata.create_all(bind=engine)