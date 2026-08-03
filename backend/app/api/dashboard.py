from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.db.database import get_db
from backend.app.models.investigation import Investigation

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def dashboard_stats(db: Session = Depends(get_db)):
    investigations = db.query(Investigation).all()

    total = len(investigations)

    high_risk = len(
        [i for i in investigations if i.risk_score >= 70]
    )

    critical = len(
        [i for i in investigations if i.risk_score >= 90]
    )

    return {
        "total_investigations": total,
        "high_risk": high_risk,
        "critical": critical
    }


@router.get("/top-iocs")
def top_iocs(db: Session = Depends(get_db)):
    investigations = db.query(Investigation).all()

    counts = {}

    for inv in investigations:
        counts[inv.ioc] = counts.get(inv.ioc, 0) + 1

    top = sorted(
        counts.items(),
        key=lambda x: x[1],
        reverse=True
    )

    return {
        "top_iocs": [
            {
                "ioc": ioc,
                "count": count
            }
            for ioc, count in top[:10]
        ]
    }


@router.get("/threat-summary")
def threat_summary(db: Session = Depends(get_db)):
    investigations = db.query(Investigation).all()

    distribution = {}

    for inv in investigations:
        distribution[inv.ioc_type] = (
            distribution.get(inv.ioc_type, 0) + 1
        )

    return {
        "ioc_type_distribution": distribution,
        "total_investigations": len(investigations)
    }


@router.get("/recent-investigations")
def recent_investigations(db: Session = Depends(get_db)):
    investigations = (
        db.query(Investigation)
        .order_by(Investigation.created_at.desc())
        .limit(10)
        .all()
    )

    return {
        "recent_investigations": [
            {
                "id": inv.id,
                "ioc": inv.ioc,
                "ioc_type": inv.ioc_type,
                "source": inv.source,
                "pulse_count": inv.pulse_count,
                "reputation": inv.reputation,
                "risk_score": inv.risk_score,
                "created_at": inv.created_at.isoformat()
                if inv.created_at else None
            }
            for inv in investigations
        ]
    }
