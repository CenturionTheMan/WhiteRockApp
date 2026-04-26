from jobs.fetch_market_data import fetch_market_data
from jobs.predict_signals import predict_signals
from apscheduler.schedulers.blocking import BlockingScheduler # type: ignore

def run():
    print("[] Scheduler is alive")
    
    fetch_market_data()
    predict_signals()
    
    scheduler = BlockingScheduler(timezone="UTC")
    scheduler.add_job(fetch_market_data, "cron", hour=0, minute=0)
    scheduler.add_job(predict_signals, "cron", hour=0, minute=30)
    scheduler.start()

if __name__ == "__main__":
    run()