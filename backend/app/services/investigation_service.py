from sqlalchemy.orm import Session

from backend.app.models.investigation import Investigation
from backend.app.services.mitre_service import get_mitre_mapping


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

    ioc = result.get("ioc")
    ioc_type = result.get("type")

    mitre_mapping = get_mitre_mapping(ioc_type)

    risk_score = calculate_risk_score(result)
    reputation = determine_reputation(result)

    existing = (
        db.query(Investigation)
        .filter(
            Investigation.ioc == ioc
        )
        .first()
    )

    if existing:

        existing.source = result.get("source")

        existing.ioc_type = ioc_type

        existing.pulse_count = result.get(
            "pulse_count",
            0
        )

        existing.reputation = reputation

        existing.risk_score = risk_score

        existing.status = "new"

        existing.raw_data = result

        existing.mitre_attack = mitre_mapping

        db.commit()

        db.refresh(existing)

        return existing


    investigation = Investigation(

        ioc=ioc,

        ioc_type=ioc_type,

        source=result.get("source"),

        pulse_count=result.get(
            "pulse_count",
            0
        ),

        reputation=reputation,

        risk_score=risk_score,

        status="new",

        raw_data=result,

        mitre_attack=mitre_mapping
    )


    db.add(investigation)

    db.commit()

    db.refresh(investigation)

    return investigation
