import React from "react";
import './FormApa.css'
import imgForm from '../../assets/perrito2.png';
import { useDispatch } from "react-redux";

function FormApa(){

    return(
        <div className="container">
            <div className="containerTitle">
                <h1>Formulario Carga Nueva Asociacion Protectora</h1>
                <img className="imgPerrito" src={imgForm} alt="foto perrito" />
            </div>
            <div className="containerForm">
                <form>
                    <div className="row">
                    <div className="containerInputs"> 
                        <input
                        className="input"
                        type='text'
                        name="name"
                        required
                        />
                        <label className="label" htmlFor="name">Nombre/Razon Social</label>
                        {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                    </div>
                    <div className="containerInputs"> 
                        <input
                        className="input"
                        type='text'
                        name="name"
                        required
                        />
                        <label className="label" htmlFor="name">CUIL/CUIT</label>
                        {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                    </div>
                    </div>
                    <div className="row">
                    <div className="containerInputs"> 
                        <input
                        className="input"
                        type='text'
                        name="name"
                        required
                        />
                        <label className="label" htmlFor="name">Direccion</label>
                        {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                    </div>
                    <div className="containerInputs"> 
                        <input
                        className="input"
                        type='text'
                        name="name"
                        required
                        />
                        <label className="label" htmlFor="name">Ciudad</label>
                        {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                    </div>
                    </div>
                    <div className="row">
                    <div className="containerInputs"> 
                        <input
                        className="input"
                        type='text'
                        name="name"
                        required
                        />
                        <label className="label" htmlFor="name">Provincia</label>
                        {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                    </div>
                    <div className="containerInputs"> 
                        <input
                        className="input"
                        type='text'
                        name="name"
                        required
                        />
                        <label className="label" htmlFor="name">Codigo Postal</label>
                        {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                    </div>
                    </div>
                    <div className="row">
                    <div className="containerInputs"> 
                        <input
                        className="input"
                        type='text'
                        name="name"
                        required
                        />
                        <label className="label" htmlFor="name">Telefono</label>
                        {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                    </div>
                    <div className="containerInputs"> 
                        <input
                        className="input"
                        type='text'
                        name="name"
                        required
                        />
                        <label className="label" htmlFor="name">Email</label>
                        {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                    </div>
                    </div>
                    <div className="row">
                    <div className="containerInputs"> 
                        <input
                        className="input"
                        type='text'
                        name="name"
                        required
                        />
                        <label className="label" htmlFor="name">CBU/CVU/Alias</label>
                        {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                    </div>
                        <button className="btn">Agregar</button>
                    </div>
                    
                    
                </form>
            </div>
        </div>

    )
}

export default FormApa;