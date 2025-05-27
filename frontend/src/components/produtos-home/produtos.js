import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import image1 from '../../assets/produtos/image.png';
import image2 from '../../assets/produtos/image-1.png';
import image3 from '../../assets/produtos/image-2.png';
import image4 from '../../assets/produtos/image.png';
import pincel from '../../assets/produtos/pincel.png';
import gilete from '../../assets/produtos/gilete.png';


import './produtos.css';

const Produto = () => {
  return (
    <div className="prod-container">


    <div className="icons_produtos">
      <img src={pincel} alt="Pincel" className="icon-produto" />
      
    </div>

      <div className="prod-title">


        <h1 className="text-center">Nossos Produtos</h1>

        <div className="linha-decorativa">
        <div className="linha"></div>
        <div className="pontos">
          <p>◦ ❖ ◦</p>
        </div>
        <div className="linha"></div>
      </div>


      </div>

      {/* ID ALTERADO AQUI */}
      <div id="carouselOutro" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">

          <div className="carousel-item active">
            <div className="prod-row">
              <div className="col-4">
                <div className="prod-img-wrapper">
                  <img src={image1} className="prod-img-darken" alt="1" />
                  <div className="prod-img-text">R$ 49,90</div>
                </div>
              </div>
              <div className="col-4">
                <div className="prod-img-wrapper">
                  <img src={image2} className="prod-img-darken" alt="2" />
                  <div className="prod-img-text">R$ 59,90</div>
                </div>
              </div>
              <div className="col-4">
                <div className="prod-img-wrapper">
                  <img src={image3} className="prod-img-darken" alt="3" />
                  <div className="prod-img-text">R$ 39,90</div>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="prod-row">
              <div className="col-4">
                <div className="prod-img-wrapper">
                  <img src={image4} className="prod-img-darken" alt="4" />
                  <div className="prod-img-text">R$ 29,90</div>
                </div>
              </div>
              <div className="col-4">
                <div className="prod-img-wrapper">
                  <img src={image3} className="prod-img-darken" alt="5" />
                  <div className="prod-img-text">R$ 44,90</div>
                </div>
              </div>
              <div className="col-4">
                <div className="prod-img-wrapper">
                  <img src={image4} className="prod-img-darken" alt="6" />
                  <div className="prod-img-text">R$ 34,90</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* TAMBÉM ALTERADO AQUI */}
        <button className="carousel-control-prev prod-custom-control" type="button" data-bs-target="#carouselOutro" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next prod-custom-control" type="button" data-bs-target="#carouselOutro" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Próximo</span>
        </button>
      </div>
<div className="icons_produtos2">
     
      <img src={gilete} alt="Gilete" className="icon-produto" />
    </div>


    </div>
  );
};

export default Produto;


