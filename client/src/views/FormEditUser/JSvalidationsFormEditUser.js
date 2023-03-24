const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = (input)=>{
    let errors={}
    
    if(!input.password){
        errors.password='Ingrese una Contraseña'
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