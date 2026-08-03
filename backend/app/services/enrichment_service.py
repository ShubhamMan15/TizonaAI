import ipaddress
import re

from backend.app.services.otx_service import (
    get_ip_reputation,
    get_domain_reputation,
)


def detect_ioc_type(ioc: str) -> str:
    try:
        ipaddress.ip_address(ioc)
        return "ip"
    except ValueError:
        pass

    if re.fullmatch(r"(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}", ioc):
        return "domain"

    if re.fullmatch(r"[a-fA-F0-9]{32}", ioc):
        return "md5"

    if re.fullmatch(r"[a-fA-F0-9]{40}", ioc):
        return "sha1"

    if re.fullmatch(r"[a-fA-F0-9]{64}", ioc):
        return "sha256"

    return "unknown"


def enrich_ioc(ioc: str):
    ioc_type = detect_ioc_type(ioc)

    if ioc_type == "ip":
        return get_ip_reputation(ioc)

    if ioc_type == "domain":
        return get_domain_reputation(ioc)

    return {
        "ioc": ioc,
        "type": ioc_type,
        "source": "mock",
        "reputation": "unknown",
        "pulse_count": 0
    }
