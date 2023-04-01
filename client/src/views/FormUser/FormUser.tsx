import React, { useState } from "react";
import './FormUser.css';
import img from '../../assets/descarga.jpg'
// import { useDispatch } from "react-redux";
// import { postUser } from "../../redux/actions/actions";
// import { AnyAction } from "redux";
import { validationUser } from "../../validation/validationUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FormUser() {
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
    })

    const [touched, setTouched] = useState({
        username: false,
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

    const errorsInput = validationUser(input);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (Object.keys(errorsInput).length === 0) {
            // console.log(input)
            axios
                .post("http://localhost:3001/api/auth/users/signUp", input)
                .then((response) => {
                    setInput({
                        username: "",
                        email: "",
                        password: "",
                    });

                    alert("Usuario creado correctamente")
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
                <h1>Nuevo Usuario</h1>
                <div className="containerImg">
                    <img className="img" src={img} alt="thor" />
                </div>
            </div>
            <div className="containerForm">
                <form onSubmit={handleSubmit}>

                    <div className="containerInputs">
                        <input
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className="input"
                            type='text'
                            name="username"
                            required
                        />
                        <label className="label" htmlFor="username">Nombre de usuario</label>
                        {touched.username && errorsInput.username && <p className="error">{errorsInput.username}</p>}
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

                    <button disabled={Object.keys(errorsInput).length !== 0} className="botoncitoCrear">Crear</button>
                </form>
            </div>
        </div>
    )
}

export default FormUser;