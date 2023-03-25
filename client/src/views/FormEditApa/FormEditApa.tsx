import './FormEditApa.css';
import petCat from '../../assets/perritoFormPet.png'
import { getApaById, putApa} from "../../redux/actions/actions";
import React, { useState, useEffect } from "react";
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/reducer/reducer'
import { Apa} from "../../redux/types"
import validate from './JSvalidationsFormEditApa';
import { useParams} from 'react-router-dom';


function FormEditApa() { //Podemos hacer q reciba la apaId por props o por params.

    const provincias = ["Ciudad Autónoma de Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
    "Tucumán"]


    const dispatch = useDispatch()
    const { apaId } = useParams<{ apaId: any }>()


//Me aseguro de q los details de la APA esten cargados en el State Global
    useEffect (()=>{
        dispatch(getApaById(apaId)as unknown as AnyAction)
    },[dispatch])

    //Me guardo los details para meterselos al estado local "input"
    let apaDetails: Apa= useSelector((state: StateType) => state.detailApa); 
// console.log(apaDetails)


    const [input, setInput] = useState({
    name: "",
    // password: "",
    email: "",
    description: "",
    provincia: "",
    location: "",
    telephone: "",
    cuit: "",
    cbu_cvu: "",
    url: "",
    // image: "",
})

// console.log(input)



    // const [errors, setErrors] = useState({
    //     name:'Ingrese un Nombre',
    //     password: 'Ingrese una Contraseña',
    //     email:'Ingrese un email',
    //     description: "Ingrese una Descripción",
    //     provincia: "Seleccione su Provincia",
    //     location: "Ingrese su Localidad",
    //     telephone: "Ingrese solo números",
    //     cuit: "Ingrese su CUIT, sin espacios ni guiones",
    //     cbu_cvu: "Ingrese su CBU/CVU (22 dígitos)",
    //     url: "Ingrese su sitio web o red social",
    //     // image: "Cargue una imagen",
    // })

    const [errors, setErrors] = useState({
        name:'',
        // password:'',
        email:'',
        description:'',
        provincia:'',
        location:'',
        telephone:'',
        cuit:'',
        cbu_cvu:'',
        url:'',
        // image: "Cargue una imagen",
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
        dispatch(putApa(apaId, input) as unknown as AnyAction);
        alert("Datos modificados correctamente")
        window.location.assign('/home');
    }

    const handleDisabledButton = ()=>{
        if(Object.values(input)[0]==="") {
            return true;
        }else if (Object.keys(errors).length>1) {
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
                            />
                            <label className= "label" htmlFor="name">Nombre:</label>
                            {errors.name && <p>{errors.name}</p>}
                        </div>

                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                className="input"
                                type='text'
                                name="email"
                                value={input.email}
                            />
                            <label className= "label" htmlFor="email">Email:</label>
                            {errors.email && <p>{errors.email}</p>}
                        </div>

                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="description"
                                value={input.description}
                            />
                            <label className="label" htmlFor="descripcion">Descripción:</label>
                            {errors.description && <p className='errors'>{errors.description}</p>}
                        </div>

                        <div className="containerInputs">
                            <select name="provincia"
                                onChange={handleInputChange}
                                >
                                    <option value="" >Seleccione una Provincia</option>
                                    {
                                        provincias.map((p,i)=>{
                                            return (
                                                <option value={p} key={i}>{p}</option>
                                            )
                                        })
                                    }
                            </select>
                            <label className="tam" htmlFor="provincia">Provincia:</label>
                            {errors.provincia && <p className='error'>{errors.provincia}</p>}
                        </div>



                        

                        {/* <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='password'
                                className="input"
                                name="password"                         
                                value={input.password}
                            />
                            <label className="label" htmlFor="password">Contraseña:</label>
                            {errors.password && <p className='errors'>{errors.password}</p>}
                        </div> */}
                       
                        

                    </div>
                    <div className="row">

                    <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="location"
                                value={input.location}
                            />
                            <label className="label" htmlFor="location: ">Localidad:</label>
                            {errors.location && <p className='errors'>{errors.location}</p>}
                        </div>
                        


                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="telephone"
                                value={input.telephone}
                            />
                            <label className="label" htmlFor="descripcion">Teléfono:</label>
                            {errors.telephone && <p className='errors'>{errors.telephone}</p>}
                        </div>



                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="cuit"
                                value={input.cuit}
                            />
                            <label className="label" htmlFor="descripcion">CUIT:</label>
                            {errors.cuit && <p className='errors'>{errors.cuit}</p>}
                        </div>


                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="cbu_cvu"
                                value={input.cbu_cvu}
                            />
                            <label className="label" htmlFor="descripcion">CBU / CVU:</label>
                            {errors.cbu_cvu && <p className='errors'>{errors.cbu_cvu}</p>}
                        </div>


                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="url"
                                value={input.url}
                            />
                            <label className="label" htmlFor="descripcion"> Dirección Web o Red Social:</label>
                            {/* {errors.url && <p className='errors'>{errors.telephone}</p>} */}
                        </div>
                        
                    </div>
                    {/* NI EN EL TYPE NI EN EL MODEL ESTA LA IMAGEN */}
                    {/* <div className="row">
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
                        </div> */}

                        <button type="submit" disabled={handleDisabledButton()}>Guardar Moficicaciones Hechas</button>
                      
                    {/* </div> */}
                </form>
            </div>

            <div className="containerTitle">
                <h1>Editar APA</h1>
                <img className="imgPerrito" src={petCat} alt="foto perrito" />
            </div>

        </div>
    )
}

export default FormEditApa;