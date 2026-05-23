"""Database engine and session configuration."""

import importlib.util
import os
from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker


def _get_postgres_driver() -> str:
    """Choose an installed PostgreSQL driver that SQLAlchemy can use."""
    if importlib.util.find_spec("psycopg"):
        return "postgresql+psycopg://"

    if importlib.util.find_spec("psycopg2"):
        return "postgresql+psycopg2://"

    # Fall back to psycopg naming because this project installs psycopg v3.
    return "postgresql+psycopg://"


def _normalize_database_url(database_url: str) -> str:
    """Normalize PostgreSQL URLs so Railway-style values work without edits."""
    if database_url.startswith(("postgresql+psycopg://", "postgresql+psycopg2://")):
        return database_url

    if database_url.startswith("postgres://"):
        return database_url.replace("postgres://", _get_postgres_driver(), 1)

    if database_url.startswith("postgresql://"):
        return database_url.replace("postgresql://", _get_postgres_driver(), 1)

    return database_url


def _build_database_url() -> str:
    """Return the configured database URL or fall back to local SQLite."""
    database_url = os.getenv("DATABASE_URL", "sqlite:///./shop.db")
    return _normalize_database_url(database_url)


SQLALCHEMY_DATABASE_URL = _build_database_url()
IS_SQLITE = SQLALCHEMY_DATABASE_URL.startswith("sqlite")
ENGINE_OPTIONS = {"connect_args": {"check_same_thread": False}} if IS_SQLITE else {}

engine = create_engine(SQLALCHEMY_DATABASE_URL, **ENGINE_OPTIONS)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator[Session, None, None]:
    """Provide a database session per request and always close it safely."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
