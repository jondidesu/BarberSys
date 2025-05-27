import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import image1 from '../../assets/servicos/image1.png';
import image2 from '../../assets/servicos/image2.png';
import image3 from '../../assets/servicos/image3.png';
import image4 from '../../assets/servicos/image4.png';
import image5 from '../../assets/servicos/image5.png';
import image6 from '../../assets/servicos/image6.png';  
import pino from '../../assets/servicos/pino.png';

import './servicos.css';

const Servico = () => {
  return (
    <div className="coontainer">
      
      <div className="tituloo">

 <div className="pino">
        <img src={pino} className="pino" alt="pino" />
      </div>
        <h1 className="text-center">Nossos Serviços</h1> 


    <div className="pino">
        <img src={pino} className="pino" alt="pino" />
      </div>

      </div>


      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-interval="70000">
        <div className="carousel-inner">

          <div className="carousel-item active">
            <div className="row gx-0">
              <div className="col-4">

                <div className="img-wrapper">
                  <img src={image1} className="d-block w-100 img-darken" alt="1" />
                  <div className="img-text">Corte Masculino</div>
                </div>
              </div>

              <div className="col-4">
                <div className="img-wrapper">
                  <img src={image2} className="d-block w-100 img-darken" alt="2" />
                  <div className="img-text">Hidratação</div>
                </div>
              </div>

              <div className="col-4">
                <div className="img-wrapper">
                  <img src={image3} className="d-block w-100 img-darken" alt="3" />
                  <div className="img-text">Aplique Vip</div>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="row gx-0">
              <div className="col-4">
                <div className="img-wrapper">
                  <img src={image4} className="d-block w-100 img-darken" alt="4" />
                   <div className="img-text">Aplique Pro</div>
                </div>
              </div>
              <div className="col-4">
                <div className="img-wrapper">
                  <img src={image5} className="d-block w-100 img-darken" alt="5" />
                   <div className="img-text">Corte + Barba</div>
                </div>
              </div>
              <div className="col-4">
                <div className="img-wrapper">
                  <img src={image6} className="d-block w-100 img-darken" alt="6" />
                   <div className="img-text">Barba</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Próximo</span>
        </button>
      </div>
    </div>
  );
};

export default Servico;


