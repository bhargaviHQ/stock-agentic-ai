from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os

load_dotenv()

def analyze_user_profile(user_data):
    llm = ChatGroq(model="llama3-8b-8192", api_key=os.getenv("GROQ_API_KEY"))
    prompt = PromptTemplate(
        input_variables=["user_data"],
        template="Analyze the following user profile and summarize their investment preferences: {user_data}"
    )
    response = llm.invoke(prompt.format(user_data=user_data))
    return response.content