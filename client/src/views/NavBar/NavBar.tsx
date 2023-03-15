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
        <li>Sobre la App</li>
        <li className='somos'>Quienes Somos</li>
      </ul>
      <img src={imgLogo} alt='logo'/>
      <ul className='der'>
        <li >Preguntas frecuentes</li>
        <li >Ingresar</li>
      </ul>
    </nav>
    </>
  )

}

export default NavBar