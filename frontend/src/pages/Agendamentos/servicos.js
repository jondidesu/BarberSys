import React, { useState, useEffect } from 'react';
import AgendamentoHeader from '../../components/agendamento/agendamento'; 
import api from '../../services/api';
import ServiceCard from '../../components/servicoscard/Servicoscard';
import './servicos.css'; // Importando o CSS para estilização

function Agendarservicos() {
  const [servicos, setServicos] = useState([]);
  const [servicosSelecionados, setServicosSelecionados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api.get('/servicos')
      .then(res => setServicos(res.data))
      .catch(err => console.error("Erro ao buscar serviços:", err));
  }, []);

  const handleSelect = (servico) => {
    const jaSelecionado = servicosSelecionados.some(s => s._id === servico._id);

    if (jaSelecionado) {
      setServicosSelecionados(servicosSelecionados.filter(s => s._id !== servico._id));
    } else {
      setServicosSelecionados([...servicosSelecionados, servico]);
    }
  };

  const filteredServicos = servicos.filter((servico) =>
    servico.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AgendamentoHeader onSearchChange={setSearchTerm} />

      {filteredServicos.length === 0 ? (
        <p style={{ color: 'white', textAlign: 'center' }}>Nenhum serviço encontrado.</p>
      ) : (
        filteredServicos.map(servico => (
          <ServiceCard
            key={servico._id}
            service={servico}
            onSelect={handleSelect}
            selecionado={servicosSelecionados.some(s => s._id === servico._id)}
          />
        ))
      )}

      <div className='botoes'>
        <button><a href="/">Voltar</a></button>
        <button><a href="/Agendarprofissionais">Próximo</a></button>
      </div>
    </>
  );
}

export default Agendarservicos;
