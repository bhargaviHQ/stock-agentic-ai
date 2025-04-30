from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from agents.data_agent import fetch_stock_price

router = APIRouter()

class PriceRequest(BaseModel):
    ticker: str

@router.post("/price")
async def get_stock_price(request: PriceRequest):
    try:
        price_data = fetch_stock_price(request.ticker)
        return price_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch stock price: {str(e)}")