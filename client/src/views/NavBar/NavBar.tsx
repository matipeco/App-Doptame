import React from 'react'
import { FiAlignJustify } from 'react-icons/fi'
import imgLogo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
  return (
    <>
    <nav>
      <input type='checkbox' id='check' />
      <label htmlFor="check" className='checkbtn'>
        <i><FiAlignJustify/></i>
      </label>

      <ul className='izq'>
        <Link to='/aboutApp' className='link'>
          <li>Sobre la App</li>
        </Link>
        <Link to='/aboutUs' className='link'>
          <li >Quienes Somos</li>
        </Link>
      </ul>
      <Link to='/home' className='link'>
        <img src={imgLogo} alt='logo'/>
      </Link>
      <ul className='der'>
        <li >Preguntas frecuentes</li>
        <li >Ingresar</li>
      </ul>
    </nav>
    </>
  )

}

export default NavBar