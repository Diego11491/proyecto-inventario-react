# inventario_app/backend-python/test_app.py
import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock

# Importamos la 'app' desde tu archivo principal
from main import app

# Creamos un cliente de prueba para nuestra app FastAPI
client = TestClient(app)


# --- Pruebas para GET /productos ---

@patch("main.obtener_productos")  # Simulamos la función que llama a Supabase
def test_listar_productos_exitoso(mock_obtener_productos):
    """
    Prueba que el endpoint /productos funciona correctamente cuando hay datos.
    """
    mock_obtener_productos.return_value = [
        {"id": "1", "nombre": "Teclado Mecánico", "tipo": "fisico", "precio": 99.99, "stock": 50},
        {"id": "2", "nombre": "Licencia de Software", "tipo": "digital", "precio": 49.99, "licencia": "XYZ-123"}
    ]
    response = client.get("/productos")
    assert response.status_code == 200
    assert response.json() == [
        {"id": "1", "nombre": "Teclado Mecánico", "tipo": "fisico", "precio": 99.99, "stock": 50},
        {"id": "2", "nombre": "Licencia de Software", "tipo": "digital", "precio": 49.99, "licencia": "XYZ-123"}
    ]
    mock_obtener_productos.assert_called_once_with(tipo=None, orden=None, nombre=None)


# --- Pruebas para POST /productos ---

@patch("main.supabase") # Simulamos todo el cliente de Supabase
def test_agregar_producto_fisico_exitoso(mock_supabase):
    """
    Prueba que se puede agregar un producto físico correctamente.
    """
    mock_supabase.table.return_value.insert.return_value.execute.return_value = MagicMock()
    producto_fisico_data = {"nombre": "Mouse Gamer", "precio": 50, "stock": 100, "tipo": "fisico"}
    response = client.post("/productos", json=producto_fisico_data)
    assert response.status_code == 200
    assert response.json() == {"mensaje": "Producto agregado correctamente"}
    mock_supabase.table.assert_called_with("productos")
    mock_supabase.table().insert.assert_called_once_with(producto_fisico_data)


@patch("main.supabase")
def test_agregar_producto_tipo_invalido(mock_supabase):
    """
    Prueba que la API devuelve un error 400 si el tipo de producto es inválido.
    """
    producto_invalido = {"nombre": "Producto Raro", "precio": 10, "tipo": "invalido"}
    response = client.post("/productos", json=producto_invalido)
    assert response.status_code == 400
    assert response.json() == {"detail": "Tipo de producto inválido"}


# --- Pruebas para DELETE /productos/{id} ---

@patch("main.supabase")
def test_eliminar_producto_exitoso(mock_supabase):
    """
    Prueba que se puede eliminar un producto existente.
    """
    mock_select = MagicMock()
    mock_select.data = [{"id": "uuid-existente"}]
    mock_supabase.table.return_value.select.return_value.execute.return_value = mock_select
    response = client.delete("/productos/uuid-existente")
    assert response.status_code == 200
    assert response.json() == {"mensaje": "Producto eliminado correctamente"}
    mock_supabase.table().delete.assert_called_once()




