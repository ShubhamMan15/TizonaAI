import requests

OLLAMA_URL = "http://127.0.0.1:11434/api/generate"
OLLAMA_MODEL = "llama3.2:3b"


def ask_gemini(prompt: str) -> str:
    """
    Compatibility wrapper.
    The rest of the project still calls ask_gemini(),
    but this now uses Ollama instead of Gemini.
    """

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": OLLAMA_MODEL,
            "prompt": prompt,
            "stream": False,
        },
        timeout=300,
    )

    response.raise_for_status()

    data = response.json()

    return data.get("response", "")
