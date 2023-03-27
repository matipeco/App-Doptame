import React from 'react';
import './Landing.css';
//import perrito from '../../assets/perrito.gif';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <>
      <header className="hero">
        <div className="textos-hero">
          <img className="img_logo" src="https://i.imgur.com/rNsmaGi.png" alt="" />
          <h1>Bienvenido a Appdoptame</h1>
          {/* <p>Necesitamos de tu ayuda, te invitamos a conocer nuestras historias y a que te informes en como poder ayudarnos. */}
          <p>  ¡Ayuda a salvar una vida! Considera adoptar a uno de nuestros animales o donar para apoyar nuestro trabajo.
          </p>
          <Link to="/login" className="botonLanding">Conocer Más</Link>
        </div>
        <div style={{ overflow: "hidden", marginBottom: "150px" }}><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}><path d="M-7.67,84.15 C279.00,112.69 154.29,51.66 501.35,66.42 L529.57,156.98 L-0.00,149.60 Z" style={{ stroke: "none", fill: "#2FCDCD" }}></path></svg></div>
      </header>

    </>
  );
};




export default Landing;
