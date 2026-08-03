from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.db.session import get_db
from backend.app.models.investigation import Investigation

router = APIRouter()


@router.get("/investigations")
def get_investigations(db: Session = Depends(get_db)):
    investigations = db.query(Investigation).all()

    return [
        {
            "id": item.id,
            "ioc": item.ioc,
            "ioc_type": item.ioc_type,
            "source": item.source,
            "pulse_count": item.pulse_count,
        }
        for item in investigations
    ]
