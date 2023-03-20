import React, { useState } from 'react';
import { FiAlignJustify } from 'react-icons/fi'
import imgLogo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <>
       <nav>
        <input type="checkbox" id="check"/>
        <label htmlFor="check" className="checkbtn">
            <i><FiAlignJustify /></i>      
        </label>
        <Link to='/home' className='link'>
          <img className='logo' src={imgLogo} alt='logo' />
        </Link>
    <ul>
        <li>Inicio</li>
        <li>Quienes somos</li>
        <li>
            <a onClick={handleDropdownClick}>
              Ingresar
            </a>
            {showDropdown && (
              <ul className='submenu'>
                 <Link to="/formApa">
                <li className='liOp'>
                 Ingresar como Apa
                </li>
                </Link>
                <Link to='/formUser'>
                <li className='liOp'>
                  Ingresar como Usuario
                </li>
                </Link>
              </ul>
            )}
          </li>

    </ul>
   


    </nav>
    </>
  )

}

export default NavBar