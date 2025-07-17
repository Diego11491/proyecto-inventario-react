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
    # 1. Configuración del Mock: ¿Qué debe devolver nuestra función simulada?
    mock_obtener_productos.return_value = [
        {"id": "1", "nombre": "Teclado Mecánico", "tipo": "fisico", "precio": 99.99, "stock": 50},
        {"id": "2", "nombre": "Licencia de Software", "tipo": "digital", "precio": 49.99, "licencia": "XYZ-123"}
    ]

    # 2. Ejecución: Hacemos la llamada a la API
    response = client.get("/productos")

    # 3. Verificación (Assertions)
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
    # 1. Configuración del Mock: No necesitamos que devuelva nada, solo que no falle.
    mock_supabase.table.return_value.insert.return_value.execute.return_value = MagicMock()

    # 2. Ejecución
    producto_fisico_data = {"nombre": "Mouse Gamer", "precio": 50, "stock": 100, "tipo": "fisico"}
    response = client.post("/productos", json=producto_fisico_data)

    # 3. Verificación
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
    # 1. Configuración del Mock para la verificación de existencia
    mock_select = MagicMock()
    mock_select.data = [{"id": "uuid-existente"}] # Simulamos que el producto existe
    mock_supabase.table.return_value.select.return_value.execute.return_value = mock_select
    
    # 2. Ejecución
    response = client.delete("/productos/uuid-existente")

    # 3. Verificación
    assert response.status_code == 200
    assert response.json() == {"mensaje": "Producto eliminado correctamente"}
    mock_supabase.table().delete.assert_called_once()


@patch("main.supabase")
def test_eliminar_producto_no_encontrado(mock_supabase):
    """
    Prueba que devuelve un error 404 si el producto a eliminar no existe.
    """
    # 1. Configuración del Mock: Simulamos que el producto NO existe
    mock_select = MagicMock()
    mock_select.data = [] # La lista de datos está vacía
    mock_supabase.table.return_value.select.return_value.execute.return_value = mock_select

    # 2. Ejecución
    response = client.delete("/productos/uuid-no-existente")

    # 3. Verificación
    assert response.status_code == 404
    assert response.json() == {"detail": "Producto no encontrado"}

