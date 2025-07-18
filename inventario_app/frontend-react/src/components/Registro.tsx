// src/components/Registro.tsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';


function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [linkEnviado, setLinkEnviado] = useState(false);

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');

    // Registro utilizando Supabase Magic Link y almacenando datos adicionales.
    // Se especifica emailRedirectTo apuntando al frontend en el puerto 5173.
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
          phone,
        },
        emailRedirectTo: import.meta.env.VITE_FRONTEND_REDIRECT,
      },
    });

    if (error) {
      setMensaje(error.message);
    } else {
      setMensaje('¡Registro exitoso!');
      setLinkEnviado(true);
      // Se ha removido la llamada a onRegistrado() para evitar redirección automática.
      // Si deseas ejecutar lógica adicional, podés hacerlo acá.
      // onRegistrado && onRegistrado();
    }
  };

  if (linkEnviado) {
    return (
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
        <p className="mb-4 text-green-600 font-semibold">
          Hemos enviado un enlace de verificación a tu correo.
        </p>
        <p className="text-gray-700">
          Por favor, revisa tu bandeja de entrada y sigue las instrucciones para confirmar tu cuenta.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Si no encuentras el correo, verifica también la carpeta de spam.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleRegistro} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
      {mensaje && <p className="mb-2 text-center text-red-500">{mensaje}</p>}

      <div className="mb-4">
        <label className="block text-gray-700">Nombre</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Tu nombre"
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Apellido</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Tu apellido"
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Número de celular</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Tu número de celular"
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>

      <button type="submit" className="bg-indigo-600 text-white w-full px-4 py-2 rounded hover:bg-indigo-700">
        Registrarme
      </button>
    </form>
  );
}

export default Registro;
