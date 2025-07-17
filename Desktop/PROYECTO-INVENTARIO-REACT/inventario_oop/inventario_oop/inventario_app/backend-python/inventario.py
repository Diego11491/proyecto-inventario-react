class Inventario:
    def __init__(self):
        self.productos = []

    def agregar_producto(self, producto):
        existente = self.buscar(producto.id)
        if existente:
            raise ValueError("Ya existe un producto con ese ID")
        self.productos.append(producto)

    def eliminar_producto(self, id):
        self.productos = [p for p in self.productos if p.id != id]

    def listar(self):
        return self.productos

    def buscar(self, id):
        return next((p for p in self.productos if p.id == id), None)

    def filtrar_por_tipo(self, tipo):
        return [p for p in self.productos if getattr(p, "tipo", None) == tipo]
