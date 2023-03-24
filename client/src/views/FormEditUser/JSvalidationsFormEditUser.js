const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/ //formato de mail.
const passwordRegex=/^\S{8,}$/ //al menos 8 caracteres, sin espacios
const nameRegex=/^[a-zA-Z]{3,}$/ //al menos 3 letras, sin numeros
const last_nameRegex=/^[a-zA-Z]{3,}$/ //al menos 3 letras, sin numeros

const validate = (input)=>{
    let errors={}
    if(!input.name||nameRegex.test(input.email)===false){
    // if(!input.name){
        errors.name='Ingrese su Nombre'
    }

    if(!input.last_name||last_nameRegex.test(input.last_name)===false){
        errors.last_name='Ingrese su Apellido'
    }

    if(!input.username){
        errors.username='Ingrese su Nuevo Usuario'
    }
    
    if(!input.password ||passwordRegex.test(input.password)===false){
        errors.password='Ingrese al menos 8 caracreres'
    }
    if(!input.email||emailRegex.test(input.email)===false){
        errors.email='Ingrese un email válido'
        
    }if(!input.provincia){
        errors.provincia='Seleccione una opción'
    } 
    if(!input.location){
        errors.location='Ingrese su Localidad'
    }

    if(!input.image){
        errors.image='Cargue una imagen'
    }
    return errors;
}

export default validate;