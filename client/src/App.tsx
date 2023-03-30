import React from 'react';
import { Form, Route, Routes, useLocation } from "react-router-dom";
import { Home, NavBar, Landing, Detail, Footer, AboutUs, Users, ProfileApas } from "../src/views"
import { Cards } from './components/Cards/Cards';
import FormApa from './views/FormApa/FormApa';
import FormPets from './views/FormPets/FormPets';
import FormUser from './views/FormUser/FormUser';
import FormEditPet from './views/FormEditPet/FormEditPet';
import FormEditApa from './views/FormEditApa/FormEditApa';
import { Login } from './components/Login/Login';
import Favs from './views/Favs/Favs'
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import ForgotPassword from './components/RestorePassword/ForgotPassword';
import { useSelector } from 'react-redux';
import { Reducer } from "./redux/store/store"
import { Navigate } from 'react-router-dom';


function App() {
  const location = useLocation();
  const logueados = useSelector((state: Reducer) => state.Loguins);

  // Verifica si la ruta actual es la ruta de inicio ("/")
  const isLandingPage = location.pathname === "/";
  const isHomePage = location.pathname === "/login"



  return (

    <div className='app'>
      {!isLandingPage && !isHomePage && <NavBar />}


      <main className='main'>
        <Routes>

          <Route path="/" element={<Landing />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path="/home" element={logueados && (logueados.userType === 'apa' || logueados.userType === "admin" || logueados.userType === "user") ? <Home /> : <Navigate to="/" />}></Route>
          <Route path="/aboutUs" element={<AboutUs />}></Route>
          <Route path='/formUser' element={<FormUser />}></Route>
          <Route path="/formApa" element={<FormApa />}></Route>
          <Route path='/usuario/:id' element={logueados && (logueados.userType === 'user' || logueados.userType === "admin") ? <Users /> : <Navigate to="/" />}></Route>
          <Route path='/favorites/:id' element={logueados && logueados.userType === "user" ? <Favs /> : <Navigate to="/" />}></Route>
          <Route path='/myProfileApa/:id' element={logueados && (logueados.userType === 'apa' || logueados.userType === "admin") ? <ProfileApas /> : <Navigate to="/" />}></Route>
          <Route path="/formPet" element={logueados && logueados.userType === "apa" ? <FormPets /> : <Navigate to="/" />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/formEditPet/:petId" element={logueados && logueados.userType === "apa" ? <FormEditPet /> : <Navigate to="/" />}></Route>
          <Route path="/formEditApa/:apaId" element={logueados && logueados.userType === "apa" ? <FormApa /> : <Navigate to="/" />}></Route>
          <Route path='/pets/:category' element={<Cards />}></Route>
          <Route path='/restore-password' element={<ForgotPassword />}></Route>
          <Route path='/dashboardAdmin' element={logueados && logueados.userType === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}></Route>

        </Routes>

      </main>


      {!isLandingPage && <Footer />}
    </div>


  )
}



export default App;