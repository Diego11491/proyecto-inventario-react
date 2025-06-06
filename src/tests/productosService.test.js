// src/tests/productosService.test.js
import { obtenerProductos, agregarProducto } from "../services/productosService";

// Hacemos mock de supabaseClient
jest.mock("../supabaseClient", () => {
  // Para la lectura de productos
  const selectFn = jest.fn().mockResolvedValue({
    data: [{ id: 1, nombre: "Producto 1", cantidad: 5 }],
    error: null,
  });
  // Para la cadena insert().select() exitosa
  const selectAfterInsertFn = jest.fn().mockResolvedValue({
    data: [{ id: 2, nombre: "Producto 2", cantidad: 10 }],
    error: null,
  });
  // insert retorna un objeto con la función select
  const insertFn = jest.fn().mockReturnValue({
    select: selectAfterInsertFn,
  });

  return {
    supabase: {
      from: jest.fn().mockReturnValue({
        select: selectFn,
        insert: insertFn,
      }),
    },
  };
});

describe("productosService", () => {
  test("obtenerProductos devuelve la lista de productos", async () => {
    const productos = await obtenerProductos();
    expect(productos).toEqual([{ id: 1, nombre: "Producto 1", cantidad: 5 }]);
  });

  test("agregarProducto devuelve el nuevo producto agregado", async () => {
    const nuevoProducto = { nombre: "Producto 2", cantidad: 10 };
    const productos = await agregarProducto(nuevoProducto);
    expect(productos).toEqual([{ id: 2, nombre: "Producto 2", cantidad: 10 }]);
  });

  test("agregarProducto lanza error si supabase retorna un error", async () => {
    const { supabase } = require("../supabaseClient");
    // Aquí sobrescribimos el mock para que insert().select() retorne un error.
    supabase.from.mockReturnValueOnce({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({
          data: null,
          error: { message: "Error al agregar" },
        }),
      }),
    });
    
    const nuevoProducto = { nombre: "Producto 3", cantidad: 20 };
    await expect(agregarProducto(nuevoProducto)).rejects.toEqual({ message: "Error al agregar" });
  });
});
