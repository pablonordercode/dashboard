import React, { useState, useEffect } from 'react';
import { FcFaq, FcUpload, FcShop, FcDebt } from "react-icons/fc";
import { IoMdExit } from "react-icons/io"
import { FcBusinessman } from "react-icons/fc";
import { GiMedallist } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import imgLogo from "../Header/logoAcell-png.png";

const Header = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      const parseDados = JSON.parse(adminData);
      setUserName(parseDados.nome || "Usuário");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminData"); 
    setUserName(""); 
    navigate("/"); 
  };

  return (
    <header className="header">
      <div className="logo">
        <img className="logoimg" src={imgLogo} alt="Logo" />
      </div>
      <nav className="nav-menu">
        <div className="header__icons">
          {userName ? (
            <span className="header__username">Bem-vindo, {userName}!</span>
          ) : (
            <Link className="header_login" to="/login">Login</Link>
          )}
          <div className="header_sair" >
          {userName && (
            <button  onClick={handleLogout}><IoMdExit /></button>
          )}
          </div>

        </div>

        <Link to="/home" className="nav-item">
          <FcShop className="icon" /> Home
        </Link>
        <Link to="/adicionarproduto" className="nav-item">
          <FcUpload className="icon" /> Add Produto
        </Link>
        <Link to="/mensagemrecebidas" className="nav-item">
          <FcFaq className="icon" /> Mensagens
        </Link>
        <Link to="/usuariosDosite" className="nav-item">
          <FcDebt className="icon" /> Usuários
        </Link>
        <Link to="/listaradmin" className="nav-item">
          <GiMedallist className="icon" /> Administradores
        </Link>
        <Link to="/meuperfiladm" className="nav-item">
          <FcBusinessman  className="icon" /> Perfil
        </Link>
      </nav>
    </header>
  );
};

export default Header;
