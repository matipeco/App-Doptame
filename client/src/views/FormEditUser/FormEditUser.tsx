import './FormEditUser.css';
import petCat from '../../assets/perritoFormPet.png'
import { getDetailUsers, putUser, getUsers} from "../../redux/actions/actions";
import React, { useState, useEffect } from "react";
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/reducer/reducer'
import { User} from "../../redux/types"
import validate from './JSvalidationsFormEditUser';
// import { useParams} from 'react-router-dom';


function FormEditUser() { //Podemos hacer q reciba la userId por props o por params.

    const provincias = ["Ciudad Autónoma de Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
    "Tucumán"]

    const dispatch = useDispatch()
//     // const { userId } = useParams<{ petId: string }>();
    const userId = "64186da70e29db1d20c2003a" //Provisorio, hasta tener la userId por params o props
    
    //Me aseguro de q los details del User esten cargados en el State Global
    useEffect (()=>{
        dispatch(getDetailUsers(userId)as unknown as AnyAction)
    },[dispatch])

    
    
    //Me guardo los details para meterselos al estado local "input"
    let userDetails: User= useSelector((state: StateType) => state.detailUser); 
    // console.log(userDetails)

    

  

    //   const [input, setInput] = useState({
    //       name: userDetails.name || '',
    //       last_name: userDetails.last_name || '',
    //       username: userDetails.username || '',
    //       password: userDetails.password || '',
    //       email: userDetails.email || '',
    //       provincia: userDetails.provincia || '',
    //       location: userDetails.location || '',
    //       image: userDetails.image || '',
    //   })
      

      const [input, setInput] = useState({
        name: userDetails.name,
        last_name: userDetails.last_name,
        username: userDetails.username,
        password: userDetails.password,
        email: userDetails.email,
        provincia: userDetails.provincia,
        location: userDetails.location,
        image: userDetails.image,

    })



// console.log(input)












// // FORMA ME PROPUSO CHAT: Pero no me trae nada de nada
// ////////////////////////////////////////////
//     const dispatch = useDispatch();
//     const userId = "64186da70e29db1d20c2003a";
//     const userDetails: User = useSelector((state: StateType) => state.detailUser);
  
//     const [input, setInput] = useState({
//       name: userDetails.name || 'CARGANDO',
//       last_name: userDetails.last_name || '',
//       username: userDetails.username || '',
//       password: '',
//       email: userDetails.email || '',
//       provincia: userDetails.provincia || '',
//       location: userDetails.location || '',
//       image: '',
//     });
  
//     useEffect(() => {
//       if (Object.keys(userDetails).length) {
//         setInput((prevInput) => ({
//           ...prevInput,
//           name: userDetails.name,
//           last_name: userDetails.last_name,
//           username: userDetails.username,
//           email: userDetails.email,
//           provincia: userDetails.provincia,
//           location: userDetails.location,
//         }));
//       } else {
//         dispatch(getDetailUsers(userId) as unknown as AnyAction);
//       }
//     }, [dispatch, userDetails, userId]);
///////////////////////////////
  


    const [errors, setErrors] = useState({
        name: '',
        last_name: '',
        username: '',
        password: '',
        email: '',
        provincia: '',
        location: '',
        image: '',
    })




    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
// console.log(input)
// console.log(errors)
    };






    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
// console.log(userId)
// console.log(input)
        dispatch(putUser(userId, input) as unknown as AnyAction);
        alert("Datos modificados correctamente")
        window.location.assign('/home');
    }

    const handleDisabledButton = ()=>{
        if(Object.values(input)[0]==="") {
            return true;
        }else if (Object.keys(errors).length>0) {
            return true
        } else{
            return false;
        }
    }





    return (
        <div className="container">
            <div>
            <h2>Datos Actuales</h2>
                
                <label className='labelCurrentInfo' htmlFor="username">Nombre de Usuario:</label>
                <h5>{userDetails.username}</h5>

                <label className='labelCurrentInfo' htmlFor="name">Nombre:</label>
                <h5>{userDetails.name}</h5>

                <label className='labelCurrentInfo' htmlFor="last_name">Apellido:</label>
                <h5>{userDetails.last_name}</h5>

                <label className='labelCurrentInfo' htmlFor="email">Email:</label>
                <h5>{userDetails.email}</h5>

                <label className='labelCurrentInfo' htmlFor="provincia">Provincia:</label>
                <h5>{userDetails.provincia}</h5>

                <label className='labelCurrentInfo' htmlFor="location">Localidad:</label>
                <h5>{userDetails.location}</h5>             

                <label className='labelCurrentInfo' htmlFor="image">Imagen</label>
                <img src={userDetails.image} alt="imagen de perfil" className='imagenCargada' />

                        

            </div>

<hr />
            <div className="containerForm">
                <h1>Los datos de este formulario reemplazarán a los Datos Actuales</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">


                    <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                className="input"
                                type='text'
                                name="name"
                                value={input.name}
                            />
                            <label className= "label" htmlFor="name">Nombre:</label>
                            {errors.name && <p>{errors.name}</p>}
                        </div>

                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                className="input"
                                type='text'
                                name="last_name"
                                value={input.last_name}
                            />
                            <label className= "label" htmlFor="last_name">Apellido:</label>
                            {errors.last_name && <p>{errors.last_name}</p>}
                        </div>

                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                className="input"
                                type='text'
                                name="username"
                                value={input.username}
                            />
                            <label className= "label" htmlFor="username">Usuario:</label>
                            {errors.username && <p>{errors.username}</p>}
                        </div>
                        
                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                className="input"
                                type='text'
                                name="email"
                                value={input.email}
                            />
                            <label className= "label" htmlFor="email">Email:</label>
                            {errors.email && <p>{errors.email}</p>}
                        </div>

                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='password'
                                className="input"
                                name="password"                         
                                value={input.password}
                            />
                            <label className="label" htmlFor="password">Contraseña:</label>
                            {errors.password && <p className='errors'>{errors.password}</p>}
                        </div>
                     
                        

                    </div>
                    <div className="row">
                        
                        <div className="containerInputs">
                            <select name="provincia"
                                   onChange={handleInputChange}  
                                   >  
                                     <option value={input.provincia? input.provincia : 'Seleccione una provincia'} >{input.provincia? input.provincia : 'Seleccione una provincia'}</option> 
                                     <option value="" >Seleccione una Provincia</option> 
                                    { 
                                          provincias.map((p,i)=>{  
                                              return (  
                                                  <option value={p} key={i}>{p}</option>  
                                              )  
                                          })  
                                      }  
                              </select>  
                             <label className="tam" htmlFor="provincia">Provincia:</label> 
                             {errors.provincia && <p className='error'>{errors.provincia}</p>} 
                         </div> 



                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="location"
                                value={input.location}
                            />
                            <label className="label" htmlFor="location">Localidad:</label>
                            {errors.location && <p className='errors'>{errors.location}</p>}
                        </div>


                    <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                className="input"
                                type='text'
                                name="image"
                                value={input.image}
                            />
                            <label className= "label" htmlFor="image">Foto de Perfil:</label>
                            {errors.image && <p>{errors.image}</p>}
                        </div>
                        
                    </div>


                    
                     <div className="row">

                        

                        <button type="submit" disabled={handleDisabledButton()}>Guardar Moficicaciones Hechas</button>
                      
                    </div>
                </form>
            </div>

            <div className="containerTitle">
                <h1>Editar Datos de Usuario</h1>
                <img className="imgPerrito" src={petCat} alt="foto perrito" />
            </div>

        </div>
    )
}

export default FormEditUser;