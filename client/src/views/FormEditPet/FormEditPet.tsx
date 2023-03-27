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


function FormEditPet() { //Podemos hacer q reciba la petId por props o por params.

    const dispatch = useDispatch()
    const { petId } = useParams<{ petId: any }>();


//Me aseguro de q los details de la pet y allPets esten cargados en el State Global
    useEffect (()=>{
        dispatch(getPets() as unknown as AnyAction)
        dispatch(getDetailPets(petId)as unknown as AnyAction)
        //
        // return (): any=> dispatch(clearDetail())
    },[dispatch])

    //Me guardo los details para meterselos al estado local "input"
    let petDetails: Pet= useSelector((state: StateType) => state.detail); 
console.log(petDetails)


//Me traigo todas las pets
    const allPets = useSelector((state: StateType) => state.allPets); 
    const oldVersionPet= allPets.find(p=>p._id === petId) //  petId HASTA Q LA PODAMOS TRAER POR PARAMS O X PROPS
// console.log(oldVersionPet)


//NO ME TRAE INPUT LLENO!!
    // const [input, setInput] = useState({
    //     ...petDetails
    // })
// console.log(input)


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
// console.log(input)



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
// console.log(input)
// console.log(errors)
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const editedPet= {
        //     name: input.name? input.name : oldVersionPet.name,

        // }
// console.log(petId)
// console.log(input)
        dispatch(putPet(petId, input) as unknown as AnyAction); //Action creada en el reducer.
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
            <div>
            <h2>Datos Actuales</h2>
                <label className='labelCurrentInfo' htmlFor="name">Nombre:</label>
                <h5>{petDetails.name}</h5>

                <label className='labelCurrentInfo' htmlFor="age">Edad (años):</label>
                <h5>{petDetails.age}</h5>

                <label className='labelCurrentInfo' htmlFor="description">Descripción:</label>
                <h5>{petDetails.description}</h5>

                <label className='labelCurrentInfo' htmlFor="size">Tamaño:</label>
                <h5>{petDetails.size}</h5>

                <label className='labelCurrentInfo' htmlFor="adoption">Buscando Hogar:</label>
                <h5>{petDetails.adoption ? 'Sí' : 'No'}</h5>

                <label className='labelCurrentInfo' htmlFor="status">Publicado:</label>
                <h5>{petDetails.status ? 'Sí' : 'No'}</h5>

                <label className='labelCurrentInfo' htmlFor="type">Tipo de Mascota</label>
                <h5>{petDetails.type}</h5>

                <label className='labelCurrentInfo' htmlFor="image">Imagen</label>
                <img src={petDetails.image} alt="imagen de la mascota" className='imagenCargada' />
                

            </div>

<hr />
            <div className="containerForm">
                <h1>Los datos de este formulario reemplazarán a los Datos Actuales</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                className="input"
                                type='text'
                                name="name"
                                value={input.name}
                                // value= {name}
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
                                <option value="" >Seleccione un tamaño</option>
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
                                <option value="" >Seleccione una opción</option>
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
                                <option value="">Seleccione una opicón</option>
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
                                <option value="">Seleccione Tipo</option>
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
                            <label className="tam" htmlFor="image">Imagen</label>

                            {errors.image && <p className='error'>{errors.image}</p>}
                        </div>

                        <button type="submit" disabled={handleDisabledButton()}>Guardar Moficicaciones Hechas</button>
                        {/* <button type="submit" disabled={handleDisabledButton()} className="btn">Guardar Moficicaciones Hechas</button> */}
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