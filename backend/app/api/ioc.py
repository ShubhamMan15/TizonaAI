from fastapi import APIRouter

from app.schemas.ioc import IOCExtractRequest
from app.services.ioc_service import extract_iocs
from app.services.enrichment_service import enrich_ioc

router = APIRouter()


@router.post("/ioc/extract")
def extract(request: IOCExtractRequest):
    return extract_iocs(request.text)


@router.get("/ioc/details/{ioc}")
def ioc_details(ioc: str):

    return enrich_ioc(ioc)


@router.get("/ioc/history/{ioc}")
def ioc_history(ioc: str):

    return [

        {
            "date": "2026-08-01",
            "action": "IOC first observed"
        },

        {
            "date": "2026-08-03",
            "action": "Detected during investigation"
        },

        {
            "date": "2026-08-05",
            "action": "Threat intelligence enrichment completed"
        }

    ]


@router.get("/ioc/related/{ioc}")
def related_iocs(ioc: str):

    return [

        {
            "ioc": "185.220.101.5",
            "type": "IP"
        },

        {
            "ioc": "evil-domain.com",
            "type": "Domain"
        },

        {
            "ioc": "eicar-test-file.exe",
            "type": "Filename"
        }

    ]
