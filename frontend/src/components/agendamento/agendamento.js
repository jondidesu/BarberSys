import React from 'react';
import './style.css';
import { IoSearchOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';


function AgendamentoHeader({ onSearchChange }) {
  return (
  <>
    <div className="agendamento-header">
        <h1>AGENDAMENTO</h1>
        <h3>Preencha todos os dados para realizar o seu agendamento!</h3>

        <ul>
        <li><NavLink to="/Agendarservicos"  className={({ isActive }) => isActive ? "link active" : "link"}>SERVIÇOS</NavLink></li>
        <li><NavLink to="/Agendarprofissionais"  className={({ isActive }) => isActive ? "link active" : "link"}>PROFISSIONAIS</NavLink></li>
        <li><NavLink to="/Agendar"  className={({ isActive }) => isActive ? "link active" : "link"}>AGENDAR</NavLink></li>
        </ul>

        <div className='search-bar'>
             <IoSearchOutline className="search-icon" />
            <input type="text" placeholder="Pesquisar" 
            onChange={(e) => onSearchChange(e.target.value)} />
        
        </div>

      
    </div>
  </>
  );
}

export default  AgendamentoHeader;