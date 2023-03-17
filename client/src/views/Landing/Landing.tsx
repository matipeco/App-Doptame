import React from 'react';
import './Landing.css';
import perrito from '../../assets/perrito.gif';
import { Link } from 'react-router-dom'

const Landing: React.FC = () => {
  return (
    <div>
      <div className="title-container">
        <h1 className="title">App<img className="img"src="https://i.imgur.com/rNsmaGi.png" alt="" />Doptame</h1>
      </div>
      <div className="container">
        <div className="gifDiv">
           <img src={perrito} alt="Descripción del GIF" />
        </div>
        <div className="content-column">
          <div className="description">
            <p>Le faltan pelos a tu ropa<br />adoptá una mascota!</p>
          </div>
          <div className="button">
            <a href="/home">Home</a>
          </div>
        </div>
      </div>
    </div>
  );
};

    <Link to = "/home">HOME</Link>
    </div>
  )
}


export default Landing;
