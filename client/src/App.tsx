import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { Home, NavBar, Landing, Detail, Footer, AboutUs } from "../src/views"
import { Cards } from './components/Cards/Cards';

import './App.css';

import FormApa from './views/FormApa/FormApa';
import FormPets from './views/FormPets/FormPets';
import FormEditPet from './views/FormEditPet/FormEditPet';
import FormEditApa from './views/FormEditApa/FormEditApa';
import FormEditUser from './views/FormEditUser/FormEditUser';
import FormUser from './views/FormUser/FormUser';


function App() {
  const location = useLocation();

  // Verifica si la ruta actual es la ruta de inicio ("/")
  const isLandingPage = location.pathname === "/";

  return (
    <div className="App">
      {!isLandingPage && <NavBar />}

      <Routes>

        <Route path="/" element={<Landing />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/aboutUs" element={<AboutUs />}></Route>
        <Route path="/formApa" element={<FormApa />}></Route>
        <Route path="/formPet" element={<FormPets />}></Route>
        <Route path="/formEditPet" element={<FormEditPet />}></Route>
        <Route path="/formEditApa" element={<FormEditApa />}></Route>
        <Route path="/formEditUser" element={<FormEditUser />}></Route>
        <Route path='/pets/:category' element={<Cards/>}></Route>
        <Route path='/formUser' element={<FormUser/>}></Route>

        

      </Routes>

      {!isLandingPage && <Footer />}
    </div>
  );
}

export default App;