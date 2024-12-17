import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import './adicionarProduto.css';
import Header from '../../components/Header';

function AddPubli() {
  const [file, setFile] = useState();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [fichatecnica, setFichatecnica] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [quantidade, setQuantidade] = useState(""); 

  const navigate = useNavigate();

  const submit = async (event) => {
  event.preventDefault();
  try {
    const addProduto = new FormData();
    addProduto.append("titulo", titulo);
    addProduto.append("descricao", descricao);
    addProduto.append("fichatecnica", fichatecnica);
    addProduto.append("preco", preco);
    addProduto.append("categoria", categoria);
    addProduto.append("quantidade", quantidade);
    addProduto.append("image", file);

    const response = await api.post('/produtos/postproduto', addProduto, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log("Produto enviado com sucesso:", response.data);

    navigate("/home");
  } catch (error) {

    if (error.response) {
      console.error("Erro no servidor:", error.response.data);
      alert(`Erro: ${error.response.data.message || 'Falha ao enviar o produto.'}`);
    } else if (error.request) {
      console.error("Nenhuma resposta recebida do servidor:", error.request);
      alert("Erro: Não foi possível conectar ao servidor.");
    } else {
      console.error("Erro ao configurar a requisição:", error.message);
      alert("Erro: Algo deu errado. Tente novamente.");
    }
  }
};

  return (
    <div className="post-container">
      <Header/>
      <div className='form__cont'>
      <form onSubmit={submit}>

        <div className='conteudo__show'>
        <label>Título</label>
        <input
          className='text-titulo'
          onChange={(e) => setTitulo(e.target.value)}
          type="text"
          required
        />

        <label>Descrição</label>
        <input
          className='text-descricao'
          onChange={(e) => setDescricao(e.target.value)}
          type="text"
          required
        />

        <label>Ficha técnica</label>
        <input
          className='text-area'
          onChange={(e) => setFichatecnica(e.target.value)}
          type="text"
          required
        />

        <label>Preço</label>
        <input
          className='text-area'
          onChange={(e) => setPreco(e.target.value)}
          type="number"
          required
        />

        <label>Categoria</label>
        <select
          className='select-categoria'
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option value="" disabled>Selecione uma categoria</option>
          <option value="celulares">Celulares</option>
          <option value="acessorios">Acessórios</option>
        </select>

        <label>Quantidade em Estoque</label>
        <input
          className='text-area'
          onChange={(e) => setQuantidade(e.target.value)}
          type="number"
          min="0"
          required
        />

        <label>Imagem</label>
        <input
          filename={file}
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept="image/*"
          required
        />

        <button type="submit">Enviar</button>
        </div>
        
      </form>
      </div>

    </div>
  );
}

export default AddPubli;
