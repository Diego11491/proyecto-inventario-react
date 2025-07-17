from pydantic import BaseModel
from typing import Optional


class ProductoFisicoIn(BaseModel):
    nombre: str
    precio: float
    stock: int


class ProductoDigitalIn(BaseModel):
    nombre: str
    precio: float
    licencia: str


class ProductoUpdate(BaseModel):
    nombre: str
    precio: float
    tipo: str  # 'fisico' o 'digital'
    stock: Optional[int] = None
    licencia: Optional[str] = None
