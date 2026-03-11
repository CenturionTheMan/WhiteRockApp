from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

USER = 'postgres-user'
PASS = 'pass'
DB_LOC = 'db:5432'
DB_NAME = 'whiterockdb'

DATABASE_URL = f"postgresql+psycopg2://{USER}:{PASS}@{DB_LOC}/{DB_NAME}"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()