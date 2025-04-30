from config.database import get_database
from datetime import datetime

def update_user_portfolio(user_id, ticker, action, amount):
    db = get_database()
    portfolio = db.users.find_one({"user_id": user_id})["portfolio"]
    portfolio.append({"ticker": ticker, "action": action, "amount": amount, "timestamp": datetime.now().isoformat()})
    db.users.update_one({"user_id": user_id}, {"$set": {"portfolio": portfolio}})
    return {"status": "Portfolio updated"}

def update_leaderboard(user_id, score):
    db = get_database()
    db.leaderboard.update_one(
        {"user_id": user_id},
        {"$set": {"score": score, "last_updated": datetime.now().isoformat()}},
        upsert=True
    )
    return {"status": "Leaderboard updated"}