from fastapi import APIRouter

from backend.app.schemas.enrich import EnrichmentRequest
from backend.app.services.enrichment_service import enrich_ioc

router = APIRouter()


@router.post("/ioc/enrich")
def enrich(request: EnrichmentRequest):
    return enrich_ioc(request.ioc)
