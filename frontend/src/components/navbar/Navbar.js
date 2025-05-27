import './style.css';
import logo from '../../assets/home/logo.png';
import { IoPersonCircle } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";

function Navbar() {
  return (
    <div className="Navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      
      <div className="navlinks">
        <a href="/">Home</a>
        <a href="/Agendarservicos">Agendamentos</a>
        <a href="#services">Produtos</a>
        <a href="#contact">Contato</a>
       
      </div>
      <div className="icons">
        <a href="#account" className="icon">
          <IoPersonCircle />
        </a> 
        <a href="#instagram" className="icon">
          <FaInstagram />
        </a>
      </div>
    </div>
  );
}

export default Navbar;