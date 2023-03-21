import { errorsInput, InputData } from "../redux/types";


const regexName = /^[a-zA-Z]+$/
const regexPassword = /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}/
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

    if(!input.url){
        errors.url = "ingresa url de tu red social"
    }

    if(!input.description){
        errors.description = "ingresa una breve descripcion"
    }else if(input.description.length > 140){
        errors.description = "descripcion debe ser menor a 140 caracteres"
    }

    if(!input.cbu_cvu){
        errors.cbu_cvu = "ingresa un cbu/cvu o alias"
    } else if(input.cbu_cvu.length > 40){
        errors.cbu_cvu = "debe contener menos de 40 caracteres"
    }

    if(!input.cuit || input.cuit.length > 11){
        errors.cuit = "ingrese un cuit valido"
    }

    if(!input.location){
        errors.location = "ingrese su localidad"
    } else if(input.location.length > 15){
        errors.location = "debe contener menos de 15 caracteres"
    }

    if(!input.provincia){
        errors.provincia = "ingrese provincia"
    }else if(input.provincia.length > 14){
        errors.provincia = "debe contener menos de 14 caracteres"
    }

    if(!input.telephone){
        errors.telephone = "ingrese su numero de telefono"
    }else if(input.telephone.length > 10){
        errors.telephone = "ingrese su numero sin 0 o 9 delante"
    }
    return errors;
};
