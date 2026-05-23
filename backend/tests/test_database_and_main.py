import importlib
import os
import unittest
from unittest.mock import patch

from fastapi.testclient import TestClient


class DatabaseConfigTests(unittest.TestCase):
    def test_uses_sqlite_by_default(self) -> None:
        with patch.dict(os.environ, {}, clear=True):
            database = importlib.import_module("app.database")
            importlib.reload(database)

            self.assertEqual(database.SQLALCHEMY_DATABASE_URL, "sqlite:///./shop.db")
            self.assertEqual(database.ENGINE_OPTIONS, {"connect_args": {"check_same_thread": False}})

    def test_uses_database_url_when_provided(self) -> None:
        with patch.dict(
            os.environ,
            {"DATABASE_URL": "postgres://user:pass@localhost:5432/shop"},
            clear=True,
        ):
            database = importlib.import_module("app.database")
            importlib.reload(database)

            self.assertEqual(
                database.SQLALCHEMY_DATABASE_URL,
                "postgresql+psycopg://user:pass@localhost:5432/shop",
            )


class MainAppTests(unittest.TestCase):
    def test_root_endpoint_returns_health_message(self) -> None:
        main = importlib.import_module("app.main")
        importlib.reload(main)

        client = TestClient(main.app)
        response = client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Shopping Mall API is running."})


if __name__ == "__main__":
    unittest.main()
