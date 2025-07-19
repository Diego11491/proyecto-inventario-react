from fastapi import FastAPI, HTTPException, Query, Path
from fastapi.middleware.cors import CORSMiddleware
from schemas.producto import ProductoFisicoIn, ProductoDigitalIn, ProductoUpdate
from supabase_client import supabase
from inventario_supabase import obtener_productos

app = FastAPI()

#  Permitir conexión desde el frontend local
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "http://localhost:5173",
    "http://3.145.72.16:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🟢 Listar productos con filtros opcionales y búsqueda por nombre


@app.get("/productos")
def listar_productos(
    tipo: str = Query(default=None),
    orden: str = Query(default=None),
    nombre: str = Query(default=None)  # 🔍 nuevo parámetro de búsqueda
):
    productos = obtener_productos(tipo=tipo, orden=orden, nombre=nombre)
    return productos

# 🟢 Agregar producto


@app.post("/productos")
def agregar_producto(prod: dict):
    if prod["tipo"] == "digital":
        data = {
            "nombre": prod["nombre"],
            "precio": prod["precio"],
            "licencia": prod["licencia"],
            "tipo": "digital"
        }
    elif prod["tipo"] == "fisico":
        data = {
            "nombre": prod["nombre"],
            "precio": prod["precio"],
            "stock": prod["stock"],
            "tipo": "fisico"
        }
    else:
        raise HTTPException(400, detail="Tipo de producto inválido")

    supabase.table("productos").insert(data).execute()
    return {"mensaje": "Producto agregado correctamente"}

# 🟡 Actualizar producto


@app.put("/productos/{id}")
def actualizar_producto(id: str, prod: ProductoUpdate):
    existente = supabase.table("productos").select("*").eq("id", id).execute()
    if not existente.data:
        raise HTTPException(404, detail="Producto no encontrado")

    data = prod.dict()
    if data["tipo"] == "digital":
        data["stock"] = None
    elif data["tipo"] == "fisico":
        data["licencia"] = None

    supabase.table("productos").update(data).eq("id", id).execute()
    return {"mensaje": "Producto actualizado correctamente"}

# 🔴 Eliminar producto


@app.delete("/productos/{id}")
def eliminar_producto(id: str):
    existente = supabase.table("productos").select("id").eq("id", id).execute()
    if not existente.data:
        raise HTTPException(404, detail="Producto no encontrado")

    supabase.table("productos").delete().eq("id", id).execute()
    return {"mensaje": "Producto eliminado correctamente"}
