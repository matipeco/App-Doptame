import React from 'react';
import { FiAlignJustify } from 'react-icons/fi'
import imgLogo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { gapi } from "gapi-script";
import { useNavigate } from 'react-router-dom';
import './NavBar.css'


function NavBar() {
  // const [showDropdown, setShowDropdown] = useState(false);

  // const handleDropdownClick = () => {
  //   setShowDropdown(!showDropdown);
  // };

  const navigate = useNavigate()
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

      // navigate to the home page for local authentication

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
          <li><Link to='/login' className='linkAbout'> Ingresar</Link>  </li>

          <li> <button onClick={handleSignOut}>Cerrar sesión de Google</button>   </li>
          <li> <button onClick={handleLogout}>Cerrar sesión</button>   </li>


          {/* {showDropdown && (
              <ul className='submenu'>
                <Link to="/formApa">
                  <li className='liOp'>
                    Registrarse como Apa
                  </li>
                </Link>
                <Link to='/formUser'>
                  <li className='liOp'>
                    Registrarse como Usuario
                  </li>
                </Link>
                <Link to='/login'>
                  <li className='liOp'>
                    Login
                  </li>
                </Link>
              </ul>
            )} */}


        </ul>

      </nav>
    </>
  )

}

export default NavBar