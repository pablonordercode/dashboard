import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./AdminRegister.css";
import api from "../../services/api";
import { Link } from "react-router-dom";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/admin/adicionaradmim", formData);
      setMessage("Admin registrado com sucesso!");
      setTimeout(() => navigate("/"), 2000); 
    } catch (error) {
      setMessage(error.response?.data?.message || "Erro ao registrar o admin.");
    }
  };

  return (
    <div className="admin-register">
      <h2>Registro de Administrador</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-nome">
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Apelido"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-email">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-pass">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="*******"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-registrar">
          Registrar
        </button>
        <p>Já tenho conta!</p>
        <Link className="btn-login-001" to="/">
          Login
        </Link>
      </form>
    </div>
  );
};

export default AdminRegister;
