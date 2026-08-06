from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship

from app.db.database import Base


class InvestigationEvent(Base):

    __tablename__ = "investigation_events"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    investigation_id = Column(
        Integer,
        ForeignKey("investigations.id"),
        nullable=False
    )

    event_type = Column(
        String,
        nullable=False
    )

    description = Column(
        String,
        nullable=False
    )

    event_metadata = Column(
        JSON,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    investigation = relationship(
        "Investigation",
        back_populates="events"
    )
