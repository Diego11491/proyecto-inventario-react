import { useEffect, useState } from 'react';
import axios from 'axios';

interface ProductoDigital {
  id?: string;
  nombre: string;
  precio: number;
  licencia: string;
  tipo: 'digital';
}

interface Props {
  onProductoGuardado: () => void;
  productoEnEdicion: ProductoDigital | null;
  cancelarEdicion: () => void;
}

const FormularioDigital = ({ onProductoGuardado, productoEnEdicion, cancelarEdicion }: Props) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [licencia, setLicencia] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [esError, setEsError] = useState(false);

  useEffect(() => {
    if (productoEnEdicion?.tipo === 'digital') {
      setNombre(productoEnEdicion.nombre);
      setPrecio(productoEnEdicion.precio?.toString() ?? '');
      setLicencia(productoEnEdicion.licencia);
    }
  }, [productoEnEdicion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setEsError(false);

    try {
      if (productoEnEdicion?.id) {
        await axios.put(`http://localhost:8000/productos/${productoEnEdicion.id}`, {
          id: productoEnEdicion.id,
          nombre,
          precio: parseFloat(precio),
          licencia,
          tipo: 'digital',
        });
        setMensaje('✏️ Producto digital actualizado');
      } else {
        await axios.post('http://localhost:8000/productos', {
          nombre,
          precio: parseFloat(precio),
          licencia,
          tipo: 'digital',
        });
        setMensaje('✅ Producto digital agregado');
      }

      setNombre('');
      setPrecio('');
      setLicencia('');
      cancelarEdicion();
      onProductoGuardado();
    } catch (err: any) {
      console.error(err);
      const mensajeError = err.response?.data?.detail || '❌ Error al guardar producto digital';
      setMensaje(mensajeError);
      setEsError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-6 w-full max-w-xl space-y-4">
      <h2 className="text-xl font-bold text-gray-800">
        {productoEnEdicion ? '✏️ Editar producto digital' : '💻 Agregar producto digital'}
      </h2>

      <input
        type="text"
        placeholder="Nombre del software o licencia"
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
        type="text"
        placeholder="Licencia o código de activación"
        value={licencia}
        onChange={e => setLicencia(e.target.value)}
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

export default FormularioDigital;
