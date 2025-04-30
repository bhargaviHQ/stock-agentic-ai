import logging
from datetime import datetime
from config.database import get_database

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def log_event(event: str, details: dict):
    db = get_database()
    db.logs.insert_one({
        "event": event,
        "details": details,
        "timestamp": datetime.now().isoformat()
    })
    logger.info(f"Event logged: {event}")