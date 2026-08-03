from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.db.session import get_db
from backend.app.models.investigation import Investigation


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
            "created_at": item.created_at
        }
        for item in investigations
    ]


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

    if investigation.risk_score >= 90:
        threat_level = "critical"

    elif investigation.risk_score >= 70:
        threat_level = "high"

    elif investigation.risk_score >= 40:
        threat_level = "medium"

    else:
        threat_level = "low"


    return {
        "id": investigation.id,
        "ioc": investigation.ioc,
        "type": investigation.ioc_type,
        "threat_level": threat_level,
        "risk_score": investigation.risk_score,
        "reputation": investigation.reputation,
        "source": investigation.source,
        "pulse_count": investigation.pulse_count,
        "created_at": investigation.created_at
    }
