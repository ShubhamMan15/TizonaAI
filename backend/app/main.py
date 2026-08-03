from fastapi import FastAPI

from backend.app.db.database import Base, engine
from backend.app.models.investigation import Investigation

from backend.app.api.enrich import router as enrich_router
from backend.app.api.health import router as health_router
from backend.app.api.ioc import router as ioc_router
from backend.app.api.investigations import router as investigations_router
from backend.app.api.dashboard import router as dashboard_router

from backend.app.core.config import settings

Base.metadata.create_all(bind=engine)

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

app.include_router(
    enrich_router,
    prefix="/api",
    tags=["Enrichment"]
)

app.include_router(
    investigations_router,
    prefix="/api",
    tags=["Investigations"]
)

app.include_router(dashboard_router)


@app.get("/")
def root():
    return {
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running"
    }
