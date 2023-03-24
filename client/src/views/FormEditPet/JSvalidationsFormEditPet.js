const nameRegex=/^[a-zA-Z]{3,}$/ //al menos 3 letras, sin numeros
const ageRegex=/^\d+$/ //al menos 1 numero, sin letras ni espacios
const descriptionRegex=/^[a-zA-Z]{10,}$/ //al menos 10 letras


const validate = (input)=>{
    let errors={}
    if(!input.name||nameRegex.test(input.name)===false){
        errors.name='Ingrese un Nombre'

    }if(!input.age||ageRegex.test(input.age)===false){
        errors.age='Ingrese una número'

    }if(!input.description||descriptionRegex.test(input.description)===false){
        errors.description='Ingrese una Descripción'

    }if(!input.image){
        errors.image='Cargue una imagen'

    }if(!input.size){
        errors.size='Seleccione un Tamaño'
        
    }if(!input.type){
        errors.type='Seleccione un Tipo de Mascota'

    }if(!input.adoption){
        errors.adoption='Seleccione una opción'

    }if(!input.status){
        errors.status='Seleccione una opción'
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