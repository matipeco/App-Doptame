import React from 'react';
import { FiAlignJustify } from 'react-icons/fi'
import imgLogo from '../../assets/logo.png'
import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom'
import { gapi } from "gapi-script";
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'

import './NavBar.css'

function NavBar() {
  const navigate = useNavigate()
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false)

  useEffect(()=>{
    //Verifico si hay un token de usuario en localstorage
    const token = localStorage.getItem('token')
    if(token){
      setIsUserLoggedIn(true);
    }
  },[])


  const handleLogout = async () => {
    localStorage.removeItem("token");
    console.log("Token eliminado: " + localStorage.getItem("token"));

    navigate("/")
  };

  const handleSignOut = () => {
    const confirmSignOut = window.confirm(
      "¿Estás seguro de que quieres cerrar sesión?"
    );
    if (confirmSignOut) {
      // remove the token from localStorage
      localStorage.removeItem("token");
      // console.log("Token eliminado: " + localStorage.getItem("token"));
      // sign out the user from Google authentication
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        // console.log("Usuario desconectado exitosamente de Google Sign-In");
        // navigate to the home page
        navigate("/");
      });
    }
  };


  return (
    <>
      <nav>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i><FiAlignJustify /></i>
        </label>
        <Link to='/home' className='link'>
          <img className='logo' src={imgLogo} alt='logo' />
        </Link>
        <ul>
          <li><Link to="/home" className='linkAbout'>Inicio</Link></li>
          <li><Link to="/aboutUs" className='linkAbout'>Quienes somos</Link></li>

          {isUserLoggedIn ? (
            <>
              <li className='hoverAvatar'>
                <div className="avatar">
                  <img src={avatar} alt="Avatar" />
                  <div className="dropdown">
                    <div className="dropdown-content">
                      <button className='dropbtn'><Link to="/favorites">Favoritos</Link></button>
                      <button className='dropbtn' onClick={handleLogout}>Salir</button>
                    </div>
                  </div>
                </div>
              </li>
            </>
          ) : (
            <li><Link to='/login' className='linkAbout'>Ingresar</Link></li>
          )}

          {/* <li> <button onClick={handleSignOut}>Cerrar sesión de Google</button>   </li>
          <li> <button onClick={handleLogout}>Cerrar sesión</button>   </li> */}

        </ul>

      </nav>
    </>
  )

}

export default NavBar