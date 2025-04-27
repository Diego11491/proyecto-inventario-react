import { useState } from "react";

const Login = ({ onLogin }) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    if (user === "admin" && pass === "1234") {
      onLogin();
    } else {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Iniciar sesión</h3>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Usuario"
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              <button onClick={handleLogin} className="btn btn-primary w-100">
                Ingresar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
