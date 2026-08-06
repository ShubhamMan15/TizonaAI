from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.investigation import Investigation
from app.schemas.investigation_event import InvestigationEventResponse
from app.services.investigation_service import get_investigation_events
from app.services.report_service import generate_pdf_report

router = APIRouter()


@router.get("/investigations")
def get_investigations(
    ioc: Optional[str] = None,
    db: Session = Depends(get_db)
):

    query = db.query(Investigation)

    if ioc:
        query = query.filter(
            Investigation.ioc == ioc
        )

    investigations = query.all()

    return [
        {
            "id": item.id,
            "ioc": item.ioc,
            "ioc_type": item.ioc_type,
            "source": item.source,
            "pulse_count": item.pulse_count,
            "reputation": item.reputation,
            "risk_score": item.risk_score,
            "status": item.status,
            "mitre_attack": item.mitre_attack,
            "created_at": item.created_at
        }
        for item in investigations
    ]


@router.get("/investigations/{investigation_id}")
def get_investigation(
    investigation_id: int,
    db: Session = Depends(get_db)
):
    """
    Return a single investigation with its timeline events.
    """

    investigation = (
        db.query(Investigation)
        .filter(
            Investigation.id == investigation_id
        )
        .first()
    )

    if not investigation:
        raise HTTPException(
            status_code=404,
            detail="Investigation not found"
        )

    events = get_investigation_events(
        db=db,
        investigation_id=investigation_id
    )

    return {
        "id": investigation.id,
        "ioc": investigation.ioc,
        "ioc_type": investigation.ioc_type,
        "source": investigation.source,
        "pulse_count": investigation.pulse_count,
        "reputation": investigation.reputation,
        "risk_score": investigation.risk_score,
        "status": investigation.status,
        "mitre_attack": investigation.mitre_attack,
        "raw_data": investigation.raw_data,
        "created_at": investigation.created_at,
        "events": [
            {
                "id": event.id,
                "event_type": event.event_type,
                "description": event.description,
                "metadata": event.event_metadata,
                "created_at": event.created_at,
            }
            for event in events
        ]
    }


@router.get(
    "/investigations/{investigation_id}/events",
    response_model=list[InvestigationEventResponse]
)
def get_events(
    investigation_id: int,
    db: Session = Depends(get_db)
):
    """
    Return all timeline events for a specific investigation.
    """

    investigation = (
        db.query(Investigation)
        .filter(
            Investigation.id == investigation_id
        )
        .first()
    )

    if not investigation:
        raise HTTPException(
            status_code=404,
            detail="Investigation not found"
        )

    return get_investigation_events(
        db=db,
        investigation_id=investigation_id
    )


def calculate_threat_level(risk_score: int):

    if risk_score >= 90:
        return "critical"

    elif risk_score >= 70:
        return "high"

    elif risk_score >= 40:
        return "medium"

    else:
        return "low"


@router.get("/investigations/{investigation_id}/report")
def get_investigation_report(
    investigation_id: int,
    db: Session = Depends(get_db)
):

    investigation = (
        db.query(Investigation)
        .filter(
            Investigation.id == investigation_id
        )
        .first()
    )

    if not investigation:
        raise HTTPException(
            status_code=404,
            detail="Investigation not found"
        )

    threat_level = calculate_threat_level(
        investigation.risk_score
    )

    return {
        "id": investigation.id,
        "ioc": investigation.ioc,
        "type": investigation.ioc_type,
        "threat_level": threat_level,
        "risk_score": investigation.risk_score,
        "reputation": investigation.reputation,
        "status": investigation.status,
        "source": investigation.source,
        "pulse_count": investigation.pulse_count,
        "mitre_attack": investigation.mitre_attack,
        "created_at": investigation.created_at
    }


@router.get("/investigations/{investigation_id}/report/json")
def export_investigation_json(
    investigation_id: int,
    db: Session = Depends(get_db)
):

    investigation = (
        db.query(Investigation)
        .filter(
            Investigation.id == investigation_id
        )
        .first()
    )

    if not investigation:
        raise HTTPException(
            status_code=404,
            detail="Investigation not found"
        )

    threat_level = calculate_threat_level(
        investigation.risk_score
    )

    return {
        "case_id": investigation.id,
        "ioc": investigation.ioc,
        "classification": threat_level,
        "risk_score": investigation.risk_score,
        "reputation": investigation.reputation,
        "status": investigation.status,
        "intel_source": investigation.source,
        "analysis": {
            "ioc_type": investigation.ioc_type,
            "pulse_count": investigation.pulse_count
        },
        "mitre_attack": investigation.mitre_attack,
        "raw_data": investigation.raw_data,
        "created_at": investigation.created_at
    }


@router.get("/investigations/{investigation_id}/report/pdf")
def export_investigation_pdf(
    investigation_id: int,
    db: Session = Depends(get_db)
):

    investigation = (
        db.query(Investigation)
        .filter(
            Investigation.id == investigation_id
        )
        .first()
    )

    if not investigation:
        raise HTTPException(
            status_code=404,
            detail="Investigation not found"
        )

    filename = generate_pdf_report(
        investigation
    )

    return FileResponse(
        filename,
        media_type="application/pdf",
        filename=filename
    )
