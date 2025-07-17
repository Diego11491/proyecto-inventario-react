from supabase import create_client, Client
import os

# 🚫 Evitá dejar claves expuestas en el código. Usá variables de entorno:
url = os.getenv("SUPABASE_URL", "https://gzwdnjmgcokkagxahazu.supabase.co")
key = os.getenv("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6d2Ruam1nY29ra2FneGFoYXp1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDM5MDMyOSwiZXhwIjoyMDY1OTY2MzI5fQ.QdusUmT7oQvmbOZ-NU_gwdYUQaJCWmsntErvQQRKLIk")
supabase: Client = create_client(url, key)

# Re-probando el workflow con Python 3.11


def obtener_productos(tipo: str = None, orden: str = None, nombre: str = None):
    query = supabase.table("productos").select("*")

    if tipo in ["fisico", "digital"]:
        query = query.eq("tipo", tipo)

    if nombre:
        # 🔍 búsqueda parcial por texto
        query = query.ilike("nombre", f"%{nombre}%")

    # Ordenamiento corregido usando desc
    if orden == "nombre_asc":
        query = query.order("nombre", desc=False)
    elif orden == "nombre_desc":
        query = query.order("nombre", desc=True)
    elif orden == "precio_asc":
        query = query.order("precio", desc=False)
    elif orden == "precio_desc":
        query = query.order("precio", desc=True)
    elif orden == "stock_bajo" and tipo == "fisico":
        query = query.order("stock", desc=False)
    elif orden == "stock_alto" and tipo == "fisico":
        query = query.order("stock", desc=True)

    return query.execute().data
