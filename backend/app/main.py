"""FastAPI application entry point."""

import os
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import SessionLocal, engine, get_db
from app.models import Base, Product
from app.schemas import ProductResponse


def _build_cors_origins() -> list[str]:
    """Return local and deployed frontend origins allowed to call the API."""
    default_origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://blissful-flow-production-8ffb.up.railway.app",
    ]
    configured_origins = os.getenv("FRONTEND_URLS", "")

    if not configured_origins.strip():
        return default_origins

    extra_origins = [
        origin.strip().rstrip("/")
        for origin in configured_origins.split(",")
        if origin.strip()
    ]
    return list(dict.fromkeys(default_origins + extra_origins))


SEED_PRODUCTS = [
    {
        "name": "Atelier Tote 32",
        "price": 890000,
        "description": "가볍게 흐르는 실루엣과 단정한 구조를 함께 담아, 일상에 자연스럽게 스며드는 수제 레더 토트백입니다.",
        "image_url": "https://example.com/images/atelier-tote-32.jpg",
        "stock": 10,
    },
    {
        "name": "Heritage Handbag",
        "price": 1240000,
        "description": "손에 쥐었을 때의 균형감과 곡선의 흐름이 아름다운, 차분한 존재감의 수제 핸드백입니다.",
        "image_url": "https://example.com/images/heritage-handbag.jpg",
        "stock": 7,
    },
    {
        "name": "Signature Wallet",
        "price": 460000,
        "description": "손에 편안하게 감기고 가장자리 마감이 돋보이는, 오래 사용할수록 깊이가 더해지는 컴팩트 월렛입니다.",
        "image_url": "https://example.com/images/signature-wallet.jpg",
        "stock": 16,
    },
]


def seed_products_if_empty() -> None:
    """Insert sample products once so the API has useful local test data."""
    db = SessionLocal()
    try:
        products = db.scalars(select(Product).order_by(Product.id)).all()
        if not products:
            db.add_all([Product(**product_data) for product_data in SEED_PRODUCTS])
            db.commit()
            return

        legacy_product_names = {"티셔츠", "청바지", "모자"}
        existing_names = {product.name for product in products}
        previous_demo_names = {"Atelier Tote", "Signature Wallet", "Saddle Belt"}

        # Replace early apparel demo data with leather-goods demo data so the
        # local storefront keeps matching the current product direction.
        if existing_names == legacy_product_names or existing_names == previous_demo_names:
            for product in products:
                db.delete(product)

            db.flush()
            db.add_all([Product(**product_data) for product_data in SEED_PRODUCTS])
            db.commit()
    finally:
        db.close()


@asynccontextmanager
async def lifespan(_: FastAPI):
    """Create database tables when the application starts."""
    Base.metadata.create_all(bind=engine)
    seed_products_if_empty()
    yield


app = FastAPI(
    title="Shopping Mall API",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=_build_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root() -> dict[str, str]:
    """Basic health-check endpoint for local development and deployment."""
    return {"message": "Shopping Mall API is running."}


@app.get("/api/products", response_model=list[ProductResponse])
def list_products(db: Session = Depends(get_db)) -> list[Product]:
    """Return all products for the storefront product listing page."""
    products = db.scalars(select(Product).order_by(Product.id)).all()
    return list(products)


@app.get("/api/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)) -> Product:
    """Return one product by id or raise 404 when it does not exist."""
    product = db.get(Product, product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found.")

    return product
