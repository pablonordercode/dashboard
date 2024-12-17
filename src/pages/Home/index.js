import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcFullTrash } from "react-icons/fc";
import { AiTwotoneEdit } from "react-icons/ai";
import api from '../../services/api';
import Header from '../../components/Header';
import "../Home/home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const decodifica = JSON.parse(atob(token.split('.')[1]));
        const tempoDeExpiracao = decodifica.exp * 1000;
        if (Date.now() >= tempoDeExpiracao) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    verifyToken();

    const loadProdutos = async () => {
      try {
        const response = await api.get(`/produtos/buscarAllProdutos`);
        setPosts(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos", error);
      }
    };

    loadProdutos();
  }, [navigate]); 

  // deletar um produto
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/produtos/dellproduto/${id}`);
      if (response.status === 200) {
        alert("Produto excluído com sucesso!");
        setPosts(posts.filter(post => post._id !== id));
      }
    } catch (error) {
      alert("Erro ao excluir o produto.");
    }
  };

  return (
    <section>
      <Header />
      <div>
        <h1>Dashboard</h1>
        <p>Veja os detalhes de cada um deles</p>
      </div>

      <div>
        {posts.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Título</th>
                <th>Descrição</th>
                <th>Estoque</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>
                    <img
                      src={`http://localhost:7001/uploads/${post.image}`}
                      alt={post.titulo}
                    />
                  </td>
                  <td>{post.titulo.length > 60
                    ? `${post.titulo.slice(0, 40)}...`
                    : post.titulo}
                  </td>

                  <td>{post.descricao.length > 100
                    ? `${post.descricao.slice(0, 60)}...`
                    : post.descricao}
                  </td>
                  <td>{post.quantidade}</td>
                  <td>{post.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td>
                    <Link onClick={() => handleDelete(post._id)}>
                    <FcFullTrash />
                    </Link>
                    <Link to={`/editarprodutoid/${post._id}`}>
                    <AiTwotoneEdit />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Não há postagens cadastradas ou disponíveis no momento!</p>
        )}
      </div>
    </section>
  );
}

export default Home;
