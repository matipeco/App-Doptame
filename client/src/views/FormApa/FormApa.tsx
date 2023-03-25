import React, { useState } from "react";
import './FormApa.css'
import imgForm from '../../assets/perrito2.png';
// import { useDispatch } from "react-redux";
// import { postApa } from "../../redux/actions/actions";
// import { AnyAction } from "redux";
import { validationApa } from "../../validation/validationApa";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function FormApa() {
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",

    })

    const [touched, setTouched] = useState({
        name: false,
        password: false,
        email: false,

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

    const errorsInput = validationApa(input);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (Object.keys(errorsInput).length === 0) {
            // console.log(input)
            axios
                .post("http://localhost:3001/apa/auth", input)
                .then((response) => {
                    setInput({
                        name: "",
                        email: "",
                        password: "",
                    });

                    alert("Apa creada correctamente")
                    // alert(response.data.message);
                    navigate("/login")
                })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.status === 409) {
                            alert(error.response.data.error);
                        } else {
                            alert("Ocurrió un error en la solicitud");
                        }
                    } else {
                        alert("No se pudo conectar con el servidor");
                    }
                });

        }
    }

    return (
        <div className="container">
            <div className="containerTitle">
                <h1>Formulario Carga Nueva Asociacion Protectora</h1>
                <img className="imgPerrito" src={imgForm} alt="foto perrito" />
            </div>
            <div className="containerForm">
                <form onSubmit={handleSubmit}>

                    <div className="containerInputs">
                        <input
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className="input"
                            type='text'
                            name="name"
                            required
                        />
                        <label className="label" htmlFor="username">Nombre</label>
                        {touched.name && errorsInput.name && <p className="error">{errorsInput.name}</p>}
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
                    <button disabled={Object.keys(errorsInput).length !== 0}>Crear</button>
                </form>
            </div>
        </div >

    )
}

export default FormApa;