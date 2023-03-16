import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import {Home, NavBar, Landing, Detail, Footer, AboutUs } from "../src/views"

import './App.css';
import FormApa from './views/FormApa/FormApa';
import FormPets from './views/FormPets/FormPets';
import FormUser from './views/FormUser/FormUser';

function App() {
  const location = useLocation();

  // Verifica si la ruta actual es la ruta de inicio ("/")
  const isLandingPage = location.pathname === "/";

  return (
    <div className="App">
      { <NavBar />}
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
    

      {/* Renderiza NavBar solo si la ruta actual no es la ruta de inicio */}

    

     


       
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/detail/:id" element={<Detail/>}></Route>
        <Route path="/aboutUs" element={<AboutUs/>}></Route>
        <Route path="/formApa" element={<FormApa/>}></Route>
        <Route path="/formPet" element={<FormPets/>}></Route>
        <Route path="/formUser" element={<FormUser/>}></Route>


      </Routes>
       {/* Renderiza Footer solo si la ruta actual no es la ruta de inicio */}
       {!isLandingPage && <Footer />}
    </div>
  );
}

export default App;