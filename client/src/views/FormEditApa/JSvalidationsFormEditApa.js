const cbuRegex= /^\d{22}$/
const cuitRegex=/^\d{11}$/
const telephoneRegex=/^[0-9]+$/
const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = (input)=>{
    let errors={}
    if(!input.name){
        errors.name='Ingrese un Nombre'

    }if(!input.password){
        errors.password='Ingrese una Contraseña'

    }if(!input.description){
        errors.description='Ingrese una Descripción'
    }
    // if(!input.image){
    //     errors.image='Cargue una imagen'
    // }
    if(!input.email||emailRegex.test(input.email)===false){
    // if(!input.email){
        errors.email='Ingrese un email válido'
        
    }if(!input.cbu_cvu || cbuRegex.test(input.cbu_cvu)===false){
        errors.cbu_cvu='Debe ingresar 22 números, sin espacios'

    }if(!input.location){
        errors.location='Ingrese su Localidad'

    }if(!input.provincia){
        errors.provincia='Seleccione una opción'
    
    }if(!input.cuit || cuitRegex.test(input.cuit)===false){
        errors.cuit='Ingrese su CUIT de 11 números'
    
    } if(!input.telephone || telephoneRegex.test(input.telephone)===false){
        errors.telephone='Ingrese su teléfono (solo números)'
    }

//No es required: no todos tienen redes sociales o sitio web propio
    if(!input.url){
        errors.url='Ingrese la dirección de su sitio web o red social'
    }
    return errors;
}

export default validate;