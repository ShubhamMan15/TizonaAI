from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, JSON

from backend.app.db.database import Base


class Investigation(Base):
    __tablename__ = "investigations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    ioc = Column(
        String,
        index=True,
        nullable=False
    )

    ioc_type = Column(
        String,
        nullable=False
    )

    source = Column(
        String,
        nullable=False
    )

    pulse_count = Column(
        Integer,
        default=0
    )

    reputation = Column(
        String,
        default="unknown"
    )

    risk_score = Column(
        Integer,
        default=0
    )

    status = Column(
        String,
        default="new"
    )

    raw_data = Column(
        JSON,
        nullable=True
    )

    mitre_attack = Column(
        JSON,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
