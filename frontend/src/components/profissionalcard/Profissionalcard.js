
import React from 'react';
import './style.css'; // Import your CSS styles

const ProfissionalCard = ({ profissional, onSelect, selecionado }) => {
  return (
    <div className="service-card">
    <div className="service-conteudo">
    <div className="info nome">{profissional.nome}</div>
  </div>
  <button
        onClick={() => onSelect(profissional)}
        style={{
          backgroundColor: selecionado ? 'orange' : '#D9D9D9',
          color: selecionado ? 'white' : 'black',
        }}
      >
        {selecionado ? 'Selecionado' : 'Selecionar'}
      </button>
</div>

  );
};

export default ProfissionalCard;
