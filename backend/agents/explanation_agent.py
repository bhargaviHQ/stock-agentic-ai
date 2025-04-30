from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os

load_dotenv()

def explain_recommendation(recommendation):
    llm = ChatGroq(model="llama3-8b-8192", api_key=os.getenv("GROQ_API_KEY"))
    prompt = PromptTemplate(
        input_variables=["recommendation"],
        template="Explain why this recommendation was made and highlight potential risks: {recommendation}"
    )
    response = llm.invoke(prompt.format(recommendation=recommendation))
    return response.content