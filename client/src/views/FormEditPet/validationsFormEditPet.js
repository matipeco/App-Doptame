
const validate = (input)=>{
    let errors={}
    if(!input.name){
        errors.name='Debe ingresa un nombre'

    }if(!input.description){
        errors.description='Debe ingresa una descripción'

    }if(!input.age){
        errors.platforms='Please select at least one Platform'

    }if(!input.image){
        errors.image='Debe subir una imagen'

    }if(!input.size){
        errors.size='Debe seleccionar un tamaño'
        
    }if(!input.type){
        errors.type='Debe seleccionar un tipo de mascota'

    }if(!input.adoption){
        errors.adoption='Debe seleccionar una opción'

    }if(!input.status){
        errors.status='Debe seleccionar una opción'
    }
    return errors;
}