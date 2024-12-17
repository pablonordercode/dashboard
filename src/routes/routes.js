import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AdminRegister from "../pages/AdminRegister";
import Login from "../pages/Login";
import AddPubli from "../pages/AddPubli";
import EditProduto from "../pages/EditarProdu";
import TabelaMensagens from "../pages/TabelaMensagens";
import UserDoSite from "../pages/UserDoSite";
import EditarPerfil from "../pages/EditarPerfil";
import ListarAdmins from "../pages/ListarAdmins";
import PrivateRoute from "../utils/rotaPrivadas";
import ProfilePage from "../pages/ProfilePage";

function RotesApp() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/registraAdmin" element={<AdminRegister />} />

        {/* Rotas privadas */}
        <Route
          path="/home"
          element={<PrivateRoute><Home /></PrivateRoute>}

        />
        <Route
          path="/editarperfil"
          element={<PrivateRoute><EditarPerfil /></PrivateRoute>}
        />
         <Route
          path="/meuperfiladm"
          element={<PrivateRoute><ProfilePage /></PrivateRoute>} 
        /> 
        <Route
          path="/adicionarproduto"
          element={<PrivateRoute><AddPubli /></PrivateRoute>}
        />
        <Route
          path="/editarprodutoid/:id"
          element={<PrivateRoute><EditProduto /></PrivateRoute>}
        />
        <Route
          path="/mensagemrecebidas"
          element={<PrivateRoute><TabelaMensagens /></PrivateRoute>}
        />
        <Route
          path="/usuariosDosite"
          element={<PrivateRoute><UserDoSite /></PrivateRoute>}
        />
        <Route
          path="/listaradmin"
          element={<PrivateRoute><ListarAdmins /></PrivateRoute>}
        />

        {/* Rota padrão: redireciona para login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RotesApp;
