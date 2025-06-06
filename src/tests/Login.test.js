// src/tests/Login.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../components/Login";

// Se crea un mock global para alert para evitar que se dispare realmente el alert en los tests.
global.alert = jest.fn();

describe("Componente Login", () => {
  beforeEach(() => {
    // Limpiamos los mocks antes de cada prueba.
    jest.clearAllMocks();
  });

  test("Renderiza correctamente el formulario de login", () => {
    render(<Login onLogin={jest.fn()} />);
    
    // Verifica que se rendericen los inputs a través de sus placeholders y el botón "Ingresar".
    expect(screen.getByPlaceholderText(/usuario/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ingresar/i })).toBeInTheDocument();
  });

  test("Invoca onLogin con credenciales correctas", () => {
    // Usamos un mock para onLogin y verificamos que se llame con los datos ingresados.
    const onLoginMock = jest.fn();
    render(<Login onLogin={onLoginMock} />);
    
    // Se simulan las entradas de datos válidas: "admin" y "1234".
    fireEvent.change(screen.getByPlaceholderText(/usuario/i), {
      target: { value: "admin" }
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: "1234" }
    });
    
    // Se simula el clic en el botón "Ingresar".
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));
    
    // Se espera que se llame a la función onLogin. Dependiendo de tu componente,
    // es posible que se llame pasando un objeto con { usuario, contraseña }.
    // Aquí se valida que se invoque al menos una vez.
    expect(onLoginMock).toHaveBeenCalled();

    // Si tu componente envía las credenciales en un objeto, podrías usar:
    // expect(onLoginMock).toHaveBeenCalledWith({
    //   usuario: "admin", 
    //   contraseña: "1234"
    // });
  });

  test("Muestra alerta con credenciales inválidas", () => {
    render(<Login onLogin={jest.fn()} />);
    
    // Se simulan las entradas de datos inválidas.
    fireEvent.change(screen.getByPlaceholderText(/usuario/i), {
      target: { value: "otroUsuario" }
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: "0000" }
    });
    
    // Se simula el clic en el botón "Ingresar".
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));
    
    // Se verifica que se llame a alert con el mensaje "Credenciales inválidas".
    expect(global.alert).toHaveBeenCalledWith("Credenciales inválidas");
  });
});
