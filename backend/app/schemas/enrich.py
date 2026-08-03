from pydantic import BaseModel


class EnrichmentRequest(BaseModel):
    ioc: str
