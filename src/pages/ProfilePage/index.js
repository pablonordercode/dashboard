import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import "./profilePage.css";
import api from "../../services/api";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState({
    nome: "",
    email: "",
  });

  const [editMode, setEditMode] = useState(false);

  // Carrega os dados do admin logado ao montar o componente
  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      const parseDados = JSON.parse(adminData);
      setUser({ nome: parseDados.nome || "Usuário", email: parseDados.email || "" });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = async () => {
    try {
          await api.put("/admin/editaradm", user,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        }
      );
      console.log("Dados salvos com sucesso!");
      setEditMode(false);
    } catch (error) {
      console.error("Erro ao salvar os dados do administrador:", error);
    }
  };

  return (
    <div className="profile-container">
      <Header />
      <div className="profile-card">
        <h2>Perfil do Administrador</h2>
        <div className="profile-fi">
          <label>Nome:</label>
          {editMode ? (
            <input
              type="text"
              name="nome"
              value={user.nome}
              onChange={handleInputChange}
            />
          ) : (
            <p>{user.nome}</p>
          )}
        </div>
        <div className="profile-fi">
          <label>Email:</label>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>
        <div className="profile-actions">
          {editMode ? (
            <>
              <button className="btn-save" onClick={handleSave}>
                Salvar
              </button>
              <button className="btn-cancel" onClick={() => setEditMode(false)}>
                Cancelar
              </button>
            </>
          ) : (
            <Link to="/editarperfil" className="btn__editar__perfil">Editar Perfil</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
