import React, { useState } from "react";
import './FormUser.css';
import img from '../../assets/completo.png'
import { useDispatch } from "react-redux";
import { postUser } from "../../redux/actions/actions";
import { AnyAction } from "redux";
import { validationPets } from "../../validation/validation";
import { style } from "@mui/system";

function FormUser() {




    const dispatch = useDispatch()


    const [input, setInput] = useState({
        name: "",
        last_name: "",
        username: "",
        password: "",
        email: "",
        location: "",
        image: ""


    })
    const [touched, setTouched] = useState({
        name: false,
        last_name: false,
        password: false,
        username: false,
        email: false

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


    const errorsInput = validationPets(input);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (Object.keys(errorsInput).length === 0) {
            dispatch(postUser(input) as unknown as AnyAction);
            alert("Usuario creado")

            setInput({
                name: "",
                last_name: "",
                username: "",
                password: "",
                email: "",
                location: "",
                image: ""
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
                <form action="" onSubmit={handleSubmit}>
                    <div className="containerInputs">
                        <input
                            onChange={handleInputChange}
                            type='text'
                            className="input"
                            name="name"
                            onBlur={handleBlur}

                        />
                        <label className="label" htmlFor="name">Nombre</label>
                        {touched.name && errorsInput.name && <p>{errorsInput.name}</p>}
                    </div>
                    <div className="containerInputs">
                        <input
                            onChange={handleInputChange}
                            type='text'
                            className="input"
                            name="last_name"

                            onBlur={handleBlur}
                        />
                        <label className="label" htmlFor="username">Apellido</label>
                        {touched.last_name && errorsInput.last_name && <p>{errorsInput.last_name}</p>}
                    </div>
                    <div className="containerInputs">
                        <input
                            onChange={handleInputChange}
                            type='text'
                            className="input"
                            name="username"
                            onBlur={handleBlur}

                        />
                        <label className="label" htmlFor="username">Usuario</label>
                        {touched.username && errorsInput.username && <p>{errorsInput.username}</p>}
                    </div>
                    <div className="containerInputs">
                        <input
                            onChange={handleInputChange}
                            type='text'
                            className="input"
                            name="password"
                            onBlur={handleBlur}

                        />
                        <label className="label" htmlFor="password">Contraseña</label>
                        {touched.password && errorsInput.password && <p>{errorsInput.password}</p>}
                    </div>
                    <div className="containerInputs">
                        <input
                            onChange={handleInputChange}
                            type='text'
                            className="input"
                            name="email"
                            onBlur={handleBlur}

                        />
                        <label className="label" htmlFor="name">Email</label>
                        {touched.email && errorsInput.email && <p>{errorsInput.email}</p>}
                    </div>
                    <div className="containerInputs">
                        <input
                            onChange={handleInputChange}
                            type='text'
                            className="input"
                            name="location"

                        />
                        <label className="label" htmlFor="name">Localidad</label>

                    </div>


                    <div className="containerInputs">
                        <input
                            onChange={handleInputChange}
                            className="fil"
                            type='file'
                            id='image'
                            name="image"
                            accept="image/*"
                            required
                        />
                        <label className="tam" htmlFor="image">Imagen</label>

                        {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                    </div>
                    <button disabled={Object.keys(errorsInput).length !== 0}>Crear</button>

                </form>
            </div>
        </div>
    )
}

export default FormUser;