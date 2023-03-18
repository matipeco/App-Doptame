import React from "react";
import './FormUser.css';
import img from '../../assets/completo.png'

function FormUser(){
    return(
        <div className="container">
            <div className="containerTitle">
             <h1>Nuevo Usuario</h1>
            <div className="containerImg">
                <img className="img" src={img} alt="thor" />
            </div>
            </div>
            <div className="containerForm">
                <form action="">
                <div className="containerInputs"> 
                        <input
                        type='text'
                        className="input"
                        name="name"
                        required
                        />
                        <label className="label" htmlFor="name">Nombre y Apellido</label>
                        {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                    </div>
                    <div className="containerInputs"> 
                        <input
                        type='text'
                        className="input"
                        name="name"
                        required
                        />
                        <label className="label" htmlFor="name">Usuario</label>
                        {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                    </div>
                    <div className="containerInputs"> 
                        <input
                        type='text'
                        className="input"
                        name="name"
                        required
                        />
                        <label className="label" htmlFor="name">Contraseña</label>
                        {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                    </div>
                    <div className="containerInputs"> 
                        <input
                        type='text'
                        className="input"
                        name="name"
                        required
                        />
                        <label className="label" htmlFor="name">Email</label>
                        {/* {errors.name && <p className={s.error}>{errors.name}</p>} */}
                    </div>
                    <button>Crear</button>

                </form>
            </div>
        </div>
    )
}

export default FormUser;