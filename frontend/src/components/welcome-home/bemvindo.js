import React from 'react';
import './style.css';
import imagem from '../../assets/home/imagem.png';

function BemVindo() {
  return (
    <div className="bemvindo-container">
      <div className="image-container">
        <img src={imagem} alt="Imagem de destaque" />
        <div className="text-overlay">
          <div className="container">
            <h1>SEJA BEM-VINDO AO ESPAÇO H BARBEARIA!</h1>
          </div>
          <div className="container2">
            <p>
              Mais que um corte. É atitude. Na nossa barbearia, você entra como
              cliente e sai como destaque. Corte, barba e estilo com quem
              entende do assunto. Seu visual merece o melhor.
            </p>
          </div>
          <button className="schedule-button">
           <a href="/Agendarservicos">Agendar horário</a>  <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BemVindo;