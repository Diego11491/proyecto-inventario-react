// src/AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// La importación de Confirmacion ha sido eliminada
import Login from './components/Login';
import Registro from './components/Registro';
import App from './App';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* La ruta de /confirmacion ha sido eliminada */}
        <Route path="/login" element={<Login onLogin={() => {}} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
