import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { Home, NavBar, Landing, Detail, Footer, AboutUs, Users, ProfileApas } from "../src/views"
import { Cards } from './components/Cards/Cards';
import FormApa from './views/FormApa/FormApa';
import FormPets from './views/FormPets/FormPets';
import FormEditPet from './views/FormEditPet/FormEditPet';
import FormEditApa from './views/FormEditApa/FormEditApa';
import FormEditUser from './views/FormEditUser/FormEditUser';
import FormUser from './views/FormUser/FormUser';
import { Login } from './components/Login/Login';
import UserPassword from './components/RestorePasswordUser/UserPassword';
import Fav from './views/Favs/Fav';



function App() {
  const location = useLocation();

  // Verifica si la ruta actual es la ruta de inicio ("/")
  const isLandingPage = location.pathname === "/";
  const isHomePage = location.pathname === "/login"

  return (

    <div className='app'>
      {!isLandingPage && !isHomePage && <NavBar />}

      <main className='main'>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/aboutUs" element={<AboutUs />}></Route>
          <Route path="/formApa" element={<FormApa />}></Route>
          <Route path="/formPet" element={<FormPets />}></Route>
          <Route path="/formEditPet/:petId" element={<FormEditPet />}></Route>
          <Route path="/formEditApa/:apaId" element={<FormEditApa />}></Route>
          <Route path="/formEditUser/:userId" element={<FormEditUser />}></Route>
          <Route path='/pets/:category' element={<Cards />}></Route>
          <Route path='/formUser' element={<FormUser />}></Route>
          <Route path='/usuario/:id' element={<Users />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/restore-password' element={<UserPassword />}></Route>
          <Route path='/profileapa/:id' element={<ProfileApas/>}></Route>
          <Route path='/favoritos' element={<Fav/>}></Route>
        </Routes>

      </main>


      {!isLandingPage && <Footer />}
    </div>


  )
}



export default App;