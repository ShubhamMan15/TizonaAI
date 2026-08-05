from fastapi import APIRouter


router = APIRouter()


@router.get("/threat-intelligence/summary")
def threat_summary():

    return {

        "malicious_iocs": 342,

        "active_campaigns": 12,

        "malware_families": 8,

        "threat_actors": 5

    }



@router.get("/threat-intelligence/latest")
def latest_threats():

    return [

        {
            "ioc": "44d88612fea8a8f36de82e1278abb02f",

            "type": "hash",

            "threat": "Malware",

            "risk": "Critical",

            "source": "AlienVault OTX"
        },

        {
            "ioc": "185.220.101.5",

            "type": "ip",

            "threat": "Suspicious Activity",

            "risk": "High",

            "source": "AlienVault OTX"
        }

    ]
