from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str
    echo_sql: bool = True
    test: bool = False
    project_name: str = "ochako-backend"
    log_level: str = "DEBUG"


settings = Settings()  # type: ignore