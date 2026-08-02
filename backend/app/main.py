from fastapi import FastAPI

from backend.app.core.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    description="AI-Powered Threat Hunting and Threat Intelligence Platform",
    version=settings.APP_VERSION
)

@app.get("/")
def root():
    return {
        "project": settings.APP_NAME,
        "status": "running",
        "version": settings.APP_VERSION
    }
