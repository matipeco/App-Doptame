
import './FormPets.css';
import petCat from '../../assets/perritoFormPet.png'
import { postPet } from "../../redux/actions/actions";
import React, { useState, } from "react";
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { validation } from "../../validation/validationPets"
import { useNavigate } from "react-router-dom"; import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Reducer } from "../../redux/store/store"






function FormPets() {
    const logueados = useSelector((state: Reducer) => state.Loguins);
    const apaId: any = logueados.apaFound?._id
    const dispatch = useDispatch()
    const navigate = useNavigate();
    console.log("apaId" + apaId)




    const [input, setInput] = useState({
        name: "",
        age: 0,
        size: "",
        type: "",
        image: "",
        description: "",
        status: true,
        adoption: false

    })

    const [touched, setTouched] = useState({
        name: false,
        age: false,
        size: false,
        type: false,
        image: false,
        description: false,

    });
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const field = e.target.name;
        setTouched({ ...touched, [field]: true });
    };

    const errorsInput = validation(input);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.keys(errorsInput).length === 0) {

            dispatch(postPet(apaId, input) as unknown as AnyAction);
            alert("Mascota creada")

            setInput({
                name: "",
                age: 0,
                size: "",
                type: "",
                image: "",
                description: "",
                status: true,
                adoption: false
            });
            navigate('/home')

        }
        alert("Mascota creada correctamente")

    }



    return (
        <div className="container">
            <div className="containerForm">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="containerInputs">
                            <input
                                onBlur={handleBlur}
                                onChange={handleInputChange}
                                className="input"
                                type='text'
                                name="name"
                                required
                            />
                            <label className="label" htmlFor="name">Nombre</label>
                            {touched.name && errorsInput.name && <p className="error">{errorsInput.name}</p>}

                        </div>
                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                type='text'
                                className="input"
                                name="age"
                                required
                            />
                            <label className="label" htmlFor="age">Edad (en años)</label>
                            {touched.age && errorsInput.age && <p className="error">{errorsInput.age}</p>}

                        </div>
                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                type='text'
                                className="input"
                                name="description"
                                required
                            />
                            <label className="label" htmlFor="descripcion">Descripcion</label>
                            {touched.description && errorsInput.description && <p className="error">{errorsInput.description}</p>}

                        </div>
                    </div>
                    <div className="row">
                        <div className="containerInputs">
                            <select name="size"
                                onBlur={handleBlur}
                                onChange={handleInputChange}
                                required>
                                <option value="">Seleccione un tamaño</option>
                                <option value="chico">Pequeño</option>
                                <option value="mediano">Mediano</option>
                                <option value="grande">Grande</option>
                            </select>
                            <label className="tam" htmlFor="size">Tamaño</label>
                            {touched.size && touched.size && errorsInput.size && <p className="error">{errorsInput.size}</p>}


                        </div>
                        <div className="containerInputs">
                            <select name="type"
                                onBlur={handleBlur}
                                onChange={handleInputChange}
                                required>
                                <option value="">Seleccione Tipo</option>
                                <option value="perro">Perro</option>
                                <option value="gato">Gato</option>
                                <option value="otros">Otro</option>
                            </select>
                            <label className="tam" htmlFor="size">Tipo</label>
                            {touched.size && errorsInput.type && <p className="error">{errorsInput.type}</p>}

                        </div>
                    </div>
                    <div className="row">
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

                        </div>

                        <button className="btn">Agregar</button>
                    </div>
                </form>
            </div>
            <div className="containerTitle">
                <h1>Formulario Carga de Mascota</h1>
                <img className="imgPerrito" src={petCat} alt="foto perrito" />
            </div>

        </div>
    )
}

export default FormPets;