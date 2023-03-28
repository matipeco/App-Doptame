import './FormAdoption.css';
import petCat from '../../assets/perritoFormPet.png'
import {getDetailPets} from "../../redux/actions/actions";
import React, { useState, useEffect } from "react";
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/reducer/reducer'
import { User, Pet} from "../../redux/types"
import validate from './JSvalidationsFormAdoption';
import { useParams} from 'react-router-dom';


function FormAdoption() { //Podemos hacer q reciba la userId por props o por params.

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
    const { petId } = useParams<{ petId: any }>();

    
    //Me aseguro de q los details del User esten cargados en el State Global
    useEffect (()=>{
        dispatch(getDetailPets(petId)as unknown as AnyAction)
    },[dispatch])

    
    
    let petDetails: Pet= useSelector((state: StateType) => state.detail); 

    

      const [input, setInput] = useState({
        name: '',
        last_name: '',
        email: '',
        provincia: '',
        location: '',
        telephone: ''
    })


    const [errors, setErrors] = useState({
        name: '',
        last_name: '',
        email: '',
        provincia: '',
        location: '',
        telephone: ''
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
    };






    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
//Reemplazar el dispatch por la funcion q envia los mails
        // dispatch(putUser(userId, input) as unknown as AnyAction);
        alert("Muchas gracias! Recibirás un mail con instrucciones")
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
                <h1>¡{petDetails.name} te está esperando!</h1>
                    <div>
                        <img src={petDetails.image} alt="imagen de perfil" className='imgFormAdoption' />
                    </div>
            </div>

<hr />
            <div className="containerForm">
                <h1>Formulario de Adopción</h1>
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
                                name="email"
                                value={input.email}
                            />
                            <label className= "label" htmlFor="email">Email:</label>
                            {errors.email && <p>{errors.email}</p>}
                        </div>
                        

                    </div>
                    <div className="row">
                        
                        <div className="containerInputs">
                            <select name="provincia"
                                   onChange={handleInputChange}  
                                   >  
                                     <option value={input.provincia? input.provincia : ''} >{input.provincia? input.provincia : 'Seleccione una Provincia'}</option> 
                                     {/* <option value="" >Seleccione una Provincia</option>  */}
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
                                name="telephone"
                                value={input.telephone}
                            />
                            <label className= "label" htmlFor="name">Teléfono:</label>
                            {errors.telephone && <p>{errors.telephone}</p>}
                        </div>

                        
                    </div>


                    
                     <div className="row">

                        

                        <button type="submit" disabled={handleDisabledButton()}>Adoptar</button>
                      
                    </div>
                </form>
            </div>

            {/* <div className="containerTitle">
                <h1>Adoptar</h1>
                <img className="imgPerrito" src={petCat} alt="foto perrito" />
            </div> */}

        </div>
    )
}

export default FormAdoption;