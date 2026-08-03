IP_REGEX = r"\b(?:\d{1,3}\.){3}\d{1,3}\b"

DOMAIN_REGEX = (
    r"\b(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\b"
)

MD5_REGEX = r"\b[a-fA-F0-9]{32}\b"

SHA1_REGEX = r"\b[a-fA-F0-9]{40}\b"

SHA256_REGEX = r"\b[a-fA-F0-9]{64}\b"
