import httpx

from backend.app.core.config import settings


def get_ip_reputation(ip: str):
    url = f"https://otx.alienvault.com/api/v1/indicators/IPv4/{ip}/general"

    headers = {
        "X-OTX-API-KEY": settings.OTX_API_KEY
    }

    response = httpx.get(url, headers=headers, timeout=20)

    if response.status_code != 200:
        return {
            "error": f"OTX returned status {response.status_code}"
        }

    data = response.json()

    return {
        "ioc": ip,
        "type": "ip",
        "source": "AlienVault OTX",
        "pulse_count": data.get("pulse_info", {}).get("count", 0)
    }
