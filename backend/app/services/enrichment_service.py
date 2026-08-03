import ipaddress
import re


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
    return {
        "ioc": ioc,
        "type": detect_ioc_type(ioc),
        "source": "mock",
        "reputation": "unknown",
        "pulse_count": 0
    }
