from jobs.fetch_market_data import fetch_market_data
from jobs.predict_signals import predict_signals
from jobs.init_stocks import init_stocks
from apscheduler.schedulers.blocking import BlockingScheduler # type: ignore
from shared.database import engine
from shared import db_rows
from shared.database import init_db

def run():
    print("[] Scheduler is alive")
    
    init_stocks()
    fetch_market_data()
    predict_signals()
    
    scheduler = BlockingScheduler(timezone="UTC")
    scheduler.add_job(fetch_market_data, "cron", hour=1, minute=30)
    scheduler.add_job(predict_signals, "cron", hour=2, minute=00)
    scheduler.start()

if __name__ == "__main__":
    init_db()
    run()