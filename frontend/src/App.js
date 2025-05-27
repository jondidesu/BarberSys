import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/navbar/Navbar';
import './App.css'; // Importando o CSS global


function App() {
  return (
    <>
      <Navbar /> {/*Como a navbar se repete em todas as páginas, ela é chamada aqui no App.js*/}
      <AppRoutes />

      </>
   
  );
}

export default App;
