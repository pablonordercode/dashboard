import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import api from '../../services/api';
import "./editarProduto.css"
import Header from '../../components/Header';

function EditarProdu() {
  const [file, setFile] = useState();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [fichatecnica, setFichatecnica] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    loadProduto();
  }, []);

  const loadProduto = async () => {
    try {
      const response = await api.get(`/produtos/buscarpeloId/${id}`);
      const { titulo, descricao, fichatecnica, preco, categoria, image } = response.data;
      setTitulo(titulo);
      setDescricao(descricao);
      setFichatecnica(fichatecnica);
      setPreco(preco);
      setCategoria(categoria);
      setFile(image); 
    } catch (error) {
      console.error("Erro ao carregar produto:", error);
    }
  };

  const submit = async (event) => {
    event.preventDefault();

    const editProduto = new FormData();
    editProduto.append("titulo", titulo);
    editProduto.append("descricao", descricao);
    editProduto.append("fichatecnica", fichatecnica);
    editProduto.append("preco", preco);
    editProduto.append("categoria", categoria);

    if (file instanceof File) {
      editProduto.append("image", file); 
    }

    try {
      await api.patch(`/produtos/editeproduto/${id}`, editProduto, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert("Produto atualizado com sucesso!");
      navigate("/home");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao atualizar o produto. Tente novamente.");
    }
  };

  return (
    <div className="post-container">
      <Header />
      <form onSubmit={submit}>
        <h1>Editar Produto</h1>
        
        <label>Título</label>
        <input
          className='text-titulo'
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          type="text"
          required
        />

        <label>Descrição</label>
        <textarea
          className='text-descricao'
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />

        <label>Ficha Técnica</label>
        <textarea
          className='text-area'
          value={fichatecnica}
          onChange={(e) => setFichatecnica(e.target.value)}
          required
        />

        <label>Preço</label>
        <input
          className='text-area'
          value={preco}
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

        <label>Imagem</label>
        <input
          filename={file}
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept="image/*"
        />
        {file && !(file instanceof File) && (
          <img
            src={`http://localhost:7001/uploads/${file}`}
            alt="Produto"
            className="preview-image"
          />
        )}

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditarProdu;
