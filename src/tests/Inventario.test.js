// src/tests/Inventario.test.js
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Inventario from "../pages/Inventario";

// Se hace mock del módulo supabaseClient para controlar las respuestas de Supabase durante los tests.
jest.mock("../supabaseClient", () => {
  // Función mock para simular la respuesta de .select() que se encadena después de .insert()
  const selectAfterInsertFn = jest.fn().mockResolvedValue({
    data: [{ id: 2, nombre: "Producto 2", cantidad: 10 }],
    error: null,
  });

  // Mocks para la lectura de datos inicial
  const selectFn = jest.fn().mockReturnThis();
  const orderFn = jest.fn().mockResolvedValue({
    data: [{ id: 1, nombre: "Producto 1", cantidad: 5 }],
    error: null,
  });
  
  // Ahora, insertFn devuelve un objeto que tiene el método select para encadenar la llamada
  const insertFn = jest.fn().mockReturnValue({
    select: selectAfterInsertFn,
  });
  
  const deleteFn = jest.fn().mockResolvedValue({ error: null });
  const updateFn = jest.fn().mockResolvedValue({ error: null });
  const matchFn = jest.fn().mockReturnThis();

  return {
    supabase: {
      from: jest.fn(() => ({
        select: selectFn,
        order: orderFn,
        insert: insertFn,
        delete: deleteFn,
        update: updateFn,
        match: matchFn,
      })),
    },
  };
});

describe("Componente Inventario", () => {
  test("Muestra mensaje de carga y luego renderiza la lista de productos", async () => {
    render(<Inventario />);

    // Al inicio debe mostrarse el mensaje de carga.
    expect(screen.getByText(/cargando inventario/i)).toBeInTheDocument();

    // Se espera a que la carga finalice y se renderice la sección principal.
    await waitFor(() => {
      expect(screen.getByText(/inventario de productos/i)).toBeInTheDocument();
      // Se verifica que el producto dummy se renderice.
      expect(screen.getByText(/producto 1/i)).toBeInTheDocument();
    });
  });

  test("Permite agregar un producto", async () => {
    render(<Inventario />);

    // Espera a que la lista de productos se cargue.
    await waitFor(() => {
      expect(screen.getByText(/inventario de productos/i)).toBeInTheDocument();
    });

    // Completa el formulario para agregar un nuevo producto.
    fireEvent.change(screen.getByPlaceholderText(/nombre del producto/i), {
      target: { value: "Producto 2" },
    });
    fireEvent.change(screen.getByPlaceholderText(/cantidad/i), {
      target: { value: "10" },
    });

    // Se hace clic en el botón, que en modo creación muestra "Agregar producto".
    fireEvent.click(screen.getByRole("button", { name: /agregar producto/i }));

    // Espera a que el nuevo producto se renderice en la lista.
    await waitFor(() => {
      expect(screen.getByText(/producto 2/i)).toBeInTheDocument();
    });
  });
});
