from langgraph.graph import StateGraph, END
from typing import Dict, Any
from agents.data_agent import fetch_stock_data, fetch_news
from agents.user_profile_agent import analyze_user_profile
from agents.recommendation_agent import generate_recommendation
from agents.explanation_agent import explain_recommendation
from agents.gamification_agent import update_user_portfolio, update_leaderboard

class State(Dict[str, Any]):
    ticker: str
    user_data: Dict
    stock_data: Dict
    news: list
    user_profile: str
    recommendation: str
    explanation: str
    portfolio_updated: bool
    leaderboard_updated: bool

def data_node(state: State):
    state["stock_data"] = fetch_stock_data(state["ticker"])
    state["news"] = fetch_news(state["ticker"])
    return state

def user_profile_node(state: State):
    state["user_profile"] = analyze_user_profile(state["user_data"])
    return state

def recommendation_node(state: State):
    state["recommendation"] = generate_recommendation(
        state["stock_data"], state["news"], state["user_profile"]
    )
    return state

def explanation_node(state: State):
    state["explanation"] = explain_recommendation(state["recommendation"])
    return state

def gamification_node(state: State):
    state["portfolio_updated"] = update_user_portfolio(
        state["user_data"]["user_id"], state["ticker"], "buy", 1000
    )
    state["leaderboard_updated"] = update_leaderboard(
        state["user_data"]["user_id"], 100
    )
    return state

workflow = StateGraph(State)
workflow.add_node("data_node", data_node)  # Renamed for consistency
workflow.add_node("user_profile_node", user_profile_node)
workflow.add_node("recommendation_node", recommendation_node)
workflow.add_node("explanation_node", explanation_node)  # Renamed node
workflow.add_node("gamification_node", gamification_node)  # Renamed node

workflow.set_entry_point("data_node")
workflow.add_edge("data_node", "user_profile_node")
workflow.add_edge("user_profile_node", "recommendation_node")
workflow.add_edge("recommendation_node", "explanation_node")
workflow.add_edge("explanation_node", "gamification_node")
workflow.add_edge("gamification_node", END)

app = workflow.compile()