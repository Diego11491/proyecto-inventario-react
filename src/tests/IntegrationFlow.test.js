// src/tests/IntegrationFlow.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App"; // App administra el enrutado internamente

describe("Flujo de autenticación e inventario", () => {
  test("Usuario ingresa credenciales correctas y se muestra Inventario", async () => {
    render(<App />);

    // Simula el ingreso de credenciales y clic en el botón Ingresar
    fireEvent.change(screen.getByPlaceholderText(/usuario/i), { target: { value: "admin" } });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), { target: { value: "1234" } });
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    // Espera que, tras un inicio exitoso, se renderice la pantalla de Inventario
    // Ajusta el matcher de texto de acuerdo al contenido renderizado.
    await waitFor(() => {
      expect(screen.getByText(/bienvenido al sistema de inventario/i)).toBeInTheDocument();
    });

    // Alternativamente, verifica el enlace:
    // await waitFor(() => {
    //   expect(screen.getByRole('link', { name: /ir al inventario/i })).toBeInTheDocument();
    // });
  });
});
