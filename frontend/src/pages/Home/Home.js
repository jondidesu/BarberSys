import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Bemvindo from '../../components/welcome-home/bemvindo';
import './Home.css';
import home from '../../assets/home/homem.png';
<<<<<<< HEAD
import Servico from '../../components/serviços-home/servicos';
import Produtos from '../../components/produtos-home/produtos';

=======
import Servico from '../../components/serviços/servicos';
import Produtos from '../../components/produtos/produtos';
import tesoura from '../../assets/home/tesoura.png';
>>>>>>> fe23d1d (frontend completo beta, falta a parte de tablet)

function Home() {
  return (
    <>
      <Bemvindo />

 <div className="containerr">
  <div className='colorr'>

        <div className="subcontainer">
          <div className="imagemhome">
            <img src={home} alt="Home" />
          </div>
        </div>

        <div className="textos">
          <div className="titulo">
        <h2>Sobre Nós</h2> <img src={tesoura} alt="tesoura" />
       
      </div>

      
      <div className="descricao">
        <p>
         Na Espaço H Barbearia , oferecemos mais do que um corte: proporcionamos uma experiência. Unimos tradição e tendências modernas para cuidar do seu visual com qualidade, conforto e atenção aos detalhes. Nosso espaço é feito pra você se sentir à vontade, com atendimento de primeira e profissionais que entendem de estilo.
        </p>
      </div>
    </div>
    </div>
</div>

<Servico />
<Produtos />

<div className="contato-container">
      <div className="linha"></div>
      <h2 className="titulo-contato">Entre em Contato</h2>
      <div className="linha"></div>

      <div className="icones-contato">
        <div className="contato-item">
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/whatsapp.png"
            alt="WhatsApp"
          />
          <span>(84) 99945-7272</span>
        </div>

        <div className="contato-item">
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png"
            alt="Instagram"
          />
          <span>@espaco_h_barbearia</span>
        </div>

        <div className="contato-item">
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/new-post.png"
            alt="Email"
          />
          <span>email se tiver</span>
        </div>
      </div>
    </div>






    </>
  );
}

export default Home;
