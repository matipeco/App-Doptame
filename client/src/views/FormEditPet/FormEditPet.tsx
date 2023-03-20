
import './FormEditPet.css';
import petCat from '../../assets/perritoFormPet.png'
import { getDetailPets,clearDetail,putPet } from "../../redux/actions/actions";
import React, { useState, useEffect } from "react";
import { AnyAction } from 'redux';
import { StateType } from '../../redux/reducer/reducer'
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';


function FormEditPet() { //Podemos hacer q reciba la petId por props o por params.

    const dispatch = useDispatch()
    // const { petId } = useParams<{ petId: string }>();
    const petId = "64147391609d26ab82537579" //Provisorio, hasta tener la petId por params o props


    useEffect(()=>{
        dispatch(getDetailPets(petId)as unknown as AnyAction)
        return ()=> dispatch(clearDetail())
    },[dispatch])
//Ahora tengo los details de la pet en la propiedad "detail" del Global State

//Me guardo los details de la pet en el estado local input:
    const petDetails = useSelector((state: StateType) => state.detail); 
    const [input, setInput] = useState({
        ...petDetails
    })
    // const size=['chico', 'mediano', 'grande']
    // const type= ['perro', 'gato', 'otros']

    // const [input, setInput] = useState({
    //     name: "",
    //     age: 0,
    //     size: "",
    //     type: "",
    //     image: "",
    //     description: "",
    //     status: true,
    //     adoption: false
    // })



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(putPet(petId, input) as unknown as AnyAction); //Action creada en el reducer.
        alert("Mascota editada correctamente")

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
                                value={input.name}
                            />
                            <label className="label" htmlFor="name">Nombre</label>
                            {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                        </div>
                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="age"
                                value={input.age}
                            />
                            <label className="label" htmlFor="name">Edad</label>
                            {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                        </div>
                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="description"
                                value={input.description}
                            />
                            <label className="label" htmlFor="descripcion">Descripcion</label>
                            {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="containerInputs">
                            <select name="size"
                                onChange={handleInputChange}
                                >
                                <option value="" >Seleccione un tamaño</option>
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
                                >
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
                                value={input.image}
                                accept="image/*"
                                
                            />
                            <label className="tam" htmlFor="image">Imagen</label>

                            {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                        </div>

                        <button className="btn">Agregar</button>
                    </div>
                </form>
            </div>
            <div className="containerTitle">
                <h1>Editar Mascota</h1>
                <img className="imgPerrito" src={petCat} alt="foto perrito" />
            </div>

        </div>
    )
}

export default FormEditPet;