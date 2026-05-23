"""Pydantic schemas used by the product API."""

from pydantic import BaseModel, ConfigDict


class ProductBase(BaseModel):
    """Shared product fields used across request and response models."""

    name: str
    price: int
    description: str
    image_url: str
    stock: int


class ProductCreate(ProductBase):
    """Schema used when creating a new product."""


class ProductResponse(ProductBase):
    """Schema returned to API clients for product data."""

    id: int

    model_config = ConfigDict(from_attributes=True)
