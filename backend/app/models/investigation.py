from sqlalchemy import Column, Integer, String

from backend.app.db.database import Base


class Investigation(Base):
    __tablename__ = "investigations"

    id = Column(Integer, primary_key=True, index=True)

    ioc = Column(String, index=True)
    ioc_type = Column(String)

    source = Column(String)

    pulse_count = Column(Integer)
