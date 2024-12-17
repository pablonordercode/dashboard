import React, { useState, useEffect } from "react";
import "./TabelaMensagens.css";
import api from "../../services/api";
import Header from "../../components/Header";

const TabelaMensagens = () => {
    const [mensagens, setMensagens] = useState([]);

    // vai buscar mensagens do backend
    const fetchMensagens = async () => {
        try {
            const response = await api.get("/msg/vermensagemrecebida");
            setMensagens(response.data);
        } catch (error) {
            console.error("Erro ao buscar mensagens:", error);
        }
    };

    useEffect(() => {
        fetchMensagens();
    }, []);

    return (

        <div className="tabela-mensagens-container">
            <Header />
            <h1>Mensagens Recebidas</h1>
            <table className="tabela-mensagens">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Celular</th>
                        <th>Email</th>
                        <th>Mensagem</th>
                    </tr>
                </thead>
                <tbody>
                    {mensagens.length > 0 ? (
                        mensagens.map((msg) => (
                            <tr key={msg._id}>
                                <td>{msg.nome}</td>
                                <td>{msg.celular}</td>
                                <td>{msg.email}</td>
                                <td>{msg.mensagem}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="no-data">
                                Nenhuma mensagem encontrada
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TabelaMensagens;
