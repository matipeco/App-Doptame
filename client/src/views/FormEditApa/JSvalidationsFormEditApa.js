const cbuRegex= /^\d{22}$/
const cuitRegex=/^\d{11}$/
const telephoneRegex=/^[0-9]+$/


const validate = (input)=>{
    let errors={}
    if(!input.name){
        errors.name='Ingrese un Nombre'

    }if(!input.password){
        errors.password='Ingrese una Contraseña'

    }if(!input.description){
        errors.description='Ingrese una Descripción'

    }if(!input.image){
        errors.image='Cargue una imagen'

    }if(!input.email){
        errors.email='Ingrese un email'
        
    }if(!input.cbu_cvu || cbuRegex.test(input.cbu_cvu===false)){
        errors.cbu_cvu='Debe ingresar 22 números, sin espacios'

    }if(!input.location){
        errors.location='Seleccione una opción'
   
    }if(!input.cuit || cuitRegex.test(input.cuit===false)){
        errors.location='Seleccione una opción'
    
    } if(!input.telephone || telephoneRegex.test(input.telephone===false)){
        errors.location='Seleccione una opción'
    }

//No es required: no todos tienen redes sociales o sitio web propio
    if(!input.url){
        errors.url='Ingrese la dirección de su sitio web o red social'
    }
    return errors;
}

export default validate;