
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import AgendarServicos from '../pages/Agendamentos/servicos';
import AgendarProfissionais from '../pages/Agendamentos/profissionais';
import Agendar from '../pages/Agendamentos/agendar';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Agendarservicos" element={<AgendarServicos />} />
      <Route path="/Agendarprofissionais" element={<AgendarProfissionais />} />
      <Route path="/Agendar" element={<Agendar />} />
      {/* Adicione outras rotas conforme necessário */}
      {/* <Route path="/outra-rota" element={<OutraPagina />} /> */}
    </Routes>
  );
}

export default AppRoutes;
