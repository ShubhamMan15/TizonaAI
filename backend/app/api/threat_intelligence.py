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
            "type": "Hash",
            "threat": "Malware",
            "risk": "Critical",
            "source": "AlienVault OTX"
        },

        {
            "ioc": "185.220.101.5",
            "type": "IP",
            "threat": "Suspicious Activity",
            "risk": "High",
            "source": "AlienVault OTX"
        },

        {
            "ioc": "evil-domain.com",
            "type": "Domain",
            "threat": "Phishing",
            "risk": "Medium",
            "source": "URLHaus"
        }

    ]


@router.get("/threat-intelligence/feed-status")
def feed_status():

    return [

        {
            "name": "AlienVault OTX",
            "status": "Online"
        },

        {
            "name": "VirusTotal",
            "status": "Online"
        },

        {
            "name": "AbuseIPDB",
            "status": "Online"
        },

        {
            "name": "GreyNoise",
            "status": "Online"
        },

        {
            "name": "URLHaus",
            "status": "Online"
        }

    ]


@router.get("/threat-intelligence/campaigns")
def campaigns():

    return [

        {
            "name": "LockBit",
            "severity": "Critical"
        },

        {
            "name": "BlackCat",
            "severity": "High"
        },

        {
            "name": "QakBot",
            "severity": "Medium"
        },

        {
            "name": "Emotet",
            "severity": "High"
        }

    ]


@router.get("/threat-intelligence/mitre")
def mitre():

    return [

        {
            "id": "T1204",
            "name": "User Execution"
        },

        {
            "id": "T1105",
            "name": "Ingress Tool Transfer"
        },

        {
            "id": "T1059",
            "name": "Command and Scripting Interpreter"
        },

        {
            "id": "T1566",
            "name": "Phishing"
        }

    ]


@router.get("/threat-intelligence/countries")
def countries():

    return [

        {
            "country": "Russia",
            "threats": 98
        },

        {
            "country": "China",
            "threats": 86
        },

        {
            "country": "North Korea",
            "threats": 61
        },

        {
            "country": "Iran",
            "threats": 43
        },

        {
            "country": "United States",
            "threats": 28
        }

    ]
