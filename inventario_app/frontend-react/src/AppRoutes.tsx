import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Confirmacion from './components/Confirmacion';
import Login from './components/Login';
import Registro from './components/Registro';
import App from './App';

function AppRoutes() {
  const handleLogin = (session: any) => {
    console.log('Usuario logueado con sesión:', session);
    // Aquí puedes agregar lógica adicional:
    // - Redirigir a otra página
    // - Guardar el estado del usuario
    // - Actualizar el contexto de autenticación
  };

  return (
    <Router>
      <Routes>
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;