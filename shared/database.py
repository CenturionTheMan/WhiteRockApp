import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import time

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def init_db():
    retries = 5
    for i in range(retries):
        try:
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
            return
        except Exception as e:
            print(f"DB not ready, retrying in 3s... ({i+1}/{retries}): {e}")
            time.sleep(3)
    raise Exception("Could not connect to DB after retries")
