import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Bienvenido al sistema de inventario</h1>
      <Link to="/inventario">Ir al Inventario</Link>
    </div>
  );
};

export default Home;
