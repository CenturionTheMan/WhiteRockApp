from fastapi import FastAPI
from shared import db_rows
from shared.database import engine
from routers import signals, stocks, prices

app = FastAPI()
db_rows.Base.metadata.create_all(bind=engine)  # TODO not for production

app.include_router(stocks.router)
app.include_router(prices.router)
app.include_router(signals.router)

@app.get("/")
def root():
    return {"prop": "Hello World!"}