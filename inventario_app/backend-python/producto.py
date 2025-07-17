from abc import ABC, abstractmethod


class ProductoBase(ABC):
    def __init__(self, id: str, nombre: str, precio: float):
        self.id = id
        self.nombre = nombre
        self.precio = precio

    @property
    @abstractmethod
    def tipo(self) -> str:
        pass

    def descripcion(self) -> str:
        return f"{self.nombre} - S/ {self.precio:.2f}"

    def __str__(self) -> str:
        return self.descripcion()


class ProductoFisico(ProductoBase):
    tipo = "fisico"

    def __init__(self, id: str, nombre: str, precio: float, stock: int):
        super().__init__(id, nombre, precio)
        self.stock = stock

    def descripcion(self) -> str:
        return f"[Hardware] {super().descripcion()} | Stock: {self.stock}"


class ProductoDigital(ProductoBase):
    tipo = "digital"

    def __init__(self, id: str, nombre: str, precio: float, licencia: str):
        super().__init__(id, nombre, precio)
        self.licencia = licencia

    def descripcion(self) -> str:
        return f"[Software] {super().descripcion()} | Licencia: {self.licencia}"
