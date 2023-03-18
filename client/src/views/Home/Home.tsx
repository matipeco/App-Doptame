import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"

function Home() {
  const imgPerros = `https://iaabcjournal.org/wp-content/uploads/2021/02/street-dogs.jpg`
  const imgCats = `https://cdn.colombia.com/sdi/2022/03/22/hablar-gatos-callejeros-metodo-japones-recuperar-mascota-perdida-1009467.jpg`
  const imgOtros = `https://st4.depositphotos.com/12293812/20005/i/600/depositphotos_200058304-stock-photo-rabbit-and-turtle-are-discussing.jpg`
  const imgPng = `https://i.pinimg.com/originals/bd/f7/d1/bdf7d1ee91ea3cbb9736555dbead5ed1.png`
  const imgAlimento = `https://cdn-icons-png.flaticon.com/512/26/26190.png`
  const imgHome = `https://cdn-icons-png.flaticon.com/512/5871/5871586.png`

  return (
    <div>

      <h1 className='title'>Appdoptame</h1>
      <section className='container'>

        <div className='card'>
          <Link className='link' to="/pets/perro">

            <img src={imgPerros} alt="perros" />
            <div className='name'>
              <h1>Perros</h1>
            </div>
          </Link>
        </div>

        <div className='card'>
          <Link className='link' to="/pets/gato">
            <img src={imgCats} alt="cats" />
            <div className='name'>
              <h1>Gatos</h1>
            </div>
          </Link>
        </div>

        <div className='card'>
          <Link className='link' to="/pets/otros">
            <img src={imgOtros} alt="otros" />
            <div className='name'>
              <h1>Otros</h1>
            </div>
          </Link>
        </div>
      </section>

      <section className="info">
        <div className='divDonar'>

          <h3>¿Querés ayudar?</h3>
          <p>
            Tu donación es fundamental para ayudar a los animales que necesitan nuestro cuidado y protección. Con tu aporte,
            podemos proveer atención médica, alimento y refugio a los animales más vulnerables. ¡Sumate a nuestra causa y hacé
            la diferencia!
          </p>
          <Link className="button" to="/donate">
            Donar ahora
          </Link>
        </div>
        <div className='alimentoPng'>
          <img className='imgAlimento' src={imgAlimento} alt="" />
          <div className="contVacuna">
            <img className='vacuna' src={imgPng} alt="" />
          </div>
        </div>


        {/* <div className='dogPng'> */}

        {/* </div> */}

        {/* <div className='Homeimg'> */}

        {/* </div> */}
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


    </div>
  );
}
export default Home