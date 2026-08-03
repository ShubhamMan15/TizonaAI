from pydantic import BaseModel


class IOCExtractRequest(BaseModel):
    text: str
