import re

from app.utils.regex_patterns import (
    DOMAIN_REGEX,
    IP_REGEX,
    MD5_REGEX,
    SHA1_REGEX,
    SHA256_REGEX,
)


def extract_iocs(text: str):
    ips = list(set(re.findall(IP_REGEX, text)))

    domains = list(set(re.findall(DOMAIN_REGEX, text)))

    hashes = list(
        set(
            re.findall(MD5_REGEX, text)
            + re.findall(SHA1_REGEX, text)
            + re.findall(SHA256_REGEX, text)
        )
    )

    return {
        "ips": ips,
        "domains": domains,
        "hashes": hashes,
    }
