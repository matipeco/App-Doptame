import React, { useState } from "react";
import './FormApa.css'
import imgForm from '../../assets/perrito2.png';
import { useDispatch } from "react-redux";
import { postApa } from "../../redux/actions/actions";
import { AnyAction } from "redux";
import { validation } from "../../validation/validationApa"
import { useNavigate } from "react-router-dom";


function FormApa(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: "",
        password: "",
        email: "",
        cuit: "",
        location: "",
        description: "",
        cbu_cvu: "",
        url: "",  
        provincia: "",
        telephone: ""
    })

    const [touched, setTouched] = useState({
        name: false,
        password: false,
        email: false,
        cuit: false,
        location: false,
        description: false,
        cbu_cvu: false,
        url: false,  
        provincia: false,
        telephone: false

    });
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const field = e.target.name;
        setTouched({ ...touched, [field]: true });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    };

    const errorsInput = validation(input);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(errorsInput);
        console.log(input)
        if (Object.keys(errorsInput).length === 0) {
            dispatch(postApa(input) as unknown as AnyAction);
            alert("Usuario creado")

            setInput({
                name: "",
                password: "",
                email: "",
                cuit: "",
                location: "",
                description: "",
                cbu_cvu: "",
                url: "",  
                provincia: "",
                telephone: ""
            });
            navigate('/home')

        }
    }


    return(
        <div className="container">
            <div className="containerTitle">
                <h1>Formulario Carga Nueva Asociacion Protectora</h1>
                <img className="imgPerrito" src={imgForm} alt="foto perrito" />
            </div>
            <div className="containerForm">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                    <div className="containerInputs"> 
                        <input
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className="input"
                        type='text'
                        name="name"
                        required
                        />
                        <label className="label" htmlFor="name">Nombre/Razon Social</label>
                        {touched.name && errorsInput.name && <p className="error">{errorsInput.name}</p>}
                    </div>
                    <div className="containerInputs"> 
                        <input
                        className="input"
                        onBlur={handleBlur}
                        onChange={handleInputChange}
                        type='password'
                        name="password"
                        required
                        />
                        <label className="label" htmlFor="password">Contraseña</label>
                        {touched.password && errorsInput.password && <p className="error">{errorsInput.password}</p>}
                    </div>
                    </div>
                    <div className="row">
                    <div className="containerInputs"> 
                        <input
                        className="input"
                        onBlur={handleBlur}
                        onChange={handleInputChange}
                        type='text'
                        name="cuit"
                        required
                        />
                        <label className="label" htmlFor="cuit">CUIL/CUIT</label>
                        {touched.cuit && errorsInput.cuit && <p className="error">{errorsInput.cuit}</p>}
                    </div>
                    <div className="containerInputs"> 
                        <input
                        className="input"
                        onBlur={handleBlur}
                        onChange={handleInputChange}
                        type='text'
                        name="location"
                        required
                        />
                        <label className="label" htmlFor="location">Localidad</label>
                        {touched.location && errorsInput.location && <p className="error">{errorsInput.location}</p>}
                    </div>
                    </div>
                    <div className="row">
                    <div className="containerInputs"> 
                        <input
                        className="input"
                        onBlur={handleBlur}
                        onChange={handleInputChange}
                        type='text'
                        name="provincia"
                        required
                        />
                        <label className="label" htmlFor="provincia">Provincia</label>
                        {touched.provincia && errorsInput.provincia && <p className="error">{errorsInput.provincia}</p>}
                    </div>
                    <div className="containerInputs"> 
                        <input
                        className="input"
                        onBlur={handleBlur}
                        onChange={handleInputChange}
                        type='text'
                        name="url"
                        required
                        />
                        <label className="label" htmlFor="url">URL</label>
                        {touched.url && errorsInput.url && <p className="error">{errorsInput.url}</p>}
                    </div>
                    </div>
                    <div className="row">
                    <div className="containerInputs"> 
                        <input
                        className="input"
                        onBlur={handleBlur}
                        onChange={handleInputChange}
                        type='text'
                        name="telephone"
                        required
                        />
                        <label className="label" htmlFor="telephone">Telefono</label>
                        {touched.telephone && errorsInput.telephone && <p className="error">{errorsInput.telephone}</p>}
                    </div>
                    <div className="containerInputs"> 
                        <input
                        className="input"
                        onBlur={handleBlur}
                        onChange={handleInputChange}
                        type='email'
                        name="email"
                        required
                        />
                        <label className="label" htmlFor="email">Email</label>
                        {touched.email && errorsInput.email && <p className="error">{errorsInput.email}</p>}
                    </div>
                    </div>
                    <div className="row">
                    <div className="containerInputs"> 
                        <input
                        className="input"
                        onBlur={handleBlur}
                        onChange={handleInputChange}
                        type='text'
                        name="cbu_cvu"
                        required
                        />
                        <label className="label" htmlFor="cbu_cvu">CBU/CVU/Alias</label>
                        {touched.cbu_cvu && errorsInput.cbu_cvu && <p className="error">{errorsInput.cbu_cvu}</p>}
                    </div>
                    <div className="containerInputs"> 
                        <input
                        className="input"
                        onBlur={handleBlur}
                        onChange={handleInputChange}
                        type='textarea'
                        name="description"
                        required
                        />
                        <label className="label" htmlFor="description">Descripcion</label>
                        {touched.description && errorsInput.description && <p className="error">{errorsInput.description}</p>}
                    </div>
                    </div>
                    <button type='submit' className="btn">Agregar</button>

                    
                    
                </form>
            </div>
        </div>

    )
}

export default FormApa;