"""FastAPI application entry point."""

from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import SessionLocal, engine, get_db
from app.models import Base, Product
from app.schemas import ProductResponse


SEED_PRODUCTS = [
    {
        "name": "티셔츠",
        "price": 30000,
        "description": "편하게 입기 좋은 기본 반팔 티셔츠입니다.",
        "image_url": "https://example.com/images/tshirt.jpg",
        "stock": 100,
    },
    {
        "name": "청바지",
        "price": 50000,
        "description": "데일리 코디에 잘 어울리는 클래식 청바지입니다.",
        "image_url": "https://example.com/images/jeans.jpg",
        "stock": 60,
    },
    {
        "name": "모자",
        "price": 20000,
        "description": "가볍게 착용하기 좋은 캐주얼 모자입니다.",
        "image_url": "https://example.com/images/cap.jpg",
        "stock": 80,
    },
]


def seed_products_if_empty() -> None:
    """Insert sample products once so the API has useful local test data."""
    db = SessionLocal()
    try:
        has_products = db.scalar(select(Product.id).limit(1))
        if has_products is not None:
            return

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
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
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
