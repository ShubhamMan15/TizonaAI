from fastapi import FastAPI

from backend.app.api.health import router as health_router
from backend.app.api.ioc import router as ioc_router
from backend.app.core.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    description="AI-Powered Threat Hunting and Threat Intelligence Platform",
    version=settings.APP_VERSION
)

app.include_router(
    health_router,
    prefix="/api",
    tags=["Health"]
)

app.include_router(
    ioc_router,
    prefix="/api",
    tags=["IOC"]
)

@app.get("/")
def root():
    return {
        "project": settings.APP_NAME,
        "status": "running",
        "version": settings.APP_VERSION
    }
