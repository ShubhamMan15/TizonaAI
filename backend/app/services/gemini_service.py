from google import genai

from backend.app.core.config import settings
from backend.app.prompts.system_prompt import SYSTEM_PROMPT

if not settings.GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not configured.")

client = genai.Client(api_key=settings.GEMINI_API_KEY)


def ask_gemini(prompt: str) -> str:
    """
    Send a prompt to Gemini and return the generated response.
    """

    full_prompt = f"""
{SYSTEM_PROMPT}

User Question:
{prompt}
"""

    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=full_prompt,
    )

    if not response.text:
        raise RuntimeError("Gemini returned an empty response.")

    return response.text
