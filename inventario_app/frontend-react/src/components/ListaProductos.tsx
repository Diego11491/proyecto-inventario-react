import axios from 'axios';

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  stock?: number;
  licencia?: string;
  tipo: 'fisico' | 'digital';
}

interface Props {
  productos: Producto[];
  onEliminarProducto: () => void;
  onEditar: (producto: Producto) => void;
}

const ListaProductos = ({ productos, onEliminarProducto, onEditar }: Props) => {
  const eliminar = async (id: string) => {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/productos/${id}`);
      onEliminarProducto();
    } catch {
      alert("❌ No se pudo eliminar el producto");
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">📋 Productos</h2>
      <p className="text-sm text-gray-600 mb-4">
        Mostrando {productos.length} producto{productos.length !== 1 && 's'} filtrado{productos.length !== 1 && 's'}
      </p>

      {productos.length === 0 ? (
        <p className="text-gray-600">No hay productos registrados.</p>
      ) : (
        <table className="w-full text-sm border text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Información</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{p.nombre}</td>
                <td className="px-4 py-2">S/ {p.precio.toFixed(2)}</td>
                <td className="px-4 py-2">
                  {p.tipo === 'fisico' && (
                    <>
                      📦 Stock: {p.stock}
                      {p.stock !== undefined && p.stock < 5 && (
                        <span className="text-red-500 font-semibold ml-2">🔥 Bajo stock</span>
                      )}
                    </>
                  )}
                  {p.tipo === 'digital' && (
                    <>🔑 Licencia: {p.licencia}</>
                  )}
                </td>
                <td className="px-4 py-2 flex gap-3">
                  <button
                    onClick={() => onEditar(p)}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold"
                  >
                    🖊️ Editar
                  </button>
                  <button
                    onClick={() => eliminar(p.id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaProductos;
