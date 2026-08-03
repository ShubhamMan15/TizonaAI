from sqlalchemy.orm import Session

from backend.app.models.investigation import Investigation


def calculate_risk_score(result: dict) -> int:
    pulse_count = result.get("pulse_count", 0)

    if pulse_count >= 50:
        return 90

    if pulse_count >= 10:
        return 70

    if pulse_count > 0:
        return 40

    return 10


def determine_reputation(result: dict) -> str:
    pulse_count = result.get("pulse_count", 0)

    if pulse_count >= 10:
        return "suspicious"

    if pulse_count > 0:
        return "low-risk"

    return "unknown"


def save_investigation(db: Session, result: dict):

    investigation = Investigation(
        ioc=result.get("ioc"),
        ioc_type=result.get("type"),
        source=result.get("source"),
        pulse_count=result.get("pulse_count", 0),

        reputation=determine_reputation(result),

        risk_score=calculate_risk_score(result),

        raw_data=result,
    )

    db.add(investigation)
    db.commit()
    db.refresh(investigation)

    return investigation
