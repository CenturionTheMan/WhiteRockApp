from fastapi import FastAPI
from shared import db_rows
from shared.database import engine
from routers import signals, stocks, prices, candles
from fastapi.middleware.cors import CORSMiddleware
from shared.database import init_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5713"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

app.include_router(stocks.router)
app.include_router(candles.router)
app.include_router(prices.router)
app.include_router(signals.router)

@app.get("/")
def root():
    return {"prop": "Hello World!"}