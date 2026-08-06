from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import Base, engine
from app.models.investigation import Investigation

# API Routers
from app.api.enrich import router as enrich_router
from app.api.health import router as health_router
from app.api.ioc import router as ioc_router
from app.api.investigations import router as investigations_router
from app.api.dashboard import router as dashboard_router
from app.api.threat_intelligence import router as threat_router
from app.api.mitre import router as mitre_router
from app.api.assistant import router as assistant_router

from app.core.config import settings

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    description="AI-Powered Threat Hunting and Threat Intelligence Platform",
    version=settings.APP_VERSION,
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
        "http://localhost:5176",
        "http://127.0.0.1:5176",
        "http://localhost:5177",
        "http://127.0.0.1:5177",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health API
app.include_router(
    health_router,
    prefix="/api",
    tags=["Health"],
)

# IOC API
app.include_router(
    ioc_router,
    prefix="/api",
    tags=["IOC"],
)

# Enrichment API
app.include_router(
    enrich_router,
    prefix="/api",
    tags=["Enrichment"],
)

# Investigation API
app.include_router(
    investigations_router,
    prefix="/api",
    tags=["Investigations"],
)

# Dashboard API
app.include_router(
    dashboard_router,
)

# Threat Intelligence API
app.include_router(
    threat_router,
    prefix="/api",
    tags=["Threat Intelligence"],
)

# MITRE API
app.include_router(
    mitre_router,
    prefix="/api",
    tags=["MITRE ATT&CK"],
)

# AI Assistant API
app.include_router(
    assistant_router,
    prefix="/api",
    tags=["AI Assistant"],
)

@app.get("/")
def root():
    return {
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
    }
