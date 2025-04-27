import { useState } from "react";

const Inventario = () => {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Manzanas", cantidad: 10 },
    { id: 2, nombre: "Naranjas", cantidad: 5 },
  ]);

  const [nuevoProducto, setNuevoProducto] = useState("");
  const [nuevaCantidad, setNuevaCantidad] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  const agregarProducto = () => {
    if (nuevoProducto && nuevaCantidad) {
      const nuevo = {
        id: Date.now(),
        nombre: nuevoProducto,
        cantidad: parseInt(nuevaCantidad),
      };
      setProductos([...productos, nuevo]);
      limpiarFormulario();
    }
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  const editarProducto = (producto) => {
    setModoEdicion(true);
    setProductoEditando(producto);
    setNuevoProducto(producto.nombre);
    setNuevaCantidad(producto.cantidad);
  };

  const guardarEdicion = () => {
    setProductos(
      productos.map((p) =>
        p.id === productoEditando.id
          ? { ...p, nombre: nuevoProducto, cantidad: parseInt(nuevaCantidad) }
          : p
      )
    );
    limpiarFormulario();
    setModoEdicion(false);
    setProductoEditando(null);
  };

  const limpiarFormulario = () => {
    setNuevoProducto("");
    setNuevaCantidad("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Inventario</h2>

      <ul>
        {productos.map((prod) => (
          <li key={prod.id}>
            {prod.nombre} - {prod.cantidad} unidades
            <button onClick={() => editarProducto(prod)} style={{ marginLeft: "10px" }}>
              Editar
            </button>
            <button onClick={() => eliminarProducto(prod.id)} style={{ marginLeft: "5px" }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nuevoProducto}
          onChange={(e) => setNuevoProducto(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={nuevaCantidad}
          onChange={(e) => setNuevaCantidad(e.target.value)}
        />
        {modoEdicion ? (
          <button onClick={guardarEdicion}>Guardar cambios</button>
        ) : (
          <button onClick={agregarProducto}>Agregar</button>
        )}
      </div>
    </div>
  );
};

export default Inventario;
