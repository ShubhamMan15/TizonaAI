from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from backend.app.services.gemini_service import ask_gemini

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    question: str
    answer: str


@router.post("/assistant/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    """
    Send the user's message to Gemini and return the AI response.
    """

    try:
        answer = ask_gemini(request.message)

        return ChatResponse(
            question=request.message,
            answer=answer
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Gemini error: {str(e)}"
        )
