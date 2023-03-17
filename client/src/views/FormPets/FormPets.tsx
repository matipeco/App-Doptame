import React from "react";
import './FormPets.css';
import petCat from '../../assets/perritoFormPet.png'

function FormPets(){
    return(
        <div className="container">
            <div className="containerForm">
                <form>
                <div className="row">
                    <div className="containerInputs"> 
                        <input
                        type='text'
                        name="name"
                        required
                        />
                        <label htmlFor="name">Nombre</label>
                        {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                    </div>
                    <div className="containerInputs"> 
                        <input
                        type='text'
                        name="name"
                        required
                        />
                        <label htmlFor="name">Edad</label>
                        {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                    </div>
                    </div>
                    <div className="row">
                    <div className="containerInputs"> 
                        <select name="size" required>
                            <option value="">Seleccione un tamaño</option>
                            <option value="pequeño">Pequeño</option>
                            <option value="mediano">Mediano</option>
                            <option value="grande">Grande</option>
                        </select>
                        <label className="tam" htmlFor="size">Tamaño</label>


                        {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                    </div>
                    <div className="containerInputs"> 
                    <select name="size" required>
                            <option value="">Seleccione Tipo</option>
                            <option value="pequeño">Perro</option>
                            <option value="mediano">Gato</option>
                            <option value="grande">Otro</option>
                        </select>
                        <label className="tam" htmlFor="size">Tipo</label>
                        {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                    </div>
                    </div>
                    <div className="row">
                    <div className="containerInputs"> 
                        <input
                        className="fil"
                        type='file'
                        id='image'
                        name="image"
                        accept="image/*"
                        required
                        />
                        <label  className="tam" htmlFor="image">Imagen</label>
                       
                        {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                    </div>
                    <button>Agregar</button>
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