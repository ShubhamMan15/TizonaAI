from fastapi import APIRouter

router = APIRouter()


@router.get("/mitre/techniques")
def techniques():

    return [

        {
            "id": "T1566",
            "name": "Phishing",
            "tactic": "Initial Access",
            "severity": "High"
        },

        {
            "id": "T1059",
            "name": "Command and Scripting Interpreter",
            "tactic": "Execution",
            "severity": "Critical"
        },

        {
            "id": "T1105",
            "name": "Ingress Tool Transfer",
            "tactic": "Command and Control",
            "severity": "Medium"
        },

        {
            "id": "T1204",
            "name": "User Execution",
            "tactic": "Execution",
            "severity": "High"
        }

    ]


@router.get("/mitre/tactics")
def tactics():

    return [

        {
            "name": "Initial Access",
            "techniques": 12
        },

        {
            "name": "Execution",
            "techniques": 18
        },

        {
            "name": "Persistence",
            "techniques": 14
        },

        {
            "name": "Privilege Escalation",
            "techniques": 10
        },

        {
            "name": "Defense Evasion",
            "techniques": 23
        }

    ]


@router.get("/mitre/groups")
def groups():

    return [

        {
            "name": "APT29",
            "country": "Russia"
        },

        {
            "name": "Lazarus Group",
            "country": "North Korea"
        },

        {
            "name": "APT41",
            "country": "China"
        }

    ]
