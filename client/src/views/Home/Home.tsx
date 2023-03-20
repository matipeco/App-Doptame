import React from 'react'
import './Home.css';
import { Link } from 'react-router-dom'
import imgAlimento from "../../assets/assetsHome/ImagenesHome/alimento.png"
import imgHome from "../../assets/assetsHome/ImagenesHome/Casita.png"
import imgVacuna from "../../assets/assetsHome/ImagenesHome/vacuna.png"
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi"


function Home() {
  const imgPerros = "https://iaabcjournal.org/wp-content/uploads/2021/02/street-dogs.jpg"
  const imgCats = "https://cdn.colombia.com/sdi/2022/03/22/hablar-gatos-callejeros-metodo-japones-recuperar-mascota-perdida-1009467.jpg"
  const imgOtros = "https://st4.depositphotos.com/12293812/20005/i/600/depositphotos_200058304-stock-photo-rabbit-and-turtle-are-discussing.jpg"


  return (
    <>
      <div id="conteItemsCarrusel">

        <div className="itemCarrusel" id="itemCarrusel-1">

          <div className="tarjetaCarrusel"><img className='carruselImg' src={imgPerros} alt="perritos" /></div>

          <div className="flechasCarrusel">
            <a href="#itemCarrusel-3"><i><HiArrowSmLeft className="arrows" /></i></a>
            <a href="#itemCarrusel-2">  <i><HiArrowSmRight className="arrows" /></i></a>

          </div>
          <Link to="/pets/perro"><button className='buttonPets'>Perros</button></Link>
        </div>



        <div className="itemCarrusel">

          <div className="tarjetaCarrusel" id="itemCarrusel-2">
            <img className='carruselImg' src={imgCats} alt="cats1" />  </div>

          <div className="flechasCarrusel">

            <a href="#itemCarrusel-1"><i><HiArrowSmLeft className="arrows" /></i></a>
            <a href="#itemCarrusel-3">  <i><HiArrowSmRight className="arrows" /></i></a>

          </div>
          <Link to="/pets/gato"><button className='buttonPets'>Gatos</button></Link>
        </div>




        <div className="itemCarrusel">
          <div className="tarjetaCarrusel" id="itemCarrusel-3"><img className='carruselImgOtros' src={imgOtros} alt="perritos" /></div>

          <div className="flechasCarrusel">

            <a href="#itemCarrusel-2"><i className="arrowLeft"><HiArrowSmLeft className="arrows" /></i></a>
            <a href="#itemCarrusel-1">  <i><HiArrowSmRight className="arrows" /></i></a>

          </div>
          <Link to="/pets/otros">   <button className='buttonPets'>Otros</button>  </Link>
        </div>

      </div>


      <section className="info">
        <div className='divDonar'>

          <h3>¿Querés ayudar?</h3>
          <p>
            Tu donación es fundamental para ayudar a los animales que necesitan nuestro cuidado y protección. Con tu aporte,
            podemos proveer atención médica, alimento y refugio a los animales más vulnerables. ¡Sumate a nuestra causa y hacé
            la diferencia!
          </p>
          <Link className="boton_home" to="/donate">
            Donar ahora
          </Link>
        </div>
        <div className='alimentoPng'>
          <img className='imgAlimento' src={imgAlimento} alt="" />
          <div className="contVacuna">
            <img className='vacuna' src={imgVacuna} alt="" />
          </div>
        </div>


        {/* <div className='dogPng'> /}

        {/ </div> /}

        {/ <div className='Homeimg'> /}

        {/ </div> */}
      </section>
      <section className="saberMas">
        <div className="contImg">
          <img src={imgHome} alt="" />
        </div>
        <div className='divSaberMas'>
          <h3>Sobre Appdoptame</h3>
          <p>
            Si quieres saber más sobre nosotros, nuestra app y nuestra misión, te invitamos a visitar nuestra sección "Quiénes somos". Allí podrás conocer a nuestro equipo y saber cómo puedes unirte a nuestra causa.</p>

          <div className="btn">
            <Link className='button_2' to="/aboutUs">click aquí</Link>
          </div>
        </div>

      </section>
    </>
  );
}

export default Home