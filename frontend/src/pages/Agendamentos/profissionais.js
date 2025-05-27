import React, { useState, useEffect } from 'react';
import AgendamentoHeader from '../../components/agendamento/agendamento'; 
import api from '../../services/api';
import ProfissionalCard from '../../components/profissionalcard/Profissionalcard';
import './profissionais.css';

function Agendarprofissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const [profissionaisSelecionados, setProfissionaisSelecionados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api.get('/profissionais/profissionais')
      .then(res => {
      console.log("Profissionais:", res.data); // <--- VERIFIQUE AQUI
      setProfissionais(res.data);
    })
      .catch(err => console.error("Erro ao buscar profissionais:", err));
  }, []);

  const handleSelect = (profissional) => {
    const jaSelecionado = profissionaisSelecionados.some(p => p._id === profissional._id);

    if (jaSelecionado) {
      setProfissionaisSelecionados(
        profissionaisSelecionados.filter(p => p._id !== profissional._id)
      );
    } else {
      setProfissionaisSelecionados([...profissionaisSelecionados, profissional]);
    }
  };

  const filteredProfissionais = profissionais.filter((profissional) =>
  profissional.nome?.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <>
      <AgendamentoHeader onSearchChange={setSearchTerm} />

      {filteredProfissionais.length === 0 ? (
        <p style={{ color: 'white', textAlign: 'center' }}>Nenhum profissional encontrado.</p>
      ) : (
        filteredProfissionais.map(profissional => (
          <ProfissionalCard
            key={profissional._id}
            profissional={profissional}
            onSelect={handleSelect}
            selecionado={profissionaisSelecionados.some(p => p._id === profissional._id)}
          />
        ))
      )}

      <div className='botoes'>
        <button><a href="/Agendarservicos">Voltar</a></button>
        <button><a href="/Agendar">Próximo</a></button>
      </div>
    </>
  );
}

export default Agendarprofissionais;
