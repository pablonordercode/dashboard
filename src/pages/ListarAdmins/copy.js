import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./listarAdmins.css";
import Header from "../../components/Header";

const ListarAdmins = () => {

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await api.get('/admin/buscartodosadmin');
        setAdmins(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar usuários');
        setLoading(false);
      }
    };

    loadUsers();
  }, []);


//   Deletar usuário
  const handleDelete = async (id) => {
      if (window.confirm('Tem certeza que deseja excluir este admin?')) {
        try {
          const response = await api.delete(`/admin/deletaradmin/${id}`);
          if (response.status === 200) {
            // Atualizar a lista de posts após a exclusão
            setAdmins((prevPosts) => prevPosts.filter(user => user._id !== id));
            setSuccessMessage('Admin excluído com sucesso!');
          } else {
            setError('Falha ao excluir o admin');
          }
        } catch (err) {
          setError('Erro ao tentar excluir o Admin');
        }
      }
    };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }


  return (
    <div className="table-container">
      <Header />
      <h1>Lista de Administradores</h1>
      {successMessage && <div className="success">{successMessage}</div>}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            {/* <th>Editar</th> */}
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>

          {admins.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              {/* <td>
                <Link to={`/editarUsers/${user._id}`}><button className='btn-edit01'>Editar</button></Link>

              </td> */}
              <td>
                <button className='btn-delet01' onClick={() => handleDelete(user._id)}>Apagar</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarAdmins;
