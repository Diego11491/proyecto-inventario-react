import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

import Login from './components/Login';
import Registro from './components/Registro';
import FormularioFisico from './components/FormularioFisico';
import FormularioDigital from './components/FormularioDigital';
import ListaProductos from './components/ListaProductos';
import axios from 'axios';

type ProductoFisico = {
  tipo: 'fisico';
  id: string;
  nombre: string;
  precio: number;
  stock: number;
};

type ProductoDigital = {
  tipo: 'digital';
  id: string;
  nombre: string;
  precio: number;
  licencia: string;
};

type Producto = ProductoFisico | ProductoDigital;

function App() {
  const [usuario, setUsuario] = useState<any>(null);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [tipoProducto, setTipoProducto] = useState<'fisico' | 'digital'>('fisico');
  const [productoEnEdicion, setProductoEnEdicion] = useState<Producto | null>(null);

  // 🔍 Filtros y búsqueda
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [orden, setOrden] = useState('');
  const [nombreBusqueda, setNombreBusqueda] = useState(''); // 🔎 nuevo estado

  const cargarProductos = async () => {
    try {
      const res = await axios.get('http://localhost:8000/productos', {
        params: {
          tipo: tipoFiltro || undefined,
          orden: orden || undefined,
          nombre: nombreBusqueda || undefined, // ✅ búsqueda textual
        },
      });
      const productosConTipo: Producto[] = res.data.map((p: any) =>
        p.tipo === 'fisico' ? { ...p } as ProductoFisico : { ...p } as ProductoDigital
      );
      setProductos(productosConTipo);
    } catch (err) {
      console.error('Error al cargar productos:', err);
    }
  };

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUsuario(session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (usuario) {
      cargarProductos();
    }
  }, [usuario]);

  return !usuario ? (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      {mostrarRegistro ? (
        <>
          <Registro onRegistrado={() => setMostrarRegistro(false)} />
          <div className="text-center mt-4">
            <button onClick={() => setMostrarRegistro(false)} className="text-indigo-600 hover:underline">
              ¿Ya tenés cuenta? Iniciá sesión
            </button>
          </div>
        </>
      ) : (
        <>
          <Login onLogin={(session) => setUsuario(session?.user ?? null)} />
          <div className="text-center mt-4">
            <button onClick={() => setMostrarRegistro(true)} className="text-indigo-600 hover:underline">
              ¿No tenés cuenta? Regístrate acá
            </button>
          </div>
        </>
      )}
    </div>
  ) : (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center gap-8">
      {/* 🔝 Header */}
      <header className="flex w-full justify-between max-w-5xl items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">🧮 Inventario</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">
            {usuario.user_metadata?.firstName || ''} {usuario.user_metadata?.lastName || ''}
          </span>
          <button onClick={cerrarSesion} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 font-semibold">
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* 🔎 Filtros y búsqueda */}
      <div className="flex flex-wrap gap-4 items-center max-w-5xl w-full">
        <select value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)} className="border px-3 py-2 rounded">
          <option value="">Todos los tipos</option>
          <option value="fisico">Físico</option>
          <option value="digital">Digital</option>
        </select>

        {tipoFiltro === 'fisico' && (
          <select value={orden} onChange={(e) => setOrden(e.target.value)} className="border px-3 py-2 rounded">
            <option value="">Sin orden</option>
            <option value="stock_bajo">Stock bajo primero</option>
            <option value="stock_alto">Stock alto primero</option>
            <option value="precio_asc">Precio ascendente</option>
            <option value="precio_desc">Precio descendente</option>
          </select>
        )}

        {tipoFiltro === 'digital' && (
          <select value={orden} onChange={(e) => setOrden(e.target.value)} className="border px-3 py-2 rounded">
            <option value="">Sin orden</option>
            <option value="nombre_asc">Nombre A-Z</option>
            <option value="nombre_desc">Nombre Z-A</option>
            <option value="precio_asc">Precio ascendente</option>
            <option value="precio_desc">Precio descendente</option>
          </select>
        )}

        <input
          type="text"
          placeholder="Buscar por nombre 🔍"
          value={nombreBusqueda}
          onChange={(e) => setNombreBusqueda(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <button
          onClick={cargarProductos}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 font-semibold"
        >
          Aplicar Filtros
        </button>
      </div>

      {/* 🧩 Botones para elegir tipo de producto */}
      <div className="flex gap-4">
        <button
          onClick={() => {
            setTipoProducto('fisico');
            setProductoEnEdicion(null);
          }}
          className={`px-4 py-2 rounded-lg font-semibold ${
            tipoProducto === 'fisico' ? 'bg-indigo-600 text-white' : 'bg-white border'
          }`}
        >
          Producto Físico
        </button>
        <button
          onClick={() => {
            setTipoProducto('digital');
            setProductoEnEdicion(null);
          }}
          className={`px-4 py-2 rounded-lg font-semibold ${
            tipoProducto === 'digital' ? 'bg-indigo-600 text-white' : 'bg-white border'
          }`}
        >
          Producto Digital
        </button>
      </div>

      {/* ✍️ Formulario según tipo */}
      {tipoProducto === 'fisico' ? (
        <FormularioFisico
          onProductoGuardado={cargarProductos}
          productoEnEdicion={productoEnEdicion as ProductoFisico | null}
          cancelarEdicion={() => setProductoEnEdicion(null)}
        />
      ) : (
        <FormularioDigital
          onProductoGuardado={cargarProductos}
          productoEnEdicion={productoEnEdicion as ProductoDigital | null}
          cancelarEdicion={() => setProductoEnEdicion(null)}
        />
      )}

      {/* 📋 Lista */}
      <ListaProductos
        productos={productos}
        onEliminarProducto={cargarProductos}
        onEditar={(producto) => {
          setProductoEnEdicion(producto);
          setTipoProducto(producto.tipo);
        }}
      />
    </div>
  );
}

export default App;
