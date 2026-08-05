from datetime import datetime
from typing import Any

from pydantic import BaseModel


class InvestigationEventResponse(BaseModel):
    id: int
    investigation_id: int
    event_type: str
    description: str
    event_metadata: dict[str, Any] | None = None
    created_at: datetime

    class Config:
        from_attributes = True
