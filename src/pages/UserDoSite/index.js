import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./UserTable.css";
import Header from "../../components/Header";

const UserDoSite = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [successMessage] = useState('');
                    // , setSuccessMessage

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await api.get('/usuario/todosUsuarios');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar usuários');
        setLoading(false);
      }
    };

    loadUsers();
  }, []);


  // Deletar usuário
  // const handleDelete = async (id) => {
  //     if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
  //       try {
  //         const response = await api.delete(`/usuario/deletar/${id}`);
  //         if (response.status === 200) {
  //           // Atualizar a lista de posts após a exclusão
  //           setUsers((prevPosts) => prevPosts.filter(user => user._id !== id));
  //           setSuccessMessage('Usuário excluído com sucesso!');
  //         } else {
  //           setError('Falha ao excluir o usuário');
  //         }
  //       } catch (err) {
  //         setError('Erro ao tentar excluir o usuário');
  //       }
  //     }
  //   };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }


  return (
    <div className="table-container">
      <Header />
      <h1>Lista de Usuários</h1>
      {successMessage && <div className="success">{successMessage}</div>}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Avatar</th>
            <th>Nome</th>
            <th>Celular</th>
            <th>Email</th>
            {/* <th>Editar</th>
            <th>Deletar</th> */}
          </tr>
        </thead>
        <tbody>

          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>
                <img src={`http://localhost:7001/uploads/${user.avatar}`} alt={user.nome} className="avatar" />
              </td>
              <td>{user.nome}</td>
              <td>{user.celular}</td>
              <td>{user.email}</td>
              {/* <td>
                <Link to={`/editarUsers/${user._id}`}><button className='btn-edit01'>Editar</button></Link>

              </td>
              <td>
                <button className='btn-delet01' onClick={() => handleDelete(user._id)}>Apagar</button>

              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDoSite;
