from typing import Any

from sqlalchemy.orm import Session

from app.models.investigation import Investigation
from app.models.investigation_event import InvestigationEvent
from app.services.mitre_service import get_mitre_mapping


def calculate_risk_score(result: dict) -> int:
    """Calculate investigation risk score based on pulse count."""

    pulse_count = result.get("pulse_count", 0)

    if pulse_count >= 50:
        return 90

    if pulse_count >= 10:
        return 70

    if pulse_count > 0:
        return 40

    return 10


def determine_reputation(result: dict) -> str:
    """Determine IOC reputation."""

    pulse_count = result.get("pulse_count", 0)

    if pulse_count >= 10:
        return "suspicious"

    if pulse_count > 0:
        return "low-risk"

    return "unknown"


def add_investigation_event(
    db: Session,
    investigation_id: int,
    event_type: str,
    description: str,
    metadata: dict[str, Any] | None = None,
) -> None:
    """Create and persist an investigation timeline event."""

    event = InvestigationEvent(
        investigation_id=investigation_id,
        event_type=event_type,
        description=description,
        event_metadata=metadata,
    )

    db.add(event)
    db.commit()


def save_investigation(db: Session, result: dict) -> Investigation:
    """
    Create a new investigation or update an existing one.
    A timeline event is automatically created for every create/update.
    """

    ioc = result.get("ioc")
    ioc_type = result.get("type")

    mitre_mapping = get_mitre_mapping(ioc_type)

    risk_score = calculate_risk_score(result)
    reputation = determine_reputation(result)

    existing = (
        db.query(Investigation)
        .filter(Investigation.ioc == ioc)
        .first()
    )

    if existing:

        existing.source = result.get("source")
        existing.ioc_type = ioc_type
        existing.pulse_count = result.get("pulse_count", 0)
        existing.reputation = reputation
        existing.risk_score = risk_score
        existing.status = "new"
        existing.raw_data = result
        existing.mitre_attack = mitre_mapping

        db.commit()
        db.refresh(existing)

        add_investigation_event(
            db=db,
            investigation_id=existing.id,
            event_type="investigation_updated",
            description="Existing investigation updated with new enrichment data",
            metadata={
                "risk_score": risk_score,
                "pulse_count": result.get("pulse_count", 0),
            },
        )

        return existing

    investigation = Investigation(
        ioc=ioc,
        ioc_type=ioc_type,
        source=result.get("source"),
        pulse_count=result.get("pulse_count", 0),
        reputation=reputation,
        risk_score=risk_score,
        status="new",
        raw_data=result,
        mitre_attack=mitre_mapping,
    )

    db.add(investigation)
    db.commit()
    db.refresh(investigation)

    add_investigation_event(
        db=db,
        investigation_id=investigation.id,
        event_type="investigation_created",
        description="New investigation created",
        metadata={
            "risk_score": risk_score,
            "pulse_count": result.get("pulse_count", 0),
        },
    )

    return investigation


def get_investigation_events(
    db: Session,
    investigation_id: int,
) -> list[InvestigationEvent]:
    """
    Return all timeline events for an investigation ordered chronologically.
    """

    return (
        db.query(InvestigationEvent)
        .filter(
            InvestigationEvent.investigation_id == investigation_id
        )
        .order_by(
            InvestigationEvent.created_at.asc()
        )
        .all()
    )
