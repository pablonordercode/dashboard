import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("http://localhost:7001/admin/loginadmin", { email, password });

      if (response.status === 200) {
        // Armazena o token no localStorage
        const { token, admin } = response.data;
        localStorage.setItem("token", token); // Armazena o token JWT
        localStorage.setItem("adminData", JSON.stringify(admin)); // Armazena dados do admin (exceto senha)

        setSuccess("Login realizado com sucesso! Redirecionando...");
        setTimeout(() => navigate("/home"), 2000);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.msg);
      } else {
        setError("Erro ao conectar ao servidor.");
      }
    }
  };

  return (
    <div className="container">
      <h2>Login Admin</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
        <p>Ainda não tem conta?</p>
        <Link className="btn-cadast" to="/registraAdmin">Cadastre-se</Link>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default Login;
