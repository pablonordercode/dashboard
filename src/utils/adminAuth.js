
//Função para verificar se o usuário está autenticado
function adminAuth() {
    try {
      const adminData = localStorage.getItem("adminData");
  
      if (adminData) {
        const parsedData = JSON.parse(adminData);
  
        if (parsedData && parsedData.nome && parsedData.email) {
          return true; 
        } else {
          return false; 
        }
      } else {
        return false; 
      }
    } catch (error) {
      console.error("Erro ao verificar dados no localStorage", error);
      return false; 
    }
  }
  
  export default adminAuth;
  