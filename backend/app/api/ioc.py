from fastapi import APIRouter

from backend.app.schemas.ioc import IOCExtractRequest
from backend.app.services.ioc_service import extract_iocs

router = APIRouter()


@router.post("/ioc/extract")
def extract(request: IOCExtractRequest):
    return extract_iocs(request.text)
