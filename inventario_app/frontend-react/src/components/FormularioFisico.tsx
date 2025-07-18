import { useEffect, useState } from 'react';
import axios from 'axios';

interface ProductoFisico {
  id?: string;
  nombre: string;
  precio: number;
  stock: number;
  tipo: 'fisico';
}

interface Props {
  onProductoGuardado: () => void;
  productoEnEdicion: ProductoFisico | null;
  cancelarEdicion: () => void;
}

const FormularioFisico = ({ onProductoGuardado, productoEnEdicion, cancelarEdicion }: Props) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [esError, setEsError] = useState(false);

  useEffect(() => {
    if (productoEnEdicion?.tipo === 'fisico') {
      setNombre(productoEnEdicion.nombre);
      setPrecio(productoEnEdicion.precio?.toString() ?? '');
      setStock(productoEnEdicion.stock?.toString() ?? '');
    }
  }, [productoEnEdicion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setEsError(false);

    try {
      if (productoEnEdicion?.id) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/productos/${productoEnEdicion.id}`, {
          id: productoEnEdicion.id,
          nombre,
          precio: parseFloat(precio),
          stock: parseInt(stock),
          tipo: 'fisico',
        });
        setMensaje('✏️ Producto físico actualizado');
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/productos`, {
          nombre,
          precio: parseFloat(precio),
          stock: parseInt(stock),
          tipo: 'fisico',
        });
        setMensaje('✅ Producto físico agregado');
      }

      setNombre('');
      setPrecio('');
      setStock('');
      cancelarEdicion();
      onProductoGuardado();
    } catch (err: any) {
      console.error(err);
      const mensajeError = err.response?.data?.detail || '❌ Error al guardar producto físico';
      setMensaje(mensajeError);
      setEsError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-6 w-full max-w-xl space-y-4">
      <h2 className="text-xl font-bold text-gray-800">
        {productoEnEdicion ? '✏️ Editar producto físico' : '🛠️ Agregar producto físico'}
      </h2>

      <input
        type="text"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded"
      />

      <input
        type="number"
        placeholder="Precio (S/)"
        value={precio}
        onChange={e => setPrecio(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded"
      />

      <input
        type="number"
        placeholder="Stock disponible"
        value={stock}
        onChange={e => setStock(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 font-semibold"
        >
          {productoEnEdicion ? 'Actualizar' : 'Guardar'}
        </button>
        {productoEnEdicion && (
          <button
            type="button"
            onClick={cancelarEdicion}
            className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 font-semibold"
          >
            Cancelar
          </button>
        )}
      </div>

      {mensaje && (
        <p className={`text-sm ${esError ? 'text-red-600' : 'text-green-700'}`}>{mensaje}</p>
      )}
    </form>
  );
};

export default FormularioFisico;
