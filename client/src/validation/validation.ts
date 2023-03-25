import { errorsInput, InputData } from "../redux/types";



const regexName = /^[a-zA-Z]+$/
const regexPassword = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^/s@]+$/
export const validation = (input: InputData) => {
    let errors: errorsInput = {}

    if (!input.name) {
        errors.name = "Nombre requerido";
    } else if (!regexName.test(input.name)) {
        errors.name = "el nombre debe contener solo letras";
    } else if (input.name.length > 15) {
        errors.name = "el nombre no puede superar los 15 caracteres";
    }

    if (!input.username) {
        errors.username = "usuario requerido"
    } else if (input.username.length > 20) {
        errors.username = "el usuario no puede contener mas de 10 carateres";
    }
    if (!input.last_name) {
        errors.last_name = "apellido requerido"
    }


    if (!input.password) {
        errors.password = "elegir contraseña";
    } else if (!regexPassword.test(input.password)) {
        errors.password = "La contraseña debe tener al menos 8 caracteres y por lo menos un número y una letra mayúscula";

    }

    if (!input.email) {
        errors.email = "ingresar email"
    } else if (!regexEmail.test(input.email)) {
        errors.email = "el email ingresado es inválido"
    }

    if(!input.description){
        errors.description = "ingresa una breve descripcion"
    }else if(input.description.length > 140){
        errors.description = "descripcion debe ser menor a 140 caracteres"
    }
    
    return errors;
};
