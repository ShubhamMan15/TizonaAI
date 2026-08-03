from sqlalchemy.orm import Session

from backend.app.models.investigation import Investigation


def save_investigation(db: Session, result: dict):
    investigation = Investigation(
        ioc=result.get("ioc"),
        ioc_type=result.get("type"),
        source=result.get("source"),
        pulse_count=result.get("pulse_count", 0),
    )

    db.add(investigation)
    db.commit()
    db.refresh(investigation)

    return investigation
