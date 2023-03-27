import { errorsInput, InputData } from "../redux/types";


const regexName = /^[a-zA-Z]+$/
const regexPassword = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^/s@]+$/
export const validationApa = (input: InputData) => {
    let errors: errorsInput = {}

    if (!input.name) {
        errors.name = "Nombre requerido";
    } else if (!regexName.test(input.name)) {
        errors.name = "El nombre debe contener solo letras";
    } else if (input.name.length > 15) {
        errors.name = "El nombre no puede superar los 15 caracteres";
    }

    if (!input.name) {
        errors.name = "Nombre requerido";
    } else if (!regexName.test(input.name)) {
        errors.name = "El nombre de debe contener solo letras";
    } else if (input.name.length > 20) {
        errors.name = "El nombre no puede superar los 20 caracteres";
    }


    if (!input.password) {
        errors.password = "Elegir contraseña";
    } else if (!regexPassword.test(input.password)) {
        errors.password = "La contraseña debe tener al menos 8 caracteres y contener al menos un número, una letra mayúscula, una letra minúscula y un carácter especial.";

    }

    if (!input.email) {
        errors.email = "Ingresar un mail"
    } else if (!regexEmail.test(input.email)) {
        errors.email = "El email ingresado es inválido"
    }


    return errors;
};
