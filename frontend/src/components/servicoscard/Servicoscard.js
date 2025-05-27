// src/components/ServiceCard.jsx
import React from 'react';
import { FaRegClock } from "react-icons/fa";
import './style.css'; // Import your CSS styles

const ServiceCard = ({ service, onSelect, selecionado }) => {
  return (
    <div className="service-card">
    <div className="service-conteudo">
    <div className="info nome">{service.nome}</div>
    <div className="info duracao"><FaRegClock /> {service.duracao} min</div>
    <div className="info preco">R$ {service.preco}</div>
  </div>
  <button
        onClick={() => onSelect(service)}
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

export default ServiceCard;
