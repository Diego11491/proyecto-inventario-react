// src/AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Confirmacion from './components/Confirmacion';
import Login from './components/Login';  // Tu componente de login
import Registro from './components/Registro';
import App from './App';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/login" element={<Login />} />
        {/* Otras rutas, por ejemplo, la de registro o la app principal */}
        <Route path="/registro" element={<Registro onRegistrado={() => {}} />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
