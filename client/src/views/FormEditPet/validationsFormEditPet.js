

const validate = (input)=>{
    let errors={}
    if(!input.name){
        errors.name='Ingrese un Nombre'

    }if(!input.age){
        errors.age='Ingrese una Edad'

    }if(!input.description){
        errors.description='Ingrese una Descripción'

    }if(!input.image){
        errors.image='Cargue una imagen'

    }if(!input.size){
        errors.size='Seleccione un Tamaño'
        
    }if(!input.type){
        errors.type='Seleccione un Tipo de Mascota'

    }if(!input.adoption){
        errors.adoption='Buscando Hogar: Seleccione una opción'

    }if(!input.status){
        errors.status='Mascota Publicada: Seleccione una opción'
    }
    return errors;
}



// const validate = (input)=>{
//     let errors={}
//     if(!input.name){
//         errors.name='Debe ingresa un nombre'

//     }if(!input.description){
//         errors.description='Debe ingresa una descripción'

//     }if(!input.image){
//         errors.image='Debe subir una imagen'

//     }if(!input.size){
//         errors.size='Debe seleccionar un tamaño'
        
//     }if(!input.type){
//         errors.type='Debe seleccionar un tipo de mascota'

//     }if(!input.adoption){
//         errors.adoption='Debe seleccionar una opción'

//     }if(!input.status){
//         errors.status='Debe seleccionar una opción'
//     }
//     return errors;
// }

export default validate;