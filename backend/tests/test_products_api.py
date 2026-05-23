import importlib
import os
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from fastapi.testclient import TestClient


class ProductApiTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp_dir = tempfile.TemporaryDirectory()
        self.db_path = Path(self.temp_dir.name) / "test_shop.db"
        self.database_url = f"sqlite:///{self.db_path}"

        self.env_patch = patch.dict(
            os.environ,
            {"DATABASE_URL": self.database_url},
            clear=True,
        )
        self.env_patch.start()

        database = importlib.import_module("app.database")
        models = importlib.import_module("app.models")
        schemas = importlib.import_module("app.schemas")
        main = importlib.import_module("app.main")

        importlib.reload(database)
        importlib.reload(models)
        importlib.reload(schemas)
        self.main = importlib.reload(main)

    def tearDown(self) -> None:
        self.env_patch.stop()
        self.temp_dir.cleanup()

    def test_startup_seeds_three_products(self) -> None:
        with TestClient(self.main.app) as client:
            response = client.get("/api/products")

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 3)
        self.assertEqual(
            [product["name"] for product in data],
            ["티셔츠", "청바지", "모자"],
        )

    def test_get_product_detail_returns_single_product(self) -> None:
        with TestClient(self.main.app) as client:
            list_response = client.get("/api/products")
            product_id = list_response.json()[0]["id"]
            detail_response = client.get(f"/api/products/{product_id}")

        self.assertEqual(detail_response.status_code, 200)
        self.assertEqual(detail_response.json()["id"], product_id)

    def test_get_product_detail_returns_404_for_missing_product(self) -> None:
        with TestClient(self.main.app) as client:
            response = client.get("/api/products/9999")

        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()["detail"], "Product not found.")


if __name__ == "__main__":
    unittest.main()
