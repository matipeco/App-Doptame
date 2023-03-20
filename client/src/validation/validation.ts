import { InputData, errorsInput } from "../redux/types";


const regexName = /^[a-zA-Z]+$/
const regexPassword = /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}/
const regexEmail = /^[^\s@]+@[^\s@]+\.[^/s@]+$/
export const validationPets = (input: InputData) => {
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
    } else if (input.username.length > 10) {
        errors.username = "el usuario no puede contener mas de 10 carateres";
    }
    if (!input.last_name) {
        errors.last_name = "apellido requerido"
    }



    if (!input.password) {
        errors.password = "elegir contraseña";
    } else if (!regexPassword.test(input.password)) {
        errors.password = "La contraseña debe tener al menos 8 caracteres y contener al menos un número, una letra mayúscula, una letra minúscula y un carácter especial.";

    }

    if (!input.email) {
        errors.email = "ingresar un mail"
    } else if (!regexEmail.test(input.email)) {
        errors.email = "el email ingresado es inválido"
    }


    return errors;
};
