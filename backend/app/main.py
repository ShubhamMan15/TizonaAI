from fastapi import FastAPI

app = FastAPI(
    title="TizonaAI",
    description="AI-Powered Threat Hunting and Threat Intelligence Platform",
    version="0.1.0"
)

@app.get("/")
def root():
    return {
        "project": "TizonaAI",
        "status": "running",
        "version": "0.1.0"
    }
