import './FormEditPet.css';
import petCat from '../../assets/perritoFormPet.png'
import { getDetailPets,clearDetail,putPet,getPets } from "../../redux/actions/actions";
import React, { useState, useEffect } from "react";
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/reducer/reducer'
import { Pet} from "../../redux/types"
import validate from './JSvalidationsFormEditPet';
import { useParams} from 'react-router-dom';
import { AnyAaaaRecord } from 'dns';


function FormEditPet() { 

    const dispatch = useDispatch()
    const { petId } = useParams<{ petId: any }>();

    //Me guardo los details para meterselos al estado local "input"
    let petDetails: Pet= useSelector((state: StateType) => state.detail); 

    const [input, setInput] = useState(petDetails)


//Me aseguro de q los details de la pet esten cargados en el State Global
    useEffect (()=>{
        dispatch(getDetailPets(petId)as unknown as AnyAction)
    },[dispatch])

    useEffect(() => {
        setInput(petDetails)
    }, [petDetails])



    const [errors, setErrors] = useState({
        name:'Al menos 3 letras',
        description: 'Ingrese una Descripción',
        image:'Cargue una imagen',
        size:'Seleccione un Tamaño',
        type:'Seleccione un Tipo de Mascota',
        adoption:'Buscando Hogar: Seleccione una opción',
        status:'Mascota Publicada: Seleccione una opción',
        age:'Ingrese una número'
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
        dispatch(putPet(petId, input) as unknown as AnyAction);
        alert("Mascota editada correctamente")
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

            <div className="containerForm">
                <h1>Editar Mascota:</h1>
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
                            <label className= "label" htmlFor="name">Nombre</label>
                            {errors.name && <p>{errors.name}</p>}
                        </div>
                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="age"
                                value={input.age}
                            />
                            <label className="label" htmlFor="age">Edad (años)</label>
                            {errors.age && <p className='errors'>{errors.age}</p>}
                        </div>
                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="description"
                                value={input.description}
                            />
                            <label className="label" htmlFor="descripcion">Descripción</label>
                            {errors.description && <p className='errors'>{errors.description}</p>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="containerInputs">
                            <select name="size"
                                onChange={handleInputChange}
                                >
                                <option value={input.size} >{input.size}</option>
                                <option value="chico">Pequeño</option>
                                <option value="mediano">Mediano</option>
                                <option value="grande">Grande</option>
                            </select>
                            <label className="tam" htmlFor="size">Tamaño</label>
                            {errors.size && <p className='error'>{errors.size}</p>}
                        </div>

                        <div className="containerInputs">
                            <select name="adoption"
                                onChange={handleInputChange}
                                >
                                <option value={input.adoption? 'Sí' : 'No'} >{input.adoption? 'Sí' : 'No'} </option>
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </select>
                            <label className="tam" htmlFor="adoption">Buscando Hogar</label>
                            {errors.adoption && <p className='error'>{errors.adoption}</p>}
                        </div>

                        <div className="containerInputs">
                            <select name="status"
                                onChange={handleInputChange}
                                >
                                <option value={input.status? 'Sí' : 'No'}>{input.status? 'Sí' : 'No'}</option>
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </select>
                            <label className="tam" htmlFor="status">Publicado</label>
                            {errors.status && <p className='error'>{errors.status}</p>}
                        </div>

                        <div className="containerInputs">
                            <select name="type"
                                onChange={handleInputChange}
                                >
                                <option value={input.type}>{input.type}</option>
                                <option value="perro">Perro</option>
                                <option value="gato">Gato</option>
                                <option value="otros">Otro</option>
                            </select>
                            <label className="tam" htmlFor="size">Tipo</label>
                            {errors.type && <p className='error'>{errors.type}</p>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="containerInputs">
                        <img src={petDetails.image} alt="imagen de la mascota" className="imagenCargada" />
                            <label className= "label" htmlFor="img actual">Imagen Actual</label>
                        </div>

                        <div className="containerInputs">
                        <input
                                onChange={handleInputChange}
                                // className="fil"
                                // type='file'
                                type='text'
                                className="input"
                                id='image'
                                name="image"
                                // value={input.image}
                                // accept="image/*"
                                
                            />
                            {/* <label className="tam" htmlFor="image">Imagen</label> */}

                        <label className="label" htmlFor="image">Reemplace la Imagen Actual:</label>
                            {errors.image && <p className='error'>{errors.image}</p>}
                        </div>

                    </div>
                    <div className="row">
                        
                    </div>
                        <button type="submit" disabled={handleDisabledButton()}>Guardar</button>
                        {/* <button type="submit" disabled={handleDisabledButton()} className="btn">Guardar Moficicaciones Hechas</button> */}
                </form>
            </div>
            {/* <div className="containerTitle">
                <h1>Editar Mascota</h1>
                <img className="imgPerrito" src={petCat} alt="foto perrito" />
            </div> */}

        </div>
    )
}

export default FormEditPet;