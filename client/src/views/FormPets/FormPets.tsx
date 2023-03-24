
import './FormPets.css';
import petCat from '../../assets/perritoFormPet.png'
import { postPet } from "../../redux/actions/actions";
import React, { useState, } from "react";
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';

// import { useParams } from 'react-router-dom';
// import { ApaId } from '../../redux/types';






function FormPets() {
    const dispatch = useDispatch()
    // const { apaId } = useParams<{ apaId: string }>();
    const apaId = "641469a77c6b2ccca8fbcad9"



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



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(postPet(apaId, input) as unknown as AnyAction);
        alert("Mascota creada correctamente")

    }


    return (
        <div className="container">
            <div className="containerForm">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                className="input"
                                type='text'
                                name="name"
                                required
                            />
                            <label className="label" htmlFor="name">Nombre</label>
                            {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                        </div>
                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='number'
                                min={0}
                                className="input"
                                name="age"
                                required
                            />
                            <label className="label" htmlFor="name">Edad (años)</label>
                            {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                        </div>
                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="description"
                                required
                            />
                            <label className="label" htmlFor="descripcion">Descripcion</label>
                            {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="containerInputs">
                            <select name="size"
                                onChange={handleInputChange}
                                required>
                                <option value="">Seleccione un tamaño</option>
                                <option value="chico">Pequeño</option>
                                <option value="mediano">Mediano</option>
                                <option value="grande">Grande</option>
                            </select>
                            <label className="tam" htmlFor="size">Tamaño</label>


                            {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                        </div>
                        <div className="containerInputs">
                            <select name="type"
                                onChange={handleInputChange}
                                required>
                                <option value="">Seleccione Tipo</option>
                                <option value="perro">Perro</option>
                                <option value="gato">Gato</option>
                                <option value="otros">Otro</option>
                            </select>
                            <label className="tam" htmlFor="size">Tipo</label>
                            {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
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

                            {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
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