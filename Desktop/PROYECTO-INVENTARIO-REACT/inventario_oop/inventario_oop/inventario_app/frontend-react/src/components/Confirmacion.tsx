// src/components/Confirmacion.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Confirmacion() {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('Procesando confirmación...');

  useEffect(() => {
    const confirmarSesion = async () => {
      // Limpia el hash de la URL para evitar que se vea el token
      window.history.replaceState(null, '', window.location.pathname);

      // Verificamos si la sesión está activa
      const { data, error } = await supabase.auth.getSession();

      if (data.session?.user) {
        console.log("✅ Usuario confirmado:", data.session.user);
        setMensaje(`✅ Registro exitoso para: ${data.session.user.email}`);
      } else {
        console.log("❌ Sesión no activa");
        setMensaje("❌ No se pudo confirmar tu cuenta. Asegúrate de abrir el enlace en el navegador correcto.");
      }
    };

    confirmarSesion();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
        <p className="mb-4 text-green-600 font-semibold text-xl">
          {mensaje}
        </p>
        <p className="mb-4 text-gray-700">
          Ya puedes continuar e iniciar sesión en tu cuenta.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}

export default Confirmacion;
