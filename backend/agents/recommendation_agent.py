from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os

load_dotenv()

def generate_recommendation(stock_data, news, user_profile, investor_style="Warren Buffett"):
    llm = ChatGroq(model="llama-3.3-70b-versatile", api_key=os.getenv("GROQ_API_KEY"))
    prompt = PromptTemplate(
        input_variables=["stock_data", "news", "user_profile", "investor_style"],
        template="Based on the following data:\nStock: {stock_data}\nNews: {news}\nUser Profile: {user_profile}\nInvestor Style: {investor_style}\nRecommend a stock and explain why."
    )
    response = llm.invoke(prompt.format(stock_data=stock_data, news=news, user_profile=user_profile, investor_style=investor_style))
    return response.content