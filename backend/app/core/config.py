from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "TizonaAI"
    APP_VERSION: str = "0.1.0"

    GITHUB_TOKEN: str = ""
    OTX_API_KEY: str = ""
    VT_API_KEY: str = ""
    ABUSEIPDB_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    OLLAMA_URL: str = "http://localhost:11434"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )


settings = Settings()
