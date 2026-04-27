from fastapi import FastAPI
from shared import db_rows
from shared.database import engine
from routers import signals, stocks, prices
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5713"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_rows.Base.metadata.create_all(bind=engine)  # TODO not for production

app.include_router(stocks.router)
app.include_router(prices.router)
app.include_router(signals.router)

@app.get("/")
def root():
    return {"prop": "Hello World!"}