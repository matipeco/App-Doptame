import React, { useState } from "react";
import './FormUser.css';
import img from '../../assets/completo.png'
// import { useDispatch } from "react-redux";
// import { postUser } from "../../redux/actions/actions";
// import { AnyAction } from "redux";
import { validationApa } from "../../validation/validationApa";
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

    const errorsInput = validationApa(input);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (Object.keys(errorsInput).length === 0) {
            axios
                .post("http://localhost:3001/user/auth", input)
                .then((response) => {
                    setInput({
                        username: "",
                        email: "",
                        password: "",
                    });
                    alert(response.data.message);
                })
                .catch((error) => {
                    alert(error.response.data.message)
                });
            navigate('/login')
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


                    <button disabled={Object.keys(errorsInput).length !== 0}>Crear</button>
                </form>
            </div>
        </div>
    )
}

export default FormUser;