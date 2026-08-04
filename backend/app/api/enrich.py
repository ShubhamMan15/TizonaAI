from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.db.session import get_db
from backend.app.schemas.enrich import EnrichmentRequest
from backend.app.services.enrichment_service import enrich_ioc
from backend.app.services.investigation_service import save_investigation


router = APIRouter()


@router.post("/ioc/enrich")
def enrich(
    request: EnrichmentRequest,
    db: Session = Depends(get_db)
):
    # Get threat intelligence enrichment data
    result = enrich_ioc(request.ioc)

    # Save investigation and get generated database ID
    investigation = save_investigation(
        db,
        result
    )

    # Return enrichment data + investigation reference
    return {
        **result,
        "investigation_id": investigation.id
    }
