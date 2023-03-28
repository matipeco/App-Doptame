const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/ //formato de mail.
const nameRegex=/^[a-zA-Z]{2}[a-zA-Z\s]*$/ //comienza con 2 letras, puede tener espacios, no numeros
const last_nameRegex=/^[a-zA-Z]{3,}$/ //al menos 3 letras, sin numeros
const telephoneRegex=/^\d{5,}$/ //solo numeros, mínimo 5 caracteres.

const validate = (input)=>{
    let errors={}
    if(!input.name||nameRegex.test(input.name)===false){
    // if(!input.name){
        errors.name='Ingrese su Nombre'
    }
    if(!input.last_name||last_nameRegex.test(input.last_name)===false){
        errors.last_name='Ingrese su Apellido'
    }

    if(!input.email||emailRegex.test(input.email)===false){
        errors.email='Ingrese un email válido'
        
    }if(!input.provincia){
        errors.provincia='Seleccione una opción'
    } 
    if(!input.location){
        errors.location='Ingrese su Localidad'
    }

    if(!input.telephone || telephoneRegex.test(input.telephone)===false){
    errors.telephone='Solo números'
    }

    return errors;
}

export default validate;