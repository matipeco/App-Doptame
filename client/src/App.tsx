import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import {Home, NavBar, Landing, Detail, Footer, AboutApp, AboutUs } from "../src/views"

import './App.css';

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

    

     


        <Route path="/aboutApp" element={<AboutApp/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/detail/:id" element={<Detail/>}></Route>
        <Route path="/aboutUs" element={<AboutUs/>}></Route>
      </Routes>
       {/* Renderiza Footer solo si la ruta actual no es la ruta de inicio */}
       {!isLandingPage && <Footer />}
    </div>
  );
}

export default App;