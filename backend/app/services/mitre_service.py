import json
import os


BASE_DIR = os.path.dirname(
    os.path.dirname(__file__)
)

MITRE_FILE = os.path.join(
    BASE_DIR,
    "data",
    "mitre_mapping.json"
)


def get_mitre_mapping(ioc_type: str):

    if not os.path.exists(MITRE_FILE):
        return []

    with open(MITRE_FILE, "r") as file:
        data = json.load(file)

    return data.get(ioc_type, [])
