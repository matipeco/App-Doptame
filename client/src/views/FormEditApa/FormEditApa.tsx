import './FormEditApa.css';
import petCat from '../../assets/perritoFormPet.png'
import { getApaById, putApa} from "../../redux/actions/actions"; //TODAVIA NO CREADA LA ACTION. HABLAR CON DAMI A VER SI EL YA LA HIZO
import React, { useState, useEffect } from "react";
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/reducer/reducer'
import { Apa} from "../../redux/types"
import validate from './JSvalidationsFormEditApa';
// import { useParams} from 'react-router-dom';


function FormEditApa() { //Podemos hacer q reciba la apaId por props o por params.

    const provincias = []

    



    const dispatch = useDispatch()
    // const { apaId } = useParams<{ petId: string }>();
    const apaId = "6413a3b26f405e54c5c7399f" //Provisorio, hasta tener la apaId por params o props

//Me aseguro de q los details de la pet y allPets esten cargados en el State Global
    useEffect (()=>{
        dispatch(getApaById(apaId)as unknown as AnyAction)
    },[dispatch])

    //Me guardo los details para meterselos al estado local "input"
    let apaDetails: Apa= useSelector((state: StateType) => state.detailApa); 
// console.log(apaDetails)


    const [input, setInput] = useState({
    name: "",
    password: "",
    email: "",
    description: "",
    provincia: "",
    location: "",
    telephone: "",
    cuit: "",
    image: "",
    cbu_cvu: "",
    url: "",
})

// console.log(input)



    const [errors, setErrors] = useState({
        name:'Ingrese un Nombre',
        password: 'Ingrese una Contraseña',
        email:'Ingrese un email',
        provincia: "Seleccione su Provincia",
        location: "Ingrese su Localidad",
        description: "Ingrese una Descripción",
        cbu_cvu: "Ingrese su CBU/CVU (22 dígitos)",
        // url: "Ingrese su sitio web o red social", //No required, puede no tener.
        telephone: "Ingrese su número de contacto sin espacios ni guiones",
        cuit: "Ingrese su CUIT, sin espacios ni guiones",
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
// console.log(input)
// console.log(errors)
    };






    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const editedPet= {
        //     name: input.name? input.name : oldVersionPet.name,

        // }
// console.log(apaId)
// console.log(input)
        dispatch(putApa(apaId, input) as unknown as AnyAction); //Action creada en el reducer.
        alert("Datos modificados correctamente")
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
                <h5>{apaDetails.name}</h5>

                <label className='labelCurrentInfo' htmlFor="email">Email:</label>
                <h5>{apaDetails.email}</h5>

                <label className='labelCurrentInfo' htmlFor="description">Descripción:</label>
                <h5>{apaDetails.description}</h5>

                <label className='labelCurrentInfo' htmlFor="provincia">Provincia:</label>
                <h5>{apaDetails.provincia}</h5>

                <label className='labelCurrentInfo' htmlFor="location">Localidad:</label>
                <h5>{apaDetails.location}</h5>

                <label className='labelCurrentInfo' htmlFor="telephone">Teléfono:</label>
                <h5>{apaDetails.telephone}</h5>

                <label className='labelCurrentInfo' htmlFor="cuit">CUIT:</label>
                <h5>{apaDetails.cuit}</h5>

                {/* <label className='labelCurrentInfo' htmlFor="image">Imagen</label>
                <img src={apaDetails.image} alt="imagen de la mascota" className='imagenCargada' /> */}

                <label className='labelCurrentInfo' htmlFor="cbu_cvu">CBU / CVU:</label>
                <h5>{apaDetails.cbu_cvu}</h5>

                <label className='labelCurrentInfo' htmlFor="url">Sitio Web / Red Social:</label>
                <h5>{apaDetails.url}</h5>


                

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
                            <label className="label" htmlFor="age">Edad</label>
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
                                <option value="" >Seleccione una opicón</option>
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

export default FormEditApa;