import yfinance as yf
from datetime import datetime

def fetch_stock_price(ticker: str) -> dict:
    try:
        stock = yf.Ticker(ticker)
        data = stock.history(period="1d")
        if data.empty:
            raise ValueError(f"No stock data available for ticker {ticker}")
        
        return {
            "ticker": ticker,
            "price": float(data["Close"].iloc[-1]),
            "timestamp": data.index[-1].isoformat()
        }
    except Exception as e:
        raise ValueError(f"Failed to fetch stock price for {ticker}: {str(e)}")