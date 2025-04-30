from pydantic import BaseModel
from typing import List, Dict

class User(BaseModel):
    user_id: str
    risk_appetite: str
    investment_horizon: str
    investment_amount: float
    portfolio: List[Dict]