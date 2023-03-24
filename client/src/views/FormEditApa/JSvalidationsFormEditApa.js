const cbuRegex= /^\d{22}$/ //22 numeros
const cuitRegex=/^\d{11}$/ //11 numeros
const telephoneRegex=/^[0-9]+$/ //solo numeros
const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/ //formato de mail
const passwordRegex=/^\S{8,}$/ //al menos 8 caracteres, sin espacios
const nameRegex=/^[a-zA-Z]{3,}$/ //al menos 3 letras, sin numeros
const descriptionRegex=/^[a-zA-Z]{10,}$/ //al menos 3 letras


const validate = (input)=>{
    let errors={}
    if(!input.name||nameRegex.test(input.email)===false){
        errors.name='Ingrese un Nombre'

    }if(!input.password ||passwordRegex.test(input.password)===false){
        errors.password='Al menos 8 caracteres'

    }if(!input.description ||descriptionRegex.test(input.description)===false){
        errors.description='Ingrese una Descripción'
    }
    // if(!input.image){
    //     errors.image='Cargue una imagen'
    // }
    if(!input.email||emailRegex.test(input.email)===false){
    // if(!input.email){
        errors.email='Ingrese un email válido'
        
    }if(!input.cbu_cvu || cbuRegex.test(input.cbu_cvu)===false){
        errors.cbu_cvu='22 números, sin espacios ni guiones'

    }if(!input.location){
        errors.location='Ingrese su Localidad'

    }if(!input.provincia){
        errors.provincia='Seleccione una opción'
    
    }if(!input.cuit || cuitRegex.test(input.cuit)===false){
        errors.cuit='11 números sin espacios ni guiones'
    
    } if(!input.telephone || telephoneRegex.test(input.telephone)===false){
        errors.telephone='Solo números'
    }

//No es required: no todos tienen redes sociales o sitio web propio
    if(!input.url){
        errors.url='Ingrese la dirección de su sitio web o red social'
    }
    return errors;
}

export default validate;