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
    <div className="container my-5">
      <h2 className="text-center mb-4">Inventario de Productos</h2>

      <div className="row">
        {productos.map((prod) => (
          <div key={prod.id} className="col-md-4 mb-3">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{prod.nombre}</h5>
                <p className="card-text">Cantidad: {prod.cantidad} unidades</p>
                <div className="d-flex justify-content-between">
                  <button onClick={() => editarProducto(prod)} className="btn btn-warning btn-sm">
                    Editar
                  </button>
                  <button onClick={() => eliminarProducto(prod.id)} className="btn btn-danger btn-sm">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-5 p-4 shadow">
        <h4 className="card-title text-center mb-3">
          {modoEdicion ? "Editar Producto" : "Agregar Nuevo Producto"}
        </h4>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre del producto"
            value={nuevoProducto}
            onChange={(e) => setNuevoProducto(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Cantidad"
            value={nuevaCantidad}
            onChange={(e) => setNuevaCantidad(e.target.value)}
          />
        </div>
        <button
          onClick={modoEdicion ? guardarEdicion : agregarProducto}
          className={`btn ${modoEdicion ? "btn-success" : "btn-primary"} w-100`}
        >
          {modoEdicion ? "Guardar cambios" : "Agregar producto"}
        </button>
      </div>
    </div>
  );
};

export default Inventario;
