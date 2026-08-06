from google import genai

from backend.app.core.config import settings

if not settings.GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not configured.")

client = genai.Client(api_key=settings.GEMINI_API_KEY)


def ask_gemini(prompt: str) -> str:
    """
    Send a prompt to Gemini and return the generated response.
    """
    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=prompt,
    )

    if not response.text:
        raise RuntimeError("Gemini returned an empty response.")

    return response.text
